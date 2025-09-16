import React, { useState, useEffect } from 'react'
import { Button, Card, Row, Col, Carousel, Statistic, Space, Typography, Image, Tag, Progress, Avatar } from 'antd'
import {
  RightOutlined,
  PlayCircleOutlined,
  CheckCircleOutlined,
  StarOutlined,
  TrophyOutlined,
  TeamOutlined,
  GlobalOutlined,
  ThunderboltOutlined,
  EyeOutlined,
  ToolOutlined,
  CloudOutlined,
  BgColorsOutlined,
  DatabaseOutlined,
  ShoppingOutlined,
  LineChartOutlined,
  ExperimentOutlined,
  RocketOutlined,
  SafetyOutlined,
  ApiOutlined
} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '../store'

const { Title, Paragraph, Text } = Typography

// 3D设计核心功能
const coreFeatures = [
  {
    id: 1,
    title: '3D服装建模',
    description: '专业级3D建模引擎，支持实时渲染和物理仿真',
    icon: <BgColorsOutlined />,
    color: '#1890ff',
    features: ['实时3D预览', '物理仿真', '材质渲染', '光影效果'],
    link: '/ai-design',
    progress: 95
  },
  {
    id: 2,
    title: '智能版型设计',
    description: 'AI驱动的版型生成和优化，精确到毫米级别',
    icon: <ToolOutlined />,
    color: '#52c41a',
    features: ['版型生成', '尺寸优化', '工艺分析', '成本计算'],
    link: '/ai-design',
    progress: 88
  },
  {
    id: 3,
    title: '数字化面料库',
    description: '海量数字化面料资源，支持物理属性仿真',
    icon: <DatabaseOutlined />,
    color: '#722ed1',
    features: ['面料扫描', '属性仿真', '质感渲染', '批量管理'],
    link: '/resources',
    progress: 92
  },
  {
    id: 4,
    title: '生产链协同',
    description: '从设计到生产的全流程数字化管理',
    icon: <ApiOutlined />,
    color: '#fa8c16',
    features: ['订单管理', '生产排期', '质量控制', '物流跟踪'],
    link: '/mall',
    progress: 85
  }
]

// 技术优势数据
const techAdvantages = [
  {
    title: '设计效率提升',
    value: 300,
    suffix: '%',
    icon: <ThunderboltOutlined />,
    color: '#1890ff',
    description: '相比传统设计流程'
  },
  {
    title: '成本降低',
    value: 40,
    suffix: '%',
    icon: <SafetyOutlined />,
    color: '#52c41a',
    description: '样衣制作成本'
  },
  {
    title: '上市时间缩短',
    value: 60,
    suffix: '%',
    icon: <RocketOutlined />,
    color: '#722ed1',
    description: '产品开发周期'
  },
  {
    title: '精度提升',
    value: 99.5,
    suffix: '%',
    icon: <EyeOutlined />,
    color: '#fa8c16',
    description: '版型精确度'
  }
]

// 行业案例
const industryShowcases = [
  {
    id: 1,
    title: '快时尚品牌数字化转型',
    company: 'Fashion Brand A',
    description: '通过3D设计平台，实现从概念到成品的全数字化流程，大幅提升设计效率和市场响应速度',
    image: '/api/placeholder/600/400',
    tags: ['快时尚', '数字化转型', '效率提升'],
    results: {
      efficiency: '+280%',
      cost: '-35%',
      time: '-50%'
    },
    avatar: '/api/placeholder/40/40'
  },
  {
    id: 2,
    title: '高端定制3D可视化',
    company: 'Luxury Couture B',
    description: '为高端定制品牌提供3D可视化解决方案，客户可实时预览定制效果，提升客户满意度',
    image: '/api/placeholder/600/400',
    tags: ['高端定制', '3D可视化', '客户体验'],
    results: {
      satisfaction: '+45%',
      orders: '+120%',
      returns: '-80%'
    },
    avatar: '/api/placeholder/40/40'
  },
  {
    id: 3,
    title: '运动品牌功能性设计',
    company: 'Sports Brand C',
    description: '利用物理仿真技术，优化运动服装的功能性设计，提升产品性能和用户体验',
    image: '/api/placeholder/600/400',
    tags: ['运动服装', '功能性设计', '物理仿真'],
    results: {
      performance: '+65%',
      comfort: '+40%',
      durability: '+30%'
    },
    avatar: '/api/placeholder/40/40'
  }
]

// Hero Banner数据
const heroSlides = [
  {
    id: 1,
    title: 'DiCreate.AI',
    subtitle: '3D数字化服装设计平台',
    description: '融合AI与3D技术，重新定义服装设计与生产流程',
    background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
    cta: '开始3D设计',
    link: '/ai-design',
    features: ['实时3D渲染', 'AI智能设计', '云端协作']
  },
  {
    id: 2,
    title: '专业级3D引擎',
    subtitle: '工业级精度与性能',
    description: '基于物理仿真的3D渲染引擎，提供毫米级精度的设计体验',
    background: 'linear-gradient(135deg, #2d1b69 0%, #11998e 100%)',
    cta: '体验3D建模',
    link: '/ai-design',
    features: ['物理仿真', '实时渲染', '精确建模']
  },
  {
    id: 3,
    title: '全流程数字化',
    subtitle: '从设计到生产',
    description: '打通设计、打版、生产全链条，实现真正的数字化制造',
    background: 'linear-gradient(135deg, #134e5e 0%, #71b280 100%)',
    cta: '了解解决方案',
    link: '/resources',
    features: ['设计协同', '生产管理', '供应链整合']
  }
]

const Home: React.FC = () => {
  const navigate = useNavigate()
  const userStore = useUserStore()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [animationClass, setAnimationClass] = useState('')

  // 处理CTA按钮点击
  const handleCTAClick = (link: string) => {
    if (!userStore.user && link !== '/') {
      navigate('/login')
    } else {
      navigate(link)
    }
  }

  // 添加动画效果
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationClass('animate-fade-in')
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', color: '#ffffff' }}>
      {/* Hero Section - 3D设计风格 */}
      <section style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
        <Carousel
          autoplay
          effect="fade"
          dots={{ className: 'custom-dots-dark' }}
          beforeChange={(_, next) => setCurrentSlide(next)}
          autoplaySpeed={5000}
        >
          {heroSlides.map((slide, index) => (
            <div key={slide.id}>
              <div
                style={{
                  height: '100vh',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: slide.background,
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {/* 3D网格背景 */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: `
                    linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
                  `,
                  backgroundSize: '50px 50px',
                  opacity: 0.3
                }} />
                
                {/* 浮动几何元素 */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  overflow: 'hidden',
                  pointerEvents: 'none'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '20%',
                    left: '10%',
                    width: '100px',
                    height: '100px',
                    border: '2px solid rgba(255,255,255,0.1)',
                    borderRadius: '50%',
                    animation: 'float 6s ease-in-out infinite'
                  }} />
                  <div style={{
                    position: 'absolute',
                    bottom: '30%',
                    right: '15%',
                    width: '80px',
                    height: '80px',
                    border: '2px solid rgba(255,255,255,0.1)',
                    transform: 'rotate(45deg)',
                    animation: 'float 8s ease-in-out infinite reverse'
                  }} />
                </div>

                <div style={{
                  maxWidth: '1200px',
                  margin: '0 auto',
                  padding: '0 24px',
                  textAlign: 'center',
                  zIndex: 10
                }}>
                  <Title level={1} style={{
                    color: '#ffffff',
                    fontSize: '4rem',
                    fontWeight: 'bold',
                    marginBottom: '16px',
                    textShadow: '0 4px 8px rgba(0,0,0,0.3)'
                  }}>
                    {slide.title}
                  </Title>
                  <Title level={2} style={{
                    color: 'rgba(255,255,255,0.9)',
                    fontSize: '1.8rem',
                    fontWeight: 'normal',
                    marginBottom: '24px'
                  }}>
                    {slide.subtitle}
                  </Title>
                  <Paragraph style={{
                    color: 'rgba(255,255,255,0.8)',
                    fontSize: '1.2rem',
                    marginBottom: '32px',
                    maxWidth: '600px',
                    margin: '0 auto 32px'
                  }}>
                    {slide.description}
                  </Paragraph>
                  
                  {/* 特性标签 */}
                  <div style={{ marginBottom: '40px' }}>
                    <Space size="middle">
                      {slide.features.map((feature, idx) => (
                        <Tag
                          key={idx}
                          style={{
                            background: 'rgba(255,255,255,0.1)',
                            border: '1px solid rgba(255,255,255,0.2)',
                            color: '#ffffff',
                            padding: '4px 12px',
                            borderRadius: '20px'
                          }}
                        >
                          {feature}
                        </Tag>
                      ))}
                    </Space>
                  </div>

                  <Space size="large">
                    <Button
                      type="primary"
                      size="large"
                      style={{
                        height: '48px',
                        padding: '0 32px',
                        fontSize: '16px',
                        background: 'linear-gradient(135deg, #1890ff 0%, #722ed1 100%)',
                        border: 'none',
                        borderRadius: '24px',
                        boxShadow: '0 4px 15px rgba(24, 144, 255, 0.4)'
                      }}
                      onClick={() => handleCTAClick(slide.link)}
                    >
                      {slide.cta}
                      <RightOutlined />
                    </Button>
                    <Button
                      ghost
                      size="large"
                      style={{
                        height: '48px',
                        padding: '0 32px',
                        fontSize: '16px',
                        border: '2px solid rgba(255,255,255,0.3)',
                        color: '#ffffff',
                        borderRadius: '24px'
                      }}
                      icon={<PlayCircleOutlined />}
                      onClick={() => navigate('/about')}
                    >
                      观看演示
                    </Button>
                  </Space>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </section>

      {/* 技术优势统计 */}
      <section style={{ padding: '80px 0', background: '#111111' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <Title level={2} style={{ color: '#ffffff', marginBottom: '16px' }}>
              技术优势
            </Title>
            <Paragraph style={{ color: 'rgba(255,255,255,0.7)', fontSize: '18px' }}>
              基于先进的3D技术和AI算法，为服装行业带来革命性变革
            </Paragraph>
          </div>
          
          <Row gutter={[32, 32]} justify="center">
            {techAdvantages.map((advantage, index) => (
              <Col key={index} xs={12} sm={6} lg={6}>
                <div style={{
                  textAlign: 'center',
                  padding: '32px 16px',
                  background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
                  borderRadius: '16px',
                  border: '1px solid #333333',
                  transition: 'all 0.3s ease'
                }}>
                  <div style={{
                    fontSize: '48px',
                    color: advantage.color,
                    marginBottom: '16px'
                  }}>
                    {advantage.icon}
                  </div>
                  <Statistic
                    title={advantage.title}
                    value={advantage.value}
                    suffix={advantage.suffix}
                    valueStyle={{
                      color: advantage.color,
                      fontSize: '2.5rem',
                      fontWeight: 'bold'
                    }}
                  />
                  <Text style={{
                    color: 'rgba(255,255,255,0.6)',
                    fontSize: '14px',
                    display: 'block',
                    marginTop: '8px'
                  }}>
                    {advantage.description}
                  </Text>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* 核心功能模块 */}
      <section style={{ padding: '80px 0', background: '#0a0a0a' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <Title level={2} style={{ color: '#ffffff', marginBottom: '16px' }}>
              核心功能
            </Title>
            <Paragraph style={{ color: 'rgba(255,255,255,0.7)', fontSize: '18px' }}>
              专业级3D设计工具，满足从概念设计到批量生产的全流程需求
            </Paragraph>
          </div>
          
          <Row gutter={[24, 24]}>
            {coreFeatures.map((feature) => (
              <Col key={feature.id} xs={24} sm={12} lg={6}>
                <Card
                  hoverable
                  style={{
                    height: '100%',
                    background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
                    border: '1px solid #333333',
                    borderRadius: '16px',
                    overflow: 'hidden'
                  }}
                  bodyStyle={{ padding: '24px' }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '16px'
                  }}>
                    <div style={{
                      fontSize: '32px',
                      color: feature.color,
                      marginRight: '12px'
                    }}>
                      {feature.icon}
                    </div>
                    <Title level={4} style={{ color: '#ffffff', margin: 0 }}>
                      {feature.title}
                    </Title>
                  </div>
                  
                  <Paragraph style={{
                    color: 'rgba(255,255,255,0.7)',
                    marginBottom: '20px',
                    lineHeight: '1.6'
                  }}>
                    {feature.description}
                  </Paragraph>
                  
                  <div style={{ marginBottom: '20px' }}>
                    <Text style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px' }}>
                      完成度
                    </Text>
                    <Progress
                      percent={feature.progress}
                      strokeColor={feature.color}
                      trailColor="#333333"
                      size="small"
                      showInfo={false}
                      style={{ marginTop: '4px' }}
                    />
                  </div>
                  
                  <div style={{ marginBottom: '20px' }}>
                    {feature.features.map((item, index) => (
                      <Tag
                        key={index}
                        style={{
                          background: 'rgba(255,255,255,0.05)',
                          border: `1px solid ${feature.color}30`,
                          color: feature.color,
                          margin: '2px 4px 2px 0',
                          borderRadius: '12px'
                        }}
                      >
                        {item}
                      </Tag>
                    ))}
                  </div>
                  
                  <Button
                    type="link"
                    style={{
                      color: feature.color,
                      padding: 0,
                      height: 'auto'
                    }}
                    onClick={() => handleCTAClick(feature.link)}
                  >
                    了解更多 <RightOutlined />
                  </Button>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* 行业案例展示 */}
      <section style={{ padding: '80px 0', background: '#111111' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <Title level={2} style={{ color: '#ffffff', marginBottom: '16px' }}>
              行业案例
            </Title>
            <Paragraph style={{ color: 'rgba(255,255,255,0.7)', fontSize: '18px' }}>
              看看我们如何帮助不同类型的服装企业实现数字化转型
            </Paragraph>
          </div>
          
          <Row gutter={[32, 32]}>
            {industryShowcases.map((showcase) => (
              <Col key={showcase.id} xs={24} lg={8}>
                <Card
                  hoverable
                  style={{
                    height: '100%',
                    background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
                    border: '1px solid #333333',
                    borderRadius: '16px',
                    overflow: 'hidden'
                  }}
                  cover={
                    <div style={{
                      position: 'relative',
                      height: '240px',
                      background: 'linear-gradient(135deg, #333333 0%, #555555 100%)',
                      overflow: 'hidden'
                    }}>
                      <Image
                        src={showcase.image}
                        alt={showcase.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        preview={false}
                        fallback="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzMzMzMzIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZmlsbD0iIzY2NjY2NiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPjNE6K6+6K6h5qGI5L6LPC90ZXh0Pjwvc3ZnPg=="
                      />
                      <div style={{
                        position: 'absolute',
                        top: '16px',
                        left: '16px'
                      }}>
                        {showcase.tags.map((tag, index) => (
                          <Tag
                            key={index}
                            style={
                              {
                                background: 'rgba(0,0,0,0.7)',
                                border: 'none',
                                color: '#ffffff',
                                margin: '0 4px 4px 0'
                              }
                            }
                          >
                            {tag}
                          </Tag>
                        ))}
                      </div>
                    </div>
                  }
                  bodyStyle={{ padding: '24px' }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '12px'
                  }}>
                    <Avatar
                      src={showcase.avatar}
                      size={32}
                      style={{ marginRight: '8px' }}
                    />
                    <Text style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>
                      {showcase.company}
                    </Text>
                  </div>
                  
                  <Title level={4} style={{ color: '#ffffff', marginBottom: '12px' }}>
                    {showcase.title}
                  </Title>
                  
                  <Paragraph style={{
                    color: 'rgba(255,255,255,0.7)',
                    marginBottom: '20px',
                    lineHeight: '1.6'
                  }}>
                    {showcase.description}
                  </Paragraph>
                  
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '16px',
                    paddingTop: '16px',
                    borderTop: '1px solid #333333'
                  }}>
                    {Object.entries(showcase.results).map(([key, value]) => (
                      <div key={key} style={{ textAlign: 'center' }}>
                        <div style={{
                          fontSize: '18px',
                          fontWeight: 'bold',
                          color: '#1890ff',
                          marginBottom: '4px'
                        }}>
                          {value}
                        </div>
                        <div style={{
                          fontSize: '12px',
                          color: 'rgba(255,255,255,0.5)'
                        }}>
                          {key === 'efficiency' ? '效率提升' :
                           key === 'cost' ? '成本降低' :
                           key === 'time' ? '时间缩短' :
                           key === 'satisfaction' ? '满意度' :
                           key === 'orders' ? '订单增长' :
                           key === 'returns' ? '退货减少' :
                           key === 'performance' ? '性能提升' :
                           key === 'comfort' ? '舒适度' :
                           key === 'durability' ? '耐用性' : key}
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* CTA区域 */}
      <section style={{
        padding: '80px 0',
        background: 'linear-gradient(135deg, #1890ff 0%, #722ed1 50%, #fa8c16 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* 背景装饰 */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)
          `
        }} />
        
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px',
          textAlign: 'center',
          position: 'relative',
          zIndex: 10
        }}>
          <Title level={2} style={{
            color: '#ffffff',
            marginBottom: '16px',
            fontSize: '3rem'
          }}>
            开启您的3D设计之旅
          </Title>
          <Paragraph style={{
            color: 'rgba(255,255,255,0.9)',
            fontSize: '20px',
            marginBottom: '40px',
            maxWidth: '600px',
            margin: '0 auto 40px'
          }}>
            加入DiCreate.AI，体验下一代3D数字化服装设计平台
          </Paragraph>
          
          <Space size="large">
            <Button
              type="primary"
              size="large"
              style={{
                height: '56px',
                padding: '0 40px',
                fontSize: '18px',
                background: '#ffffff',
                color: '#1890ff',
                border: 'none',
                borderRadius: '28px',
                fontWeight: 'bold',
                boxShadow: '0 8px 24px rgba(0,0,0,0.2)'
              }}
              onClick={() => handleCTAClick('/ai-design')}
            >
              免费试用 3D 设计
              <RightOutlined />
            </Button>
            <Button
              ghost
              size="large"
              style={{
                height: '56px',
                padding: '0 40px',
                fontSize: '18px',
                border: '2px solid rgba(255,255,255,0.8)',
                color: '#ffffff',
                borderRadius: '28px',
                fontWeight: 'bold'
              }}
              onClick={() => navigate('/about')}
            >
              预约演示
            </Button>
          </Space>
        </div>
      </section>
    </div>
  )
}

export default Home