import React, { useState, useEffect } from 'react'
import {
  Row,
  Col,
  Card,
  Button,
  Tag,
  Space,
  Tabs,
  Progress,
  Badge,
  Avatar,
  Statistic,
  Select,
  Input,
  DatePicker,
  Image,
  Typography,
  Empty
} from 'antd'
import {
  LineChartOutlined,
  FireOutlined,
  EyeOutlined,
  HeartOutlined,
  ShareAltOutlined,
  SearchOutlined,
  BulbOutlined,
  ThunderboltOutlined,
  CrownOutlined,
  RiseOutlined
} from '@ant-design/icons'
import { ContentLoading, CardSkeleton } from '../components/LoadingSpinner'
import Breadcrumb from '../components/Breadcrumb'
const { Search } = Input
const { RangePicker } = DatePicker
const { Title, Paragraph, Text } = Typography
const { Option } = Select

interface TrendItem {
  id: string
  title: string
  description: string
  image: string
  category: string
  tags: string[]
  popularity: number
  growth: number
  publishDate: string
  author: {
    name: string
    avatar: string
    title: string
  }
  stats: {
    views: number
    likes: number
    shares: number
  }
  colors?: string[]
  season: string
  region: string
}

interface ColorTrend {
  id: string
  name: string
  hex: string
  pantone?: string
  description: string
  usage: number
  category: string
  season: string
}

interface SeasonForecast {
  season: string
  year: number
  themes: string[]
  colors: ColorTrend[]
  styles: string[]
  fabrics: string[]
  confidence: number
}

const Trends: React.FC = () => {
  const [activeTab, setActiveTab] = useState('trends')
  const [loading, setLoading] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedSeason, setSelectedSeason] = useState<string | null>(null)
  const [searchKeyword, setSearchKeyword] = useState('')
  const [trends, setTrends] = useState<TrendItem[]>([])
  const [colorTrends, setColorTrends] = useState<ColorTrend[]>([])
  const [seasonForecast, setSeasonForecast] = useState<SeasonForecast | null>(null)

  // 模拟数据
  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setTrends([
        {
          id: '1',
          title: '2024春夏流行色彩趋势',
          description: '探索2024年春夏季最具影响力的色彩搭配，从温暖的珊瑚色到清新的薄荷绿...',
          image: '/placeholder/400/300',
          category: '色彩趋势',
          tags: ['春夏', '色彩', '搭配'],
          popularity: 95,
          growth: 12,
          publishDate: '2024-01-15',
          author: {
            name: '时尚分析师',
            avatar: '/placeholder/40/40',
            title: '色彩专家'
          },
          stats: {
            views: 15420,
            likes: 892,
            shares: 156
          },
          colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'],
          season: '春夏',
          region: '全球'
        },
        {
          id: '2',
          title: '可持续时尚设计理念',
          description: '环保材料与创新工艺的完美结合，引领时尚产业的绿色革命...',
          image: '/placeholder/400/300',
          category: '设计理念',
          tags: ['可持续', '环保', '创新'],
          popularity: 88,
          growth: 25,
          publishDate: '2024-01-12',
          author: {
            name: '可持续设计师',
            avatar: '/placeholder/40/40',
            title: '环保专家'
          },
          stats: {
            views: 12350,
            likes: 756,
            shares: 203
          },
          season: '全年',
          region: '欧美'
        },
        {
          id: '3',
          title: '数字化印花技术革新',
          description: 'AI驱动的印花设计正在改变传统纺织业，个性化定制成为新趋势...',
          image: '/placeholder/400/300',
          category: '技术创新',
          tags: ['数字化', 'AI', '印花'],
          popularity: 82,
          growth: 18,
          publishDate: '2024-01-10',
          author: {
            name: '技术专家',
            avatar: '/placeholder/40/40',
            title: '数字化顾问'
          },
          stats: {
            views: 9876,
            likes: 543,
            shares: 87
          },
          season: '全年',
          region: '亚洲'
        }
      ])

      setColorTrends([
        {
          id: '1',
          name: '活力珊瑚',
          hex: '#FF6B6B',
          pantone: 'PANTONE 16-1546',
          description: '充满活力的珊瑚色，象征着乐观和温暖',
          usage: 78,
          category: '主色调',
          season: '春夏'
        },
        {
          id: '2',
          name: '宁静蓝',
          hex: '#4ECDC4',
          pantone: 'PANTONE 15-5519',
          description: '平静而清新的蓝绿色，带来内心的宁静',
          usage: 65,
          category: '辅助色',
          season: '春夏'
        },
        {
          id: '3',
          name: '薄荷绿',
          hex: '#96CEB4',
          pantone: 'PANTONE 14-6327',
          description: '清新的薄荷绿，代表新生和希望',
          usage: 52,
          category: '点缀色',
          season: '春夏'
        }
      ])

      setSeasonForecast({
        season: '2024秋冬',
        year: 2024,
        themes: ['复古回归', '极简主义', '可持续发展', '数字化融合'],
        colors: colorTrends,
        styles: ['宽松剪裁', '层次搭配', '中性风格', '功能性设计'],
        fabrics: ['再生纤维', '有机棉', '科技面料', '天然材质'],
        confidence: 85
      })

      setLoading(false)
    }, 1000)
  }, [])

  // 渲染趋势卡片
  const renderTrendCard = (trend: TrendItem) => {
    return (
      <Card
        key={trend.id}
        hoverable
        className="h-full"
        cover={
          <div className="relative">
            <Image
              src={trend.image}
              alt={trend.title}
              className="h-48 w-full object-cover"
              preview={false}
            />
            <div className="absolute top-2 right-2">
              <Badge
                count={`+${trend.growth}%`}
                style={{ backgroundColor: '#52c41a' }}
              />
            </div>
            <div className="absolute bottom-2 left-2">
              <Tag color="blue">{trend.category}</Tag>
            </div>
          </div>
        }
        actions={[
          <Button type="text" icon={<EyeOutlined />} key="view">
            {trend.stats.views}
          </Button>,
          <Button type="text" icon={<HeartOutlined />} key="like">
            {trend.stats.likes}
          </Button>,
          <Button type="text" icon={<ShareAltOutlined />} key="share">
            {trend.stats.shares}
          </Button>
        ]}
      >
        <Card.Meta
          title={
            <div className="flex items-center justify-between">
              <span className="line-clamp-1">{trend.title}</span>
              <div className="flex items-center gap-1">
                <FireOutlined className="text-red-500" />
                <span className="text-sm font-normal">{trend.popularity}</span>
              </div>
            </div>
          }
          description={
            <div className="space-y-2">
              <Paragraph ellipsis={{ rows: 2 }} className="text-sm text-gray-600 mb-2">
                {trend.description}
              </Paragraph>
              
              {trend.colors && (
                <div className="flex gap-1">
                  {trend.colors.map((color, index) => (
                    <div
                      key={index}
                      className="w-4 h-4 rounded-full border border-gray-200"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              )}
              
              <div className="flex flex-wrap gap-1">
                {trend.tags.map(tag => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
              
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <Avatar size={16} src={trend.author.avatar} />
                  <span>{trend.author.name}</span>
                </div>
                <span>{trend.publishDate}</span>
              </div>
            </div>
          }
        />
      </Card>
    )
  }

  // 渲染色彩趋势
  const renderColorTrends = () => {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <Title level={3}>2024年度流行色彩</Title>
          <Paragraph className="text-gray-600">
            基于全球时尚数据分析，为您呈现最具影响力的色彩趋势
          </Paragraph>
        </div>
        
        <Row gutter={[16, 16]}>
          {colorTrends.map(color => (
            <Col xs={24} sm={12} md={8} lg={6} key={color.id}>
              <Card className="text-center h-full">
                <div
                  className="w-full h-32 rounded-lg mb-4 border border-gray-200"
                  style={{ backgroundColor: color.hex }}
                />
                <Title level={5} className="mb-2">{color.name}</Title>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">色值:</span>
                    <Text code>{color.hex}</Text>
                  </div>
                  {color.pantone && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Pantone:</span>
                      <Text code>{color.pantone}</Text>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-500">使用率:</span>
                    <span>{color.usage}%</span>
                  </div>
                </div>
                <Progress
                  percent={color.usage}
                  size="small"
                  className="mt-2"
                  strokeColor={color.hex}
                />
                <Paragraph className="text-xs text-gray-600 mt-2">
                  {color.description}
                </Paragraph>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    )
  }

  // 渲染季节预测
  const renderSeasonForecast = () => {
    if (!seasonForecast) return <Empty description="暂无预测数据" />

    return (
      <div className="space-y-6">
        <div className="text-center">
          <Title level={3}>{seasonForecast.season}流行趋势预测</Title>
          <div className="flex items-center justify-center gap-2 mt-2">
            <span className="text-gray-600">预测准确度:</span>
            <Progress
              type="circle"
              size={60}
              percent={seasonForecast.confidence}
              format={percent => `${percent}%`}
            />
          </div>
        </div>

        <Row gutter={[24, 24]}>
          <Col xs={24} lg={12}>
            <Card title="主题趋势" className="h-full">
              <div className="space-y-3">
                {seasonForecast.themes.map((theme, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    <span>{theme}</span>
                  </div>
                ))}
              </div>
            </Card>
          </Col>
          
          <Col xs={24} lg={12}>
            <Card title="风格预测" className="h-full">
              <div className="space-y-3">
                {seasonForecast.styles.map((style, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span>{style}</span>
                  </div>
                ))}
              </div>
            </Card>
          </Col>
          
          <Col xs={24} lg={12}>
            <Card title="面料趋势" className="h-full">
              <div className="space-y-3">
                {seasonForecast.fabrics.map((fabric, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full" />
                    <span>{fabric}</span>
                  </div>
                ))}
              </div>
            </Card>
          </Col>
          
          <Col xs={24} lg={12}>
            <Card title="数据洞察" className="h-full">
              <div className="space-y-4">
                <Statistic
                  title="趋势变化"
                  value={15.6}
                  suffix="%"
                  prefix={<RiseOutlined />}
                  valueStyle={{ color: '#3f8600' }}
                />
                <Statistic
                  title="市场关注度"
                  value={892}
                  suffix="万"
                  prefix={<EyeOutlined />}
                />
                <Statistic
                  title="设计师采用率"
                  value={73.2}
                  suffix="%"
                  prefix={<CrownOutlined />}
                />
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }

  return (
    <div className="p-6">
      <Breadcrumb />
      
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">流行趋势</h1>
        <p className="text-gray-600">洞察时尚前沿，把握设计趋势</p>
      </div>

      {/* 筛选工具栏 */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          <Search
            placeholder="搜索趋势关键词..."
            allowClear
            enterButton={<SearchOutlined />}
            size="large"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className="max-w-md"
          />
          
          <Space wrap>
            <Select
              placeholder="分类"
              allowClear
              className="w-32"
              value={selectedCategory}
              onChange={setSelectedCategory}
            >
              <Option value="色彩趋势">色彩趋势</Option>
              <Option value="设计理念">设计理念</Option>
              <Option value="技术创新">技术创新</Option>
              <Option value="材料工艺">材料工艺</Option>
            </Select>
            
            <Select
              placeholder="季节"
              allowClear
              className="w-32"
              value={selectedSeason}
              onChange={setSelectedSeason}
            >
              <Option value="春夏">春夏</Option>
              <Option value="秋冬">秋冬</Option>
              <Option value="全年">全年</Option>
            </Select>
            
            <RangePicker placeholder={['开始日期', '结束日期']} />
          </Space>
        </div>
      </div>

      {/* 主要内容 */}
      <div className="bg-white rounded-lg shadow-sm">
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          className="px-6 pt-6"
          items={[
            {
              key: 'trends',
              label: (
                <span className="flex items-center gap-2">
                    <LineChartOutlined />
                    趋势动态
                  </span>
              ),
              children: (
                <div className="pb-6">
                  {loading ? (
                    <Row gutter={[16, 16]}>
                      {[1, 2, 3, 4, 5, 6].map(i => (
                        <Col xs={24} sm={12} lg={8} key={i}>
                          <CardSkeleton />
                        </Col>
                      ))}
                    </Row>
                  ) : (
                    <Row gutter={[16, 16]}>
                      {trends.map(trend => (
                        <Col xs={24} sm={12} lg={8} key={trend.id}>
                          {renderTrendCard(trend)}
                        </Col>
                      ))}
                    </Row>
                  )}
                </div>
              )
            },
            {
              key: 'colors',
              label: (
                <span className="flex items-center gap-2">
                  <BulbOutlined />
                  色彩趋势
                </span>
              ),
              children: (
                <div className="pb-6">
                  {loading ? <ContentLoading /> : renderColorTrends()}
                </div>
              )
            },
            {
              key: 'forecast',
              label: (
                <span className="flex items-center gap-2">
                  <ThunderboltOutlined />
                  季节预测
                </span>
              ),
              children: (
                <div className="pb-6">
                  {loading ? <ContentLoading /> : renderSeasonForecast()}
                </div>
              )
            }
          ]}
        />
      </div>
    </div>
  )
}

export default Trends