import React, { useState, useEffect } from 'react'
import {
  Row,
  Col,
  Card,
  Button,
  Input,
  Select,
  Pagination,
  Badge,
  Tag,
  Rate,
  Space,
  Drawer,
  Form,
  Slider,
  Checkbox,
  Radio,
  InputNumber,
  message,
  Modal,
  Image,
  Divider,
  Tabs,
  Avatar,
  List,
  Empty,
  Progress,
  Tooltip,
  Switch,
  ColorPicker,
  Collapse,
  Timeline,
  Statistic,
  Upload,
  Steps
} from 'antd'
import {
  SearchOutlined,
  FilterOutlined,
  ShoppingCartOutlined,
  HeartOutlined,
  HeartFilled,
  EyeOutlined,
  StarFilled,
  PlusOutlined,
  MinusOutlined,
  DeleteOutlined,
  AppstoreOutlined,
  BarsOutlined,
  ShopOutlined,
  ThunderboltOutlined,
  ExperimentOutlined,
  DatabaseOutlined,
  CloudOutlined,
  ScanOutlined,
  BgColorsOutlined,
  CompressOutlined,
  ExpandOutlined,
  ReloadOutlined,
  ShareAltOutlined,
  EditOutlined,
  CopyOutlined,
  ExportOutlined,
  ImportOutlined,
  ToolOutlined,
  ApiOutlined,
  SafetyOutlined,
  RocketOutlined,
  BulbOutlined,
  SettingOutlined,
  PlayCircleOutlined,
  PauseCircleOutlined,
  FullscreenOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
  RotateLeftOutlined,
  RotateRightOutlined,
  UndoOutlined,
  RedoOutlined,
  SaveOutlined,
  DownloadOutlined,
  UploadOutlined,
  FileTextOutlined,
  FolderOutlined,
  TeamOutlined,
  UserOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons'
import { cn } from '../lib/utils'
import { ContentLoading, CardSkeleton } from '../components/LoadingSpinner'
import Breadcrumb from '../components/Breadcrumb'
import { useCartStore } from '../store'
import { useNavigate } from 'react-router-dom'

const { Search } = Input
const { Option } = Select
const { Panel } = Collapse
const { Step } = Steps

// 接口定义
interface Product {
  id: string
  name: string
  description: string
  images: string[]
  thumbnail: string
  price: number
  originalPrice?: number
  category: string
  subcategory?: string
  brand: string
  rating: number
  reviewCount: number
  sales: number
  stock: number
  tags: string[]
  specifications: Record<string, string>
  variants?: ProductVariant[]
  isFavorite?: boolean
  isNew?: boolean
  isHot?: boolean
  discount?: number
  colors?: string[]
  sizes?: string[]
  hasCustomization?: boolean
  customizationOptions?: CustomizationOption[]
  materials?: MaterialOption[]
  previewImages?: string[]
  virtualTryOn?: boolean
  arSupport?: boolean
}

interface ProductVariant {
  id: string
  name: string
  value: string
  price?: number
  stock?: number
  image?: string
}

interface CustomizationOption {
  id: string
  name: string
  type: 'color' | 'material' | 'size' | 'pattern' | 'text' | 'logo'
  options: {
    id: string
    name: string
    value: string
    price?: number
    preview?: string
  }[]
  required: boolean
  multiSelect: boolean
}

interface MaterialOption {
  id: string
  name: string
  type: string
  preview: string
  properties: {
    roughness: number
    metallic: number
    normal: number
    displacement: number
  }
  price: number
  description: string
}

import type { CartItem } from '../store'

interface FilterOptions {
  category?: string
  priceRange?: [number, number]
  brand?: string[]
  rating?: number
  inStock?: boolean
  tags?: string[]
  has3D?: boolean
  hasCustomization?: boolean
  hasAR?: boolean
}

const Mall: React.FC = () => {
  const navigate = useNavigate()
  const { addItem, items, removeItem, updateQuantity, clearCart } = useCartStore()
  
  // 状态管理
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('default')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(12)
  const [total, setTotal] = useState(0)
  const [filterVisible, setFilterVisible] = useState(false)
  const [cartVisible, setCartVisible] = useState(false)
  const [filters, setFilters] = useState<FilterOptions>({})
  
  // 模拟商品数据
  const mockProducts: Product[] = [
    {
      id: 'bachelor-science',
      name: '理学学士袍',
      description: '理学学士学位服，科学严谨，学者风范',
      images: ['/photo/xueweifu/00_02_00__23175691__2321569e_04_00.jpg'],
      thumbnail: '/photo/xueweifu/00_02_00__23175691__2321569e_04_00.jpg',
      price: 899.00,
      originalPrice: 1299.00,
      category: '学士袍',
      brand: 'DiCreate',
      rating: 4.8,
      reviewCount: 234,
      sales: 456,
      stock: 88,
      tags: ['新品', '热销'],
      specifications: {
        '材质': '优质涤纶',
        '重量': '500g',
        '保养': '干洗'
      },
      colors: ['黑色'],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      isFavorite: false,
      isNew: true,
      hasCustomization: true
    },
    {
      id: 'bachelor-engineering',
      name: '工学学士袍',
      description: '工学学士学位服，工程精神，技术典范',
      images: ['/photo/xueweifu/00_02_00__23408a61__2321569e_04_00.jpg'],
      thumbnail: '/photo/xueweifu/00_02_00__23408a61__2321569e_04_00.jpg',
      price: 899.00,
      originalPrice: 1299.00,
      category: '学士袍',
      brand: 'DiCreate',
      rating: 4.7,
      reviewCount: 189,
      sales: 312,
      stock: 65,
      tags: ['热销', '工学专用'],
      specifications: {
        '材质': '优质涤纶',
        '重量': '500g',
        '保养': '干洗'
      },
      colors: ['黑色'],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      isFavorite: false,
      isNew: false,
      hasCustomization: true
    },
    {
      id: 'bachelor-medicine',
      name: '医学学士袍',
      description: '医学学士学位服，医者仁心，救死扶伤',
      images: ['/photo/xueweifu/00_02_00__23175691__2321569e_04_00.jpg'],
      thumbnail: '/photo/xueweifu/00_02_00__23175691__2321569e_04_00.jpg',
      price: 899.00,
      originalPrice: 1299.00,
      category: '学士袍',
      brand: 'DiCreate',
      rating: 4.9,
      reviewCount: 156,
      sales: 278,
      stock: 72,
      tags: ['医学专用', '经典'],
      specifications: {
        '材质': '优质涤纶',
        '重量': '500g',
        '保养': '干洗'
      },
      colors: ['黑色'],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      isFavorite: false,
      isNew: false,
      hasCustomization: true
    },
    {
      id: 'bachelor-military',
      name: '军事学学士袍',
      description: '军事学学士学位服，军人风采，保家卫国',
      images: ['/photo/xueweifu/00_02_00__23408a61__2321569e_04_00.jpg'],
      thumbnail: '/photo/xueweifu/00_02_00__23408a61__2321569e_04_00.jpg',
      price: 899.00,
      originalPrice: 1299.00,
      category: '学士袍',
      brand: 'DiCreate',
      rating: 4.6,
      reviewCount: 98,
      sales: 145,
      stock: 45,
      tags: ['军事专用', '限量'],
      specifications: {
        '材质': '优质涤纶',
        '重量': '500g',
        '保养': '干洗'
      },
      colors: ['黑色'],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      isFavorite: false,
      isNew: false,
      hasCustomization: true
    },
    {
      id: 'bachelor-agriculture',
      name: '农学学士袍',
      description: '农学学士学位服，农业科技，绿色发展',
      images: ['/photo/xueweifu/00_02_00__23175691__2321569e_04_00.jpg'],
      thumbnail: '/photo/xueweifu/00_02_00__23175691__2321569e_04_00.jpg',
      price: 899.00,
      originalPrice: 1299.00,
      category: '学士袍',
      brand: 'DiCreate',
      rating: 4.5,
      reviewCount: 167,
      sales: 203,
      stock: 58,
      tags: ['农学专用', '环保'],
      specifications: {
        '材质': '优质涤纶',
        '重量': '500g',
        '保养': '干洗'
      },
      colors: ['黑色'],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      isFavorite: false,
      isNew: false,
      hasCustomization: true
    },
    {
      id: 'bachelor-literature',
      name: '文学学士袍',
      description: '文学学士学位服，文采飞扬，书香门第',
      images: ['/photo/xueweifu/00_02_00__23408a61__2321569e_04_00.jpg'],
      thumbnail: '/photo/xueweifu/00_02_00__23408a61__2321569e_04_00.jpg',
      price: 899.00,
      originalPrice: 1299.00,
      category: '学士袍',
      brand: 'DiCreate',
      rating: 4.8,
      reviewCount: 289,
      sales: 367,
      stock: 95,
      tags: ['文学专用', '热销'],
      specifications: {
        '材质': '优质涤纶',
        '重量': '500g',
        '保养': '干洗'
      },
      colors: ['黑色'],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      isFavorite: false,
      isNew: false,
      hasCustomization: true
    },
    {
      id: 'bachelor-philosophy',
      name: '哲学学士袍',
      description: '哲学学士学位服，思辨智慧，哲理人生',
      images: ['/photo/xueweifu/00_02_00__23175691__2321569e_04_00.jpg'],
      thumbnail: '/photo/xueweifu/00_02_00__23175691__2321569e_04_00.jpg',
      price: 899.00,
      originalPrice: 1299.00,
      category: '学士袍',
      brand: 'DiCreate',
      rating: 4.7,
      reviewCount: 134,
      sales: 178,
      stock: 42,
      tags: ['哲学专用', '经典'],
      specifications: {
        '材质': '优质涤纶',
        '重量': '500g',
        '保养': '干洗'
      },
      colors: ['黑色'],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      isFavorite: false,
      isNew: false,
      hasCustomization: true
    },
    {
      id: 'bachelor-law',
      name: '法学学士袍',
      description: '法学学士学位服，公正严明，法理昭彰',
      images: ['/photo/xueweifu/00_02_00__23408a61__2321569e_04_00.jpg'],
      thumbnail: '/photo/xueweifu/00_02_00__23408a61__2321569e_04_00.jpg',
      price: 899.00,
      originalPrice: 1299.00,
      category: '学士袍',
      brand: 'DiCreate',
      rating: 4.8,
      reviewCount: 245,
      sales: 334,
      stock: 76,
      tags: ['法学专用', '热销'],
      specifications: {
        '材质': '优质涤纶',
        '重量': '500g',
        '保养': '干洗'
      },
      colors: ['黑色'],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      isFavorite: false,
      isNew: false,
      hasCustomization: true
    },
    {
      id: 'bachelor-management',
      name: '管理学学士袍',
      description: '管理学学士学位服，运筹帷幄，决胜千里',
      images: ['/photo/xueweifu/00_02_00__23175691__2321569e_04_00.jpg'],
      thumbnail: '/photo/xueweifu/00_02_00__23175691__2321569e_04_00.jpg',
      price: 899.00,
      originalPrice: 1299.00,
      category: '学士袍',
      brand: 'DiCreate',
      rating: 4.6,
      reviewCount: 198,
      sales: 267,
      stock: 63,
      tags: ['管理专用', '商务'],
      specifications: {
        '材质': '优质涤纶',
        '重量': '500g',
        '保养': '干洗'
      },
      colors: ['黑色'],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      isFavorite: false,
      isNew: false,
      hasCustomization: true
    }
  ]

  // 加载商品数据
  const loadProducts = async () => {
    setLoading(true)
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      let filteredProducts = [...mockProducts]
      
      // 应用筛选
      if (selectedCategory && selectedCategory !== 'all') {
        if (selectedCategory === 'degree-clothing') {
          filteredProducts = filteredProducts.filter(p => p.category === '学士袍')
        } else if (selectedCategory === 'new') {
          filteredProducts = filteredProducts.filter(p => p.isNew)
        } else if (selectedCategory === 'bestsellers') {
          filteredProducts = filteredProducts.filter(p => p.sales > 300)
        }
      }
      
      // 搜索过滤
      if (searchTerm) {
        filteredProducts = filteredProducts.filter(p => 
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.description.toLowerCase().includes(searchTerm.toLowerCase())
        )
      }
      
      // 排序
      switch (sortBy) {
        case 'price-asc':
          filteredProducts.sort((a, b) => a.price - b.price)
          break
        case 'price-desc':
          filteredProducts.sort((a, b) => b.price - a.price)
          break
        case 'rating':
          filteredProducts.sort((a, b) => b.rating - a.rating)
          break
        case 'sales':
          filteredProducts.sort((a, b) => b.sales - a.sales)
          break
      }
      
      setTotal(filteredProducts.length)
      
      // 分页
      const startIndex = (currentPage - 1) * pageSize
      const endIndex = startIndex + pageSize
      const paginatedProducts = filteredProducts.slice(startIndex, endIndex)
      
      setProducts(paginatedProducts)
    } catch (error) {
      message.error('加载商品失败')
    } finally {
      setLoading(false)
    }
  }

  // 处理商品点击
  const handleProductClick = (productId: string) => {
    navigate(`/product/${productId}`)
  }

  // 处理收藏
  const handleFavorite = (productId: string) => {
    setProducts(prev => prev.map(p => 
      p.id === productId ? { ...p, isFavorite: !p.isFavorite } : p
    ))
    message.success('已添加到收藏夹')
  }

  // 渲染购物车内容
  const renderCartContent = () => {
    if (items.length === 0) {
      return (
        <Empty 
          description="购物车为空"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      )
    }

    const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)

    return (
      <div className="space-y-4">
        <List
          dataSource={items}
          renderItem={(item) => (
            <List.Item
              actions={[
                <Button 
                  type="text" 
                  icon={<DeleteOutlined />} 
                  onClick={() => removeItem(item.id)}
                  danger
                />
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar src={item.image} shape="square" size={48} />}
                title={item.name}
                description={
                  <div>
                    <div>¥{item.price.toFixed(2)}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <Button 
                        size="small" 
                        icon={<MinusOutlined />}
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      />
                      <span>{item.quantity}</span>
                      <Button 
                        size="small" 
                        icon={<PlusOutlined />}
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      />
                    </div>
                  </div>
                }
              />
            </List.Item>
          )}
        />
        
        <Divider />
        
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold">总计: ¥{totalAmount.toFixed(2)}</span>
        </div>
        
        <div className="space-y-2">
          <Button type="primary" block size="large">
            去结算
          </Button>
          <Button block onClick={clearCart}>
            清空购物车
          </Button>
        </div>
      </div>
    )
  }

  // 组件挂载时加载数据
  useEffect(() => {
    loadProducts()
  }, [selectedCategory, searchTerm, sortBy, currentPage, pageSize])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full">
        <Breadcrumb />
        
        {/* 页面标题 */}
        <div className="px-6 py-4 bg-white border-b">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">
              学位服定制商城
            </h1>
            <p className="text-gray-600 flex items-center justify-center gap-2">
              <span>为您提供完整的学位服产品目录</span>
              <span className="flex items-center gap-1">
                <span className="w-4 h-4 rounded-full bg-blue-500"></span>
                全国配送
              </span>
              <Tooltip title="全国范围内配送服务">
                <Button type="text" size="small" icon={<ExclamationCircleOutlined />} className="text-gray-400" />
              </Tooltip>
            </p>
          </div>
        </div>

        <div className="flex">
          {/* 左侧分类导航 */}
          <div className="w-64 bg-white border-r min-h-screen">
            <div className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">热门推荐</h3>
                  <div className="space-y-2">
                    <button 
                      className={cn(
                        "block w-full text-left text-sm py-1 px-2 rounded hover:bg-gray-100",
                        selectedCategory === 'degree-clothing' ? 'bg-gray-100 font-medium' : 'text-gray-600'
                      )}
                      onClick={() => setSelectedCategory('degree-clothing')}
                    >
                      学位服系列
                    </button>
                    <button 
                      className={cn(
                        "block w-full text-left text-sm py-1 px-2 rounded hover:bg-gray-100",
                        selectedCategory === 'new' ? 'bg-gray-100 font-medium' : 'text-gray-600'
                      )}
                      onClick={() => setSelectedCategory('new')}
                    >
                      新品上架
                    </button>
                    <button 
                      className={cn(
                        "block w-full text-left text-sm py-1 px-2 rounded hover:bg-gray-100",
                        selectedCategory === 'bestsellers' ? 'bg-gray-100 font-medium' : 'text-gray-600'
                      )}
                      onClick={() => setSelectedCategory('bestsellers')}
                    >
                      热销商品
                    </button>
                    <button 
                      className={cn(
                        "block w-full text-left text-sm py-1 px-2 rounded hover:bg-gray-100",
                        selectedCategory === 'custom' ? 'bg-gray-100 font-medium' : 'text-gray-600'
                      )}
                      onClick={() => setSelectedCategory('custom')}
                    >
                      定制服务
                    </button>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">商品分类</h3>
                  <div className="space-y-2">
                    <button 
                      className={cn(
                        "block w-full text-left text-sm py-1 px-2 rounded hover:bg-gray-100",
                        selectedCategory === 'all' ? 'bg-gray-100 font-medium' : 'text-gray-600'
                      )}
                      onClick={() => setSelectedCategory('all')}
                    >
                      全部商品
                    </button>
                    <div className="ml-2 space-y-1">
                      <button 
                        className={cn(
                          "block w-full text-left text-sm py-1 px-2 rounded hover:bg-gray-100",
                          selectedCategory === '学士袍' ? 'bg-gray-100 font-medium' : 'text-gray-600'
                        )}
                        onClick={() => setSelectedCategory('学士袍')}
                      >
                        学士袍
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 右侧主内容区 */}
          <div className="flex-1">
            {/* 搜索和筛选栏 */}
            <div className="bg-white border-b px-6 py-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 flex-1">
                  <Search
                    placeholder="搜索商品..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onSearch={loadProducts}
                    style={{ width: 300 }}
                    enterButton
                  />
                  
                  <Select
                    value={sortBy}
                    onChange={setSortBy}
                    style={{ width: 150 }}
                  >
                    <Option value="default">默认排序</Option>
                    <Option value="price-asc">价格从低到高</Option>
                    <Option value="price-desc">价格从高到低</Option>
                    <Option value="rating">评分最高</Option>
                    <Option value="sales">销量最高</Option>
                  </Select>
                  
                  <Button 
                    icon={<FilterOutlined />}
                    onClick={() => setFilterVisible(true)}
                  >
                    高级筛选
                  </Button>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button.Group>
                    <Button 
                      icon={<AppstoreOutlined />}
                      type={viewMode === 'grid' ? 'primary' : 'default'}
                      onClick={() => setViewMode('grid')}
                    />
                    <Button 
                      icon={<BarsOutlined />}
                      type={viewMode === 'list' ? 'primary' : 'default'}
                      onClick={() => setViewMode('list')}
                    />
                  </Button.Group>
                  
                  <Badge count={items.length} showZero>
                    <Button 
                      icon={<ShoppingCartOutlined />}
                      onClick={() => setCartVisible(true)}
                    >
                      购物车
                    </Button>
                  </Badge>
                </div>
              </div>
            </div>

            {/* 商品列表 */}
            <div className="p-6">
              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                  {Array.from({ length: 9 }).map((_, index) => (
                    <CardSkeleton key={index} />
                  ))}
                </div>
              ) : products.length === 0 ? (
                <Empty description="暂无商品" />
              ) : (
                <div className={cn(
                  viewMode === 'grid' 
                    ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6'
                    : 'space-y-4'
                )}>
                  {products.map((product) => (
                    <Card
                      key={product.id}
                      hoverable
                      className="overflow-hidden cursor-pointer h-full"
                      onClick={() => handleProductClick(product.id)}
                      cover={
                        <div className="relative">
                          <Image
                            alt={product.name}
                            src={product.thumbnail}
                            className="w-full h-32 sm:h-36 md:h-40 object-cover"
                            preview={false}
                          />
                          
                          {/* 商品标签 */}
                          <div className="absolute top-1 left-1 flex flex-col gap-1">
                            {product.isNew && (
                              <span className="bg-red-500 text-white text-xs px-1 py-0.5 rounded">新品</span>
                            )}
                            {product.isHot && (
                              <span className="bg-orange-500 text-white text-xs px-1 py-0.5 rounded">热销</span>
                            )}
                          </div>
                          
                          {/* 收藏按钮 */}
                          <Button
                            type="text"
                            size="small"
                            icon={product.isFavorite ? <HeartFilled className="text-red-500" /> : <HeartOutlined />}
                            className="absolute top-1 right-1 bg-white/80 hover:bg-white w-6 h-6 flex items-center justify-center p-0"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleFavorite(product.id)
                            }}
                          />
                        </div>
                      }
                      styles={{ body: { padding: '8px' } }}
                    >
                      <div className="space-y-1">
                        <h3 className="font-medium text-gray-900 text-sm line-clamp-2 leading-tight">
                          {product.name}
                        </h3>
                        
                        <div className="flex items-center gap-1">
                          <Rate disabled defaultValue={product.rating} className="text-xs" />
                          <span className="text-xs text-gray-500">({product.reviewCount})</span>
                        </div>
                        
                        {/* 标签 */}
                        {product.tags && product.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {product.tags.slice(0, 2).map((tag, index) => (
                              <Tag key={index} className="text-xs m-0 px-1 py-0 leading-4">
                                {tag}
                              </Tag>
                            ))}
                          </div>
                        )}
                        
                        {/* 尺码 */}
                        {product.sizes && product.sizes.length > 0 && (
                          <div className="text-xs text-gray-500">
                            尺码: {product.sizes.slice(0, 3).join('、')}{product.sizes.length > 3 ? '等' : ''}
                          </div>
                        )}
                        
                        {/* 价格 */}
                        <div className="flex items-center gap-1 pt-1">
                          <span className="text-base font-semibold text-red-600">
                            ¥{product.price.toFixed(0)}
                          </span>
                          {product.originalPrice && product.originalPrice > product.price && (
                            <span className="text-xs text-gray-400 line-through">
                              ¥{product.originalPrice.toFixed(0)}
                            </span>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            {/* 分页 */}
            {!loading && products.length > 0 && (
              <div className="flex justify-center px-6 pb-6">
                <Pagination
                  current={currentPage}
                  pageSize={pageSize}
                  total={total}
                  showSizeChanger
                  showQuickJumper
                  showTotal={(total, range) => `第 ${range[0]}-${range[1]} 项，共 ${total} 项`}
                  onChange={(page, size) => {
                    setCurrentPage(page)
                    setPageSize(size || 12)
                    loadProducts()
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 筛选抽屉 */}
      <Drawer
        title="高级筛选"
        placement="right"
        onClose={() => setFilterVisible(false)}
        open={filterVisible}
        width={400}
      >
        <Form layout="vertical">
          <Form.Item label="价格区间">
            <Slider
              range
              min={0}
              max={2000}
              defaultValue={[0, 1000]}
              onChange={(value) => setFilters(prev => ({ ...prev, priceRange: value as [number, number] }))}
            />
          </Form.Item>
          
          <Form.Item label="品牌">
            <Checkbox.Group
              options={[
                { label: 'DiCreate', value: 'dicreate' },
                { label: '学位服专家', value: 'expert' },
                { label: '典礼服饰', value: 'ceremony' }
              ]}
              onChange={(values) => setFilters(prev => ({ ...prev, brand: values as string[] }))}
            />
          </Form.Item>
          
          <Form.Item label="评分">
            <Rate
              onChange={(value) => setFilters(prev => ({ ...prev, rating: value }))}
            />
          </Form.Item>
          
          <Form.Item>
            <Checkbox
              onChange={(e) => setFilters(prev => ({ ...prev, inStock: e.target.checked }))}
            >
              仅显示有库存商品
            </Checkbox>
          </Form.Item>
          
          <Form.Item>
            <Space>
              <Button type="primary" onClick={() => {
                setFilterVisible(false)
                loadProducts()
              }}>
                应用筛选
              </Button>
              <Button onClick={() => {
                setFilters({})
                setFilterVisible(false)
                loadProducts()
              }}>
                重置
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Drawer>

      {/* 购物车抽屉 */}
      <Drawer
        title="购物车"
        placement="right"
        onClose={() => setCartVisible(false)}
        open={cartVisible}
        width={400}
        className="bg-white"
      >
        {renderCartContent()}
      </Drawer>
    </div>
  )
}

export default Mall