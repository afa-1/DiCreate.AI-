import React, { useState, useRef, useEffect } from 'react'
import {
  Card,
  Button,
  Space,
  Slider,
  InputNumber,
  Select,
  Row,
  Col,
  Tabs,
  Form,
  Switch,
  Tooltip,
  Divider,
  Alert,
  Progress,
  Tag,
  Modal,
  message,
  Input
} from 'antd'
import {
  ZoomInOutlined,
  ZoomOutOutlined,
  SaveOutlined,
  UndoOutlined,
  RedoOutlined,
  FullscreenOutlined,
  ThunderboltOutlined,
  EyeOutlined,
  EyeInvisibleOutlined
} from '@ant-design/icons'

const { TabPane } = Tabs
const { Option } = Select

interface PatternPoint {
  x: number
  y: number
  type: 'corner' | 'curve' | 'notch'
  locked?: boolean
}

interface PatternPiece {
  id: string
  name: string
  points: PatternPoint[]
  visible: boolean
  color: string
  fabric: string
  grainline: { start: PatternPoint; end: PatternPoint }
}

interface PatternEditorProps {
  patternData?: any
  onSave?: (data: any) => void
  onClose?: () => void
}

const PatternEditor: React.FC<PatternEditorProps> = ({ patternData, onSave, onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [pieces, setPieces] = useState<PatternPiece[]>([])
  const [selectedPiece, setSelectedPiece] = useState<string | null>(null)
  const [selectedPoint, setSelectedPoint] = useState<number | null>(null)
  const [zoom, setZoom] = useState(100)
  const [gridVisible, setGridVisible] = useState(true)
  const [snapToGrid, setSnapToGrid] = useState(true)
  const [measurements, setMeasurements] = useState({
    chest: 96,
    waist: 76,
    hip: 100,
    shoulderWidth: 42,
    armLength: 58,
    bodyLength: 65
  })
  const [activeTab, setActiveTab] = useState('edit')
  const [history, setHistory] = useState<any[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [isOptimizing, setIsOptimizing] = useState(false)
  const [optimizationProgress, setOptimizationProgress] = useState(0)

  // 初始化画布
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // 设置画布尺寸
    canvas.width = 800
    canvas.height = 600

    // 初始化示例版型片
    const samplePieces: PatternPiece[] = [
      {
        id: '1',
        name: '前片',
        points: [
          { x: 100, y: 100, type: 'corner' },
          { x: 300, y: 100, type: 'corner' },
          { x: 320, y: 200, type: 'curve' },
          { x: 300, y: 400, type: 'corner' },
          { x: 100, y: 400, type: 'corner' },
          { x: 80, y: 200, type: 'curve' }
        ],
        visible: true,
        color: '#1890ff',
        fabric: '纯棉',
        grainline: {
          start: { x: 200, y: 120, type: 'corner' },
          end: { x: 200, y: 380, type: 'corner' }
        }
      },
      {
        id: '2',
        name: '后片',
        points: [
          { x: 400, y: 100, type: 'corner' },
          { x: 600, y: 100, type: 'corner' },
          { x: 620, y: 200, type: 'curve' },
          { x: 600, y: 400, type: 'corner' },
          { x: 400, y: 400, type: 'corner' },
          { x: 380, y: 200, type: 'curve' }
        ],
        visible: true,
        color: '#52c41a',
        fabric: '纯棉',
        grainline: {
          start: { x: 500, y: 120, type: 'corner' },
          end: { x: 500, y: 380, type: 'corner' }
        }
      }
    ]

    setPieces(samplePieces)
    drawCanvas(ctx, samplePieces)
  }, [])

  // 绘制画布
  const drawCanvas = (ctx: CanvasRenderingContext2D, piecesToDraw: PatternPiece[]) => {
    // 清空画布
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    // 绘制网格
    if (gridVisible) {
      drawGrid(ctx)
    }

    // 绘制版型片
    piecesToDraw.forEach(piece => {
      if (piece.visible) {
        drawPatternPiece(ctx, piece)
      }
    })
  }

  // 绘制网格
  const drawGrid = (ctx: CanvasRenderingContext2D) => {
    const gridSize = 20
    ctx.strokeStyle = '#f0f0f0'
    ctx.lineWidth = 1

    for (let x = 0; x <= ctx.canvas.width; x += gridSize) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, ctx.canvas.height)
      ctx.stroke()
    }

    for (let y = 0; y <= ctx.canvas.height; y += gridSize) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(ctx.canvas.width, y)
      ctx.stroke()
    }
  }

  // 绘制版型片
  const drawPatternPiece = (ctx: CanvasRenderingContext2D, piece: PatternPiece) => {
    if (piece.points.length < 3) return

    // 绘制版型轮廓
    ctx.beginPath()
    ctx.moveTo(piece.points[0].x, piece.points[0].y)
    
    for (let i = 1; i < piece.points.length; i++) {
      const point = piece.points[i]
      if (point.type === 'curve') {
        // 简化的曲线绘制
        const prevPoint = piece.points[i - 1]
        const nextPoint = piece.points[(i + 1) % piece.points.length]
        ctx.quadraticCurveTo(point.x, point.y, nextPoint.x, nextPoint.y)
        i++ // 跳过下一个点，因为已经作为曲线终点使用
      } else {
        ctx.lineTo(point.x, point.y)
      }
    }
    
    ctx.closePath()
    
    // 填充
    ctx.fillStyle = piece.color + '20'
    ctx.fill()
    
    // 描边
    ctx.strokeStyle = piece.color
    ctx.lineWidth = 2
    ctx.stroke()

    // 绘制控制点
    piece.points.forEach((point, index) => {
      ctx.beginPath()
      ctx.arc(point.x, point.y, 4, 0, 2 * Math.PI)
      ctx.fillStyle = selectedPiece === piece.id && selectedPoint === index ? '#ff4d4f' : piece.color
      ctx.fill()
      ctx.strokeStyle = '#fff'
      ctx.lineWidth = 1
      ctx.stroke()
    })

    // 绘制纱向线
    ctx.beginPath()
    ctx.moveTo(piece.grainline.start.x, piece.grainline.start.y)
    ctx.lineTo(piece.grainline.end.x, piece.grainline.end.y)
    ctx.strokeStyle = '#722ed1'
    ctx.lineWidth = 2
    ctx.setLineDash([5, 5])
    ctx.stroke()
    ctx.setLineDash([])

    // 绘制版型片名称
    const centerX = piece.points.reduce((sum, p) => sum + p.x, 0) / piece.points.length
    const centerY = piece.points.reduce((sum, p) => sum + p.y, 0) / piece.points.length
    ctx.fillStyle = '#000'
    ctx.font = '14px Arial'
    ctx.textAlign = 'center'
    ctx.fillText(piece.name, centerX, centerY)
  }

  // 处理画布点击
  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    // 检查是否点击了控制点
    for (const piece of pieces) {
      if (!piece.visible) continue
      
      for (let i = 0; i < piece.points.length; i++) {
        const point = piece.points[i]
        const distance = Math.sqrt((x - point.x) ** 2 + (y - point.y) ** 2)
        
        if (distance <= 8) {
          setSelectedPiece(piece.id)
          setSelectedPoint(i)
          return
        }
      }
    }

    // 清除选择
    setSelectedPiece(null)
    setSelectedPoint(null)
  }

  // 自动优化版型
  const handleAutoOptimize = () => {
    setIsOptimizing(true)
    setOptimizationProgress(0)

    const interval = setInterval(() => {
      setOptimizationProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsOptimizing(false)
          message.success('版型优化完成！')
          return 100
        }
        return prev + 10
      })
    }, 300)
  }

  // 重绘画布
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    drawCanvas(ctx, pieces)
  }, [pieces, gridVisible, selectedPiece, selectedPoint])

  return (
    <div className="pattern-editor" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* 工具栏 */}
      <Card className="industrial-card" size="small" style={{ marginBottom: '16px' }}>
        <Row justify="space-between" align="middle">
          <Col>
            <Space>
              <Button icon={<SaveOutlined />} type="primary">
                保存
              </Button>
              <Button icon={<UndoOutlined />} disabled={historyIndex <= 0}>
                撤销
              </Button>
              <Button icon={<RedoOutlined />} disabled={historyIndex >= history.length - 1}>
                重做
              </Button>
              <Divider type="vertical" />
              <Button icon={<ZoomInOutlined />} onClick={() => setZoom(prev => Math.min(prev + 10, 200))}>
                放大
              </Button>
              <Button icon={<ZoomOutOutlined />} onClick={() => setZoom(prev => Math.max(prev - 10, 50))}>
                缩小
              </Button>
              <span style={{ color: 'var(--text-secondary)', marginLeft: '8px' }}>{zoom}%</span>
            </Space>
          </Col>
          <Col>
            <Space>
              <Button icon={<ThunderboltOutlined />} onClick={handleAutoOptimize} loading={isOptimizing}>
                智能优化
              </Button>
              <Button icon={<FullscreenOutlined />}>
                全屏
              </Button>
            </Space>
          </Col>
        </Row>
      </Card>

      <Row gutter={16} style={{ flex: 1 }}>
        {/* 左侧工具面板 */}
        <Col span={6}>
          <Card className="industrial-card" style={{ height: '100%' }}>
            <Tabs activeKey={activeTab} onChange={setActiveTab} size="small">
              <TabPane tab="编辑" key="edit">
                <div style={{ marginBottom: '16px' }}>
                  <h4 style={{ color: 'var(--text-primary)', marginBottom: '8px' }}>版型片</h4>
                  {pieces.map(piece => (
                    <div key={piece.id} style={{ 
                      padding: '8px', 
                      marginBottom: '4px',
                      background: selectedPiece === piece.id ? 'var(--primary-color)20' : 'transparent',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }} onClick={() => setSelectedPiece(piece.id)}>
                      <Space>
                        <div style={{ 
                          width: '12px', 
                          height: '12px', 
                          background: piece.color, 
                          borderRadius: '2px' 
                        }} />
                        <span style={{ color: 'var(--text-primary)' }}>{piece.name}</span>
                        <Button 
                          type="text" 
                          size="small" 
                          icon={piece.visible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                          onClick={(e) => {
                            e.stopPropagation()
                            setPieces(prev => prev.map(p => 
                              p.id === piece.id ? { ...p, visible: !p.visible } : p
                            ))
                          }}
                        />
                      </Space>
                    </div>
                  ))}
                </div>

                <Divider />

                <div style={{ marginBottom: '16px' }}>
                  <h4 style={{ color: 'var(--text-primary)', marginBottom: '8px' }}>显示选项</h4>
                  <Space direction="vertical" style={{ width: '100%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>显示网格</span>
                      <Switch checked={gridVisible} onChange={setGridVisible} size="small" />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>吸附网格</span>
                      <Switch checked={snapToGrid} onChange={setSnapToGrid} size="small" />
                    </div>
                  </Space>
                </div>
              </TabPane>

              <TabPane tab="尺寸" key="measurements">
                <Form layout="vertical" size="small">
                  <Form.Item label="胸围 (cm)">
                    <InputNumber 
                      value={measurements.chest} 
                      onChange={(value) => setMeasurements(prev => ({ ...prev, chest: value || 0 }))}
                      style={{ width: '100%' }}
                      min={60}
                      max={150}
                    />
                  </Form.Item>
                  <Form.Item label="腰围 (cm)">
                    <InputNumber 
                      value={measurements.waist} 
                      onChange={(value) => setMeasurements(prev => ({ ...prev, waist: value || 0 }))}
                      style={{ width: '100%' }}
                      min={50}
                      max={120}
                    />
                  </Form.Item>
                  <Form.Item label="臀围 (cm)">
                    <InputNumber 
                      value={measurements.hip} 
                      onChange={(value) => setMeasurements(prev => ({ ...prev, hip: value || 0 }))}
                      style={{ width: '100%' }}
                      min={70}
                      max={150}
                    />
                  </Form.Item>
                  <Form.Item label="肩宽 (cm)">
                    <InputNumber 
                      value={measurements.shoulderWidth} 
                      onChange={(value) => setMeasurements(prev => ({ ...prev, shoulderWidth: value || 0 }))}
                      style={{ width: '100%' }}
                      min={30}
                      max={60}
                    />
                  </Form.Item>
                  <Form.Item label="袖长 (cm)">
                    <InputNumber 
                      value={measurements.armLength} 
                      onChange={(value) => setMeasurements(prev => ({ ...prev, armLength: value || 0 }))}
                      style={{ width: '100%' }}
                      min={40}
                      max={80}
                    />
                  </Form.Item>
                  <Form.Item label="衣长 (cm)">
                    <InputNumber 
                      value={measurements.bodyLength} 
                      onChange={(value) => setMeasurements(prev => ({ ...prev, bodyLength: value || 0 }))}
                      style={{ width: '100%' }}
                      min={40}
                      max={100}
                    />
                  </Form.Item>
                  <Button type="primary" size="small" block>
                    应用尺寸
                  </Button>
                </Form>
              </TabPane>

              <TabPane tab="属性" key="properties">
                {selectedPiece && (
                  <div>
                    <h4 style={{ color: 'var(--text-primary)', marginBottom: '8px' }}>版型片属性</h4>
                    <Form layout="vertical" size="small">
                      <Form.Item label="名称">
                        <Input 
                          value={pieces.find(p => p.id === selectedPiece)?.name}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setPieces(prev => prev.map(p => 
                              p.id === selectedPiece ? { ...p, name: e.target.value } : p
                            ))
                          }}
                        />
                      </Form.Item>
                      <Form.Item label="颜色">
                        <input 
                          type="color" 
                          value={pieces.find(p => p.id === selectedPiece)?.color}
                          onChange={(e) => {
                            setPieces(prev => prev.map(p => 
                              p.id === selectedPiece ? { ...p, color: e.target.value } : p
                            ))
                          }}
                          style={{ width: '100%', height: '32px', border: '1px solid var(--border-color)', borderRadius: '4px' }}
                        />
                      </Form.Item>
                      <Form.Item label="面料">
                        <Select 
                          value={pieces.find(p => p.id === selectedPiece)?.fabric}
                          onChange={(value) => {
                            setPieces(prev => prev.map(p => 
                              p.id === selectedPiece ? { ...p, fabric: value } : p
                            ))
                          }}
                          style={{ width: '100%' }}
                        >
                          <Option value="纯棉">纯棉</Option>
                          <Option value="涤纶">涤纶</Option>
                          <Option value="羊毛">羊毛</Option>
                          <Option value="丝绸">丝绸</Option>
                          <Option value="混纺">混纺</Option>
                        </Select>
                      </Form.Item>
                    </Form>
                  </div>
                )}
              </TabPane>
            </Tabs>
          </Card>
        </Col>

        {/* 中间画布区域 */}
        <Col span={12}>
          <Card className="industrial-card" style={{ height: '100%', padding: '8px' }}>
            <div style={{ 
              width: '100%', 
              height: '100%', 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center',
              background: '#fafafa',
              borderRadius: '4px',
              position: 'relative'
            }}>
              <canvas
                ref={canvasRef}
                onClick={handleCanvasClick}
                style={{
                  border: '1px solid var(--border-color)',
                  borderRadius: '4px',
                  cursor: 'crosshair',
                  transform: `scale(${zoom / 100})`,
                  transformOrigin: 'center'
                }}
              />
              
              {/* 优化进度 */}
              {isOptimizing && (
                <div style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  background: 'rgba(255, 255, 255, 0.9)',
                  padding: '12px',
                  borderRadius: '8px',
                  minWidth: '200px'
                }}>
                  <div style={{ marginBottom: '8px', color: 'var(--text-primary)' }}>智能优化中...</div>
                  <Progress percent={optimizationProgress} size="small" />
                </div>
              )}
            </div>
          </Card>
        </Col>

        {/* 右侧信息面板 */}
        <Col span={6}>
          <Card className="industrial-card" style={{ height: '100%' }}>
            <Tabs size="small">
              <TabPane tab="信息" key="info">
                <div style={{ marginBottom: '16px' }}>
                  <h4 style={{ color: 'var(--text-primary)', marginBottom: '8px' }}>版型统计</h4>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '12px', lineHeight: '20px' }}>
                    <div>版型片数量: {pieces.length}</div>
                    <div>控制点总数: {pieces.reduce((sum, p) => sum + p.points.length, 0)}</div>
                    <div>可见片数: {pieces.filter(p => p.visible).length}</div>
                  </div>
                </div>

                <Divider />

                <div style={{ marginBottom: '16px' }}>
                  <h4 style={{ color: 'var(--text-primary)', marginBottom: '8px' }}>质量检查</h4>
                  <Space direction="vertical" style={{ width: '100%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>版型完整性</span>
                      <Tag color="success">良好</Tag>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>纱向检查</span>
                      <Tag color="success">正确</Tag>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>尺寸匹配</span>
                      <Tag color="warning">需调整</Tag>
                    </div>
                  </Space>
                </div>
              </TabPane>

              <TabPane tab="历史" key="history">
                <div style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '20px' }}>
                  操作历史记录
                </div>
              </TabPane>
            </Tabs>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default PatternEditor