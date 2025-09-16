import React, { useState, useEffect } from 'react'
import { 
  Layout,
  Tabs, 
  Input, 
  Select, 
  Button, 
  Row, 
  Col, 
  Card, 
  Tag, 
  Space, 
  Pagination, 
  Empty, 
  Drawer, 
  Form, 
  Slider, 
  Checkbox, 
  Radio,
  Upload,
  message,
  Tree,
  Table,
  Progress,
  Tooltip,
  Badge,
  Divider,
  Switch,
  InputNumber,
  ColorPicker,
  Collapse,
  Timeline,
  Statistic,
  Avatar
} from 'antd'
import {
  SearchOutlined,
  FilterOutlined,
  PlusOutlined,
  UploadOutlined,
  HeartOutlined,
  EyeOutlined,
  DownloadOutlined,
  AppstoreOutlined,
  BarsOutlined,
  FolderOutlined,
  FileOutlined,
  SettingOutlined,
  ThunderboltOutlined,
  ExperimentOutlined,
  DatabaseOutlined,
  CloudOutlined,
  ScanOutlined,
  BgColorsOutlined,
  CompressOutlined,
  ExpandOutlined,
  ReloadOutlined,
  StarOutlined,
  ShareAltOutlined,
  EditOutlined,
  DeleteOutlined,
  CopyOutlined,
  ExportOutlined,
  ImportOutlined,
  ToolOutlined,
  ApiOutlined,
  SafetyOutlined,
  RocketOutlined,
  BulbOutlined
} from '@ant-design/icons'
import { cn } from '../lib/utils'
import FabricCard, { FabricInfo } from '../components/FabricCard'
import ThreeDViewer, { Model3D } from '../components/3DViewer'
import { ContentLoading, CardSkeleton } from '../components/LoadingSpinner'
import Breadcrumb from '../components/Breadcrumb'

const { Sider, Content } = Layout
const { Search } = Input
const { Option } = Select
const { Panel } = Collapse

// 扩展面料信息接口
interface ExtendedFabricInfo extends FabricInfo {
  materialProperties: {
    roughness: number
    metallic: number
    normalMap?: string
    displacementMap?: string
    aoMap?: string
    emissiveMap?: string
  }
  physicalProperties: {
    density: number
    elasticity: number
    durability: number
    breathability: number
    waterResistance: number
  }
  sustainability: {
    ecoFriendly: boolean
    recyclable: boolean
    carbonFootprint: number
    certifications: string[]
  }
  usage: {
    recommendedFor: string[]
    seasonality: string[]
    careInstructions: string[]
  }
  availability: {
    stock: number
    leadTime: number
    minOrder: number
    supplier: {
      name: string
      rating: number
      location: string
      contact: string
    }
  }
}

// 版型信息接口
interface PatternInfo {
  id: string
  name: string
  category: string
  type: 'basic' | 'advanced' | 'custom'
  thumbnail: string
  preview3D?: string
  description: string
  measurements: {
    sizes: string[]
    grading: {
      [size: string]: {
        chest?: number
        waist?: number
        hips?: number
        length?: number
        sleeve?: number
      }
    }
  }
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  estimatedTime: number
  materials: string[]
  techniques: string[]
  tags: string[]
  rating: number
  downloads: number
  price?: number
  isFree: boolean
  createdBy: string
  createdAt: string
  updatedAt: string
}

// 材质库接口
interface MaterialLibrary {
  id: string
  name: string
  category: string
  subcategory: string
  preview: string
  properties: {
    baseColor: string
    roughness: number
    metallic: number
    normal: number
    displacement: number
    emission: string
    opacity: number
  }
  maps: {
    diffuse?: string
    normal?: string
    roughness?: string
    metallic?: string
    displacement?: string
    ao?: string
    emission?: string
  }
  tags: string[]
  isCustom: boolean
  createdAt: string
}

// 案例信息接口
interface CaseInfo {
  id: string
  title: string
  description: string
  images: string[]
  thumbnail: string
  category: string
  style: string
  season: string
  brand?: string
  designer?: string
  tags: string[]
  likes: number
  views: number
  isLiked?: boolean
  createdAt: string
  complexity: 'simple' | 'medium' | 'complex'
  techniques: string[]
  materials: string[]
  estimatedCost: number
  productionTime: number
  model3D?: string
}

// 模特信息接口
interface ModelInfo {
  id: string
  name: string
  avatar: string
  gender: 'male' | 'female'
  height: number
  measurements: {
    bust?: number
    waist?: number
    hips?: number
    chest?: number
    shoulder?: number
    armLength?: number
    legLength?: number
  }
  skinTone: string
  hairColor: string
  eyeColor: string
  bodyType: string
  poses: string[]
  model3D?: Model3D
  isAvailable: boolean
  tags: string[]
  experience: number
  specialties: string[]
  portfolio: string[]
  rating: number
}

// 筛选条件接口
interface FilterOptions {
  category?: string
  type?: string
  color?: string
  season?: string
  style?: string
  priceRange?: [number, number]
  inStock?: boolean
  tags?: string[]
  difficulty?: string
  rating?: number
  sustainability?: boolean
}

const ResourceLibrary: React.FC = () => {
  const [activeTab, setActiveTab] = useState('fabrics')
  const [searchKeyword, setSearchKeyword] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'table'>('grid')
  const [loading, setLoading] = useState(false)
  const [siderCollapsed, setSiderCollapsed] = useState(false)
  
  // 抽屉状态
  const [filterVisible, setFilterVisible] = useState(false)
  const [uploadVisible, setUploadVisible] = useState(false)
  const [materialLibVisible, setMaterialLibVisible] = useState(false)
  const [patternEditorVisible, setPatternEditorVisible] = useState(false)
  const [previewVisible, setPreviewVisible] = useState(false)
  
  // 分页状态
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(12)
  const [total, setTotal] = useState(0)
  
  // 数据状态
  const [fabrics, setFabrics] = useState<ExtendedFabricInfo[]>([])
  const [patterns, setPatterns] = useState<PatternInfo[]>([])
  const [materials, setMaterials] = useState<MaterialLibrary[]>([])
  const [cases, setCases] = useState<CaseInfo[]>([])
  const [models, setModels] = useState<ModelInfo[]>([])
  
  // 筛选状态
  const [filters, setFilters] = useState<FilterOptions>({})
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [previewItem, setPreviewItem] = useState<any>(null)
  const [form] = Form.useForm()

  // 模拟扩展面料数据
  const mockExtendedFabrics: ExtendedFabricInfo[] = [
    {
      id: '1',
      name: '高档真丝面料',
      type: '真丝',
      image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400',
      description: '100%桑蚕丝，手感柔滑，光泽度佳，适合高端女装制作',
      parameters: {
        composition: '100%桑蚕丝',
        weight: '16mm',
        width: '140cm',
        stretch: '无弹',
        color: '象牙白',
        pattern: '素色'
      },
      tags: ['高档', '真丝', '春夏', '衬衫', '奢华'],
      price: 128.00,
      supplier: '江南丝绸',
      inStock: true,
      isFavorite: false,
      downloadUrl: '#',
      materialProperties: {
        roughness: 0.1,
        metallic: 0.0,
        normalMap: '/textures/silk_normal.jpg',
        displacementMap: '/textures/silk_displacement.jpg'
      },
      physicalProperties: {
        density: 1.3,
        elasticity: 15,
        durability: 85,
        breathability: 90,
        waterResistance: 20
      },
      sustainability: {
        ecoFriendly: true,
        recyclable: true,
        carbonFootprint: 2.1,
        certifications: ['GOTS', 'OEKO-TEX']
      },
      usage: {
        recommendedFor: ['衬衫', '连衣裙', '丝巾', '内衣'],
        seasonality: ['春季', '夏季'],
        careInstructions: ['干洗', '低温熨烫', '避免阳光直射']
      },
      availability: {
        stock: 500,
        leadTime: 7,
        minOrder: 10,
        supplier: {
          name: '江南丝绸有限公司',
          rating: 4.8,
          location: '苏州',
          contact: 'contact@jiangnan-silk.com'
        }
      }
    },
    {
      id: '2',
      name: '高弹力牛仔布',
      type: '牛仔',
      image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=400',
      description: '高弹力牛仔面料，舒适透气，适合休闲裤装制作',
      parameters: {
        composition: '98%棉 2%氨纶',
        weight: '12oz',
        width: '150cm',
        stretch: '双向弹',
        color: '靛蓝',
        pattern: '斜纹'
      },
      tags: ['牛仔', '弹力', '四季', '裤装', '休闲'],
      price: 45.00,
      supplier: '华纺集团',
      inStock: true,
      isFavorite: true,
      materialProperties: {
        roughness: 0.8,
        metallic: 0.0,
        normalMap: '/textures/denim_normal.jpg'
      },
      physicalProperties: {
        density: 0.8,
        elasticity: 25,
        durability: 95,
        breathability: 70,
        waterResistance: 60
      },
      sustainability: {
        ecoFriendly: false,
        recyclable: true,
        carbonFootprint: 3.5,
        certifications: ['OEKO-TEX']
      },
      usage: {
        recommendedFor: ['牛仔裤', '夹克', '裙子', '背心'],
        seasonality: ['春季', '秋季', '冬季'],
        careInstructions: ['机洗', '中温熨烫', '可烘干']
      },
      availability: {
        stock: 1200,
        leadTime: 3,
        minOrder: 50,
        supplier: {
          name: '华纺集团',
          rating: 4.6,
          location: '青岛',
          contact: 'sales@huafang.com'
        }
      }
    }
  ]

  // 模拟版型数据
  const mockPatterns: PatternInfo[] = [
    {
      id: '1',
      name: '经典衬衫版型',
      category: '上装',
      type: 'basic',
      thumbnail: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400',
      description: '经典商务衬衫版型，适合正式场合穿着',
      measurements: {
        sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        grading: {
          'M': { chest: 100, waist: 96, length: 72, sleeve: 60 },
          'L': { chest: 104, waist: 100, length: 74, sleeve: 62 }
        }
      },
      difficulty: 'intermediate',
      estimatedTime: 4,
      materials: ['棉布', '真丝', '亚麻'],
      techniques: ['平缝', '锁边', '钉扣'],
      tags: ['商务', '正装', '经典', '百搭'],
      rating: 4.7,
      downloads: 1250,
      price: 29.99,
      isFree: false,
      createdBy: '张设计师',
      createdAt: '2024-01-15',
      updatedAt: '2024-01-20'
    }
  ]

  // 模拟材质库数据
  const mockMaterials: MaterialLibrary[] = [
    {
      id: '1',
      name: '丝绸光泽',
      category: '织物',
      subcategory: '天然纤维',
      preview: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=200',
      properties: {
        baseColor: '#F5F5DC',
        roughness: 0.1,
        metallic: 0.0,
        normal: 0.5,
        displacement: 0.2,
        emission: '#000000',
        opacity: 1.0
      },
      maps: {
        diffuse: '/materials/silk_diffuse.jpg',
        normal: '/materials/silk_normal.jpg',
        roughness: '/materials/silk_roughness.jpg'
      },
      tags: ['光滑', '奢华', '天然'],
      isCustom: false,
      createdAt: '2024-01-10'
    }
  ]

  // 加载数据
  const loadData = async () => {
    setLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      switch (activeTab) {
        case 'fabrics':
          setFabrics(mockExtendedFabrics)
          setTotal(mockExtendedFabrics.length)
          break
        case 'patterns':
          setPatterns(mockPatterns)
          setTotal(mockPatterns.length)
          break
        case 'materials':
          setMaterials(mockMaterials)
          setTotal(mockMaterials.length)
          break
        case 'cases':
          setCases([])
          setTotal(0)
          break
        case 'models':
          setModels([])
          setTotal(0)
          break
      }
    } catch (error) {
      message.error('加载数据失败')
    } finally {
      setLoading(false)
    }
  }

  // 搜索处理
  const handleSearch = (value: string) => {
    setSearchKeyword(value)
    setCurrentPage(1)
    loadData()
  }

  // 筛选处理
  const handleFilter = (values: FilterOptions) => {
    setFilters(values)
    setCurrentPage(1)
    setFilterVisible(false)
    loadData()
  }

  // 重置筛选
  const resetFilters = () => {
    setFilters({})
    form.resetFields()
    setCurrentPage(1)
    loadData()
  }

  // 收藏处理
  const handleFavorite = (id: string, isFavorite: boolean) => {
    if (activeTab === 'fabrics') {
      setFabrics(prev => prev.map(item => 
        item.id === id ? { ...item, isFavorite } : item
      ))
    }
    message.success(isFavorite ? '已收藏' : '已取消收藏')
  }

  // 预览处理
  const handlePreview = (item: any) => {
    setPreviewItem(item)
    setPreviewVisible(true)
  }

  useEffect(() => {
    loadData()
  }, [activeTab])

  // 渲染面料卡片
  const renderFabricCards = () => {
    if (loading) {
      return (
        <Row gutter={[16, 16]}>
          {Array.from({ length: 8 }).map((_, index) => (
            <Col key={index} xs={24} sm={12} md={8} lg={6}>
              <CardSkeleton />
            </Col>
          ))}
        </Row>
      )
    }

    if (fabrics.length === 0) {
      return (
        <Empty 
          description="暂无面料数据" 
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          style={{ padding: '60px 0' }}
        />
      )
    }

    return (
      <Row gutter={[16, 16]}>
        {fabrics.map(fabric => (
          <Col key={fabric.id} xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable
              className="fabric-card"
              style={{ 
                background: '#1a1a1a',
                border: '1px solid #333',
                borderRadius: '8px'
              }}
              cover={
                <div className="relative">
                  <img
                    alt={fabric.name}
                    src={fabric.image}
                    className="h-48 w-full object-cover"
                  />
                  <div className="absolute top-2 right-2 flex gap-1">
                    <Badge count={fabric.availability.stock} size="small">
                      <Button 
                        type="text" 
                        size="small" 
                        icon={<DatabaseOutlined />}
                        style={{ color: '#fff', background: 'rgba(0,0,0,0.6)' }}
                      />
                    </Badge>
                    <Button 
                      type="text" 
                      size="small" 
                      icon={<ThunderboltOutlined />}
                      style={{ color: '#fff', background: 'rgba(0,0,0,0.6)' }}
                      onClick={() => handlePreview(fabric)}
                    />
                  </div>
                </div>
              }
              actions={[
                <Tooltip title="收藏">
                  <Button 
                    type="text" 
                    icon={<HeartOutlined />} 
                    style={{ color: fabric.isFavorite ? '#ff4d4f' : '#8c8c8c' }}
                    onClick={() => handleFavorite(fabric.id, !fabric.isFavorite)}
                  />
                </Tooltip>,
                <Tooltip title="3D预览">
                  <Button 
                    type="text" 
                    icon={<EyeOutlined />} 
                    style={{ color: '#1890ff' }}
                    onClick={() => handlePreview(fabric)}
                  />
                </Tooltip>,
                <Tooltip title="下载">
                  <Button 
                    type="text" 
                    icon={<DownloadOutlined />} 
                    style={{ color: '#52c41a' }}
                  />
                </Tooltip>
              ]}
            >
              <Card.Meta
                title={
                  <div style={{ color: '#fff' }}>
                    {fabric.name}
                    {fabric.sustainability.ecoFriendly && (
                       <Tag color="green" style={{ marginLeft: 8, fontSize: '12px' }}>
                         环保
                       </Tag>
                     )}
                  </div>
                }
                description={
                  <div className="space-y-2">
                    <p style={{ color: '#ccc', fontSize: '12px' }}>
                      {fabric.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span style={{ color: '#1890ff', fontWeight: 'bold' }}>
                        ¥{fabric.price}/米
                      </span>
                      <div className="flex gap-1">
                        <Progress 
                          type="circle" 
                          size={24} 
                          percent={fabric.physicalProperties.durability} 
                          showInfo={false}
                          strokeColor="#52c41a"
                        />
                        <span style={{ color: '#ccc', fontSize: '10px' }}>耐用性</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1">
                       {fabric.tags.slice(0, 3).map(tag => (
                         <Tag key={tag} color="blue" style={{ fontSize: '12px' }}>{tag}</Tag>
                       ))}
                     </div>
                  </div>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>
    )
  }

  // 渲染版型卡片
  const renderPatternCards = () => {
    if (loading) {
      return <ContentLoading text="加载版型中..." height={400} />
    }

    if (patterns.length === 0) {
      return (
        <Empty 
          description="暂无版型数据" 
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          style={{ padding: '60px 0' }}
        />
      )
    }

    return (
      <Row gutter={[16, 16]}>
        {patterns.map(pattern => (
          <Col key={pattern.id} xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable
              style={{ 
                background: '#1a1a1a',
                border: '1px solid #333',
                borderRadius: '8px'
              }}
              cover={
                <div className="relative">
                  <img
                    alt={pattern.name}
                    src={pattern.thumbnail}
                    className="h-48 w-full object-cover"
                  />
                  <div className="absolute top-2 left-2">
                    <Tag color={pattern.isFree ? 'green' : 'gold'}>
                      {pattern.isFree ? '免费' : `¥${pattern.price}`}
                    </Tag>
                  </div>
                  <div className="absolute top-2 right-2">
                    <Tag color={pattern.difficulty === 'beginner' ? 'green' : 
                              pattern.difficulty === 'intermediate' ? 'orange' : 'red'}>
                      {pattern.difficulty === 'beginner' ? '初级' : 
                       pattern.difficulty === 'intermediate' ? '中级' : '高级'}
                    </Tag>
                  </div>
                </div>
              }
              actions={[
                <Tooltip title="预览">
                  <Button type="text" icon={<EyeOutlined />} style={{ color: '#1890ff' }} />
                </Tooltip>,
                <Tooltip title="下载">
                  <Button type="text" icon={<DownloadOutlined />} style={{ color: '#52c41a' }} />
                </Tooltip>,
                <Tooltip title="编辑">
                  <Button type="text" icon={<EditOutlined />} style={{ color: '#faad14' }} />
                </Tooltip>
              ]}
            >
              <Card.Meta
                title={<span style={{ color: '#fff' }}>{pattern.name}</span>}
                description={
                  <div className="space-y-2">
                    <p style={{ color: '#ccc', fontSize: '12px' }}>
                      {pattern.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <StarOutlined style={{ color: '#faad14' }} />
                        <span style={{ color: '#ccc' }}>{pattern.rating}</span>
                      </div>
                      <span style={{ color: '#ccc', fontSize: '12px' }}>
                        {pattern.downloads} 下载
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                       {pattern.tags.slice(0, 3).map(tag => (
                         <Tag key={tag} color="purple" style={{ fontSize: '12px' }}>{tag}</Tag>
                       ))}
                     </div>
                  </div>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>
    )
  }

  // 渲染材质库
  const renderMaterialLibrary = () => {
    if (loading) {
      return <ContentLoading text="加载材质中..." height={400} />
    }

    return (
      <Row gutter={[16, 16]}>
        {materials.map(material => (
          <Col key={material.id} xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable
              style={{ 
                background: '#1a1a1a',
                border: '1px solid #333',
                borderRadius: '8px'
              }}
              cover={
                <div className="relative h-32 bg-gradient-to-br from-gray-800 to-gray-900">
                  <div 
                    className="absolute inset-0 opacity-80"
                    style={{ 
                      background: `linear-gradient(45deg, ${material.properties.baseColor}, transparent)`,
                      filter: `blur(${material.properties.roughness * 10}px)`
                    }}
                  />
                  <div className="absolute bottom-2 left-2">
                     <Tag style={{ fontSize: '12px' }}>{material.category}</Tag>
                   </div>
                </div>
              }
              actions={[
                <Tooltip title="应用">
                  <Button type="text" icon={<BgColorsOutlined />} style={{ color: '#1890ff' }} />
                </Tooltip>,
                <Tooltip title="编辑">
                  <Button type="text" icon={<EditOutlined />} style={{ color: '#faad14' }} />
                </Tooltip>,
                <Tooltip title="复制">
                  <Button type="text" icon={<CopyOutlined />} style={{ color: '#52c41a' }} />
                </Tooltip>
              ]}
            >
              <Card.Meta
                title={<span style={{ color: '#fff' }}>{material.name}</span>}
                description={
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div style={{ color: '#ccc' }}>粗糙度: {material.properties.roughness}</div>
                      <div style={{ color: '#ccc' }}>金属度: {material.properties.metallic}</div>
                      <div style={{ color: '#ccc' }}>法线: {material.properties.normal}</div>
                      <div style={{ color: '#ccc' }}>透明度: {material.properties.opacity}</div>
                    </div>
                    <div className="flex flex-wrap gap-1">
                       {material.tags.map(tag => (
                         <Tag key={tag} color="cyan" style={{ fontSize: '12px' }}>{tag}</Tag>
                       ))}
                     </div>
                  </div>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>
    )
  }

  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh' }}>
      <Layout style={{ background: 'transparent' }}>
        {/* 左侧面板 */}
        <Sider
          width={280}
          collapsible
          collapsed={siderCollapsed}
          onCollapse={setSiderCollapsed}
          style={{
            background: '#1a1a1a',
            borderRight: '1px solid #333'
          }}
        >
          <div className="p-4">
            <div className="mb-4">
              <h3 style={{ color: '#fff', margin: 0 }}>资源管理</h3>
            </div>
            
            {!siderCollapsed && (
              <div className="space-y-4">
                {/* 快速统计 */}
                <div className="grid grid-cols-2 gap-2">
                  <Statistic
                    title={<span style={{ color: '#ccc', fontSize: '12px' }}>面料</span>}
                    value={1234}
                    valueStyle={{ color: '#1890ff', fontSize: '16px' }}
                  />
                  <Statistic
                    title={<span style={{ color: '#ccc', fontSize: '12px' }}>版型</span>}
                    value={567}
                    valueStyle={{ color: '#52c41a', fontSize: '16px' }}
                  />
                </div>
                
                <Divider style={{ borderColor: '#333', margin: '12px 0' }} />
                
                {/* 分类树 */}
                <div>
                  <h4 style={{ color: '#fff', fontSize: '14px', marginBottom: '8px' }}>分类</h4>
                  <Tree
                    showIcon
                    defaultExpandAll
                    treeData={[
                      {
                        title: '面料库',
                        key: 'fabrics',
                        icon: <DatabaseOutlined />,
                        children: [
                          { title: '天然纤维', key: 'natural', icon: <FileOutlined /> },
                          { title: '合成纤维', key: 'synthetic', icon: <FileOutlined /> },
                          { title: '混纺面料', key: 'blend', icon: <FileOutlined /> }
                        ]
                      },
                      {
                        title: '版型库',
                        key: 'patterns',
                        icon: <ToolOutlined />,
                        children: [
                          { title: '上装', key: 'tops', icon: <FileOutlined /> },
                          { title: '下装', key: 'bottoms', icon: <FileOutlined /> },
                          { title: '连衣裙', key: 'dresses', icon: <FileOutlined /> }
                        ]
                      }
                    ]}
                    style={{ 
                      background: 'transparent',
                      color: '#ccc'
                    }}
                  />
                </div>
                
                <Divider style={{ borderColor: '#333', margin: '12px 0' }} />
                
                {/* 快速操作 */}
                <div className="space-y-2">
                  <Button 
                    block 
                    type="primary" 
                    icon={<PlusOutlined />}
                    onClick={() => setUploadVisible(true)}
                  >
                    上传资源
                  </Button>
                  <Button 
                    block 
                    icon={<BgColorsOutlined />}
                    onClick={() => setMaterialLibVisible(true)}
                    style={{ background: '#262626', borderColor: '#434343', color: '#fff' }}
                  >
                    材质库
                  </Button>
                  <Button 
                    block 
                    icon={<ToolOutlined />}
                    onClick={() => setPatternEditorVisible(true)}
                    style={{ background: '#262626', borderColor: '#434343', color: '#fff' }}
                  >
                    版型编辑器
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Sider>

        {/* 主内容区 */}
        <Layout style={{ background: 'transparent' }}>
          <Content style={{ padding: '24px' }}>
            <Breadcrumb />
            
            <div className="mb-6">
              <h1 style={{ color: '#fff', fontSize: '24px', fontWeight: 'bold', margin: 0 }}>资源库</h1>
              <p style={{ color: '#ccc', margin: '8px 0 0 0' }}>专业的面料、版型和材质管理平台</p>
            </div>

            {/* 工具栏 */}
            <div className="mb-6" style={{ 
              background: '#1a1a1a', 
              padding: '16px', 
              borderRadius: '8px',
              border: '1px solid #333'
            }}>
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex flex-col sm:flex-row gap-4 flex-1">
                  <Search
                    placeholder="搜索资源..."
                    allowClear
                    enterButton={<SearchOutlined />}
                    size="large"
                    onSearch={handleSearch}
                    className="max-w-md"
                    style={{
                      background: '#262626',
                      borderColor: '#434343',
                      color: '#fff'
                    }}
                  />
                  
                  <Space>
                    <Button
                      icon={<FilterOutlined />}
                      onClick={() => setFilterVisible(true)}
                      style={{ background: '#262626', borderColor: '#434343', color: '#fff' }}
                    >
                      高级筛选
                    </Button>
                    
                    <Button
                      icon={<ExportOutlined />}
                      style={{ background: '#262626', borderColor: '#434343', color: '#fff' }}
                    >
                      批量导出
                    </Button>
                    
                    <Button
                      icon={<ImportOutlined />}
                      style={{ background: '#262626', borderColor: '#434343', color: '#fff' }}
                    >
                      批量导入
                    </Button>
                  </Space>
                </div>
                
                <div className="flex items-center gap-2">
                  <span style={{ color: '#ccc', fontSize: '14px' }}>视图:</span>
                  <Button.Group>
                    <Button
                      type={viewMode === 'grid' ? 'primary' : 'default'}
                      icon={<AppstoreOutlined />}
                      onClick={() => setViewMode('grid')}
                      style={viewMode !== 'grid' ? { background: '#262626', borderColor: '#434343', color: '#fff' } : {}}
                    />
                    <Button
                      type={viewMode === 'list' ? 'primary' : 'default'}
                      icon={<BarsOutlined />}
                      onClick={() => setViewMode('list')}
                      style={viewMode !== 'list' ? { background: '#262626', borderColor: '#434343', color: '#fff' } : {}}
                    />
                    <Button
                      type={viewMode === 'table' ? 'primary' : 'default'}
                      icon={<DatabaseOutlined />}
                      onClick={() => setViewMode('table')}
                      style={viewMode !== 'table' ? { background: '#262626', borderColor: '#434343', color: '#fff' } : {}}
                    />
                  </Button.Group>
                </div>
              </div>
            </div>

            {/* 主要内容 */}
            <div style={{ 
              background: '#1a1a1a', 
              borderRadius: '8px',
              border: '1px solid #333'
            }}>
              <Tabs
                activeKey={activeTab}
                onChange={setActiveTab}
                className="px-6"
                style={{
                  background: '#1a1a1a',
                  borderColor: '#333'
                }}
                items={[
                  {
                    key: 'fabrics',
                    label: (
                      <span>
                        <DatabaseOutlined />
                        面料库
                      </span>
                    ),
                    children: (
                      <div className="pb-6">
                        {renderFabricCards()}
                      </div>
                    )
                  },
                  {
                    key: 'patterns',
                    label: (
                      <span>
                        <ToolOutlined />
                        版型库
                      </span>
                    ),
                    children: (
                      <div className="pb-6">
                        {renderPatternCards()}
                      </div>
                    )
                  },
                  {
                    key: 'materials',
                    label: (
                      <span>
                        <BgColorsOutlined />
                        材质库
                      </span>
                    ),
                    children: (
                      <div className="pb-6">
                        {renderMaterialLibrary()}
                      </div>
                    )
                  },
                  {
                    key: 'cases',
                    label: (
                      <span>
                        <ExperimentOutlined />
                        案例库
                      </span>
                    ),
                    children: (
                      <div className="pb-6">
                        <Empty 
                          description="案例库开发中..." 
                          image={Empty.PRESENTED_IMAGE_SIMPLE}
                          style={{ padding: '60px 0' }}
                        />
                      </div>
                    )
                  },
                  {
                    key: 'models',
                    label: (
                      <span>
                        <RocketOutlined />
                        模特库
                      </span>
                    ),
                    children: (
                      <div className="pb-6">
                        <Empty 
                          description="模特库开发中..." 
                          image={Empty.PRESENTED_IMAGE_SIMPLE}
                          style={{ padding: '60px 0' }}
                        />
                      </div>
                    )
                  }
                ]}
              />
              
              {/* 分页 */}
              {total > 0 && (
                <div className="flex justify-center py-6 border-t border-gray-700">
                  <Pagination
                    current={currentPage}
                    pageSize={pageSize}
                    total={total}
                    showSizeChanger
                    showQuickJumper
                    showTotal={(total, range) => (
                      <span style={{ color: '#ccc' }}>
                        第 {range[0]}-{range[1]} 条，共 {total} 条
                      </span>
                    )}
                    onChange={(page, size) => {
                      setCurrentPage(page)
                      setPageSize(size || 12)
                      loadData()
                    }}
                    style={{
                      background: '#1a1a1a'
                    }}
                  />
                </div>
              )}
            </div>
          </Content>
        </Layout>
      </Layout>

      {/* 高级筛选抽屉 */}
      <Drawer
        title={<span style={{ color: '#fff' }}>高级筛选</span>}
        placement="right"
        onClose={() => setFilterVisible(false)}
        open={filterVisible}
        width={400}
        style={{ background: '#1a1a1a' }}
        extra={
          <Space>
            <Button onClick={resetFilters} style={{ background: '#262626', borderColor: '#434343', color: '#fff' }}>
              重置
            </Button>
            <Button type="primary" onClick={() => form.submit()}>
              应用筛选
            </Button>
          </Space>
        }
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFilter}
          initialValues={filters}
        >
          {activeTab === 'fabrics' && (
            <>
              <Form.Item name="type" label={<span style={{ color: '#fff' }}>面料类型</span>}>
                <Select placeholder="选择类型" allowClear style={{ background: '#262626' }}>
                  <Option value="真丝">真丝</Option>
                  <Option value="棉布">棉布</Option>
                  <Option value="牛仔">牛仔</Option>
                  <Option value="针织">针织</Option>
                  <Option value="羊毛">羊毛</Option>
                  <Option value="亚麻">亚麻</Option>
                </Select>
              </Form.Item>
              
              <Form.Item name="sustainability" label={<span style={{ color: '#fff' }}>可持续性</span>}>
                <Checkbox.Group>
                  <Checkbox value="ecoFriendly" style={{ color: '#ccc' }}>环保材料</Checkbox>
                  <Checkbox value="recyclable" style={{ color: '#ccc' }}>可回收</Checkbox>
                  <Checkbox value="organic" style={{ color: '#ccc' }}>有机认证</Checkbox>
                </Checkbox.Group>
              </Form.Item>
              
              <Form.Item name="priceRange" label={<span style={{ color: '#fff' }}>价格区间</span>}>
                <Slider
                  range
                  min={0}
                  max={500}
                  marks={{ 0: '¥0', 250: '¥250', 500: '¥500+' }}
                  tooltip={{ formatter: (value) => `¥${value}` }}
                />
              </Form.Item>
              
              <Form.Item name="physicalProperties" label={<span style={{ color: '#fff' }}>物理属性</span>}>
                <Collapse ghost>
                  <Panel header="弹性" key="elasticity">
                    <Slider min={0} max={100} marks={{ 0: '无弹', 50: '中弹', 100: '高弹' }} />
                  </Panel>
                  <Panel header="透气性" key="breathability">
                    <Slider min={0} max={100} marks={{ 0: '差', 50: '中', 100: '优' }} />
                  </Panel>
                  <Panel header="耐用性" key="durability">
                    <Slider min={0} max={100} marks={{ 0: '低', 50: '中', 100: '高' }} />
                  </Panel>
                </Collapse>
              </Form.Item>
              
              <Form.Item name="inStock" valuePropName="checked">
                <Checkbox style={{ color: '#ccc' }}>仅显示有库存</Checkbox>
              </Form.Item>
            </>
          )}
          
          {activeTab === 'patterns' && (
            <>
              <Form.Item name="category" label={<span style={{ color: '#fff' }}>服装类别</span>}>
                <Radio.Group>
                  <Radio value="上装" style={{ color: '#ccc' }}>上装</Radio>
                  <Radio value="下装" style={{ color: '#ccc' }}>下装</Radio>
                  <Radio value="连衣裙" style={{ color: '#ccc' }}>连衣裙</Radio>
                  <Radio value="外套" style={{ color: '#ccc' }}>外套</Radio>
                </Radio.Group>
              </Form.Item>
              
              <Form.Item name="difficulty" label={<span style={{ color: '#fff' }}>难度等级</span>}>
                <Select placeholder="选择难度" allowClear>
                  <Option value="beginner">初级</Option>
                  <Option value="intermediate">中级</Option>
                  <Option value="advanced">高级</Option>
                </Select>
              </Form.Item>
              
              <Form.Item name="isFree" label={<span style={{ color: '#fff' }}>价格类型</span>}>
                <Radio.Group>
                  <Radio value={true} style={{ color: '#ccc' }}>免费</Radio>
                  <Radio value={false} style={{ color: '#ccc' }}>付费</Radio>
                </Radio.Group>
              </Form.Item>
              
              <Form.Item name="rating" label={<span style={{ color: '#fff' }}>最低评分</span>}>
                <Slider
                  min={0}
                  max={5}
                  step={0.5}
                  marks={{ 0: '0', 2.5: '2.5', 5: '5' }}
                  tooltip={{ formatter: (value) => `${value}星` }}
                />
              </Form.Item>
            </>
          )}
        </Form>
      </Drawer>

      {/* 材质库抽屉 */}
      <Drawer
        title={<span style={{ color: '#fff' }}>材质库管理</span>}
        placement="right"
        onClose={() => setMaterialLibVisible(false)}
        open={materialLibVisible}
        width={600}
        style={{ background: '#1a1a1a' }}
      >
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 style={{ color: '#fff', margin: 0 }}>材质预设</h3>
            <Button type="primary" icon={<PlusOutlined />}>
              新建材质
            </Button>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {materials.map(material => (
              <Card
                key={material.id}
                size="small"
                style={{ background: '#262626', borderColor: '#434343' }}
                title={<span style={{ color: '#fff' }}>{material.name}</span>}
                extra={
                  <Space>
                    <Button type="text" size="small" icon={<EditOutlined />} style={{ color: '#faad14' }} />
                    <Button type="text" size="small" icon={<DeleteOutlined />} style={{ color: '#ff4d4f' }} />
                  </Space>
                }
              >
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span style={{ color: '#ccc', fontSize: '12px' }}>基础色</span>
                    <ColorPicker value={material.properties.baseColor} size="small" disabled />
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: '#ccc', fontSize: '12px' }}>粗糙度</span>
                    <Progress 
                      percent={material.properties.roughness * 100} 
                      size="small" 
                      showInfo={false}
                      strokeColor="#1890ff"
                    />
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: '#ccc', fontSize: '12px' }}>金属度</span>
                    <Progress 
                      percent={material.properties.metallic * 100} 
                      size="small" 
                      showInfo={false}
                      strokeColor="#52c41a"
                    />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Drawer>

      {/* 版型编辑器抽屉 */}
      <Drawer
        title={<span style={{ color: '#fff' }}>版型编辑器</span>}
        placement="right"
        onClose={() => setPatternEditorVisible(false)}
        open={patternEditorVisible}
        width={800}
        style={{ background: '#1a1a1a' }}
      >
        <div className="space-y-4">
          <div className="text-center" style={{ padding: '60px 0' }}>
            <BulbOutlined style={{ fontSize: '48px', color: '#faad14' }} />
            <h3 style={{ color: '#fff', marginTop: '16px' }}>版型编辑器</h3>
            <p style={{ color: '#ccc' }}>专业的版型设计和编辑工具</p>
            <Button type="primary" size="large" style={{ marginTop: '16px' }}>
              启动编辑器
            </Button>
          </div>
        </div>
      </Drawer>

      {/* 3D预览抽屉 */}
      <Drawer
        title={<span style={{ color: '#fff' }}>3D材质预览</span>}
        placement="right"
        onClose={() => setPreviewVisible(false)}
        open={previewVisible}
        width={600}
        style={{ background: '#1a1a1a' }}
      >
        {previewItem && (
          <div className="space-y-4">
            <div className="h-64 bg-gray-800 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <ThunderboltOutlined style={{ fontSize: '48px', color: '#1890ff' }} />
                <p style={{ color: '#ccc', marginTop: '16px' }}>3D预览区域</p>
                <p style={{ color: '#666', fontSize: '12px' }}>实时材质渲染</p>
              </div>
            </div>
            
            <Card 
              title={<span style={{ color: '#fff' }}>{previewItem.name}</span>}
              style={{ background: '#262626', borderColor: '#434343' }}
            >
              <div className="space-y-3">
                <div>
                  <h4 style={{ color: '#fff', fontSize: '14px', marginBottom: '8px' }}>材质属性</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div style={{ color: '#ccc' }}>粗糙度: {previewItem.materialProperties?.roughness || 0}</div>
                    <div style={{ color: '#ccc' }}>金属度: {previewItem.materialProperties?.metallic || 0}</div>
                  </div>
                </div>
                
                <div>
                  <h4 style={{ color: '#fff', fontSize: '14px', marginBottom: '8px' }}>物理属性</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span style={{ color: '#ccc', fontSize: '12px' }}>弹性</span>
                      <Progress 
                        percent={previewItem.physicalProperties?.elasticity || 0} 
                        size="small" 
                        strokeColor="#52c41a"
                      />
                    </div>
                    <div className="flex justify-between items-center">
                      <span style={{ color: '#ccc', fontSize: '12px' }}>耐用性</span>
                      <Progress 
                        percent={previewItem.physicalProperties?.durability || 0} 
                        size="small" 
                        strokeColor="#1890ff"
                      />
                    </div>
                    <div className="flex justify-between items-center">
                      <span style={{ color: '#ccc', fontSize: '12px' }}>透气性</span>
                      <Progress 
                        percent={previewItem.physicalProperties?.breathability || 0} 
                        size="small" 
                        strokeColor="#faad14"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}
      </Drawer>

      {/* 上传资源抽屉 */}
      <Drawer
        title={<span style={{ color: '#fff' }}>上传资源</span>}
        placement="right"
        onClose={() => setUploadVisible(false)}
        open={uploadVisible}
        width={500}
        style={{ background: '#1a1a1a' }}
      >
        <Form layout="vertical">
          <Form.Item name="name" label={<span style={{ color: '#fff' }}>资源名称</span>} rules={[{ required: true }]}>
            <Input placeholder="请输入资源名称" style={{ background: '#262626', borderColor: '#434343', color: '#fff' }} />
          </Form.Item>
          
          <Form.Item name="type" label={<span style={{ color: '#fff' }}>资源类型</span>} rules={[{ required: true }]}>
            <Select placeholder="选择类型">
              <Option value="fabric">面料</Option>
              <Option value="pattern">版型</Option>
              <Option value="material">材质</Option>
            </Select>
          </Form.Item>
          
          <Form.Item name="files" label={<span style={{ color: '#fff' }}>上传文件</span>}>
            <Upload.Dragger
              name="files"
              multiple
              action="/api/upload"
              listType="picture"
              style={{ background: '#262626', borderColor: '#434343' }}
            >
              <p className="ant-upload-drag-icon">
                <UploadOutlined style={{ color: '#1890ff' }} />
              </p>
              <p className="ant-upload-text" style={{ color: '#fff' }}>点击或拖拽文件到此区域上传</p>
              <p className="ant-upload-hint" style={{ color: '#ccc' }}>支持单个或批量上传，支持3D模型、贴图等格式</p>
            </Upload.Dragger>
          </Form.Item>
          
          <Form.Item name="description" label={<span style={{ color: '#fff' }}>描述</span>}>
            <Input.TextArea 
              rows={4} 
              placeholder="请输入资源描述" 
              style={{ background: '#262626', borderColor: '#434343', color: '#fff' }}
            />
          </Form.Item>
          
          <Form.Item name="tags" label={<span style={{ color: '#fff' }}>标签</span>}>
            <Select mode="tags" placeholder="添加标签" />
          </Form.Item>
          
          <Form.Item>
            <Space className="w-full justify-end">
              <Button 
                onClick={() => setUploadVisible(false)}
                style={{ background: '#262626', borderColor: '#434343', color: '#fff' }}
              >
                取消
              </Button>
              <Button type="primary" htmlType="submit">
                上传
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  )
}

export default ResourceLibrary