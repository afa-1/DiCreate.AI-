import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { Layout, Menu, Button, Avatar, Dropdown, Input, Badge, Space, Drawer, Tooltip, Divider, ConfigProvider } from 'antd'
import {
  HomeOutlined,
  DatabaseOutlined,
  ShoppingOutlined,
  BgColorsOutlined,
  LineChartOutlined,
  InfoCircleOutlined,
  UserOutlined,
  LoginOutlined,
  ShoppingCartOutlined,
  MenuOutlined,
  SettingOutlined,
  FolderOutlined,
  AppstoreOutlined,
  ToolOutlined,
  CloudOutlined,
  ExportOutlined,
  SaveOutlined,
  UndoOutlined,
  RedoOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
  FullscreenOutlined,
  BellOutlined,
  ControlOutlined
} from '@ant-design/icons'
import { useUserStore, useCartStore, useAppStore } from './store'
import './styles/printful-theme.css'
import LanguageSwitcher from './components/LanguageSwitcher'
import { antdThemeConfig } from './styles/theme'

// 导入页面组件
import Home from './pages/Home'
import ResourceLibrary from './pages/ResourceLibrary'
import Mall from './pages/Mall'
import ProductDetail from './pages/ProductDetail'
import AIDesign from './pages/AIDesign'
import ProductPublish from './pages/ProductPublish'
import Trends from './pages/Trends'
import AboutUs from './pages/AboutUs'
import Production from './pages/Production'
import Login from './pages/Login'

const { Header, Sider, Content } = Layout
const { Search } = Input

// 主导航菜单配置
const getMainMenuItems = (userRole: string | undefined) => {
  const baseItems = [
    {
      key: '/ai-design',
      icon: <BgColorsOutlined />,
      label: 'AI服装设计',
    },
    {
      key: '/mall',
      icon: <ShoppingOutlined />,
      label: '商城',
    },
    {
      key: '/resources',
      icon: <DatabaseOutlined />,
      label: '资源库',
    },
    {
      key: '/about',
      icon: <InfoCircleOutlined />,
      label: '关于我们',
    },
  ]

  // 根据用户角色添加管理功能
  if (userRole === 'admin') {
    baseItems.push({
      key: '/admin',
      icon: <SettingOutlined />,
      label: '系统管理',
    })
  }

  return baseItems
}

// 顶部工具栏配置
const getToolbarItems = () => [
  { key: 'save', icon: <SaveOutlined />, tooltip: '保存 (Ctrl+S)' },
  { key: 'undo', icon: <UndoOutlined />, tooltip: '撤销 (Ctrl+Z)' },
  { key: 'redo', icon: <RedoOutlined />, tooltip: '重做 (Ctrl+Y)' },
  { key: 'divider1', type: 'divider' },
  { key: 'zoom-in', icon: <ZoomInOutlined />, tooltip: '放大' },
  { key: 'zoom-out', icon: <ZoomOutOutlined />, tooltip: '缩小' },
  { key: 'fullscreen', icon: <FullscreenOutlined />, tooltip: '全屏' },
  { key: 'divider2', type: 'divider' },
  { key: 'export', icon: <ExportOutlined />, tooltip: '导出' },
  { key: 'cloud', icon: <CloudOutlined />, tooltip: '云同步' },
]

// 主布局组件
function MainLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const userStore = useUserStore()
  const cartStore = useCartStore()
  const [isMobile, setIsMobile] = useState(false)
  const [drawerVisible, setDrawerVisible] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState('zh')

  // 检测移动端
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // 菜单点击处理
  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key)
    if (isMobile) {
      setDrawerVisible(false)
    }
  }

  // 用户菜单
  const userMenuItems = [
    {
      key: 'profile',
      label: '个人资料',
      icon: <UserOutlined />,
    },
    {
      key: 'settings',
      label: '设置',
      icon: <SettingOutlined />,
    },
    {
      type: 'divider' as const,
    },
    {
      key: 'logout',
      label: '退出登录',
      icon: <LoginOutlined />,
      onClick: () => {
        userStore.logout()
        navigate('/login')
      },
    },
  ]

  return (
    <Layout className="content-area">
      {/* Printful风格的顶部导航 */}
      <Header className="printful-header">
        <div className="printful-header-content">
          {/* Logo */}
          <div className="printful-logo" onClick={() => navigate('/')}>
            DiCreate.AI
          </div>

          {/* 主导航菜单 - 桌面端 */}
          <div className="printful-nav" style={{ display: isMobile ? 'none' : 'flex' }}>
            {getMainMenuItems(userStore.user?.role).map(item => (
              <a
                key={item.key}
                href={`#${item.key}`}
                className={`printful-nav-item ${location.pathname === item.key ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault()
                  navigate(item.key as string)
                }}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* 用户操作区域 */}
          <div className="printful-user-actions">
            {/* 移动端菜单按钮 */}
            {isMobile && (
              <Button
                type="text"
                icon={<MenuOutlined />}
                onClick={() => setDrawerVisible(true)}
                className="printful-btn"
              />
            )}

            {/* 购物车 */}
            <Badge count={cartStore.getItemCount()} size="small">
              <Button
                type="text"
                icon={<ShoppingCartOutlined />}
                onClick={() => navigate('/mall')}
                className="printful-btn"
              />
            </Badge>

            {/* 语言切换 */}
            <LanguageSwitcher
              currentLanguage={currentLanguage}
              onLanguageChange={setCurrentLanguage}
            />

            {/* 通知 */}
            <Button
              type="text"
              icon={<BellOutlined />}
              className="printful-btn"
            />

            {/* 用户菜单 */}
            {userStore.user ? (
              <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  padding: '8px 12px',
                  borderRadius: 'var(--printful-border-radius-sm)',
                  border: '1px solid var(--printful-border)',
                  transition: 'all 0.2s ease'
                }}>
                  <Avatar src={userStore.user?.avatar} icon={<UserOutlined />} size="small" />
                  <span style={{
                    color: 'var(--printful-text-primary)',
                    fontSize: '14px',
                    fontWeight: '500',
                    display: isMobile ? 'none' : 'inline'
                  }}>
                    {userStore.user.name}
                  </span>
                </div>
              </Dropdown>
            ) : (
              <Button
                type="primary"
                onClick={() => navigate('/login')}
                className="printful-btn printful-btn-primary"
              >
                登录
              </Button>
            )}
          </div>
        </div>
      </Header>

      {/* 主内容区域 */}
      <Content className="printful-main" style={{
        minHeight: 'calc(100vh - 64px)',
        background: 'var(--printful-bg-white)'
      }}>
        <div className="printful-container">
        <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/resources" element={<ResourceLibrary />} />
              <Route path="/mall" element={<Mall />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/ai-design" element={<AIDesign />} />
              <Route path="/product-publish" element={<ProductPublish />} />
              <Route path="/trends" element={<Trends />} />
              <Route path="/production" element={<Production />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </div>
      </Content>

      {/* 移动端抽屉菜单 */}
      <Drawer
        title={null}
        placement="left"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        width={280}
        styles={{
          body: { padding: 0, background: '#fff' },
          header: { display: 'none' }
        }}
      >
        {/* 抽屉头部 */}
        <div style={{
          padding: '20px',
          borderBottom: '1px solid #e8e8e8',
          background: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#333',
            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
          }}>
            DiCreate.AI
          </div>
          <Button
            type="text"
            icon={<MenuOutlined />}
            onClick={() => setDrawerVisible(false)}
            style={{ color: '#666' }}
          />
        </div>

        {/* 用户信息 */}
        <div style={{
          padding: '20px',
          borderBottom: '1px solid #e8e8e8',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          background: '#fafafa'
        }}>
          <Avatar src={userStore.user?.avatar} icon={<UserOutlined />} />
          <div>
            <div style={{ color: '#333', fontWeight: '600', fontSize: '14px' }}>
              {userStore.user?.name || '未登录'}
            </div>
            <div style={{ color: '#666', fontSize: '12px' }}>
              {userStore.user?.role || '访客'}
            </div>
          </div>
        </div>

        {/* 导航菜单 */}
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={getMainMenuItems(userStore.user?.role)}
          onClick={handleMenuClick}
          style={{
            border: 'none',
            background: '#fff',
            fontSize: '16px'
          }}
        />

        {/* 底部操作 */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '20px',
          borderTop: '1px solid #e8e8e8',
          background: '#fff'
        }}>
          {userStore.user ? (
            <Button
              type="primary"
              danger
              block
              icon={<LoginOutlined />}
              onClick={() => {
                userStore.logout()
                setDrawerVisible(false)
                navigate('/login')
              }}
              style={{
                height: '44px',
                fontSize: '16px',
                fontWeight: '500'
              }}
            >
              退出登录
            </Button>
          ) : (
            <Button
              type="primary"
              block
              icon={<LoginOutlined />}
              onClick={() => {
                setDrawerVisible(false)
                navigate('/login')
              }}
              style={{
                height: '44px',
                fontSize: '16px',
                fontWeight: '500',
                background: '#1890ff',
                borderColor: '#1890ff'
              }}
            >
              登录 / 注册
            </Button>
          )}
        </div>
      </Drawer>
    </Layout>
  )
}



// 主应用组件
function App() {
  return (
    <ConfigProvider theme={antdThemeConfig}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<MainLayout />} />
        </Routes>
      </Router>
    </ConfigProvider>
  )
}

export default App