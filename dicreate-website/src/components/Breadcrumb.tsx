import React from 'react'
import { Breadcrumb as AntBreadcrumb } from 'antd'
import { Link, useLocation } from 'react-router-dom'
import { HomeOutlined } from '@ant-design/icons'

interface BreadcrumbItem {
  title: string
  path?: string
  icon?: React.ReactNode
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[]
  separator?: string
  className?: string
}

// 路由到面包屑的映射
const routeMap: Record<string, BreadcrumbItem[]> = {
  '/': [{ title: '首页', path: '/', icon: <HomeOutlined /> }],
  '/resources': [
    { title: '首页', path: '/', icon: <HomeOutlined /> },
    { title: '平台资源库', path: '/resources' }
  ],
  '/resources/fabrics': [
    { title: '首页', path: '/', icon: <HomeOutlined /> },
    { title: '平台资源库', path: '/resources' },
    { title: '面料库' }
  ],
  '/resources/cases': [
    { title: '首页', path: '/', icon: <HomeOutlined /> },
    { title: '平台资源库', path: '/resources' },
    { title: '案例库' }
  ],
  '/resources/models': [
    { title: '首页', path: '/', icon: <HomeOutlined /> },
    { title: '平台资源库', path: '/resources' },
    { title: '模特库' }
  ],
  '/mall': [
    { title: '首页', path: '/', icon: <HomeOutlined /> },
    { title: '平台商城', path: '/mall' }
  ],
  '/mall/category': [
    { title: '首页', path: '/', icon: <HomeOutlined /> },
    { title: '平台商城', path: '/mall' },
    { title: '商品分类' }
  ],
  '/ai-design': [
    { title: '首页', path: '/', icon: <HomeOutlined /> },
    { title: 'AI服装设计', path: '/ai-design' }
  ],
  '/trends': [
    { title: '首页', path: '/', icon: <HomeOutlined /> },
    { title: '流行趋势', path: '/trends' }
  ],
  '/about': [
    { title: '首页', path: '/', icon: <HomeOutlined /> },
    { title: '关于我们', path: '/about' }
  ],
  '/login': [
    { title: '首页', path: '/', icon: <HomeOutlined /> },
    { title: '登录' }
  ]
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ 
  items, 
  separator = '/', 
  className = '' 
}) => {
  const location = useLocation()
  
  // 如果没有传入items，则根据当前路由自动生成
  const breadcrumbItems = items || routeMap[location.pathname] || [
    { title: '首页', path: '/', icon: <HomeOutlined /> },
    { title: '页面未找到' }
  ]

  // 转换为Ant Design Breadcrumb所需的格式
  const antdItems = breadcrumbItems.map((item, index) => {
    const isLast = index === breadcrumbItems.length - 1
    
    return {
      key: item.path || item.title,
      title: item.path && !isLast ? (
        <Link to={item.path} className="text-gray-600 hover:text-blue-600 transition-colors">
          {item.icon && <span className="mr-1">{item.icon}</span>}
          {item.title}
        </Link>
      ) : (
        <span className={isLast ? 'text-gray-900 font-medium' : 'text-gray-600'}>
          {item.icon && <span className="mr-1">{item.icon}</span>}
          {item.title}
        </span>
      )
    }
  })

  return (
    <div className={`bg-white px-6 py-3 border-b border-gray-200 ${className}`}>
      <AntBreadcrumb
        separator={separator}
        items={antdItems}
        className="text-sm"
      />
    </div>
  )
}

export default Breadcrumb
export type { BreadcrumbItem, BreadcrumbProps }