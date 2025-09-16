import React, { useRef, useEffect, useState, useCallback } from 'react'
import { Button, Space, Slider, Select, Tooltip, Spin, Alert } from 'antd'
import {
  RotateLeftOutlined,
  RotateRightOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
  ReloadOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined,
  EyeOutlined,
  SettingOutlined
} from '@ant-design/icons'
import { cn } from '../lib/utils'

interface ViewerSettings {
  autoRotate: boolean
  showWireframe: boolean
  showGrid: boolean
  lightIntensity: number
  backgroundColor: string
}

interface Model3D {
  id: string
  name: string
  url: string
  type: 'gltf' | 'fbx' | 'obj'
  thumbnail?: string
  description?: string
}

interface ThreeDViewerProps {
  model?: Model3D
  width?: number | string
  height?: number | string
  className?: string
  showControls?: boolean
  showSettings?: boolean
  autoRotate?: boolean
  enableZoom?: boolean
  enablePan?: boolean
  onModelLoad?: (model: Model3D) => void
  onError?: (error: string) => void
}

const ThreeDViewer: React.FC<ThreeDViewerProps> = ({
  model,
  width = '100%',
  height = 400,
  className = '',
  showControls = true,
  showSettings = false,
  autoRotate = false,
  enableZoom = true,
  enablePan = true,
  onModelLoad,
  onError
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const viewerRef = useRef<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 })
  const [settings, setSettings] = useState<ViewerSettings>({
    autoRotate: autoRotate,
    showWireframe: false,
    showGrid: true,
    lightIntensity: 1,
    backgroundColor: '#f5f5f5'
  })

  // 检查WebGL支持
  const checkWebGLSupport = useCallback(() => {
    try {
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
      return !!gl
    } catch (e) {
      return false
    }
  }, [])

  // 初始化3D查看器
  const initViewer = useCallback(async () => {
    if (!containerRef.current || !model) return

    if (!checkWebGLSupport()) {
      const errorMsg = '您的浏览器不支持WebGL，无法显示3D模型'
      setError(errorMsg)
      onError?.(errorMsg)
      return
    }

    setLoading(true)
    setError(null)

    try {
      // 这里应该集成实际的3D库，如Three.js
      // 由于这是演示代码，我们模拟加载过程
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // 模拟成功加载
      onModelLoad?.(model)
      setLoading(false)
    } catch (err) {
      const errorMsg = `加载3D模型失败: ${err instanceof Error ? err.message : '未知错误'}`
      setError(errorMsg)
      onError?.(errorMsg)
      setLoading(false)
    }
  }, [model, checkWebGLSupport, onModelLoad, onError])

  // 重置视图
  const resetView = useCallback(() => {
    setZoom(1)
    setRotation({ x: 0, y: 0, z: 0 })
    // 这里应该重置3D查看器的相机位置
  }, [])

  // 缩放控制
  const handleZoom = useCallback((delta: number) => {
    if (!enableZoom) return
    const newZoom = Math.max(0.1, Math.min(5, zoom + delta))
    setZoom(newZoom)
    // 这里应该更新3D查看器的缩放
  }, [zoom, enableZoom])

  // 旋转控制
  const handleRotate = useCallback((axis: 'x' | 'y' | 'z', angle: number) => {
    setRotation(prev => ({
      ...prev,
      [axis]: prev[axis] + angle
    }))
    // 这里应该更新3D查看器的旋转
  }, [])

  // 全屏切换
  const toggleFullscreen = useCallback(() => {
    if (!containerRef.current) return

    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen()
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
    }
  }, [isFullscreen])

  // 监听全屏状态变化
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
    }
  }, [])

  // 初始化查看器
  useEffect(() => {
    initViewer()
  }, [initViewer])

  // 设置更新
  const updateSettings = useCallback((key: keyof ViewerSettings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }))
    // 这里应该更新3D查看器的设置
  }, [])

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative bg-gray-100 rounded-lg overflow-hidden',
        isFullscreen && 'fixed inset-0 z-50 bg-black',
        className
      )}
      style={{ width, height: isFullscreen ? '100vh' : height }}
    >
      {/* 3D渲染区域 */}
      <div className="w-full h-full relative">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 z-10">
            <div className="text-center">
              <Spin size="large" />
              <div className="mt-2 text-gray-600">加载3D模型中...</div>
            </div>
          </div>
        )}

        {error && (
          <div className="absolute inset-0 flex items-center justify-center p-4 z-10">
            <Alert
              message="3D模型加载失败"
              description={error}
              type="error"
              showIcon
              action={
                <Button size="small" onClick={initViewer}>
                  重试
                </Button>
              }
            />
          </div>
        )}

        {!loading && !error && !model && (
          <div className="absolute inset-0 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <EyeOutlined className="text-4xl mb-2" />
              <div>暂无3D模型</div>
            </div>
          </div>
        )}

        {/* 3D渲染画布 - 这里应该是Three.js的canvas */}
        <canvas
          className="w-full h-full"
          style={{ backgroundColor: settings.backgroundColor }}
        />
      </div>

      {/* 控制面板 */}
      {showControls && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20">
          <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-lg p-2 shadow-lg">
            <Space>
              {/* 旋转控制 */}
              <Tooltip title="向左旋转">
                <Button
                  size="small"
                  icon={<RotateLeftOutlined />}
                  onClick={() => handleRotate('y', -15)}
                />
              </Tooltip>
              <Tooltip title="向右旋转">
                <Button
                  size="small"
                  icon={<RotateRightOutlined />}
                  onClick={() => handleRotate('y', 15)}
                />
              </Tooltip>

              {/* 缩放控制 */}
              {enableZoom && (
                <>
                  <Tooltip title="放大">
                    <Button
                      size="small"
                      icon={<ZoomInOutlined />}
                      onClick={() => handleZoom(0.1)}
                    />
                  </Tooltip>
                  <Tooltip title="缩小">
                    <Button
                      size="small"
                      icon={<ZoomOutOutlined />}
                      onClick={() => handleZoom(-0.1)}
                    />
                  </Tooltip>
                </>
              )}

              {/* 重置视图 */}
              <Tooltip title="重置视图">
                <Button
                  size="small"
                  icon={<ReloadOutlined />}
                  onClick={resetView}
                />
              </Tooltip>

              {/* 全屏切换 */}
              <Tooltip title={isFullscreen ? '退出全屏' : '全屏'}>
                <Button
                  size="small"
                  icon={isFullscreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
                  onClick={toggleFullscreen}
                />
              </Tooltip>
            </Space>
          </div>
        </div>
      )}

      {/* 设置面板 */}
      {showSettings && (
        <div className="absolute top-4 right-4 z-20">
          <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-lg p-4 shadow-lg w-64">
            <div className="flex items-center gap-2 mb-3">
              <SettingOutlined />
              <span className="font-medium">显示设置</span>
            </div>
            
            <div className="space-y-3">
              {/* 自动旋转 */}
              <div className="flex items-center justify-between">
                <span className="text-sm">自动旋转</span>
                <Button
                  size="small"
                  type={settings.autoRotate ? 'primary' : 'default'}
                  onClick={() => updateSettings('autoRotate', !settings.autoRotate)}
                >
                  {settings.autoRotate ? '开' : '关'}
                </Button>
              </div>

              {/* 显示网格 */}
              <div className="flex items-center justify-between">
                <span className="text-sm">显示网格</span>
                <Button
                  size="small"
                  type={settings.showGrid ? 'primary' : 'default'}
                  onClick={() => updateSettings('showGrid', !settings.showGrid)}
                >
                  {settings.showGrid ? '开' : '关'}
                </Button>
              </div>

              {/* 线框模式 */}
              <div className="flex items-center justify-between">
                <span className="text-sm">线框模式</span>
                <Button
                  size="small"
                  type={settings.showWireframe ? 'primary' : 'default'}
                  onClick={() => updateSettings('showWireframe', !settings.showWireframe)}
                >
                  {settings.showWireframe ? '开' : '关'}
                </Button>
              </div>

              {/* 光照强度 */}
              <div>
                <div className="text-sm mb-1">光照强度</div>
                <Slider
                  min={0}
                  max={2}
                  step={0.1}
                  value={settings.lightIntensity}
                  onChange={(value) => updateSettings('lightIntensity', value)}
                />
              </div>

              {/* 背景颜色 */}
              <div>
                <div className="text-sm mb-1">背景颜色</div>
                <Select
                  size="small"
                  value={settings.backgroundColor}
                  onChange={(value) => updateSettings('backgroundColor', value)}
                  className="w-full"
                >
                  <Select.Option value="#f5f5f5">浅灰</Select.Option>
                  <Select.Option value="#ffffff">白色</Select.Option>
                  <Select.Option value="#000000">黑色</Select.Option>
                  <Select.Option value="#1890ff">蓝色</Select.Option>
                </Select>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 模型信息 */}
      {model && !loading && !error && (
        <div className="absolute top-4 left-4 z-20">
          <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
            <div className="font-medium text-sm">{model.name}</div>
            {model.description && (
              <div className="text-xs text-gray-600 mt-1">{model.description}</div>
            )}
            <div className="text-xs text-gray-500 mt-1">
              格式: {model.type.toUpperCase()}
            </div>
          </div>
        </div>
      )}

      {/* 缩放指示器 */}
      {enableZoom && zoom !== 1 && (
        <div className="absolute bottom-4 right-4 z-20">
          <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded px-2 py-1 text-xs">
            {Math.round(zoom * 100)}%
          </div>
        </div>
      )}
    </div>
  )
}

export default ThreeDViewer
export type { Model3D, ThreeDViewerProps, ViewerSettings }