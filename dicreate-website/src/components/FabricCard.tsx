import React, { useState } from 'react'
import { Card, Tag, Button, Space, Image, Tooltip, Modal } from 'antd'
import { 
  HeartOutlined, 
  HeartFilled, 
  EyeOutlined, 
  DownloadOutlined,
  InfoCircleOutlined,
  ShoppingCartOutlined
} from '@ant-design/icons'
import { cn } from '../lib/utils'

interface FabricInfo {
  id: string
  name: string
  type: string
  image: string
  thumbnail?: string
  description?: string
  parameters: {
    composition: string // 成分
    weight: string // 克重
    width: string // 门幅
    stretch: string // 弹性
    color: string // 颜色
    pattern?: string // 花型
  }
  tags: string[]
  price?: number
  supplier?: string
  inStock: boolean
  isFavorite?: boolean
  downloadUrl?: string
}

interface FabricCardProps {
  fabric: FabricInfo
  size?: 'small' | 'default' | 'large'
  showActions?: boolean
  showPrice?: boolean
  className?: string
  onFavorite?: (fabricId: string, isFavorite: boolean) => void
  onView?: (fabric: FabricInfo) => void
  onDownload?: (fabric: FabricInfo) => void
  onAddToCart?: (fabric: FabricInfo) => void
}

const FabricCard: React.FC<FabricCardProps> = ({
  fabric,
  size = 'default',
  showActions = true,
  showPrice = false,
  className = '',
  onFavorite,
  onView,
  onDownload,
  onAddToCart
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isFavorite, setIsFavorite] = useState(fabric.isFavorite || false)
  const [imageLoading, setImageLoading] = useState(true)

  // 处理收藏
  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation()
    const newFavoriteState = !isFavorite
    setIsFavorite(newFavoriteState)
    onFavorite?.(fabric.id, newFavoriteState)
  }

  // 处理查看详情
  const handleView = () => {
    setIsModalVisible(true)
    onView?.(fabric)
  }

  // 处理下载
  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation()
    onDownload?.(fabric)
  }

  // 处理加入购物车
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    onAddToCart?.(fabric)
  }

  // 卡片尺寸配置
  const sizeConfig = {
    small: {
      cardHeight: 'h-64',
      imageHeight: 'h-32',
      titleSize: 'text-sm',
      descSize: 'text-xs'
    },
    default: {
      cardHeight: 'h-80',
      imageHeight: 'h-40',
      titleSize: 'text-base',
      descSize: 'text-sm'
    },
    large: {
      cardHeight: 'h-96',
      imageHeight: 'h-48',
      titleSize: 'text-lg',
      descSize: 'text-base'
    }
  }

  const config = sizeConfig[size]

  // 操作按钮
  const actions = showActions ? [
    <Tooltip title={isFavorite ? '取消收藏' : '收藏'} key="favorite">
      <Button
        type="text"
        icon={isFavorite ? <HeartFilled className="text-red-500" /> : <HeartOutlined />}
        onClick={handleFavorite}
        className="hover:bg-red-50"
      />
    </Tooltip>,
    <Tooltip title="查看详情" key="view">
      <Button
        type="text"
        icon={<EyeOutlined />}
        onClick={handleView}
        className="hover:bg-blue-50"
      />
    </Tooltip>,
    fabric.downloadUrl && (
      <Tooltip title="下载" key="download">
        <Button
          type="text"
          icon={<DownloadOutlined />}
          onClick={handleDownload}
          className="hover:bg-green-50"
        />
      </Tooltip>
    ),
    showPrice && fabric.price && (
      <Tooltip title="加入购物车" key="cart">
        <Button
          type="text"
          icon={<ShoppingCartOutlined />}
          onClick={handleAddToCart}
          disabled={!fabric.inStock}
          className="hover:bg-orange-50"
        />
      </Tooltip>
    )
  ].filter(Boolean) : undefined

  return (
    <>
      <Card
        hoverable
        className={cn(
          'fabric-card transition-all duration-300 hover:shadow-lg',
          config.cardHeight,
          !fabric.inStock && 'opacity-60',
          className
        )}
        cover={
          <div className={cn('relative overflow-hidden bg-gray-100', config.imageHeight)}>
            <Image
              src={fabric.thumbnail || fabric.image}
              alt={fabric.name}
              className="w-full h-full object-cover"
              preview={false}
              onLoad={() => setImageLoading(false)}
              fallback="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OTk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPumdouaWmOWbvueJhzwvdGV4dD48L3N2Zz4="
            />
            
            {/* 库存状态标识 */}
            {!fabric.inStock && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <span className="text-white font-medium">缺货</span>
              </div>
            )}
            
            {/* 收藏按钮（悬浮显示） */}
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                type="text"
                size="small"
                icon={isFavorite ? <HeartFilled className="text-red-500" /> : <HeartOutlined className="text-white" />}
                onClick={handleFavorite}
                className={cn(
                  'shadow-md',
                  isFavorite ? 'bg-white hover:bg-gray-50' : 'bg-black bg-opacity-30 hover:bg-opacity-50 text-white'
                )}
              />
            </div>
          </div>
        }
        actions={actions}
        onClick={handleView}
      >
        <Card.Meta
          title={
            <div className="flex items-center justify-between">
              <span className={cn('font-medium truncate', config.titleSize)}>
                {fabric.name}
              </span>
              {showPrice && fabric.price && (
                <span className="text-blue-600 font-bold ml-2">
                  ¥{fabric.price.toFixed(2)}
                </span>
              )}
            </div>
          }
          description={
            <div className="space-y-2">
              {/* 面料类型 */}
              <div className="flex items-center gap-1">
                <Tag color="blue">{fabric.type}</Tag>
                {fabric.supplier && (
                  <Tag color="green">{fabric.supplier}</Tag>
                )}
              </div>
              
              {/* 关键参数 */}
              <div className={cn('text-gray-600 space-y-1', config.descSize)}>
                <div>成分: {fabric.parameters.composition}</div>
                <div className="flex justify-between">
                  <span>克重: {fabric.parameters.weight}</span>
                  <span>门幅: {fabric.parameters.width}</span>
                </div>
              </div>
              
              {/* 标签 */}
              {fabric.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {fabric.tags.slice(0, 3).map((tag, index) => (
                    <Tag key={index} className="text-xs">
                      {tag}
                    </Tag>
                  ))}
                  {fabric.tags.length > 3 && (
                    <Tag className="text-xs">+{fabric.tags.length - 3}</Tag>
                  )}
                </div>
              )}
            </div>
          }
        />
      </Card>

      {/* 详情模态框 */}
      <Modal
        title={fabric.name}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setIsModalVisible(false)}>
            关闭
          </Button>,
          fabric.downloadUrl && (
            <Button key="download" type="primary" icon={<DownloadOutlined />} onClick={() => handleDownload({} as React.MouseEvent)}>
              下载
            </Button>
          ),
          showPrice && fabric.price && fabric.inStock && (
            <Button key="cart" type="primary" icon={<ShoppingCartOutlined />} onClick={() => handleAddToCart({} as React.MouseEvent)}>
              加入购物车
            </Button>
          )
        ].filter(Boolean)}
        width={800}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 图片预览 */}
          <div>
            <Image
              src={fabric.image}
              alt={fabric.name}
              className="w-full rounded-lg"
            />
          </div>
          
          {/* 详细信息 */}
          <div className="space-y-4">
            {fabric.description && (
              <div>
                <h4 className="font-medium mb-2 flex items-center gap-1">
                  <InfoCircleOutlined className="text-blue-500" />
                  描述
                </h4>
                <p className="text-gray-600">{fabric.description}</p>
              </div>
            )}
            
            <div>
              <h4 className="font-medium mb-2">技术参数</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">成分:</span>
                  <span>{fabric.parameters.composition}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">克重:</span>
                  <span>{fabric.parameters.weight}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">门幅:</span>
                  <span>{fabric.parameters.width}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">弹性:</span>
                  <span>{fabric.parameters.stretch}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">颜色:</span>
                  <span>{fabric.parameters.color}</span>
                </div>
                {fabric.parameters.pattern && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">花型:</span>
                    <span>{fabric.parameters.pattern}</span>
                  </div>
                )}
              </div>
            </div>
            
            {/* 标签 */}
            {fabric.tags.length > 0 && (
              <div>
                <h4 className="font-medium mb-2">标签</h4>
                <div className="flex flex-wrap gap-1">
                  {fabric.tags.map((tag, index) => (
                    <Tag key={index} color="blue">{tag}</Tag>
                  ))}
                </div>
              </div>
            )}
            
            {/* 价格和库存 */}
            {showPrice && (
              <div className="pt-4 border-t">
                {fabric.price && (
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">价格:</span>
                    <span className="text-xl font-bold text-blue-600">¥{fabric.price.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">库存状态:</span>
                  <Tag color={fabric.inStock ? 'green' : 'red'}>
                    {fabric.inStock ? '有库存' : '缺货'}
                  </Tag>
                </div>
              </div>
            )}
          </div>
        </div>
      </Modal>
    </>
  )
}

export default FabricCard
export type { FabricInfo, FabricCardProps }