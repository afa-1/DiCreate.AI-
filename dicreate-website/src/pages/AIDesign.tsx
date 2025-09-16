import React, { useState } from 'react'
import {
  Row,
  Col,
  Card,
  Button,
  Upload,
  Select,
  Slider,
  ColorPicker,
  Tabs,
  Space,
  Divider,
  message,
  Modal,
  Form,
  Input,
  Radio,
  Switch,
  Tooltip,
  Progress,
  Tag,
  Drawer,
  List,
  Avatar,
  Badge,
  Tree,
  Collapse,
  InputNumber,
  Segmented,
  Timeline,
  Popover,
  Dropdown,
  Menu
} from 'antd'
import {
  UploadOutlined,
  EyeOutlined,
  DownloadOutlined,
  SaveOutlined,
  UndoOutlined,
  RedoOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
  RotateLeftOutlined,
  RotateRightOutlined,
  FullscreenOutlined,
  SettingOutlined,
  PlusOutlined,
  DeleteOutlined,
  CopyOutlined,
  FormatPainterOutlined,
  ScissorOutlined,
  ThunderboltOutlined,
  RobotOutlined,
  HistoryOutlined,
  BarsOutlined,
  CompressOutlined,
  ExpandOutlined,
  PlayCircleOutlined,
  PauseCircleOutlined,
  ReloadOutlined,
  ExportOutlined,
  ImportOutlined,
  CloudUploadOutlined,
  CloudDownloadOutlined,
  TeamOutlined,
  LockOutlined,
  UnlockOutlined,
  EyeInvisibleOutlined,
  BorderOutlined,
  DragOutlined,
  SelectOutlined,
  HighlightOutlined,
  SkinOutlined,
  BuildOutlined,
  ExperimentOutlined,
  FunctionOutlined,
  ApiOutlined,
  DatabaseOutlined,
  LineChartOutlined,
  BarChartOutlined,
  DotChartOutlined,
  ShoppingCartOutlined,
  ToolOutlined,
  FileImageOutlined,
  FontSizeOutlined,
  BgColorsOutlined as FabricOutlined,
  AppstoreOutlined,
  BlockOutlined,
  LeftOutlined,
  RightOutlined
} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '../store'
import { getImagePath, IMAGES } from '../utils/assets'


const { TabPane } = Tabs
const { Option } = Select
const { TextArea } = Input
const { Panel } = Collapse

const AIDesign: React.FC = () => {
  const navigate = useNavigate()
  const { user } = useUserStore()
  
  // 状态管理
  const [activeModule, setActiveModule] = useState('product')
  const [selectedColor, setSelectedColor] = useState('#1a1a2e')
  const [selectedSize, setSelectedSize] = useState('M')
  const [activeTab, setActiveTab] = useState('badge')
  const [realtimeRender, setRealtimeRender] = useState(true)
  const [selectedPreview, setSelectedPreview] = useState('effect2')
  const [leftDrawerOpen, setLeftDrawerOpen] = useState(true)
  const [rightDrawerOpen, setRightDrawerOpen] = useState(true)
  const [selectedModel, setSelectedModel] = useState('model1')
  const [show2DModal, setShow2DModal] = useState(false)
  const [show3DModal, setShow3DModal] = useState(false)
  const [selectedComponent, setSelectedComponent] = useState('')
  const [componentThumbnails, setComponentThumbnails] = useState<string[]>([])
  const [selectedComponentImage, setSelectedComponentImage] = useState('')
  const [currentProductName, setCurrentProductName] = useState('学位服定制款')
  const [showMallModal, setShowMallModal] = useState(false)
  const [showSwitchConfirm, setShowSwitchConfirm] = useState(false)
  const [selectedNewProduct, setSelectedNewProduct] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedFabric, setSelectedFabric] = useState('')
  const [fabricThumbnails] = useState(['fabric2.png', 'fabric_04.png', 'fabric_05.png', 'fabric_12.png'])
  const [showPriceModal, setShowPriceModal] = useState(false)
  const [totalPrice, setTotalPrice] = useState(279)

  
  // 功能模块
  const modules = [
    { key: 'product', label: '产品', icon: <SkinOutlined /> },
    { key: 'parts', label: '部件', icon: <BlockOutlined /> },
    { key: 'fabric', label: '面料', icon: <FabricOutlined /> },
    { key: 'text', label: '文字', icon: <FontSizeOutlined /> },
    { key: 'image', label: '图像', icon: <FileImageOutlined /> }
  ]
  
  // 颜色选项
  const colorOptions = [
    { name: '黑色', value: '#000000' },
    { name: '深灰', value: '#4a4a4a' },
    { name: '中灰', value: '#808080' },
    { name: '浅灰', value: '#c0c0c0' },
    { name: '白色', value: '#ffffff' },
    { name: '深蓝', value: '#1a365d' },
    { name: '蓝色', value: '#2563eb' },
    { name: '红色', value: '#dc2626' }
  ]
  
  // 尺寸选项
  const sizeOptions = ['S', 'M', 'L', 'XL', '2XL', '3XL']
  
  // 学位服部位选项卡
  const partTabs = [
    { key: 'badge', label: '校徽' },
    { key: 'hood', label: '帽兜' },
    { key: 'tassel', label: '帽穗' },
    { key: 'front', label: '门襟' },
    { key: 'cuff', label: '袖口' },
    { key: 'pattern', label: '纹样' }
  ]
  
  // 预览效果图
  const previewImages = [
    { key: 'effect1', label: '效果图 1' },
    { key: 'effect2', label: '效果图 2' },
    { key: 'effect3', label: '效果图 3' },
    { key: 'effect4', label: '效果图 4' }
  ]

  // 模特选项
  const modelOptions = [
    { key: 'model1', label: '亚洲男性', avatar: '👨🏻' },
    { key: 'model2', label: '亚洲女性', avatar: '👩🏻' },
    { key: 'model3', label: '欧美男性', avatar: '👨🏼' },
    { key: 'model4', label: '欧美女性', avatar: '👩🏼' },
    { key: 'model5', label: '非洲男性', avatar: '👨🏿' },
    { key: 'model6', label: '非洲女性', avatar: '👩🏿' }
  ]

  // 部件图片映射
  const componentImageMap = {
    'xiaohui': ['logo.png', 'logo (1).png', 'logo (2).png', 'logo (3).png', 'logo (4).png'],
    'maodou': ['hat_1.jpg', 'tassel.jpg', 'tassel (1).jpg', 'tassel (2).jpg'],
    'maosui': ['tassel.png', 'tassel (1).png', 'tassel (2).png', 'tassel_7.png'],
    'menjin': ['placket_8.png', 'tassel.png', 'tassel (1).png', 'tassel (2).png'],
    'xiukou': ['cuff_1.jpg', 'tassel.jpg', 'tassel (1).jpg'],
    'wenyang': ['floatTexture_5.png', 'floatTexture_6.png', 'floatTexture_7.png', 'floatTexture_8.png', 'shadingTexture_5.png', 'shadingTexture_6.png', 'shadingTexture_7.png', 'shadingTexture_8.png']
  }

  // 部件点击处理函数
  const handleComponentClick = (componentType: string) => {
    const folderMap: { [key: string]: string } = {
      'badge': 'xiaohui',
      'hood': 'maodou', 
      'tassel': 'maosui',
      'front': 'menjin',
      'cuff': 'xiukou',
      'pattern': 'wenyang'
    }
    
    const folder = folderMap[componentType]
    if (folder && componentImageMap[folder as keyof typeof componentImageMap]) {
      setSelectedComponent(componentType)
      setActiveTab(componentType)
      setComponentThumbnails(componentImageMap[folder as keyof typeof componentImageMap])
      setActiveModule('parts')
      setLeftDrawerOpen(true)
    }
  }
  
  return (
    <div style={{ height: '100vh', background: '#ffffff', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {/* 顶部标题栏 - 覆盖整个页面宽度 */}
      <div style={{
        height: '60px',
        background: '#ffffff',
        borderBottom: '1px solid #e5e7eb',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px',
        zIndex: 1002
      }}>
        {/* 当前服装名称 */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <div 
            style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#1f2937',
              cursor: 'pointer',
              padding: '8px 12px',
              borderRadius: '6px',
              transition: 'all 0.2s ease'
            }}
            onClick={() => setShowMallModal(true)}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#f3f4f6'
              e.currentTarget.style.color = '#2563eb'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = '#1f2937'
            }}
          >
            {currentProductName}
          </div>
          {/* 放大镜图标 */}
          <div 
            style={{
              cursor: 'pointer',
              padding: '6px',
              borderRadius: '4px',
              transition: 'all 0.2s ease',
              color: '#6b7280'
            }}
            onClick={() => setShowMallModal(true)}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#f3f4f6'
              e.currentTarget.style.color = '#2563eb'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = '#6b7280'
            }}
          >
            <ZoomInOutlined style={{ fontSize: '16px' }} />
          </div>
        </div>
        
        {/* 操作按钮组 */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button 
            type="default" 
            icon={<UndoOutlined />}
            onClick={() => message.info('撤销功能')}
          >
            撤销
          </Button>
          <Button 
            type="default" 
            icon={<RedoOutlined />}
            onClick={() => message.info('重做功能')}
          >
            重做
          </Button>
          <Button 
            type="primary" 
            icon={<SaveOutlined />}
            onClick={() => message.success('保存成功')}
          >
            保存
          </Button>
        </div>
      </div>
      
      {/* 主要内容区域 */}
      <div style={{ flex: 1, display: 'flex', position: 'relative', paddingBottom: '80px' }}>
      {/* 左侧功能导航栏 */}
      <div style={{
        width: '60px',
        background: '#ffffff',
        borderRight: '1px solid #e5e7eb',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '16px 0',
        gap: '6px',
        position: 'relative'
      }}>
        {/* 左侧抽屉控制按钮 */}
        <Button
          type="text"
          icon={leftDrawerOpen ? <LeftOutlined /> : <RightOutlined />}
          onClick={() => setLeftDrawerOpen(!leftDrawerOpen)}
          style={{
            position: 'absolute',
            right: '-12px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: '#fff',
            border: '1px solid #d1d5db',
            borderRadius: '4px',
            width: '24px',
            height: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            zIndex: 1001
          }}
        />
        {[
           { key: 'product', icon: <SkinOutlined />, label: '产品' },
           { key: 'parts', icon: <BlockOutlined />, label: '部件' },
           { key: 'fabric', icon: <FabricOutlined />, label: '面料' },
           { key: 'text', icon: <FontSizeOutlined />, label: '文字' },
           { key: 'image', icon: <FileImageOutlined />, label: '图像' }
         ].map(module => (
          <div key={module.key} style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
            padding: '8px',
            cursor: 'pointer',
            borderRadius: '6px',
            background: activeModule === module.key ? '#f0f9ff' : 'transparent',
            border: activeModule === module.key ? '1px solid #0ea5e9' : '1px solid transparent',
            width: '48px'
          }} onClick={() => {
            setActiveModule(module.key)
            setLeftDrawerOpen(true)
          }}>
            <div style={{
              fontSize: '18px',
              color: activeModule === module.key ? '#0ea5e9' : '#6b7280'
            }}>
              {module.icon}
            </div>
            <span style={{
              fontSize: '9px',
              color: activeModule === module.key ? '#0ea5e9' : '#6b7280',
              textAlign: 'center',
              lineHeight: '10px'
            }}>
              {module.label}
            </span>
          </div>
        ))}
      </div>
      
      {/* 左侧抽屉 */}
      <Drawer
        title={{
           'product': '产品',
           'parts': '部件',
           'fabric': '面料',
           'text': '文字',
           'image': '图像'
         }[activeModule] || '产品'}
        placement="left"
        onClose={() => setLeftDrawerOpen(false)}
        open={leftDrawerOpen}
        mask={false}
        closable={false}
        getContainer={false}
        rootStyle={{ position: 'absolute', zIndex: 1000, left: '60px' }}
        width={280}
        styles={{
          body: { padding: '20px 16px' },
          header: { 
            borderBottom: '1px solid #e5e7eb',
            position: 'relative'
          }
        }}
        extra={null}
      >
        {/* 产品模块详细设置 */}
        {activeModule === 'product' && (
          <div style={{ overflow: 'auto' }}>
            {/* 颜色选择 */}
            <div style={{ marginBottom: '24px' }}>
              <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                颜色
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                {colorOptions.map(color => (
                  <div
                    key={color.value}
                    style={{
                      width: '40px',
                      height: '40px',
                      background: color.value,
                      border: selectedColor === color.value ? '3px solid #2563eb' : '1px solid #d1d5db',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    onClick={() => setSelectedColor(color.value)}
                  >
                    {color.value === '#ffffff' && (
                      <div style={{ width: '24px', height: '24px', border: '1px solid #d1d5db', borderRadius: '3px' }} />
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            {/* 尺寸选择 */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <h4 style={{ margin: 0, fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                  大小
                </h4>
                <Button type="link" size="small" style={{ padding: 0, fontSize: '12px' }}>
                  Size guide 尺码指南
                </Button>
              </div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {sizeOptions.map(size => (
                  <Button
                    key={size}
                    type={selectedSize === size ? 'primary' : 'default'}
                    size="small"
                    onClick={() => setSelectedSize(size)}
                    style={{ minWidth: '40px' }}
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {/* 部件模块内容 */}
        {activeModule === 'parts' && (
          <div style={{ padding: '16px' }}>
            {selectedComponent && componentThumbnails.length > 0 ? (
              <div>
                <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                  {partTabs.find(tab => tab.key === selectedComponent)?.label}部件选择
                </h4>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '8px',
                  maxHeight: '400px',
                  overflowY: 'auto'
                }}>
                  {componentThumbnails.map((imageName, index) => {
                    const folderMap: { [key: string]: string } = {
                      'badge': 'xiaohui',
                      'hood': 'maodou', 
                      'tassel': 'maosui',
                      'front': 'menjin',
                      'cuff': 'xiukou',
                      'pattern': 'wenyang'
                    }
                    const folder = folderMap[selectedComponent]
                    const imagePath = getImagePath(imageName, folder)
                    return (
                      <div
                        key={index}
                        style={{
                          width: '100%',
                          height: '80px',
                          background: '#f9fafb',
                          borderRadius: '6px',
                          border: '1px solid #d1d5db',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          position: 'relative',
                          overflow: 'hidden'
                        }}
                        onClick={() => {
                          setSelectedComponentImage(imagePath)
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'scale(1.02)'
                          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'scale(1)'
                          e.currentTarget.style.boxShadow = 'none'
                        }}
                      >
                        <img 
                          src={imagePath}
                          alt={imageName}
                          style={{
                            maxWidth: '90%',
                            maxHeight: '90%',
                            objectFit: 'contain'
                          }}
                          onError={(e) => {
                            e.currentTarget.style.display = 'none'
                            const placeholder = document.createElement('div')
                            placeholder.style.cssText = 'width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-size: 10px; color: #9ca3af; text-align: center;'
                            placeholder.textContent = '图片加载失败'
                            e.currentTarget.parentNode?.appendChild(placeholder)
                          }}
                        />
                      </div>
                    )
                  })}
                </div>
              </div>
            ) : (
              <div style={{ textAlign: 'center', color: '#6b7280', padding: '40px 20px' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>
                  <BlockOutlined />
                </div>
                <div style={{ fontSize: '14px', marginBottom: '8px' }}>
                  部件选择
                </div>
                <div style={{ fontSize: '12px' }}>
                  请点击中间区域的部件来查看可选样式
                </div>
              </div>
            )}
          </div>
        )}
        
        {/* 面料模块内容 */}
        {activeModule === 'fabric' && (
          <div style={{ padding: '16px' }}>
            <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
              面料选择
            </h4>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '8px',
              maxHeight: '400px',
              overflowY: 'auto'
            }}>
              {fabricThumbnails.map((fabricName, index) => {
                const imagePath = getImagePath(fabricName, 'mianliao')
                return (
                  <div
                    key={index}
                    style={{
                      width: '100%',
                      height: '80px',
                      background: '#f9fafb',
                      borderRadius: '6px',
                      border: selectedFabric === fabricName ? '2px solid #2563eb' : '1px solid #d1d5db',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                    onClick={() => {
                      setSelectedFabric(fabricName)
                      message.success(`已选择面料: ${fabricName}`)
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.02)'
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  >
                    <img 
                      src={imagePath}
                      alt={fabricName}
                      style={{
                        maxWidth: '90%',
                        maxHeight: '90%',
                        objectFit: 'cover'
                      }}
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                        const placeholder = document.createElement('div')
                        placeholder.style.cssText = 'width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-size: 10px; color: #9ca3af; text-align: center;'
                        placeholder.textContent = '图片加载失败'
                        e.currentTarget.parentNode?.appendChild(placeholder)
                      }}
                    />
                    {selectedFabric === fabricName && (
                      <div style={{
                        position: 'absolute',
                        top: '4px',
                        right: '4px',
                        width: '16px',
                        height: '16px',
                        background: '#2563eb',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <div style={{ width: '8px', height: '8px', background: 'white', borderRadius: '50%' }} />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}
        
        {/* 其他模块的占位内容 */}
        {activeModule !== 'product' && activeModule !== 'parts' && activeModule !== 'fabric' && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '300px' }}>
            <div style={{ textAlign: 'center', color: '#6b7280' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>
                {modules.find(m => m.key === activeModule)?.icon}
              </div>
              <div style={{ fontSize: '14px' }}>
                {modules.find(m => m.key === activeModule)?.label}模块
              </div>
              <div style={{ fontSize: '12px', marginTop: '8px' }}>
                功能开发中...
              </div>
            </div>
          </div>
        )}
      </Drawer>
      
      {/* 中间产品预览和设计操作区 */}
      <div style={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        background: '#ffffff',
        marginLeft: leftDrawerOpen ? '340px' : '60px',
        marginRight: rightDrawerOpen ? '280px' : '0px',
        transition: 'margin 0.3s ease'
      }}>

        {/* 部位选项卡 */}
        <div style={{ borderBottom: '1px solid #e5e7eb' }}>
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            items={partTabs.map(tab => ({
              key: tab.key,
              label: tab.label
            }))}
            style={{ padding: '0 20px' }}
          />
        </div>
        
        {/* 学位服预览区域 */}
        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#f9fafb',
          position: 'relative'
        }}>
          {/* 网格背景 */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(circle, #e5e7eb 1px, transparent 1px)',
            backgroundSize: '20px 20px',
            opacity: 0.3
          }} />
          
          {/* 学位服模型 */}
          <div style={{
            width: '320px',
            height: '400px',
            background: selectedColor,
            borderRadius: '12px 12px 0 0',
            position: 'relative',
            border: '2px solid #d1d5db',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
          }}>
            {/* 学位帽 - 帽兜点击区域 */}
            <div 
              style={{
                position: 'absolute',
                top: '-20px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '200px',
                height: '40px',
                background: '#1f2937',
                borderRadius: '20px',
                border: '2px solid #374151',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onClick={() => handleComponentClick('hood')}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateX(-50%) scale(1.05)'
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(31, 41, 55, 0.3)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateX(-50%) scale(1)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            />
            
            {/* 帽穗点击区域 */}
            <div 
              style={{
                position: 'absolute',
                top: '-15px',
                right: '40px',
                width: '20px',
                height: '60px',
                cursor: 'pointer',
                zIndex: 10
              }}
              onClick={() => handleComponentClick('tassel')}
            >
              <div style={{
                width: '3px',
                height: '50px',
                background: '#fbbf24',
                borderRadius: '2px',
                margin: '0 auto'
              }} />
              <div style={{
                width: '8px',
                height: '8px',
                background: '#fbbf24',
                borderRadius: '50%',
                margin: '2px auto'
              }} />
            </div>
            
            {/* 校徽区域 - 始终显示并可点击 */}
            <div 
              style={{
                position: 'absolute',
                top: '60px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '80px',
                height: '80px',
                background: activeTab === 'badge' ? '#ffffff' : 'rgba(255,255,255,0.8)',
                borderRadius: '50%',
                border: activeTab === 'badge' ? '3px solid #2563eb' : '2px solid #9ca3af',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                fontWeight: 'bold',
                color: activeTab === 'badge' ? '#2563eb' : '#6b7280',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onClick={() => handleComponentClick('badge')}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateX(-50%) scale(1.1)'
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(37, 99, 235, 0.2)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateX(-50%) scale(1)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              校徽
            </div>
            
            {/* 门襟装饰 - 始终显示并可点击 */}
            <div 
              style={{
                position: 'absolute',
                top: '120px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '60px',
                height: '200px',
                background: activeTab === 'front' ? '#fbbf24' : 'rgba(251, 191, 36, 0.6)',
                borderRadius: '30px',
                border: activeTab === 'front' ? '2px solid #f59e0b' : '2px solid #d1d5db',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onClick={() => handleComponentClick('front')}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateX(-50%) scale(1.05)'
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(245, 158, 11, 0.3)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateX(-50%) scale(1)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            />
            
            {/* 袖口装饰 - 始终显示并可点击 */}
            <div 
              style={{
                position: 'absolute',
                top: '180px',
                left: '20px',
                width: '40px',
                height: '20px',
                background: activeTab === 'cuff' ? '#ef4444' : 'rgba(239, 68, 68, 0.6)',
                borderRadius: '10px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onClick={() => handleComponentClick('cuff')}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)'
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(239, 68, 68, 0.3)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            />
            <div 
              style={{
                position: 'absolute',
                top: '180px',
                right: '20px',
                width: '40px',
                height: '20px',
                background: activeTab === 'cuff' ? '#ef4444' : 'rgba(239, 68, 68, 0.6)',
                borderRadius: '10px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onClick={() => handleComponentClick('cuff')}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)'
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(239, 68, 68, 0.3)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            />
            
            {/* 纹样装饰 - 始终显示并可点击 */}
            <div 
              style={{
                position: 'absolute',
                bottom: '40px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '240px',
                height: '40px',
                background: activeTab === 'pattern' ? 'linear-gradient(90deg, #8b5cf6, #a855f7, #c084fc)' : 'linear-gradient(90deg, rgba(139, 92, 246, 0.6), rgba(168, 85, 247, 0.6), rgba(192, 132, 252, 0.6))',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '12px',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onClick={() => handleComponentClick('pattern')}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateX(-50%) scale(1.05)'
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(139, 92, 246, 0.3)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateX(-50%) scale(1)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              装饰纹样
            </div>
          </div>
          
          {/* 选中部件预览区域 */}
          {selectedComponentImage && (
            <div style={{
              position: 'absolute',
              bottom: '80px',
              left: '20px',
              width: '200px',
              height: '150px',
              background: '#ffffff',
              borderRadius: '8px',
              border: '2px solid #2563eb',
              boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
              padding: '12px',
              display: 'flex',
              flexDirection: 'column',
              zIndex: 20
            }}>
              <div style={{
                fontSize: '12px',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '8px',
                textAlign: 'center'
              }}>
                {partTabs.find(tab => tab.key === selectedComponent)?.label}预览
              </div>
              <div style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#f9fafb',
                borderRadius: '4px',
                overflow: 'hidden'
              }}>
                <img 
                  src={selectedComponentImage}
                  alt="部件预览"
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'contain'
                  }}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                    const placeholder = document.createElement('div')
                    placeholder.style.cssText = 'width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-size: 12px; color: #9ca3af;'
                    placeholder.textContent = '图片加载失败'
                    e.currentTarget.parentNode?.appendChild(placeholder)
                  }}
                />
              </div>
              <Button 
                type="text" 
                size="small"
                style={{ 
                  position: 'absolute',
                  top: '4px',
                  right: '4px',
                  width: '20px',
                  height: '20px',
                  padding: 0,
                  fontSize: '12px'
                }}
                onClick={() => setSelectedComponentImage('')}
              >
                ×
              </Button>
            </div>
          )}
          
          {/* 操作工具栏 */}
          <div style={{
            position: 'absolute',
            bottom: '20px',
            right: '20px',
            display: 'flex',
            gap: '8px'
          }}>
            <Button type="text" icon={<ZoomInOutlined />} style={{ background: 'rgba(255,255,255,0.9)' }} />
            <Button type="text" icon={<ZoomOutOutlined />} style={{ background: 'rgba(255,255,255,0.9)' }} />
            <Button type="text" icon={<RotateLeftOutlined />} style={{ background: 'rgba(255,255,255,0.9)' }} />
            <Button type="text" icon={<FullscreenOutlined />} style={{ background: 'rgba(255,255,255,0.9)' }} />
          </div>
        </div>
      </div>
      
      {/* 右侧预览抽屉 */}
      <Drawer
        title="预览与效果"
        placement="right"
        onClose={() => setRightDrawerOpen(false)}
        open={rightDrawerOpen}
        mask={false}
        closable={false}
        getContainer={false}
        rootStyle={{ position: 'absolute', zIndex: 1000 }}
        width={280}
        styles={{
          body: { padding: '0' },
          header: { borderBottom: '1px solid #e5e7eb' }
        }}
        extra={
           <Button
             type="text"
             icon={<RightOutlined />}
             size="small"
             onClick={() => setRightDrawerOpen(false)}
             style={{
               background: '#fff',
               border: '1px solid #d1d5db',
               borderRadius: '4px',
               width: '24px',
               height: '24px',
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'center',
               boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
             }}
           />
         }
      >
        <div style={{
           display: 'flex',
           flexDirection: 'column',
           height: '100%'
         }}>

        

        
        {/* 学位服实时渲染预览 */}
        <div style={{ padding: '16px', borderBottom: '1px solid #e5e7eb', height: '60%' }}>

          <h4 style={{ margin: '0 0 16px 0', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
            学位服实时渲染预览
          </h4>
          
          {/* 主预览图 */}
          <div style={{
            width: '100%',
            height: '320px',
            background: '#f9fafb',
            borderRadius: '8px',
            border: '1px solid #d1d5db',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '16px',
            position: 'relative'
          }}>
            {/* 学位服轮廓 */}
            <div style={{
              width: '160px',
              height: '280px',
              background: selectedColor,
              borderRadius: '12px 12px 0 0',
              position: 'relative',
              border: '2px solid #9ca3af',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {/* 学位帽 */}
              <div style={{
                position: 'absolute',
                top: '-25px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '120px',
                height: '20px',
                background: '#1f2937',
                borderRadius: '60px',
                border: '2px solid #374151'
              }} />
              
              {/* 帽顶 */}
              <div style={{
                position: 'absolute',
                top: '-35px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '80px',
                height: '15px',
                background: '#1f2937',
                borderRadius: '40px',
                border: '2px solid #374151'
              }} />
              
              {/* 流苏 */}
              <div style={{
                position: 'absolute',
                top: '-30px',
                right: '20px',
                width: '2px',
                height: '40px',
                background: '#fbbf24',
                borderRadius: '1px'
              }} />
              <div style={{
                position: 'absolute',
                top: '10px',
                right: '18px',
                width: '6px',
                height: '6px',
                background: '#fbbf24',
                borderRadius: '50%'
              }} />
              
              {/* 学位服主体装饰 */}
              <div style={{
                position: 'absolute',
                top: '40px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '100px',
                height: '60px',
                background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '8px',
                fontWeight: 'bold'
              }}>
                校徽区域
              </div>
              
              {/* 垂带 */}
              <div style={{
                position: 'absolute',
                top: '20px',
                left: '20px',
                width: '8px',
                height: '200px',
                background: '#dc2626',
                borderRadius: '4px'
              }} />
              <div style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                width: '8px',
                height: '200px',
                background: '#dc2626',
                borderRadius: '4px'
              }} />
            </div>
          </div>
          
          {/* 预览按钮组 */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
            <Button 
              type="primary" 
              block 
              icon={<EyeOutlined />}
              onClick={() => setShow2DModal(true)}
            >
              2D预览
            </Button>
            <Button 
              type="default" 
              block 
              icon={<FullscreenOutlined />}
              onClick={() => setShow3DModal(true)}
            >
              3D预览
            </Button>
          </div>
          

        </div>
        
        {/* 模特选择区域 */}
        <div style={{ height: '40%', padding: '16px', overflow: 'auto' }}>
          <h4 style={{ margin: '0 0 20px 0', fontSize: '15px', fontWeight: '600', color: '#1e293b' }}>
            模特试穿效果
          </h4>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
            {modelOptions.map(model => (
              <div
                key={model.key}
                style={{
                  width: '100%',
                  height: '140px',
                  background: selectedModel === model.key ? '#eff6ff' : '#f9fafb',
                  borderRadius: '12px',
                  border: selectedModel === model.key ? '2px solid #2563eb' : '1px solid #d1d5db',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexDirection: 'column',
                  padding: '16px',
                  position: 'relative',
                  transition: 'all 0.2s ease',
                  boxShadow: selectedModel === model.key ? '0 4px 12px rgba(37, 99, 235, 0.15)' : '0 2px 4px rgba(0,0,0,0.05)'
                }}
                onClick={() => setSelectedModel(model.key)}
              >
                {/* 模特头像 */}
                <div style={{
                  fontSize: '36px',
                  marginBottom: '8px'
                }}>
                  {model.avatar}
                </div>
                
                {/* 学位服缩略图 */}
                <div style={{
                  width: '45px',
                  height: '55px',
                  background: selectedColor,
                  borderRadius: '8px 8px 0 0',
                  border: '1px solid #9ca3af',
                  position: 'relative',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
                }}>
                  {/* 小学位帽 */}
                  <div style={{
                    position: 'absolute',
                    top: '-10px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '35px',
                    height: '8px',
                    background: '#1f2937',
                    borderRadius: '17px',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
                  }} />
                  
                  {/* 小垂带 */}
                  <div style={{
                    position: 'absolute',
                    top: '10px',
                    left: '8px',
                    width: '3px',
                    height: '35px',
                    background: '#dc2626',
                    borderRadius: '1.5px'
                  }} />
                  <div style={{
                    position: 'absolute',
                    top: '10px',
                    right: '8px',
                    width: '3px',
                    height: '35px',
                    background: '#dc2626',
                    borderRadius: '1.5px'
                  }} />
                </div>
                
                <span style={{ 
                  fontSize: '12px', 
                  color: selectedModel === model.key ? '#1d4ed8' : '#6b7280', 
                  textAlign: 'center',
                  fontWeight: selectedModel === model.key ? '600' : '500',
                  marginTop: 'auto'
                }}>
                  {model.label}
                </span>
                
                {selectedModel === model.key && (
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    width: '18px',
                    height: '18px',
                    background: '#2563eb',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 4px rgba(37, 99, 235, 0.3)'
                  }}>
                    <div style={{ width: '8px', height: '8px', background: 'white', borderRadius: '50%' }} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        </div>
      </Drawer>
      
      {/* 右侧抽屉控制按钮 */}
      {!rightDrawerOpen && (
        <Button
          type="text"
          icon={<LeftOutlined />}
          onClick={() => setRightDrawerOpen(true)}
          style={{
            position: 'fixed',
            right: '-12px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: '#fff',
            border: '1px solid #d1d5db',
            borderRadius: '4px',
            width: '24px',
            height: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            zIndex: 1001
          }}
        />
      )}
      
      {/* 2D预览弹窗 */}
      <Modal
        title={`2D预览 - ${modelOptions.find(m => m.key === selectedModel)?.label}学位服展示`}
        open={show2DModal}
        onCancel={() => setShow2DModal(false)}
        footer={[
          <Button key="close" onClick={() => setShow2DModal(false)}>
            关闭
          </Button>,
          <Button key="download" type="primary" icon={<DownloadOutlined />}>
            下载图片
          </Button>
        ]}
        width={800}
        centered
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', padding: '20px 0' }}>
          {previewImages.map(preview => (
            <div key={preview.key} style={{ textAlign: 'center' }}>
              <div style={{
                width: '100%',
                height: '300px',
                background: '#f9fafb',
                borderRadius: '8px',
                border: '1px solid #d1d5db',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '12px',
                position: 'relative'
              }}>
                {/* 模特头像 */}
                <div style={{
                  position: 'absolute',
                  top: '10px',
                  left: '10px',
                  fontSize: '24px',
                  background: 'rgba(255,255,255,0.9)',
                  borderRadius: '50%',
                  padding: '4px'
                }}>
                  {modelOptions.find(m => m.key === selectedModel)?.avatar}
                </div>
                {/* 学位服2D视图 */}
                <div style={{
                  width: '120px',
                  height: '200px',
                  background: selectedColor,
                  borderRadius: '8px 8px 0 0',
                  position: 'relative',
                  border: '2px solid #9ca3af'
                }}>
                  {/* 根据不同角度显示不同细节 */}
                  {preview.key === 'effect1' && (
                    <>
                      <div style={{
                        position: 'absolute',
                        top: '-20px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '80px',
                        height: '15px',
                        background: '#1f2937',
                        borderRadius: '40px'
                      }} />
                      <div style={{
                        position: 'absolute',
                        top: '30px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '60px',
                        height: '40px',
                        background: '#3b82f6',
                        borderRadius: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '8px'
                      }}>
                        校徽
                      </div>
                    </>
                  )}
                  {preview.key === 'effect2' && (
                    <div style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      color: '#6b7280',
                      fontSize: '12px'
                    }}>
                      侧面视图
                    </div>
                  )}
                  {preview.key === 'effect3' && (
                    <div style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      color: '#6b7280',
                      fontSize: '12px'
                    }}>
                      背面视图
                    </div>
                  )}
                  {preview.key === 'effect4' && (
                    <div style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      color: '#6b7280',
                      fontSize: '12px'
                    }}>
                      细节视图
                    </div>
                  )}
                </div>
              </div>
              <h4 style={{ margin: 0, fontSize: '14px', color: '#374151' }}>{preview.label}</h4>
            </div>
          ))}
        </div>
      </Modal>
      
      {/* 3D预览弹窗 */}
      <Modal
        title={`3D预览 - ${modelOptions.find(m => m.key === selectedModel)?.label}学位服立体展示`}
        open={show3DModal}
        onCancel={() => setShow3DModal(false)}
        footer={[
          <Button key="reset" icon={<ReloadOutlined />}>
            重置视角
          </Button>,
          <Button key="close" onClick={() => setShow3DModal(false)}>
            关闭
          </Button>,
          <Button key="download" type="primary" icon={<DownloadOutlined />}>
            导出3D模型
          </Button>
        ]}
        width={900}
        centered
      >
        <div style={{ padding: '20px 0' }}>
          {/* 模特信息栏 */}
          <div style={{
            background: '#f0f9ff',
            border: '1px solid #bae6fd',
            borderRadius: '8px',
            padding: '12px',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <span style={{ fontSize: '32px' }}>
              {modelOptions.find(m => m.key === selectedModel)?.avatar}
            </span>
            <div>
              <div style={{ fontSize: '14px', fontWeight: '500', color: '#0369a1' }}>
                当前模特: {modelOptions.find(m => m.key === selectedModel)?.label}
              </div>
              <div style={{ fontSize: '12px', color: '#0284c7' }}>
                3D试穿效果预览
              </div>
            </div>
          </div>
          
          <div style={{
            width: '100%',
            height: '500px',
            background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
            borderRadius: '12px',
            border: '1px solid #d1d5db',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* 3D场景背景 */}
            <div style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'radial-gradient(circle at 30% 30%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 70% 70%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)',
            }} />
            
            {/* 模特头像标识 */}
            <div style={{
              position: 'absolute',
              top: '20px',
              left: '20px',
              fontSize: '48px',
              background: 'rgba(255,255,255,0.9)',
              borderRadius: '50%',
              padding: '8px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}>
              {modelOptions.find(m => m.key === selectedModel)?.avatar}
            </div>
            
            {/* 3D学位服模型占位 */}
            <div style={{
              width: '200px',
              height: '350px',
              background: selectedColor,
              borderRadius: '15px 15px 0 0',
              position: 'relative',
              border: '3px solid #9ca3af',
              transform: 'perspective(800px) rotateY(-15deg) rotateX(5deg)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
            }}>
              {/* 3D学位帽 */}
              <div style={{
                position: 'absolute',
                top: '-30px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '150px',
                height: '25px',
                background: '#1f2937',
                borderRadius: '75px',
                border: '3px solid #374151',
                boxShadow: '0 5px 15px rgba(0,0,0,0.3)'
              }} />
              
              {/* 3D帽顶 */}
              <div style={{
                position: 'absolute',
                top: '-45px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '100px',
                height: '20px',
                background: '#1f2937',
                borderRadius: '50px',
                border: '3px solid #374151'
              }} />
              
              {/* 3D流苏 */}
              <div style={{
                position: 'absolute',
                top: '-35px',
                right: '25px',
                width: '3px',
                height: '50px',
                background: '#fbbf24',
                borderRadius: '2px',
                transform: 'rotateZ(10deg)'
              }} />
              
              {/* 3D校徽区域 */}
              <div style={{
                position: 'absolute',
                top: '50px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '120px',
                height: '80px',
                background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '12px',
                fontWeight: 'bold',
                boxShadow: '0 5px 15px rgba(59, 130, 246, 0.3)'
              }}>
                校徽区域
              </div>
              
              {/* 3D垂带 */}
              <div style={{
                position: 'absolute',
                top: '25px',
                left: '25px',
                width: '12px',
                height: '250px',
                background: 'linear-gradient(180deg, #dc2626, #b91c1c)',
                borderRadius: '6px',
                boxShadow: '0 5px 15px rgba(220, 38, 38, 0.3)'
              }} />
              <div style={{
                position: 'absolute',
                top: '25px',
                right: '25px',
                width: '12px',
                height: '250px',
                background: 'linear-gradient(180deg, #dc2626, #b91c1c)',
                borderRadius: '6px',
                boxShadow: '0 5px 15px rgba(220, 38, 38, 0.3)'
              }} />
            </div>
            
            {/* 3D控制提示 */}
            <div style={{
              position: 'absolute',
              bottom: '20px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'rgba(255, 255, 255, 0.9)',
              padding: '8px 16px',
              borderRadius: '20px',
              fontSize: '12px',
              color: '#6b7280',
              backdropFilter: 'blur(10px)'
            }}>
              🖱️ 拖拽旋转 | 🔍 滚轮缩放 | 🖱️ 右键平移
            </div>
          </div>
        </div>
      </Modal>
      
      {/* 商城弹窗 */}
      <Modal
        title="商城"
        open={showMallModal}
        onCancel={() => setShowMallModal(false)}
        footer={null}
        width={1000}
        mask={true}
        maskClosable={true}
        styles={{
          body: { padding: '0' }
        }}
      >
        <div style={{
          display: 'flex',
          height: '600px'
        }}>
          {/* 左侧类目选择 */}
          <div style={{
            width: '200px',
            borderRight: '1px solid #e5e7eb',
            backgroundColor: '#f9fafb',
            padding: '16px'
          }}>
            <div style={{
              fontSize: '16px',
              fontWeight: '600',
              marginBottom: '16px',
              color: '#374151'
            }}>
              商品分类
            </div>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}>
              {[
                { id: 'all', name: '全部商品' },
                { id: 'xueshifu', name: '学士袍' },
                { id: 'shuoshifu', name: '硕士袍' },
                { id: 'boshifu', name: '博士袍' },
                { id: 'jiaoshifu', name: '教师袍' },
                { id: 'xiaozhangfu', name: '校长袍' }
              ].map((category) => (
                <button
                  key={category.id}
                  style={{
                    padding: '8px 12px',
                    border: 'none',
                    borderRadius: '6px',
                    backgroundColor: selectedCategory === category.id ? '#3b82f6' : 'transparent',
                    color: selectedCategory === category.id ? '#ffffff' : '#6b7280',
                    fontSize: '14px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (selectedCategory !== category.id) {
                      e.currentTarget.style.backgroundColor = '#e5e7eb'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedCategory !== category.id) {
                      e.currentTarget.style.backgroundColor = 'transparent'
                    }
                  }}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
          
          {/* 右侧商品展示 */}
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{
              flex: 1,
              padding: '20px',
              overflowY: 'auto'
            }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '16px'
              }}>
                {[
                  { id: 'product1', name: '经典学位服', image: IMAGES.xueweifu.default, price: '¥299', category: 'xueshifu' },
    { id: 'product2', name: '高级学位服', image: IMAGES.xueweifu.flat1, price: '¥399', category: 'xueshifu' },
    { id: 'product3', name: '豪华学位服', image: IMAGES.xueweifu.flat2, price: '¥499', category: 'xueshifu' },
    { id: 'product4', name: '定制学位服', image: IMAGES.xueweifu.flat3, price: '¥599', category: 'shuoshifu' },
    { id: 'product5', name: '特别版学位服', image: IMAGES.xueweifu.model1, price: '¥699', category: 'shuoshifu' },
    { id: 'product6', name: '限量版学位服', image: IMAGES.xueweifu.model2, price: '¥799', category: 'boshifu' }
                ].filter(product => selectedCategory === 'all' || product.category === selectedCategory).map((product) => (
                  <div
                    key={product.id}
                    style={{
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      backgroundColor: '#ffffff'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)'
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                    onClick={() => {
                      setSelectedNewProduct(product.name)
                      setShowMallModal(false)
                      setShowSwitchConfirm(true)
                    }}
                  >
                    <div style={{
                      width: '100%',
                      height: '160px',
                      overflow: 'hidden',
                      position: 'relative',
                      background: '#f9fafb',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <img
                        src={product.image}
                        alt={product.name}
                        style={{
                          maxWidth: '90%',
                          maxHeight: '90%',
                          objectFit: 'contain',
                          transition: 'transform 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'scale(1.05)'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'scale(1)'
                        }}
                        onError={(e) => {
                          e.currentTarget.style.display = 'none'
                          const placeholder = document.createElement('div')
                          placeholder.style.cssText = 'width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-size: 14px; color: #9ca3af;'
                          placeholder.textContent = '图片加载失败'
                          e.currentTarget.parentNode?.appendChild(placeholder)
                        }}
                      />
                    </div>
                    <div style={{
                      padding: '12px',
                      textAlign: 'center'
                    }}>
                      <div style={{
                        fontSize: '14px',
                        fontWeight: '500',
                        color: '#374151',
                        marginBottom: '4px'
                      }}>
                        {product.name}
                      </div>
                      <div style={{
                        fontSize: '16px',
                        fontWeight: '600',
                        color: '#dc2626'
                      }}>
                        {product.price}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            

          </div>
        </div>
      </Modal>
      
      {/* 价格明细弹窗 */}
      <Modal
        title="价格明细"
        open={showPriceModal}
        onCancel={() => setShowPriceModal(false)}
        footer={null}
        width={400}
      >
        <div style={{ padding: '20px 0' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '16px',
            fontSize: '16px'
          }}>
            <span>商品价格</span>
            <span style={{ fontWeight: '600' }}>HK$ {totalPrice}.00</span>
          </div>
          
          <div style={{
            borderTop: '1px solid #e5e7eb',
            paddingTop: '16px',
            marginTop: '16px'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '16px',
              fontWeight: '600'
            }}>
              <span>小计</span>
              <span>HK$ {totalPrice}.00</span>
            </div>
          </div>
          
          <div style={{
            marginTop: '16px',
            fontSize: '14px',
            color: '#6b7280',
            lineHeight: '1.5'
          }}>
            数字化费用、增值税、运费和其他费用不包括在内。
          </div>
        </div>
      </Modal>
      
      {/* 更换确认弹窗 */}
      <Modal
        title="确认更换商品"
        open={showSwitchConfirm}
        onOk={() => {
          setCurrentProductName(selectedNewProduct)
          setShowSwitchConfirm(false)
          message.success(`已更换为：${selectedNewProduct}`)
        }}
        onCancel={() => setShowSwitchConfirm(false)}
        okText="更换"
        cancelText="取消"
      >
        <div style={{
          padding: '20px 0',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '16px',
            color: '#374151',
            marginBottom: '12px'
          }}>
            即将更换商品 —— 当前设计内容将不会被保存。
          </div>
          <div style={{
            fontSize: '14px',
            color: '#6b7280'
          }}>
            需要更换吗？
          </div>
        </div>
      </Modal>
      
      {/* 悬浮底部按钮区域 */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        borderTop: '1px solid #e5e7eb',
        padding: '16px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        zIndex: 1000,
        boxShadow: '0 -4px 12px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <Button 
            type="default" 
            icon={<SaveOutlined />}
            size="large"
            style={{
              borderColor: '#d1d5db',
              color: '#6b7280'
            }}
          >
            保存模版
          </Button>
          <Button 
            type="primary" 
            size="large"
            onClick={() => navigate('/product-publish')}
            style={{
              backgroundColor: '#dc2626',
              borderColor: '#dc2626'
            }}
          >
            产品发布
          </Button>
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <Button 
            type="text" 
            onClick={() => setShowPriceModal(true)}
            style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#dc2626',
              padding: '4px 8px'
            }}
          >
            HK$ {totalPrice}.00
          </Button>
        </div>
      </div>
      </div>

    </div>
  )
}

export default AIDesign