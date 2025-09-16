/**
 * 资源路径工具函数
 * 用于处理开发环境和生产环境的资源路径差异
 */

/**
 * 获取正确的资源路径
 * @param path 相对路径，如 '/photo/xueweifu/image.jpg'
 * @returns 完整的资源路径
 */
export const getAssetPath = (path: string): string => {
  // 确保路径以 / 开头
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  
  // 在生产环境中添加 base 路径前缀
  if (import.meta.env.PROD) {
    return `/DiCreate.AI-${normalizedPath}`
  }
  
  // 开发环境直接返回原路径
  return normalizedPath
}

/**
 * 获取图片资源路径
 * @param imageName 图片文件名，如 '00_02_00__23175691__2321569e_04_00.jpg'
 * @param folder 文件夹名，默认为 'xueweifu'
 * @returns 完整的图片路径
 */
export const getImagePath = (imageName: string, folder: string = 'xueweifu'): string => {
  return getAssetPath(`/photo/${folder}/${imageName}`)
}

/**
 * 预定义的图片路径
 */
export const IMAGES = {
  xueweifu: {
    flat1: getImagePath('00_02_00__23175691__2321569e_04_00.jpg'),
    flat2: getImagePath('00_02_00__23408a61__2321569e_04_00.jpg'),
    flat3: getImagePath('00_02_00__23433565__2321569e_04_00.jpg'),
    model1: getImagePath('00_02_00__2363b9d3__2321569e_04_00.jpg'),
    model2: getImagePath('00_02_00__237a848f__2321569e_04_00.jpg'),
    hanging1: getImagePath('00_02_00__23c4af57__2321569e_04_00.jpg'),
    hanging2: getImagePath('00_02_00__23da898d__2321569e_04_00.jpg'),
    detail: getImagePath('00_02_00__23fffefe__2321569e_04_00.jpg'),
    default: getImagePath('02_default.jpg')
  }
}