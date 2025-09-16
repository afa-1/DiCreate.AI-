// 响应式断点配置
export const breakpoints = {
  xs: 480,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1600
} as const

// 设备类型判断
export const getDeviceType = (width: number) => {
  if (width < breakpoints.sm) return 'mobile'
  if (width < breakpoints.lg) return 'tablet'
  return 'desktop'
}

// 检查是否为移动设备
export const isMobile = (width: number = window.innerWidth) => {
  return width < breakpoints.md
}

// 检查是否为平板设备
export const isTablet = (width: number = window.innerWidth) => {
  return width >= breakpoints.md && width < breakpoints.lg
}

// 检查是否为桌面设备
export const isDesktop = (width: number = window.innerWidth) => {
  return width >= breakpoints.lg
}

// 响应式Hook
import { useState, useEffect } from 'react'

export const useResponsive = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800
  })

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return {
    ...windowSize,
    isMobile: isMobile(windowSize.width),
    isTablet: isTablet(windowSize.width),
    isDesktop: isDesktop(windowSize.width),
    deviceType: getDeviceType(windowSize.width)
  }
}

// 响应式样式工具函数
export const getResponsiveValue = <T>(
  values: {
    mobile?: T
    tablet?: T
    desktop?: T
  },
  deviceType: 'mobile' | 'tablet' | 'desktop'
): T | undefined => {
  return values[deviceType] || values.desktop || values.tablet || values.mobile
}

// 响应式间距
export const getResponsiveSpacing = (deviceType: 'mobile' | 'tablet' | 'desktop') => {
  const spacingMap = {
    mobile: {
      xs: 4,
      sm: 8,
      md: 12,
      lg: 16,
      xl: 20
    },
    tablet: {
      xs: 6,
      sm: 12,
      md: 16,
      lg: 20,
      xl: 24
    },
    desktop: {
      xs: 8,
      sm: 16,
      md: 20,
      lg: 24,
      xl: 32
    }
  }
  
  return spacingMap[deviceType]
}

// 响应式字体大小
export const getResponsiveFontSize = (deviceType: 'mobile' | 'tablet' | 'desktop') => {
  const fontSizeMap = {
    mobile: {
      xs: 10,
      sm: 12,
      md: 14,
      lg: 16,
      xl: 18,
      xxl: 20
    },
    tablet: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 20,
      xxl: 24
    },
    desktop: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 20,
      xxl: 24
    }
  }
  
  return fontSizeMap[deviceType]
}

// 响应式网格列数
export const getResponsiveColumns = (deviceType: 'mobile' | 'tablet' | 'desktop') => {
  const columnMap = {
    mobile: {
      xs: 1,
      sm: 2,
      md: 2,
      lg: 3
    },
    tablet: {
      xs: 2,
      sm: 3,
      md: 4,
      lg: 4
    },
    desktop: {
      xs: 3,
      sm: 4,
      md: 6,
      lg: 8
    }
  }
  
  return columnMap[deviceType]
}

// 响应式容器宽度
export const getResponsiveContainerWidth = (deviceType: 'mobile' | 'tablet' | 'desktop') => {
  const widthMap = {
    mobile: '100%',
    tablet: '100%',
    desktop: '1200px'
  }
  
  return widthMap[deviceType]
}