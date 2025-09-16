// API请求配置（对接PLM/SCM/Shopify）

// 基础API配置
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'
export const PLM_API_URL = import.meta.env.VITE_PLM_API_URL || '/api/plm'
export const SCM_API_URL = import.meta.env.VITE_SCM_API_URL || '/api/scm'
export const SHOPIFY_DOMAIN = import.meta.env.VITE_SHOPIFY_DOMAIN || ''

// 请求工具函数
export async function request<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const token = localStorage.getItem('token')
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  }

  try {
    const response = await fetch(`${API_BASE_URL}${url}`, config)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('API request failed:', error)
    throw error
  }
}

// GET请求
export function get<T>(url: string): Promise<T> {
  return request<T>(url, { method: 'GET' })
}

// POST请求
export function post<T>(url: string, data?: any): Promise<T> {
  return request<T>(url, {
    method: 'POST',
    body: data ? JSON.stringify(data) : undefined,
  })
}

// PUT请求
export function put<T>(url: string, data?: any): Promise<T> {
  return request<T>(url, {
    method: 'PUT',
    body: data ? JSON.stringify(data) : undefined,
  })
}

// DELETE请求
export function del<T>(url: string): Promise<T> {
  return request<T>(url, { method: 'DELETE' })
}

// 文件上传
export async function uploadFile(file: File, url: string = '/upload'): Promise<any> {
  const formData = new FormData()
  formData.append('file', file)
  
  const token = localStorage.getItem('token')
  
  const response = await fetch(`${API_BASE_URL}${url}`, {
    method: 'POST',
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: formData,
  })
  
  if (!response.ok) {
    throw new Error(`Upload failed! status: ${response.status}`)
  }
  
  return await response.json()
}

// API接口定义
export const api = {
  // 用户相关
  auth: {
    login: (data: { phone: string; code: string }) => post('/auth/login', data),
    logout: () => post('/auth/logout'),
    getUserInfo: () => get('/auth/user'),
  },
  
  // 面料库相关
  fabrics: {
    list: (params?: any) => get(`/fabrics?${new URLSearchParams(params)}`),
    detail: (id: string) => get(`/fabrics/${id}`),
    search: (keyword: string) => get(`/fabrics/search?q=${keyword}`),
  },
  
  // 案例库相关
  cases: {
    list: (params?: any) => get(`/cases?${new URLSearchParams(params)}`),
    detail: (id: string) => get(`/cases/${id}`),
    byCategory: (category: string) => get(`/cases/category/${category}`),
  },
  
  // 商城相关
  products: {
    list: (params?: any) => get(`/products?${new URLSearchParams(params)}`),
    detail: (id: string) => get(`/products/${id}`),
    search: (keyword: string) => get(`/products/search?q=${keyword}`),
    categories: () => get('/products/categories'),
  },
  
  // 订单相关
  orders: {
    create: (data: any) => post('/orders', data),
    list: (params?: any) => get(`/orders?${new URLSearchParams(params)}`),
    detail: (id: string) => get(`/orders/${id}`),
    updateStatus: (id: string, status: string) => put(`/orders/${id}/status`, { status }),
  },
  
  // AI设计相关
  aiDesign: {
    generatePreview: (data: any) => post('/ai/design/preview', data),
    saveDesign: (data: any) => post('/ai/design/save', data),
    getDesigns: () => get('/ai/design/my-designs'),
    getSimilarStyles: (styleId: string) => get(`/ai/design/similar/${styleId}`),
  },
  
  // 趋势相关
  trends: {
    list: (params?: any) => get(`/trends?${new URLSearchParams(params)}`),
    detail: (id: string) => get(`/trends/${id}`),
    subscribe: (email: string) => post('/trends/subscribe', { email }),
  },
}