import React, { useState, useEffect } from 'react'
import {
  Layout,
  Card,
  Tabs,
  Button,
  Table,
  Form,
  Input,
  Select,
  InputNumber,
  Progress,
  Statistic,
  Row,
  Col,
  Space,
  Tag,
  Modal,
  Upload,
  message,
  Divider,
  Timeline,
  Badge,
  Tooltip,
  Switch,
  Slider,
  Radio,
  DatePicker,
  Alert
} from 'antd'
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  DownloadOutlined,
  UploadOutlined,
  PlayCircleOutlined,
  PauseCircleOutlined,
  StopOutlined,
  SettingOutlined,
  EyeOutlined,
  PrinterOutlined,
  ScissorOutlined,
  AppstoreOutlined,
  BarChartOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  SyncOutlined,
  ThunderboltOutlined,
  BugOutlined,
  RocketOutlined
} from '@ant-design/icons'

const { TabPane } = Tabs
const { Option } = Select
const { RangePicker } = DatePicker

// 数据接口定义
interface PatternData {
  id: string
  name: string
  type: 'shirt' | 'pants' | 'dress' | 'jacket'
  size: string
  fabric: string
  pieces: number
  efficiency: number
  status: 'draft' | 'optimized' | 'production'
  createdAt: string
  thumbnail: string
}

interface ProductionOrder {
  id: string
  orderNumber: string
  product: string
  quantity: number
  priority: 'low' | 'medium' | 'high' | 'urgent'
  status: 'pending' | 'cutting' | 'sewing' | 'finishing' | 'completed'
  progress: number
  startDate: string
  dueDate: string
  assignedTo: string
}

interface MaterialUsage {
  id: string
  material: string
  required: number
  used: number
  waste: number
  efficiency: number
  cost: number
}

const Production: React.FC = () => {
  const [activeTab, setActiveTab] = useState('patterns')
  const [patterns, setPatterns] = useState<PatternData[]>([])
  const [orders, setOrders] = useState<ProductionOrder[]>([])
  const [materials, setMaterials] = useState<MaterialUsage[]>([])
  const [selectedPattern, setSelectedPattern] = useState<PatternData | null>(null)
  const [optimizationVisible, setOptimizationVisible] = useState(false)
  const [productionVisible, setProductionVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [optimizationProgress, setOptimizationProgress] = useState(0)
  const [form] = Form.useForm()

  // 模拟数据
  useEffect(() => {
    const mockPatterns: PatternData[] = [
      {
        id: '1',
        name: '经典衬衫版型',
        type: 'shirt',
        size: 'M',
        fabric: '纯棉',
        pieces: 12,
        efficiency: 85,
        status: 'optimized',
        createdAt: '2024-01-15',
        thumbnail: '/api/placeholder/200/150'
      },
      {
        id: '2',
        name: '修身西装外套',
        type: 'jacket',
        size: 'L',
        fabric: '羊毛混纺',
        pieces: 18,
        efficiency: 78,
        status: 'production',
        createdAt: '2024-01-14',
        thumbnail: '/api/placeholder/200/150'
      },
      {
        id: '3',
        name: '休闲连衣裙',
        type: 'dress',
        size: 'S',
        fabric: '雪纺',
        pieces: 8,
        efficiency: 92,
        status: 'draft',
        createdAt: '2024-01-13',
        thumbnail: '/api/placeholder/200/150'
      }
    ]

    const mockOrders: ProductionOrder[] = [
      {
        id: '1',
        orderNumber: 'PO-2024-001',
        product: '经典衬衫',
        quantity: 500,
        priority: 'high',
        status: 'cutting',
        progress: 35,
        startDate: '2024-01-15',
        dueDate: '2024-01-25',
        assignedTo: '生产线A'
      },
      {
        id: '2',
        orderNumber: 'PO-2024-002',
        product: '修身西装',
        quantity: 200,
        priority: 'urgent',
        status: 'sewing',
        progress: 68,
        startDate: '2024-01-12',
        dueDate: '2024-01-22',
        assignedTo: '生产线B'
      }
    ]

    const mockMaterials: MaterialUsage[] = [
      {
        id: '1',
        material: '纯棉面料',
        required: 1000,
        used: 850,
        waste: 50,
        efficiency: 94,
        cost: 15000
      },
      {
        id: '2',
        material: '羊毛混纺',
        required: 500,
        used: 480,
        waste: 15,
        efficiency: 97,
        cost: 24000
      }
    ]

    setPatterns(mockPatterns)
    setOrders(mockOrders)
    setMaterials(mockMaterials)
  }, [])

  // 版型优化
  const handleOptimizePattern = (pattern: PatternData) => {
    setSelectedPattern(pattern)
    setOptimizationVisible(true)
    setOptimizationProgress(0)
  }

  // 开始优化
  const startOptimization = () => {
    setLoading(true)
    const interval = setInterval(() => {
      setOptimizationProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setLoading(false)
          message.success('版型优化完成！')
          return 100
        }
        return prev + 10
      })
    }, 500)
  }

  // 版型表格列定义
  const patternColumns = [
    {
      title: '版型名称',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: PatternData) => (
        <Space>
          <img src={record.thumbnail} alt={text} style={{ width: 40, height: 30, objectFit: 'cover', borderRadius: 4 }} />
          <span>{text}</span>
        </Space>
      )
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => {
        const typeMap = {
          shirt: { text: '衬衫', color: 'blue' },
          pants: { text: '裤装', color: 'green' },
          dress: { text: '连衣裙', color: 'purple' },
          jacket: { text: '外套', color: 'orange' }
        }
        const config = typeMap[type as keyof typeof typeMap]
        return <Tag color={config.color}>{config.text}</Tag>
      }
    },
    {
      title: '尺码',
      dataIndex: 'size',
      key: 'size'
    },
    {
      title: '面料',
      dataIndex: 'fabric',
      key: 'fabric'
    },
    {
      title: '裁片数',
      dataIndex: 'pieces',
      key: 'pieces'
    },
    {
      title: '排料效率',
      dataIndex: 'efficiency',
      key: 'efficiency',
      render: (efficiency: number) => (
        <Progress 
          percent={efficiency} 
          size="small" 
          status={efficiency > 90 ? 'success' : efficiency > 70 ? 'active' : 'exception'}
        />
      )
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const statusMap = {
          draft: { text: '草稿', color: 'default' },
          optimized: { text: '已优化', color: 'success' },
          production: { text: '生产中', color: 'processing' }
        }
        const config = statusMap[status as keyof typeof statusMap]
        return <Badge status={config.color as any} text={config.text} />
      }
    },
    {
      title: '操作',
      key: 'actions',
      render: (record: PatternData) => (
        <Space>
          <Tooltip title="查看详情">
            <Button type="text" icon={<EyeOutlined />} size="small" />
          </Tooltip>
          <Tooltip title="优化排料">
            <Button 
              type="text" 
              icon={<ThunderboltOutlined />} 
              size="small"
              onClick={() => handleOptimizePattern(record)}
            />
          </Tooltip>
          <Tooltip title="编辑">
            <Button type="text" icon={<EditOutlined />} size="small" />
          </Tooltip>
          <Tooltip title="删除">
            <Button type="text" icon={<DeleteOutlined />} size="small" danger />
          </Tooltip>
        </Space>
      )
    }
  ]

  // 生产订单表格列定义
  const orderColumns = [
    {
      title: '订单号',
      dataIndex: 'orderNumber',
      key: 'orderNumber'
    },
    {
      title: '产品',
      dataIndex: 'product',
      key: 'product'
    },
    {
      title: '数量',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (quantity: number) => `${quantity} 件`
    },
    {
      title: '优先级',
      dataIndex: 'priority',
      key: 'priority',
      render: (priority: string) => {
        const priorityMap = {
          low: { text: '低', color: 'default' },
          medium: { text: '中', color: 'warning' },
          high: { text: '高', color: 'error' },
          urgent: { text: '紧急', color: 'error' }
        }
        const config = priorityMap[priority as keyof typeof priorityMap]
        return <Tag color={config.color}>{config.text}</Tag>
      }
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const statusMap = {
          pending: { text: '待开始', color: 'default' },
          cutting: { text: '裁剪中', color: 'processing' },
          sewing: { text: '缝制中', color: 'processing' },
          finishing: { text: '整理中', color: 'processing' },
          completed: { text: '已完成', color: 'success' }
        }
        const config = statusMap[status as keyof typeof statusMap]
        return <Badge status={config.color as any} text={config.text} />
      }
    },
    {
      title: '进度',
      dataIndex: 'progress',
      key: 'progress',
      render: (progress: number) => <Progress percent={progress} size="small" />
    },
    {
      title: '交期',
      dataIndex: 'dueDate',
      key: 'dueDate'
    },
    {
      title: '操作',
      key: 'actions',
      render: (record: ProductionOrder) => (
        <Space>
          <Button type="text" icon={<PlayCircleOutlined />} size="small" />
          <Button type="text" icon={<PauseCircleOutlined />} size="small" />
          <Button type="text" icon={<SettingOutlined />} size="small" />
        </Space>
      )
    }
  ]

  return (
    <div className="content-area" style={{ padding: '24px' }}>
      {/* 页面标题 */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ 
          fontSize: '24px', 
          fontWeight: 'bold', 
          color: 'var(--text-primary)',
          margin: 0,
          marginBottom: '8px'
        }}>
          生产管理中心
        </h1>
        <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
          智能版型优化、排料管理和生产调度
        </p>
      </div>

      {/* 统计卡片 */}
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={24} sm={12} lg={6}>
          <Card className="industrial-card">
            <Statistic
              title="活跃版型"
              value={patterns.length}
              prefix={<AppstoreOutlined style={{ color: 'var(--primary-color)' }} />}
              valueStyle={{ color: 'var(--text-primary)' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="industrial-card">
            <Statistic
              title="生产订单"
              value={orders.length}
              prefix={<RocketOutlined style={{ color: 'var(--success-color)' }} />}
              valueStyle={{ color: 'var(--text-primary)' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="industrial-card">
            <Statistic
              title="平均效率"
              value={87.5}
              suffix="%"
              prefix={<BarChartOutlined style={{ color: 'var(--accent-color)' }} />}
              valueStyle={{ color: 'var(--text-primary)' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="industrial-card">
            <Statistic
              title="材料利用率"
              value={95.2}
              suffix="%"
              prefix={<ScissorOutlined style={{ color: 'var(--warning-color)' }} />}
              valueStyle={{ color: 'var(--text-primary)' }}
            />
          </Card>
        </Col>
      </Row>

      {/* 主要内容区域 */}
      <Card className="industrial-card">
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          {/* 版型管理 */}
          <TabPane tab="版型管理" key="patterns">
            <div style={{ marginBottom: '16px' }}>
              <Space>
                <Button type="primary" icon={<PlusOutlined />}>
                  新建版型
                </Button>
                <Button icon={<UploadOutlined />}>
                  导入版型
                </Button>
                <Button icon={<DownloadOutlined />}>
                  导出版型
                </Button>
              </Space>
            </div>
            <Table
              columns={patternColumns}
              dataSource={patterns}
              rowKey="id"
              className="professional-table"
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total) => `共 ${total} 条记录`
              }}
            />
          </TabPane>

          {/* 生产调度 */}
          <TabPane tab="生产调度" key="production">
            <div style={{ marginBottom: '16px' }}>
              <Space>
                <Button type="primary" icon={<PlusOutlined />}>
                  新建订单
                </Button>
                <Button icon={<SyncOutlined />}>
                  同步状态
                </Button>
                <RangePicker placeholder={['开始日期', '结束日期']} />
              </Space>
            </div>
            <Table
              columns={orderColumns}
              dataSource={orders}
              rowKey="id"
              className="professional-table"
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total) => `共 ${total} 条记录`
              }}
            />
          </TabPane>

          {/* 材料管理 */}
          <TabPane tab="材料管理" key="materials">
            <Row gutter={[16, 16]}>
              {materials.map(material => (
                <Col xs={24} lg={12} key={material.id}>
                  <Card className="industrial-card" size="small">
                    <div style={{ marginBottom: '12px' }}>
                      <h4 style={{ color: 'var(--text-primary)', margin: 0 }}>
                        {material.material}
                      </h4>
                    </div>
                    <Row gutter={16}>
                      <Col span={12}>
                        <Statistic
                          title="需求量"
                          value={material.required}
                          suffix="m"
                          valueStyle={{ fontSize: '16px', color: 'var(--text-primary)' }}
                        />
                      </Col>
                      <Col span={12}>
                        <Statistic
                          title="已使用"
                          value={material.used}
                          suffix="m"
                          valueStyle={{ fontSize: '16px', color: 'var(--text-primary)' }}
                        />
                      </Col>
                    </Row>
                    <div style={{ marginTop: '12px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <span style={{ color: 'var(--text-secondary)' }}>利用率</span>
                        <span style={{ color: 'var(--text-primary)' }}>{material.efficiency}%</span>
                      </div>
                      <Progress 
                        percent={material.efficiency} 
                        showInfo={false}
                        strokeColor={material.efficiency > 95 ? 'var(--success-color)' : 'var(--primary-color)'}
                      />
                    </div>
                    <div style={{ marginTop: '8px', color: 'var(--text-secondary)', fontSize: '12px' }}>
                      浪费: {material.waste}m | 成本: ¥{material.cost.toLocaleString()}
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </TabPane>

          {/* 质量控制 */}
          <TabPane tab="质量控制" key="quality">
            <Alert
              message="质量控制系统"
              description="实时监控生产质量，自动检测缺陷，确保产品质量标准。"
              type="info"
              showIcon
              style={{ marginBottom: '16px' }}
            />
            <Row gutter={[16, 16]}>
              <Col xs={24} lg={12}>
                <Card className="industrial-card" title="质量指标">
                  <Timeline>
                    <Timeline.Item color="green" dot={<CheckCircleOutlined />}>
                      <div style={{ color: 'var(--text-primary)' }}>裁剪精度检测</div>
                      <div style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>精度: 99.2%</div>
                    </Timeline.Item>
                    <Timeline.Item color="blue" dot={<ClockCircleOutlined />}>
                      <div style={{ color: 'var(--text-primary)' }}>缝制质量检测</div>
                      <div style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>进行中...</div>
                    </Timeline.Item>
                    <Timeline.Item color="red" dot={<ExclamationCircleOutlined />}>
                      <div style={{ color: 'var(--text-primary)' }}>整烫质量检测</div>
                      <div style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>发现2个问题</div>
                    </Timeline.Item>
                  </Timeline>
                </Card>
              </Col>
              <Col xs={24} lg={12}>
                <Card className="industrial-card" title="缺陷统计">
                  <div className="chart-container" style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ color: 'var(--text-secondary)' }}>质量统计图表</div>
                  </div>
                </Card>
              </Col>
            </Row>
          </TabPane>
        </Tabs>
      </Card>

      {/* 版型优化模态框 */}
      <Modal
        title="智能版型优化"
        open={optimizationVisible}
        onCancel={() => setOptimizationVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setOptimizationVisible(false)}>
            取消
          </Button>,
          <Button key="optimize" type="primary" loading={loading} onClick={startOptimization}>
            开始优化
          </Button>
        ]}
        width={600}
      >
        {selectedPattern && (
          <div>
            <div style={{ marginBottom: '16px' }}>
              <h4 style={{ color: 'var(--text-primary)' }}>版型信息</h4>
              <p style={{ color: 'var(--text-secondary)' }}>
                名称: {selectedPattern.name} | 类型: {selectedPattern.type} | 裁片数: {selectedPattern.pieces}
              </p>
            </div>
            
            <div style={{ marginBottom: '16px' }}>
              <h4 style={{ color: 'var(--text-primary)' }}>优化参数</h4>
              <Form layout="vertical">
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item label="面料宽度 (cm)">
                      <InputNumber min={100} max={200} defaultValue={150} style={{ width: '100%' }} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="排料间距 (mm)">
                      <InputNumber min={1} max={10} defaultValue={3} style={{ width: '100%' }} />
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item label="优化目标">
                  <Radio.Group defaultValue="efficiency">
                    <Radio value="efficiency">最大化利用率</Radio>
                    <Radio value="speed">最快排料</Radio>
                    <Radio value="balance">平衡优化</Radio>
                  </Radio.Group>
                </Form.Item>
              </Form>
            </div>

            {optimizationProgress > 0 && (
              <div style={{ marginBottom: '16px' }}>
                <h4 style={{ color: 'var(--text-primary)' }}>优化进度</h4>
                <Progress 
                  percent={optimizationProgress} 
                  status={optimizationProgress === 100 ? 'success' : 'active'}
                  strokeColor={{
                    '0%': 'var(--primary-color)',
                    '100%': 'var(--success-color)',
                  }}
                />
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  )
}

export default Production