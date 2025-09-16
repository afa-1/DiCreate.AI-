import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Row,
  Col,
  Button,
  Rate,
  Tag,
  Space,
  Divider,
  Image,
  Tabs,
  Card,
  Badge,
  message,
  Spin
} from 'antd'
import {
  HeartOutlined,
  HeartFilled,
  ShareAltOutlined,
  ShoppingCartOutlined,
  ArrowLeftOutlined
} from '@ant-design/icons'
import { useCartStore } from '../store/cartStore'
import type { CartItem } from '../store/cartStore'
import Breadcrumb from '../components/Breadcrumb'

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
  isFavorite?: boolean
  isNew?: boolean
  isHot?: boolean
  discount?: number
  colors?: string[]
  sizes?: string[]
}

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { addItem } = useCartStore()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState<string>('')
  const [selectedColor, setSelectedColor] = useState<string>('')
  const [isFavorite, setIsFavorite] = useState(false)

  // 模拟商品数据
  const mockProduct: Product = {
    id: id || '1',
    name: '经典学士袍 - 理学学士',
    description: '采用优质面料制作，符合学位服标准规范，适合理学学士学位授予仪式使用。',
    images: [
      '/photo/xueweifu/00_02_00__23175691__2321569e_04_00.jpg',
      '/photo/xueweifu/00_02_00__23408a61__2321569e_04_00.jpg',
      '/photo/xueweifu/00_02_00__23433565__2321569e_04_00.jpg',
      '/photo/xueweifu/00_02_00__2363b9d3__2321569e_04_00.jpg',
      '/photo/xueweifu/00_02_00__237a848f__2321569e_04_00.jpg'
    ],
    thumbnail: '/photo/xueweifu/00_02_00__23175691__2321569e_04_00.jpg',
    price: 299.00,
    originalPrice: 399.00,
    category: '学位服',
    subcategory: '学士袍',
    brand: 'DiCreate',
    rating: 4.8,
    reviewCount: 156,
    sales: 1200,
    stock: 50,
    tags: ['热销', '经典款', '标准规范'],
    specifications: {
      '面料': '涤纶混纺',
      '颜色': '黑色',
      '适用场合': '学位授予仪式',
      '洗涤方式': '干洗'
    },
    isFavorite: false,
    isNew: false,
    isHot: true,
    discount: 25,
    colors: ['黑色', '深蓝色'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL']
  }

  useEffect(() => {
    // 模拟API调用
    const fetchProduct = async () => {
      setLoading(true)
      try {
        // 这里应该是真实的API调用
        await new Promise(resolve => setTimeout(resolve, 1000))
        setProduct(mockProduct)
        setIsFavorite(mockProduct.isFavorite || false)
        if (mockProduct.colors && mockProduct.colors.length > 0) {
          setSelectedColor(mockProduct.colors[0])
        }
        if (mockProduct.sizes && mockProduct.sizes.length > 0) {
          setSelectedSize(mockProduct.sizes[0])
        }
      } catch (error) {
        message.error('加载商品信息失败')
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  const handleAddToCart = () => {
    if (!product) return
    
    addItem({
      id: `cart_${product.id}_${Date.now()}`,
      name: product.name,
      price: product.price,
      image: product.thumbnail,
      size: selectedSize,
      color: selectedColor,
      quantity: 1,
      category: product.category,
      selectedOptions: {
        size: selectedSize,
        color: selectedColor
      }
    })
    message.success('已添加到购物车')
  }

  const handleFavorite = () => {
    setIsFavorite(!isFavorite)
    message.success(isFavorite ? '已取消收藏' : '已添加到收藏')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spin size="large" />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h3>商品不存在</h3>
          <Button onClick={() => navigate('/mall')}>返回商城</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Breadcrumb />
      
      <div className="w-full px-4 py-6">
        {/* 返回按钮 */}
        <Button 
          icon={<ArrowLeftOutlined />} 
          onClick={() => navigate('/mall')}
          className="mb-4"
        >
          返回商城
        </Button>

        <Row gutter={[32, 32]}>
          {/* 商品图片 */}
          <Col xs={24} md={12}>
            <div className="bg-white rounded-lg p-4">
              <div className="flex gap-4">
                {/* 缩略图列表 */}
                <div className="flex flex-col gap-2 w-20">
                  {product.images.map((image, index) => (
                    <div
                      key={index}
                      className={`cursor-pointer border-2 rounded ${
                        selectedImage === index ? 'border-blue-500' : 'border-gray-200'
                      }`}
                      onClick={() => setSelectedImage(index)}
                    >
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="w-16 h-16 object-cover rounded"
                      />
                    </div>
                  ))}
                </div>
                
                {/* 主图 */}
                <div className="flex-1">
                  <Image
                    src={product.images[selectedImage]}
                    alt={product.name}
                    className="w-full rounded-lg"
                    style={{ maxHeight: '500px', objectFit: 'cover' }}
                  />
                </div>
              </div>
            </div>
          </Col>

          {/* 商品信息 */}
          <Col xs={24} md={12}>
            <div className="bg-white rounded-lg p-6 relative">
              {/* 右上角分享和收藏按钮 */}
              <div className="absolute top-4 right-4 flex gap-2">
                <Button
                  type="text"
                  size="small"
                  icon={<ShareAltOutlined />}
                  className="text-gray-400 hover:text-gray-600"
                />
                <Button
                  type="text"
                  size="small"
                  icon={isFavorite ? <HeartFilled /> : <HeartOutlined />}
                  onClick={handleFavorite}
                  className={isFavorite ? 'text-red-500' : 'text-gray-400 hover:text-gray-600'}
                />
              </div>
              
              {/* 商品标题和标签 */}
              <div className="mb-4 pr-20">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h1>
                <div className="flex flex-wrap gap-2 mb-3">
                  {product.tags.map((tag, index) => (
                    <Tag key={index} color="blue">{tag}</Tag>
                  ))}
                  {product.isHot && <Badge.Ribbon text="热销" color="red" />}
                </div>
              </div>

              {/* 评分和销量 */}
              <div className="flex items-center gap-4 mb-4">
                <Rate disabled defaultValue={product.rating} />
                <span className="text-gray-600">({product.reviewCount} 条评价)</span>
                <span className="text-gray-600">已售 {product.sales} 件</span>
              </div>

              {/* 价格 */}
              <div className="mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-bold text-red-500">¥{product.price.toFixed(2)}</span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="text-lg text-gray-500 line-through">
                      ¥{product.originalPrice.toFixed(2)}
                    </span>
                  )}
                  {product.discount && (
                    <Tag color="red">{product.discount}% OFF</Tag>
                  )}
                </div>
              </div>

              {/* 颜色选择 */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">颜色</h4>
                  <div className="flex gap-2">
                    {product.colors.map((color) => (
                      <Button
                        key={color}
                        type={selectedColor === color ? 'primary' : 'default'}
                        onClick={() => setSelectedColor(color)}
                      >
                        {color}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* 尺码选择 */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">尺码</h4>
                  <div className="flex gap-2">
                    {product.sizes.map((size) => (
                      <Button
                        key={size}
                        type={selectedSize === size ? 'primary' : 'default'}
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* 商品规格 */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-900 mb-3">商品规格</h4>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">品牌:</span>
                      <span className="font-medium">{product.brand}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">分类:</span>
                      <span className="font-medium">{product.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">材质:</span>
                      <span className="font-medium">{product.specifications?.material || '涤纶'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">适用场合:</span>
                      <span className="font-medium">{product.specifications?.occasion || '毕业典礼'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">洗涤方式:</span>
                      <span className="font-medium">{product.specifications?.care || '干洗'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">产地:</span>
                      <span className="font-medium">{product.specifications?.origin || '中国'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 库存信息 */}
              <div className="mb-6">
                <span className="text-sm text-gray-600">
                  库存: {product.stock > 0 ? `${product.stock} 件` : '缺货'}
                </span>
              </div>

              {/* 操作按钮 */}
              <div className="flex gap-3">
                <Button
                  type="primary"
                  size="large"
                  disabled={product.stock <= 0}
                  className="flex-1"
                >
                  {product.stock > 0 ? '开始设计' : '缺货'}
                </Button>
                <Button
                  size="large"
                  className="bg-gray-100 text-gray-600 border-gray-300 hover:bg-gray-200"
                  disabled={product.stock <= 0}
                >
                  直接购买
                </Button>
              </div>
            </div>
          </Col>
        </Row>

        {/* 商品详情标签页 */}
        <div className="mt-8">
          <Card>
            <Tabs
              items={[
                {
                  key: 'description',
                  label: '商品描述',
                  children: (
                    <div className="py-4">
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-semibold mb-3">产品介绍</h3>
                          <p className="text-gray-700 leading-relaxed mb-4">{product.description}</p>
                          <p className="text-gray-700 leading-relaxed">
                            本产品采用优质面料制作，工艺精良，细节考究。适合各种正式场合穿着，
                            展现庄重典雅的气质。每一件产品都经过严格的质量检验，确保品质卓越。
                          </p>
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-semibold mb-3">产品特点</h3>
                          <ul className="list-disc list-inside space-y-2 text-gray-700">
                            <li>优质面料，舒适透气</li>
                            <li>精工细作，品质保证</li>
                            <li>经典设计，庄重典雅</li>
                            <li>多种尺码，适合不同体型</li>
                            <li>易于保养，持久耐用</li>
                          </ul>
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-semibold mb-3">使用说明</h3>
                          <div className="bg-blue-50 p-4 rounded-lg">
                            <p className="text-gray-700 leading-relaxed">
                              <strong>穿着建议：</strong>建议在重要场合穿着，如毕业典礼、学术会议等正式活动。<br/>
                              <strong>保养方法：</strong>建议干洗，避免机洗和暴晒，悬挂保存以保持形状。<br/>
                              <strong>尺码选择：</strong>请参考尺码表选择合适的尺码，如有疑问可咨询客服。
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                },
                {
                  key: 'specifications',
                  label: '规格参数',
                  children: (
                    <div className="py-4">
                      <Row gutter={[16, 16]}>
                        {Object.entries(product.specifications).map(([key, value]) => (
                          <Col span={12} key={key}>
                            <div className="flex justify-between py-2 border-b border-gray-100">
                              <span className="text-gray-600">{key}</span>
                              <span className="text-gray-900">{value}</span>
                            </div>
                          </Col>
                        ))}
                      </Row>
                    </div>
                  )
                },
                {
                  key: 'size-chart',
                  label: '尺码表',
                  children: (
                    <div className="py-4">
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse border border-gray-300">
                          <thead>
                            <tr className="bg-gray-50">
                              <th className="border border-gray-300 px-4 py-2 text-left">尺码</th>
                              <th className="border border-gray-300 px-4 py-2 text-left">身高 (cm)</th>
                              <th className="border border-gray-300 px-4 py-2 text-left">胸围 (cm)</th>
                              <th className="border border-gray-300 px-4 py-2 text-left">肩宽 (cm)</th>
                              <th className="border border-gray-300 px-4 py-2 text-left">衣长 (cm)</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="border border-gray-300 px-4 py-2 font-medium">XS</td>
                              <td className="border border-gray-300 px-4 py-2">155-160</td>
                              <td className="border border-gray-300 px-4 py-2">84-88</td>
                              <td className="border border-gray-300 px-4 py-2">38-40</td>
                              <td className="border border-gray-300 px-4 py-2">140-145</td>
                            </tr>
                            <tr className="bg-gray-50">
                              <td className="border border-gray-300 px-4 py-2 font-medium">S</td>
                              <td className="border border-gray-300 px-4 py-2">160-165</td>
                              <td className="border border-gray-300 px-4 py-2">88-92</td>
                              <td className="border border-gray-300 px-4 py-2">40-42</td>
                              <td className="border border-gray-300 px-4 py-2">145-150</td>
                            </tr>
                            <tr>
                              <td className="border border-gray-300 px-4 py-2 font-medium">M</td>
                              <td className="border border-gray-300 px-4 py-2">165-170</td>
                              <td className="border border-gray-300 px-4 py-2">92-96</td>
                              <td className="border border-gray-300 px-4 py-2">42-44</td>
                              <td className="border border-gray-300 px-4 py-2">150-155</td>
                            </tr>
                            <tr className="bg-gray-50">
                              <td className="border border-gray-300 px-4 py-2 font-medium">L</td>
                              <td className="border border-gray-300 px-4 py-2">170-175</td>
                              <td className="border border-gray-300 px-4 py-2">96-100</td>
                              <td className="border border-gray-300 px-4 py-2">44-46</td>
                              <td className="border border-gray-300 px-4 py-2">155-160</td>
                            </tr>
                            <tr>
                              <td className="border border-gray-300 px-4 py-2 font-medium">XL</td>
                              <td className="border border-gray-300 px-4 py-2">175-180</td>
                              <td className="border border-gray-300 px-4 py-2">100-104</td>
                              <td className="border border-gray-300 px-4 py-2">46-48</td>
                              <td className="border border-gray-300 px-4 py-2">160-165</td>
                            </tr>
                          </tbody>
                        </table>
                        <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
                          <p className="text-sm text-gray-600">
                            <strong>温馨提示：</strong>以上尺码为参考数据，实际尺寸可能存在1-2cm误差。
                            建议根据个人体型选择合适的尺码，如有疑问请咨询客服。
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                },
                {
                  key: 'reviews',
                  label: `用户评价 (${product.reviewCount})`,
                  children: (
                    <div className="py-4">
                      <div className="text-center text-gray-500 py-8">
                        暂无评价数据
                      </div>
                    </div>
                  )
                }
              ]}
            />
          </Card>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail