import React, { useState } from 'react'
import {
  Row,
  Col,
  Card,
  Button,
  Timeline,
  Avatar,
  Statistic,
  Progress,
  Tag,
  Space,
  Divider,
  Typography,
  Image,
  Tabs,
  List,
  Rate,
  Carousel,
  Modal
} from 'antd'
import {
  TeamOutlined,
  TrophyOutlined,
  RocketOutlined,
  HeartOutlined,
  GlobalOutlined,
  SafetyOutlined,
  BulbOutlined,
  ThunderboltOutlined,
  StarOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  LinkedinOutlined,
  TwitterOutlined,
  GithubOutlined,
  PlayCircleOutlined
} from '@ant-design/icons'
import { cn } from '../lib/utils'
import Breadcrumb from '../components/Breadcrumb'

const { Title, Paragraph, Text } = Typography
const { TabPane } = Tabs

interface TeamMember {
  id: string
  name: string
  position: string
  avatar: string
  bio: string
  expertise: string[]
  experience: string
  education: string
  social: {
    linkedin?: string
    twitter?: string
    github?: string
  }
}

interface Milestone {
  year: string
  title: string
  description: string
  achievement?: string
}

interface CoreValue {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  color: string
}

const AboutUs: React.FC = () => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)
  const [memberModalVisible, setMemberModalVisible] = useState(false)

  // 核心价值观
  const coreValues: CoreValue[] = [
    {
      id: '1',
      title: '创新驱动',
      description: '持续探索前沿技术，用创新推动时尚产业数字化转型',
      icon: <BulbOutlined />,
      color: '#1890ff'
    },
    {
      id: '2',
      title: '品质至上',
      description: '严格把控每一个细节，为用户提供卓越的产品体验',
      icon: <TrophyOutlined />,
      color: '#52c41a'
    },
    {
      id: '3',
      title: '合作共赢',
      description: '与合作伙伴携手共进，构建健康可持续的生态系统',
      icon: <TeamOutlined />,
      color: '#faad14'
    },
    {
      id: '4',
      title: '用户为本',
      description: '深度理解用户需求，持续优化产品和服务体验',
      icon: <HeartOutlined />,
      color: '#f5222d'
    }
  ]

  // 团队成员
  const teamMembers: TeamMember[] = [
    {
      id: '1',
      name: '张明华',
      position: '创始人 & CEO',
      avatar: '/placeholder/120/120',
      bio: '拥有15年时尚产业经验，曾任职于多家知名服装企业，致力于推动时尚产业数字化转型。',
      expertise: ['战略规划', '产业洞察', '团队管理'],
      experience: '15年时尚产业经验',
      education: '清华大学MBA',
      social: {
        linkedin: '#',
        twitter: '#'
      }
    },
    {
      id: '2',
      name: '李雪梅',
      position: 'CTO & 联合创始人',
      avatar: '/placeholder/120/120',
      bio: '前阿里巴巴技术专家，在AI、大数据、云计算领域有丰富经验，主导平台技术架构设计。',
      expertise: ['人工智能', '大数据', '云计算'],
      experience: '12年技术研发经验',
      education: '北京大学计算机博士',
      social: {
        linkedin: '#',
        github: '#'
      }
    },
    {
      id: '3',
      name: '王志强',
      position: '设计总监',
      avatar: '/placeholder/120/120',
      bio: '国际知名服装设计师，曾获得多项设计大奖，擅长将传统工艺与现代科技相结合。',
      expertise: ['服装设计', '创意指导', '品牌策划'],
      experience: '10年设计经验',
      education: '中央美术学院硕士',
      social: {
        linkedin: '#',
        twitter: '#'
      }
    },
    {
      id: '4',
      name: '陈佳音',
      position: '产品总监',
      avatar: '/placeholder/120/120',
      bio: '资深产品经理，专注于用户体验设计，曾主导多个成功的B2B产品项目。',
      expertise: ['产品设计', '用户体验', '项目管理'],
      experience: '8年产品经验',
      education: '上海交通大学硕士',
      social: {
        linkedin: '#'
      }
    }
  ]

  // 发展历程
  const milestones: Milestone[] = [
    {
      year: '2024',
      title: '平台正式上线',
      description: 'DiCreate.AI平台正式发布，为时尚产业提供一站式数字化解决方案',
      achievement: '服务企业100+'
    },
    {
      year: '2023',
      title: '完成A轮融资',
      description: '获得知名投资机构A轮融资，加速产品研发和市场拓展',
      achievement: '融资5000万元'
    },
    {
      year: '2022',
      title: '技术突破',
      description: '在AI服装设计和3D建模技术方面取得重大突破，获得多项专利',
      achievement: '获得专利15项'
    },
    {
      year: '2021',
      title: '公司成立',
      description: 'DiCreate.AI正式成立，致力于用AI技术革新时尚产业',
      achievement: '团队规模50人'
    }
  ]

  // 打开团队成员详情
  const showMemberDetail = (member: TeamMember) => {
    setSelectedMember(member)
    setMemberModalVisible(true)
  }

  return (
    <div className="p-6">
      <Breadcrumb />
      
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">关于我们</h1>
        <p className="text-gray-600">用AI技术重新定义时尚产业的未来</p>
      </div>

      {/* 公司介绍 */}
      <div className="mb-12">
        <Card className="overflow-hidden">
          <Row gutter={[48, 32]} align="middle">
            <Col xs={24} lg={12}>
              <div className="space-y-6">
                <div>
                  <Title level={2} className="mb-4">
                    引领时尚产业数字化变革
                  </Title>
                  <Paragraph className="text-lg text-gray-600 leading-relaxed">
                    DiCreate.AI是一家专注于时尚产业数字化转型的科技公司。我们运用人工智能、大数据、
                    云计算等前沿技术，为服装企业提供从设计、生产到销售的全链路数字化解决方案。
                  </Paragraph>
                  <Paragraph className="text-lg text-gray-600 leading-relaxed">
                    我们的使命是让每一个设计师都能拥有AI助手，让每一家服装企业都能享受数字化红利，
                    推动整个时尚产业向更加智能、高效、可持续的方向发展。
                  </Paragraph>
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <Statistic
                    title="服务企业"
                    value={500}
                    suffix="+"
                    valueStyle={{ color: '#1890ff' }}
                  />
                  <Statistic
                    title="设计师用户"
                    value={10000}
                    suffix="+"
                    valueStyle={{ color: '#52c41a' }}
                  />
                  <Statistic
                    title="AI模型"
                    value={50}
                    suffix="+"
                    valueStyle={{ color: '#faad14' }}
                  />
                  <Statistic
                    title="专利技术"
                    value={25}
                    suffix="项"
                    valueStyle={{ color: '#f5222d' }}
                  />
                </div>
              </div>
            </Col>
            
            <Col xs={24} lg={12}>
              <div className="relative">
                <Image
                  src="/placeholder/600/400"
                  alt="公司介绍"
                  className="rounded-lg"
                  preview={false}
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 rounded-lg flex items-center justify-center">
                  <Button
                    type="primary"
                    size="large"
                    icon={<PlayCircleOutlined />}
                    className="bg-white text-gray-900 border-white hover:bg-gray-100"
                  >
                    观看介绍视频
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </Card>
      </div>

      {/* 核心价值观 */}
      <div className="mb-12">
        <div className="text-center mb-8">
          <Title level={2}>核心价值观</Title>
          <Paragraph className="text-gray-600">
            这些价值观指引着我们的每一个决策和行动
          </Paragraph>
        </div>
        
        <Row gutter={[24, 24]}>
          {coreValues.map(value => (
            <Col xs={24} sm={12} lg={6} key={value.id}>
              <Card className="text-center h-full hover:shadow-lg transition-shadow">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl text-white"
                  style={{ backgroundColor: value.color }}
                >
                  {value.icon}
                </div>
                <Title level={4} className="mb-3">{value.title}</Title>
                <Paragraph className="text-gray-600">
                  {value.description}
                </Paragraph>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* 团队介绍 */}
      <div className="mb-12">
        <div className="text-center mb-8">
          <Title level={2}>核心团队</Title>
          <Paragraph className="text-gray-600">
            汇聚行业精英，用专业和热情驱动创新
          </Paragraph>
        </div>
        
        <Row gutter={[24, 24]}>
          {teamMembers.map(member => (
            <Col xs={24} sm={12} lg={6} key={member.id}>
              <Card
                hoverable
                className="text-center h-full"
                onClick={() => showMemberDetail(member)}
              >
                <Avatar
                  size={100}
                  src={member.avatar}
                  className="mb-4"
                />
                <Title level={4} className="mb-2">{member.name}</Title>
                <Text className="text-blue-600 font-medium">{member.position}</Text>
                <Paragraph className="text-gray-600 mt-3 line-clamp-3">
                  {member.bio}
                </Paragraph>
                <div className="flex flex-wrap gap-1 justify-center mt-3">
                  {member.expertise.slice(0, 2).map(skill => (
                    <Tag key={skill} color="blue">{skill}</Tag>
                  ))}
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* 发展历程 */}
      <div className="mb-12">
        <Card>
          <div className="text-center mb-8">
            <Title level={2}>发展历程</Title>
            <Paragraph className="text-gray-600">
              从创立到今天，我们始终坚持创新和品质
            </Paragraph>
          </div>
          
          <Timeline
            mode="alternate"
            className="mt-8"
            items={milestones.map((milestone, index) => ({
              key: milestone.year,
              dot: (
                <div className="w-4 h-4 bg-blue-500 rounded-full border-4 border-white shadow-lg" />
              ),
              children: (
                <Card size="small" className="max-w-md">
                  <div className="flex items-center gap-2 mb-2">
                    <Tag color="blue">{milestone.year}</Tag>
                    {milestone.achievement && (
                      <Tag color="green">{milestone.achievement}</Tag>
                    )}
                  </div>
                  <Title level={5} className="mb-2">{milestone.title}</Title>
                  <Paragraph className="text-gray-600 mb-0">
                    {milestone.description}
                  </Paragraph>
                </Card>
              )
            }))}
          />
        </Card>
      </div>

      {/* 联系我们 */}
      <div className="mb-12">
        <Card>
          <Row gutter={[48, 32]}>
            <Col xs={24} lg={12}>
              <Title level={3} className="mb-6">联系我们</Title>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <EnvironmentOutlined className="text-blue-500 text-lg" />
                  <div>
                    <div className="font-medium">公司地址</div>
                    <div className="text-gray-600">北京市朝阳区望京SOHO T3座 2008室</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <PhoneOutlined className="text-blue-500 text-lg" />
                  <div>
                    <div className="font-medium">联系电话</div>
                    <div className="text-gray-600">400-888-9999</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <MailOutlined className="text-blue-500 text-lg" />
                  <div>
                    <div className="font-medium">邮箱地址</div>
                    <div className="text-gray-600">contact@dicreate.ai</div>
                  </div>
                </div>
              </div>
              
              <Divider />
              
              <div>
                <Title level={4} className="mb-4">关注我们</Title>
                <Space size="large">
                  <Button type="text" icon={<LinkedinOutlined />} size="large" />
                  <Button type="text" icon={<TwitterOutlined />} size="large" />
                  <Button type="text" icon={<GithubOutlined />} size="large" />
                </Space>
              </div>
            </Col>
            
            <Col xs={24} lg={12}>
              <div className="bg-gray-100 rounded-lg p-6 h-full flex items-center justify-center">
                <div className="text-center">
                  <GlobalOutlined className="text-6xl text-gray-400 mb-4" />
                  <Title level={4} className="text-gray-600">地图位置</Title>
                  <Paragraph className="text-gray-500">
                    点击查看详细位置信息
                  </Paragraph>
                </div>
              </div>
            </Col>
          </Row>
        </Card>
      </div>

      {/* 团队成员详情模态框 */}
      <Modal
        title={selectedMember?.name}
        open={memberModalVisible}
        onCancel={() => setMemberModalVisible(false)}
        footer={null}
        width={600}
      >
        {selectedMember && (
          <div className="space-y-6">
            <div className="text-center">
              <Avatar size={120} src={selectedMember.avatar} className="mb-4" />
              <Title level={3} className="mb-2">{selectedMember.name}</Title>
              <Text className="text-blue-600 text-lg font-medium">
                {selectedMember.position}
              </Text>
            </div>
            
            <Divider />
            
            <div>
              <Title level={5} className="mb-3">个人简介</Title>
              <Paragraph className="text-gray-600">
                {selectedMember.bio}
              </Paragraph>
            </div>
            
            <div>
              <Title level={5} className="mb-3">专业领域</Title>
              <div className="flex flex-wrap gap-2">
                {selectedMember.expertise.map(skill => (
                  <Tag key={skill} color="blue">{skill}</Tag>
                ))}
              </div>
            </div>
            
            <Row gutter={24}>
              <Col span={12}>
                <Title level={5} className="mb-2">工作经验</Title>
                <Text className="text-gray-600">{selectedMember.experience}</Text>
              </Col>
              <Col span={12}>
                <Title level={5} className="mb-2">教育背景</Title>
                <Text className="text-gray-600">{selectedMember.education}</Text>
              </Col>
            </Row>
            
            <div>
              <Title level={5} className="mb-3">社交媒体</Title>
              <Space>
                {selectedMember.social.linkedin && (
                  <Button type="text" icon={<LinkedinOutlined />}>LinkedIn</Button>
                )}
                {selectedMember.social.twitter && (
                  <Button type="text" icon={<TwitterOutlined />}>Twitter</Button>
                )}
                {selectedMember.social.github && (
                  <Button type="text" icon={<GithubOutlined />}>GitHub</Button>
                )}
              </Space>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default AboutUs