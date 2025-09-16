/// <reference types="vite/client" />

// 扩展环境变量类型
interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
  readonly VITE_SHOPIFY_DOMAIN: string
  readonly VITE_PLM_API_URL: string
  readonly VITE_SCM_API_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// 3D模型文件类型声明
declare module '*.gltf' {
  const src: string
  export default src
}

declare module '*.glb' {
  const src: string
  export default src
}

// Fabric.js类型声明
declare module 'fabric' {
  export * from 'fabric/fabric-impl'
}