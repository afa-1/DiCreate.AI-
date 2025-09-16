import React from 'react'
import { Spin, SpinProps } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { cn } from '../lib/utils'

interface LoadingSpinnerProps extends Omit<SpinProps, 'indicator'> {
  /** 加载文本 */
  text?: string
  /** 是否显示文本 */
  showText?: boolean
  /** 尺寸 */
  size?: 'small' | 'default' | 'large'
  /** 是否全屏覆盖 */
  overlay?: boolean
  /** 自定义类名 */
  className?: string
  /** 自定义样式 */
  style?: React.CSSProperties
  /** 图标类型 */
  iconType?: 'default' | 'dots' | 'pulse' | 'bounce'
}

// 自定义加载图标组件
const CustomLoadingIcon: React.FC<{ type: string; size: string }> = ({ type, size }) => {
  const sizeMap = {
    small: 'w-4 h-4',
    default: 'w-6 h-6',
    large: 'w-8 h-8'
  }

  const sizeClass = sizeMap[size as keyof typeof sizeMap] || sizeMap.default

  switch (type) {
    case 'dots':
      return (
        <div className={cn('flex space-x-1', sizeClass)}>
          <div className="w-1 h-1 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-1 h-1 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-1 h-1 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      )
    
    case 'pulse':
      return (
        <div className={cn('bg-blue-500 rounded-full animate-pulse', sizeClass)}></div>
      )
    
    case 'bounce':
      return (
        <div className={cn('bg-blue-500 rounded-full animate-bounce', sizeClass)}></div>
      )
    
    default:
      return <LoadingOutlined className={cn('text-blue-500', sizeClass)} spin />
  }
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  text = '加载中...',
  showText = true,
  size = 'default',
  overlay = false,
  className = '',
  style,
  iconType = 'default',
  spinning = true,
  ...restProps
}) => {
  // 自定义指示器
  const indicator = iconType === 'default' 
    ? <LoadingOutlined style={{ fontSize: size === 'large' ? 32 : size === 'small' ? 16 : 24 }} spin />
    : <CustomLoadingIcon type={iconType} size={size} />

  const spinnerContent = (
    <div className={cn(
      'flex flex-col items-center justify-center',
      overlay && 'fixed inset-0 bg-white bg-opacity-80 backdrop-blur-sm z-50',
      !overlay && 'p-8',
      className
    )} style={style}>
      <Spin
        indicator={indicator}
        size={size}
        spinning={spinning}
        {...restProps}
      />
      {showText && text && (
        <div className={cn(
          'mt-3 text-gray-600 font-medium',
          size === 'large' ? 'text-base' : size === 'small' ? 'text-xs' : 'text-sm'
        )}>
          {text}
        </div>
      )}
    </div>
  )

  return spinnerContent
}

// 页面级加载组件
const PageLoading: React.FC<{ text?: string }> = ({ text = '页面加载中...' }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <LoadingSpinner
        size="large"
        text={text}
        iconType="default"
      />
    </div>
  )
}

// 内容区域加载组件
const ContentLoading: React.FC<{ text?: string; height?: number | string }> = ({ 
  text = '内容加载中...', 
  height = 200 
}) => {
  return (
    <div 
      className="flex items-center justify-center bg-gray-50 rounded-lg"
      style={{ height }}
    >
      <LoadingSpinner
        size="default"
        text={text}
        iconType="default"
      />
    </div>
  )
}

// 按钮加载组件
const ButtonLoading: React.FC<{ text?: string }> = ({ text = '处理中...' }) => {
  return (
    <LoadingSpinner
      size="small"
      text={text}
      showText={false}
      iconType="default"
      className="inline-flex items-center"
    />
  )
}

// 卡片加载骨架屏
const CardSkeleton: React.FC<{ rows?: number }> = ({ rows = 3 }) => {
  return (
    <div className="animate-pulse">
      <div className="bg-gray-200 h-48 rounded-t-lg mb-4"></div>
      <div className="px-4 pb-4">
        <div className="bg-gray-200 h-4 rounded mb-2"></div>
        {Array.from({ length: rows }).map((_, index) => (
          <div 
            key={index} 
            className="bg-gray-200 h-3 rounded mb-2" 
            style={{ width: `${Math.random() * 40 + 60}%` }}
          ></div>
        ))}
      </div>
    </div>
  )
}

// 列表加载骨架屏
const ListSkeleton: React.FC<{ items?: number }> = ({ items = 5 }) => {
  return (
    <div className="space-y-4">
      {Array.from({ length: items }).map((_, index) => (
        <div key={index} className="animate-pulse flex items-center space-x-4">
          <div className="bg-gray-200 h-12 w-12 rounded-full"></div>
          <div className="flex-1">
            <div className="bg-gray-200 h-4 rounded mb-2" style={{ width: `${Math.random() * 40 + 40}%` }}></div>
            <div className="bg-gray-200 h-3 rounded" style={{ width: `${Math.random() * 60 + 20}%` }}></div>
          </div>
        </div>
      ))}
    </div>
  )
}

// 表格加载骨架屏
const TableSkeleton: React.FC<{ rows?: number; columns?: number }> = ({ 
  rows = 5, 
  columns = 4 
}) => {
  return (
    <div className="animate-pulse">
      {/* 表头 */}
      <div className="flex space-x-4 mb-4 pb-2 border-b">
        {Array.from({ length: columns }).map((_, index) => (
          <div key={index} className="flex-1 bg-gray-200 h-4 rounded"></div>
        ))}
      </div>
      
      {/* 表格行 */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex space-x-4 mb-3">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <div 
              key={colIndex} 
              className="flex-1 bg-gray-200 h-3 rounded"
              style={{ width: `${Math.random() * 30 + 70}%` }}
            ></div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default LoadingSpinner
export {
  PageLoading,
  ContentLoading,
  ButtonLoading,
  CardSkeleton,
  ListSkeleton,
  TableSkeleton
}
export type { LoadingSpinnerProps }