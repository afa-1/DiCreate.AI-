// AI设计工具函数（如面料替换、校徽生成）

// 设计操作类型
export type DesignOperation = 
  | 'add_logo'      // 加校徽
  | 'change_font'   // 换字体
  | 'change_color'  // 换颜色
  | 'change_fabric' // 换面料
  | 'add_pattern'   // 加印花

// 设计参数接口
export interface DesignParams {
  operation: DesignOperation
  styleId: string
  params: Record<string, any>
}

// 面料信息接口
export interface FabricInfo {
  id: string
  name: string
  type: string
  params: string
  colors: string[]
  applicable: string[]
  url: string
  price?: number
}

// 校徽配置接口
export interface LogoConfig {
  image: string | File
  position: { x: number; y: number }
  size: { width: number; height: number }
  rotation: number
}

// 字体配置接口
export interface FontConfig {
  text: string
  fontFamily: string
  fontSize: number
  color: string
  position: { x: number; y: number }
}

// 印花配置接口
export interface PatternConfig {
  image: string | File
  repeat: 'none' | 'repeat' | 'repeat-x' | 'repeat-y'
  opacity: number
  scale: number
}

// 生成设计预览
export async function generateDesignPreview(
  params: DesignParams
): Promise<{ previewUrl: string; renderTime: number }> {
  const startTime = Date.now()
  
  try {
    // 模拟AI渲染过程（实际应调用后端API）
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000))
    
    const renderTime = Date.now() - startTime
    
    // 返回模拟的预览图URL
    const previewUrl = `/api/design/preview/${params.styleId}?t=${Date.now()}`
    
    return { previewUrl, renderTime }
  } catch (error) {
    console.error('Design preview generation failed:', error)
    throw new Error('设计预览生成失败，请重试')
  }
}

// 面料替换工具
export function replaceFabric(
  originalStyle: any,
  newFabric: FabricInfo
): DesignParams {
  return {
    operation: 'change_fabric',
    styleId: originalStyle.id,
    params: {
      fabricId: newFabric.id,
      fabricType: newFabric.type,
      color: newFabric.colors[0], // 默认使用第一个颜色
    }
  }
}

// 校徽添加工具
export function addLogo(
  styleId: string,
  logoConfig: LogoConfig
): DesignParams {
  return {
    operation: 'add_logo',
    styleId,
    params: {
      logo: logoConfig.image,
      position: logoConfig.position,
      size: logoConfig.size,
      rotation: logoConfig.rotation,
    }
  }
}

// 颜色替换工具
export function changeColor(
  styleId: string,
  targetColor: string,
  area: 'main' | 'accent' | 'trim' = 'main'
): DesignParams {
  return {
    operation: 'change_color',
    styleId,
    params: {
      color: targetColor,
      area,
    }
  }
}

// 字体修改工具
export function changeFont(
  styleId: string,
  fontConfig: FontConfig
): DesignParams {
  return {
    operation: 'change_font',
    styleId,
    params: fontConfig
  }
}

// 印花添加工具
export function addPattern(
  styleId: string,
  patternConfig: PatternConfig
): DesignParams {
  return {
    operation: 'add_pattern',
    styleId,
    params: patternConfig
  }
}

// 验证设计参数
export function validateDesignParams(params: DesignParams): boolean {
  if (!params.styleId || !params.operation) {
    return false
  }
  
  switch (params.operation) {
    case 'add_logo':
      return !!(params.params.logo && params.params.position)
    case 'change_color':
      return !!(params.params.color)
    case 'change_fabric':
      return !!(params.params.fabricId)
    case 'change_font':
      return !!(params.params.text && params.params.fontFamily)
    case 'add_pattern':
      return !!(params.params.image)
    default:
      return false
  }
}

// 计算设计复杂度（影响渲染时间）
export function calculateDesignComplexity(operations: DesignOperation[]): number {
  const complexityMap: Record<DesignOperation, number> = {
    'change_color': 1,
    'change_font': 2,
    'add_logo': 3,
    'change_fabric': 4,
    'add_pattern': 5,
  }
  
  return operations.reduce((total, op) => total + complexityMap[op], 0)
}

// 生成设计方案ID
export function generateDesignId(): string {
  return `design_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

// 保存设计方案
export interface DesignSolution {
  id: string
  name: string
  styleId: string
  operations: DesignParams[]
  previewUrl: string
  createTime: string
  updateTime: string
}

export function createDesignSolution(
  name: string,
  styleId: string,
  operations: DesignParams[],
  previewUrl: string
): DesignSolution {
  const now = new Date().toISOString()
  
  return {
    id: generateDesignId(),
    name,
    styleId,
    operations,
    previewUrl,
    createTime: now,
    updateTime: now,
  }
}