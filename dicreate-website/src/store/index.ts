// 全局状态管理（Zustand）

// 用户信息接口
export interface UserInfo {
  id: string
  name: string
  phone: string
  role: 'guest' | 'consumer' | 'distributor' | 'admin' | 'tech_company'
  avatar?: string
  permissions: string[]
}

// 购物车商品接口
export interface CartItem {
  id: string
  productId: string
  name: string
  image: string
  price: number
  quantity: number
  customization?: Record<string, any>
}

// AI设计方案接口
export interface DesignSolution {
  id: string
  name: string
  styleId: string
  operations: any[]
  previewUrl: string
  createTime: string
  updateTime: string
}

// 用户状态Store
interface UserStore {
  user: UserInfo | null
  isLoggedIn: boolean
  setUser: (user: UserInfo | null) => void
  logout: () => void
  hasPermission: (permission: string) => boolean
}

// 购物车状态Store
interface CartStore {
  items: CartItem[]
  total: number
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  getItemCount: () => number
}

// AI设计状态Store
interface DesignStore {
  currentStyle: any | null
  designHistory: DesignSolution[]
  isRendering: boolean
  renderProgress: number
  setCurrentStyle: (style: any) => void
  saveDesign: (design: DesignSolution) => void
  setRendering: (isRendering: boolean) => void
  setRenderProgress: (progress: number) => void
  clearHistory: () => void
}

// 应用全局状态Store
interface AppStore {
  theme: 'light' | 'dark'
  sidebarCollapsed: boolean
  loading: boolean
  setTheme: (theme: 'light' | 'dark') => void
  setSidebarCollapsed: (collapsed: boolean) => void
  setLoading: (loading: boolean) => void
}

// 创建Store的工厂函数
export function createStore() {
  // 用户Store
  const useUserStore = (() => {
    let state: UserStore = {
      user: null,
      isLoggedIn: false,
      setUser: (user) => {
        state.user = user
        state.isLoggedIn = !!user
        if (user) {
          localStorage.setItem('user', JSON.stringify(user))
        } else {
          localStorage.removeItem('user')
        }
      },
      logout: () => {
        state.user = null
        state.isLoggedIn = false
        localStorage.removeItem('user')
        localStorage.removeItem('token')
      },
      hasPermission: (permission) => {
        return state.user?.permissions.includes(permission) || false
      }
    }
    
    // 初始化时从localStorage恢复用户信息
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser)
        state.user = user
        state.isLoggedIn = true
      } catch (e) {
        console.error('Failed to parse saved user:', e)
      }
    }
    
    return () => state
  })()
  
  // 购物车Store
  const useCartStore = (() => {
    let state: CartStore = {
      items: [],
      total: 0,
      addItem: (item) => {
        const existingIndex = state.items.findIndex(i => i.id === item.id)
        if (existingIndex >= 0) {
          state.items[existingIndex].quantity += item.quantity
        } else {
          state.items.push(item)
        }
        updateTotal()
        saveToStorage()
      },
      removeItem: (id) => {
        state.items = state.items.filter(item => item.id !== id)
        updateTotal()
        saveToStorage()
      },
      updateQuantity: (id, quantity) => {
        const item = state.items.find(i => i.id === id)
        if (item) {
          item.quantity = quantity
          if (quantity <= 0) {
            state.removeItem(id)
          } else {
            updateTotal()
            saveToStorage()
          }
        }
      },
      clearCart: () => {
        state.items = []
        state.total = 0
        saveToStorage()
      },
      getItemCount: () => {
        return state.items.reduce((count, item) => count + item.quantity, 0)
      }
    }
    
    function updateTotal() {
      state.total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    }
    
    function saveToStorage() {
      localStorage.setItem('cart', JSON.stringify(state.items))
    }
    
    // 初始化时从localStorage恢复购物车
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      try {
        state.items = JSON.parse(savedCart)
        updateTotal()
      } catch (e) {
        console.error('Failed to parse saved cart:', e)
      }
    }
    
    return () => state
  })()
  
  // AI设计Store
  const useDesignStore = (() => {
    let state: DesignStore = {
      currentStyle: null,
      designHistory: [],
      isRendering: false,
      renderProgress: 0,
      setCurrentStyle: (style) => {
        state.currentStyle = style
      },
      saveDesign: (design) => {
        const existingIndex = state.designHistory.findIndex(d => d.id === design.id)
        if (existingIndex >= 0) {
          state.designHistory[existingIndex] = design
        } else {
          state.designHistory.push(design)
        }
        saveDesignToStorage()
      },
      setRendering: (isRendering) => {
        state.isRendering = isRendering
        if (!isRendering) {
          state.renderProgress = 0
        }
      },
      setRenderProgress: (progress) => {
        state.renderProgress = Math.max(0, Math.min(100, progress))
      },
      clearHistory: () => {
        state.designHistory = []
        localStorage.removeItem('designHistory')
      }
    }
    
    function saveDesignToStorage() {
      localStorage.setItem('designHistory', JSON.stringify(state.designHistory))
    }
    
    // 初始化时从localStorage恢复设计历史
    const savedHistory = localStorage.getItem('designHistory')
    if (savedHistory) {
      try {
        state.designHistory = JSON.parse(savedHistory)
      } catch (e) {
        console.error('Failed to parse saved design history:', e)
      }
    }
    
    return () => state
  })()
  
  // 应用Store
  const useAppStore = (() => {
    let state: AppStore = {
      theme: 'light',
      sidebarCollapsed: false,
      loading: false,
      setTheme: (theme) => {
        state.theme = theme
        localStorage.setItem('theme', theme)
        document.documentElement.classList.toggle('dark', theme === 'dark')
      },
      setSidebarCollapsed: (collapsed) => {
        state.sidebarCollapsed = collapsed
        localStorage.setItem('sidebarCollapsed', String(collapsed))
      },
      setLoading: (loading) => {
        state.loading = loading
      }
    }
    
    // 初始化主题
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark'
    if (savedTheme) {
      state.theme = savedTheme
      document.documentElement.classList.toggle('dark', savedTheme === 'dark')
    }
    
    // 初始化侧边栏状态
    const savedCollapsed = localStorage.getItem('sidebarCollapsed')
    if (savedCollapsed) {
      state.sidebarCollapsed = savedCollapsed === 'true'
    }
    
    return () => state
  })()
  
  return {
    useUserStore,
    useCartStore,
    useDesignStore,
    useAppStore
  }
}

// 导出Store实例
const stores = createStore()
export const useUserStore = stores.useUserStore
export const useCartStore = stores.useCartStore
export const useDesignStore = stores.useDesignStore
export const useAppStore = stores.useAppStore