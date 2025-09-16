import React from 'react'
import { Card, Row, Col, Typography, Button, Space, List, Avatar, Tag, Statistic } from 'antd'
import {
  AppstoreOutlined,
  TrendingUpOutlined,
  DatabaseOutlined,
  CustomerServiceOutlined,
  BgColorsOutlined,
  ToolOutlined,
  ShoppingOutlined,
  CrownOutlined,
  HeartOutlined,
  CalendarOutlined
} from '@ant-design/icons'

const { Title, Paragraph } = Typography

const OtherMain: React.FC = () => {
  const mainSections = [
    {
      key: 'platform-content',
      title: '平台内容',
      icon: <AppstoreOutlined />,
      description: '丰富的平台内容管理与展示',
      stats: { count: '1,200+', label: '内容条目' },
      color: '#1890ff'
    },
    {
      key: 'streaming',
      title: '流行动态',
      icon: <TrendingUpOutlined />,
      description: '实时追踪全球时尚流行趋势',
      stats: { count: '500+', label: '趋势报告' },
      color: '#52c41a'
    },
    {
      key: 'platform-products',
      title: '平台产品库',
      icon: <DatabaseOutlined />,
      description: '海量产品资源库管理',
      stats: { count: '10,000+', label: '产品SKU' },
      color: '#fa8c16'
    },
    {
      key: 'platform-services',
      title: '平台服务库',
      icon: <CustomerServiceOutlined />,
      description: '专业服务资源整合平台',
      stats: { count: '200+', label: '服务商' },
      color: '#722ed1'
    },
    {
      key: 'ai-design-advanced',
      title: 'AI设计',
      icon: <BgColorsOutlined />,
      description: '智能化设计工具与解决方案',
      stats: { count: '50+', label: '设计模板' },
      color: '#eb2f96'
    },
    {
      key: 'processing-manufacturing',
      title: '加工制作',
      icon: <ToolOutlined />,
      description: '专业加工制作服务平台',
      stats: { count: '100+', label: '合作工厂' },
      color: '#13c2c2'
    },
    {
      key: 'product-list',
      title: '商品列表',
      icon: <ShoppingOutlined />,
      description: '全面的商品展示与管理',
      stats: { count: '5,000+', label: '在售商品' },
      color: '#f5222d'
    },
    {
      key: 'simple-brand',
      title: '简品牌',
      icon: <CrownOutlined />,
      description: '简约品牌建设与推广',
      stats: { count: '80+', label: '合作品牌' },
      color: '#faad14'
    },
    {
      key: 'collection-favorites',
      title: '收藏加收',
      icon: <HeartOutlined />,
      description: '个性化收藏与推荐系统',
      stats: { count: '2,000+', label: '用户收藏' },
      color: '#a0d911'
    },
    {
      key: 'order-booking',
      title: '订单预订',
      icon: <CalendarOutlined />,
      description: '智能订单管理与预订系统',
      stats: { count: '800+', label: '月订单量' },
      color: '#36cfc9'
    }
  ]

  const recentActivities = [
    {
      title: '新增AI设计模板',
      description: '春季时装设计模板已上线',
      time: '2小时前',
      avatar: <BgColorsOutlined />
    },
    {
      title: '流行趋势更新',
      description: '2024春夏流行色彩趋势发布',
      time: '4小时前',
      avatar: <TrendingUpOutlined />
    },
    {
      title: '新合作工厂入驻',
      description: '江苏某纺织厂加入平台',
      time: '1天前',
      avatar: <ToolOutlined />
    },
    {
      title: '品牌推广活动',
      description: '简品牌春季推广活动启动',
      time: '2天前',
      avatar: <CrownOutlined />
    }
  ]

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <Title level={1}>其他主界面</Title>
        <Paragraph style={{ fontSize: '18px', color: '#666' }}>
          全方位的平台功能模块，满足不同业务场景需求
        </Paragraph>
      </div>

      <Row gutter={[24, 24]}>
        {mainSections.map((section) => (
          <Col xs={24} sm={12} lg={8} xl={6} key={section.key}>
            <Card
              hoverable
              styles={{
                body: { padding: '20px' }
              }}
              style={{
                height: '100%',
                borderTop: `3px solid ${section.color}`,
                transition: 'all 0.3s ease'
              }}
            >
              <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                <div style={{ textAlign: 'center' }}>
                  <div
                    style={{
                      fontSize: '32px',
                      color: section.color,
                      marginBottom: '8px'
                    }}
                  >
                    {section.icon}
                  </div>
                  <Title level={4} style={{ margin: 0 }}>
                    {section.title}
                  </Title>
                </div>
                
                <Paragraph style={{ textAlign: 'center', margin: 0, fontSize: '14px' }}>
                  {section.description}
                </Paragraph>
                
                <div style={{ textAlign: 'center' }}>
                  <Statistic
                    title={section.stats.label}
                    value={section.stats.count}
                    valueStyle={{ color: section.color, fontSize: '20px' }}
                  />
                </div>
                
                <Button 
                  type="primary" 
                  block 
                  size="small"
                  style={{ backgroundColor: section.color, borderColor: section.color }}
                >
                  进入模块
                </Button>
              </Space>
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[24, 24]} style={{ marginTop: '48px' }}>
        <Col xs={24} lg={16}>
          <Card title="平台数据概览" styles={{ body: { padding: '24px' } }}>
            <Row gutter={[16, 16]}>
              <Col xs={12} sm={6}>
                <Statistic
                  title="总用户数"
                  value={12580}
                  valueStyle={{ color: '#1890ff' }}
                  suffix="人"
                />
              </Col>
              <Col xs={12} sm={6}>
                <Statistic
                  title="月活跃用户"
                  value={8960}
                  valueStyle={{ color: '#52c41a' }}
                  suffix="人"
                />
              </Col>
              <Col xs={12} sm={6}>
                <Statistic
                  title="总交易额"
                  value={2580000}
                  valueStyle={{ color: '#fa8c16' }}
                  prefix="¥"
                />
              </Col>
              <Col xs={12} sm={6}>
                <Statistic
                  title="合作伙伴"
                  value={380}
                  valueStyle={{ color: '#722ed1' }}
                  suffix="家"
                />
              </Col>
            </Row>
          </Card>
        </Col>
        
        <Col xs={24} lg={8}>
          <Card title="最新动态" styles={{ body: { padding: '16px' } }}>
            <List
              itemLayout="horizontal"
              dataSource={recentActivities}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar icon={item.avatar} />}
                    title={item.title}
                    description={
                      <div>
                        <div>{item.description}</div>
                        <div style={{ color: '#999', fontSize: '12px', marginTop: '4px' }}>
                          {item.time}
                        </div>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default OtherMain