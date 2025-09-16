import React from 'react'
import { Card, Row, Col, Typography, Button, Space, Tag } from 'antd'
import {
  ExperimentOutlined,
  BgColorsOutlined,
  AppstoreOutlined,
  RobotOutlined,
  GlobalOutlined,
  ClusterOutlined
} from '@ant-design/icons'

const { Title, Paragraph } = Typography

const Platform: React.FC = () => {
  const platformSections = [
    {
      key: 'engineering',
      title: '工学',
      icon: <ExperimentOutlined />,
      description: 'AI驱动的全球服装贸易平台 - 工程技术解决方案',
      features: ['品类专业化', '复合', '纺织', '毛衣', '牛仔'],
      color: '#1890ff'
    },
    {
      key: 'textile',
      title: '纺织',
      icon: <BgColorsOutlined />,
      description: '专业纺织品设计与制造平台',
      features: ['面料设计', '工艺优化', '质量控制', '供应链管理'],
      color: '#52c41a'
    },
    {
      key: 'knitwear',
      title: '毛衣',
      icon: <AppstoreOutlined />,
      description: '毛衣设计与生产专业平台',
      features: ['款式设计', '编织工艺', '版型优化', '成本控制'],
      color: '#fa8c16'
    },
    {
      key: 'ai-station',
      title: 'AI站点',
      icon: <RobotOutlined />,
      description: 'AI驱动的智能设计与生产管理',
      features: ['智能设计', '自动化生产', '质量检测', '数据分析'],
      color: '#722ed1'
    },
    {
      key: 'processing',
      title: '产前全球化',
      icon: <GlobalOutlined />,
      description: '全球化产前服务与供应链管理',
      features: ['全球采购', '供应商管理', '物流优化', '成本控制'],
      color: '#eb2f96'
    },
    {
      key: 'industrialization',
      title: '产业平台化',
      icon: <ClusterOutlined />,
      description: '产业链整合与平台化运营',
      features: ['产业整合', '平台运营', '生态建设', '价值创造'],
      color: '#13c2c2'
    }
  ]

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <Title level={1}>AI驱动的全球服装贸易平台</Title>
        <Paragraph style={{ fontSize: '18px', color: '#666' }}>
          整合全球服装产业链，提供从设计到生产的一站式智能化解决方案
        </Paragraph>
      </div>

      <Row gutter={[24, 24]}>
        {platformSections.map((section) => (
          <Col xs={24} sm={12} lg={8} key={section.key}>
            <Card
              hoverable
              styles={{
                body: { padding: '24px' }
              }}
              style={{
                height: '100%',
                borderLeft: `4px solid ${section.color}`,
                transition: 'all 0.3s ease'
              }}
            >
              <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <div style={{ textAlign: 'center' }}>
                  <div
                    style={{
                      fontSize: '48px',
                      color: section.color,
                      marginBottom: '16px'
                    }}
                  >
                    {section.icon}
                  </div>
                  <Title level={3} style={{ margin: 0, color: section.color }}>
                    {section.title}
                  </Title>
                </div>
                
                <Paragraph style={{ textAlign: 'center', margin: 0 }}>
                  {section.description}
                </Paragraph>
                
                <div>
                  <div style={{ marginBottom: '12px', fontWeight: 'bold' }}>核心功能：</div>
                  <Space wrap>
                    {section.features.map((feature, index) => (
                      <Tag key={index} color={section.color}>
                        {feature}
                      </Tag>
                    ))}
                  </Space>
                </div>
                
                <Button 
                  type="primary" 
                  block 
                  style={{ backgroundColor: section.color, borderColor: section.color }}
                >
                  了解更多
                </Button>
              </Space>
            </Card>
          </Col>
        ))}
      </Row>

      <div style={{ marginTop: '48px', textAlign: 'center' }}>
        <Card
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white'
          }}
          styles={{
            body: { padding: '48px 24px' }
          }}
        >
          <Title level={2} style={{ color: 'white', marginBottom: '24px' }}>
            开启智能服装产业新时代
          </Title>
          <Paragraph style={{ fontSize: '16px', color: 'rgba(255,255,255,0.9)', marginBottom: '32px' }}>
            通过AI技术驱动，整合全球服装产业资源，为企业提供从创意设计到批量生产的全链条智能化服务
          </Paragraph>
          <Space size="large">
            <Button type="primary" size="large" ghost>
              立即体验
            </Button>
            <Button size="large" ghost>
              了解方案
            </Button>
          </Space>
        </Card>
      </div>
    </div>
  )
}

export default Platform