import React, { useState } from 'react';
import { Modal, Button, Tabs, Radio, Checkbox, Row, Col, Card, Image, Space, Typography } from 'antd';
import { CloseOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import type { TabsProps } from 'antd';
import '../styles/ProductPublish.css';
import { getImagePath, IMAGES } from '../utils/assets';

const { Title, Text } = Typography;

interface ProductPublishProps {
  visible: boolean;
  onClose: () => void;
  designImage?: string;
}

interface MockupItem {
  id: string;
  name: string;
  image: string;
  type: 'flat' | 'model' | 'hanging' | 'detail';
}

// 模拟样图数据
const mockupData: MockupItem[] = [
  { id: '1', name: '平铺展示1', image: IMAGES.xueweifu.flat1, type: 'flat' },
  { id: '2', name: '平铺展示2', image: IMAGES.xueweifu.flat2, type: 'flat' },
  { id: '3', name: '平铺展示3', image: IMAGES.xueweifu.flat3, type: 'flat' },
  { id: '4', name: '模特穿着1', image: IMAGES.xueweifu.model1, type: 'model' },
  { id: '5', name: '模特穿着2', image: IMAGES.xueweifu.model2, type: 'model' },
  { id: '6', name: '悬挂展示1', image: IMAGES.xueweifu.hanging1, type: 'hanging' },
  { id: '7', name: '悬挂展示2', image: IMAGES.xueweifu.hanging2, type: 'hanging' },
  { id: '8', name: '细节特写', image: IMAGES.xueweifu.detail, type: 'detail' },
];

const ProductPublish: React.FC<ProductPublishProps> = ({ visible, onClose, designImage }) => {
  const [activeTab, setActiveTab] = useState('basic');
  const [fileFormat, setFileFormat] = useState('PNG');
  const [selectedMockups, setSelectedMockups] = useState<string[]>([]);
  const [previewImage, setPreviewImage] = useState<string>(mockupData[0]?.image || '');
  const [currentStep, setCurrentStep] = useState(1);

  const handleMockupSelect = (mockupId: string) => {
    setSelectedMockups(prev => {
      if (prev.includes(mockupId)) {
        return prev.filter(id => id !== mockupId);
      } else {
        return [...prev, mockupId];
      }
    });
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedMockups(mockupData.map(item => item.id));
    } else {
      setSelectedMockups([]);
    }
  };

  const handlePreviewChange = (image: string) => {
    setPreviewImage(image);
  };

  const handleClearAll = () => {
    setSelectedMockups([]);
  };

  const handleContinue = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      // 完成发布流程
      onClose();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      onClose();
    }
  };

  const tabItems: TabsProps['items'] = [
    {
      key: 'basic',
      label: '基础样图',
    },
    {
      key: 'custom',
      label: '自定义样图',
    },
  ];

  const stepTitles = {
    1: '样图选择',
    2: '定价设置',
    3: '详情配置'
  };

  return (
    <Modal
      title={null}
      open={visible}
      onCancel={onClose}
      footer={null}
      width={1200}
      centered
      closeIcon={<CloseOutlined />}
      className="product-publish-modal"
    >
      <div className="product-publish-container">
        {/* 顶部标题栏 */}
        <div className="publish-header" style={{ padding: '20px 0', borderBottom: '1px solid #f0f0f0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Title level={3} style={{ margin: 0 }}>发布产品</Title>
            <div className="step-indicator" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              {[1, 2, 3].map((step) => (
                <div key={step} style={{ display: 'flex', alignItems: 'center' }}>
                  <div 
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      backgroundColor: step <= currentStep ? '#ff4d4f' : '#f0f0f0',
                      color: step <= currentStep ? 'white' : '#999',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      fontWeight: 'bold'
                    }}
                  >
                    {step}
                  </div>
                  <Text style={{ marginLeft: '8px', color: step <= currentStep ? '#ff4d4f' : '#999' }}>
                    {stepTitles[step as keyof typeof stepTitles]}
                  </Text>
                  {step < 3 && (
                    <div style={{ width: '30px', height: '1px', backgroundColor: '#f0f0f0', margin: '0 10px' }} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {currentStep === 1 && (
          <div className="publish-content" style={{ padding: '20px 0' }}>
            <Row gutter={24}>
              {/* 左侧样图选择面板 */}
              <Col span={14}>
                <div className="mockup-selection-panel">
                  <Title level={4}>选择样图</Title>
                  
                  {/* 标签页 */}
                  <Tabs 
                    activeKey={activeTab} 
                    onChange={setActiveTab} 
                    items={tabItems}
                    style={{ marginBottom: '20px' }}
                  />
                  
                  {/* 文件格式选择 */}
                  <div style={{ marginBottom: '20px' }}>
                    <Text strong>文件格式：</Text>
                    <Radio.Group 
                      value={fileFormat} 
                      onChange={(e) => setFileFormat(e.target.value)}
                      style={{ marginLeft: '10px' }}
                    >
                      <Radio value="PNG">PNG</Radio>
                      <Radio value="JPG">JPG</Radio>
                    </Radio.Group>
                  </div>
                  
                  {/* 样图风格选择 */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <Text strong>样图风格</Text>
                      <Checkbox 
                        checked={selectedMockups.length === mockupData.length}
                        indeterminate={selectedMockups.length > 0 && selectedMockups.length < mockupData.length}
                        onChange={(e) => handleSelectAll(e.target.checked)}
                      >
                        全选
                      </Checkbox>
                    </div>
                    
                    <Text type="secondary" style={{ display: 'block', marginBottom: '16px' }}>
                      选择要添加到商品列表中的样图
                    </Text>
                    
                    <Row gutter={[12, 12]}>
                      {mockupData.map((mockup) => (
                        <Col span={6} key={mockup.id}>
                          <Card
                            hoverable
                            size="small"
                            cover={
                              <div style={{ position: 'relative', height: '120px', overflow: 'hidden' }}>
                                <Image
                                  src={mockup.image}
                                  alt={mockup.name}
                                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                  preview={false}
                                  onClick={() => handlePreviewChange(mockup.image)}
                                />
                                <Checkbox
                                  checked={selectedMockups.includes(mockup.id)}
                                  onChange={() => handleMockupSelect(mockup.id)}
                                  style={{ position: 'absolute', top: '8px', left: '8px' }}
                                />
                              </div>
                            }
                            bodyStyle={{ padding: '8px' }}
                          >
                            <Text style={{ fontSize: '12px' }}>{mockup.name}</Text>
                          </Card>
                        </Col>
                      ))}
                    </Row>
                  </div>
                </div>
              </Col>
              
              {/* 右侧预览区域 */}
              <Col span={10}>
                <div className="preview-panel">
                  <Title level={4}>主样图预览</Title>
                  
                  {/* 大尺寸预览 */}
                  <div style={{ marginBottom: '20px' }}>
                    <div style={{ 
                      width: '100%', 
                      height: '300px', 
                      border: '1px solid #f0f0f0', 
                      borderRadius: '8px',
                      overflow: 'hidden',
                      position: 'relative',
                      backgroundColor: '#fafafa'
                    }}>
                      <Image
                        src={previewImage}
                        alt="预览图"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        preview={false}
                      />
                      {/* 设计图案叠加层 */}
                      {designImage && (
                        <div style={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          width: '80px',
                          height: '80px',
                          opacity: 0.8
                        }}>
                          <Image
                            src={designImage}
                            alt="设计图案"
                            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                            preview={false}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* 已选样图列表 */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <Text strong>已选样图 ({selectedMockups.length})</Text>
                      {selectedMockups.length > 0 && (
                        <Button type="link" size="small" onClick={handleClearAll}>
                          清除全部
                        </Button>
                      )}
                    </div>
                    
                    <div style={{ 
                      maxHeight: '120px', 
                      overflowY: 'auto',
                      border: '1px solid #f0f0f0',
                      borderRadius: '6px',
                      padding: '8px'
                    }}>
                      {selectedMockups.length === 0 ? (
                        <Text type="secondary" style={{ display: 'block', textAlign: 'center', padding: '20px' }}>
                          暂未选择样图
                        </Text>
                      ) : (
                        <Row gutter={[8, 8]}>
                          {selectedMockups.map((mockupId) => {
                            const mockup = mockupData.find(item => item.id === mockupId);
                            return mockup ? (
                              <Col span={6} key={mockupId}>
                                <div 
                                  style={{ 
                                    width: '60px', 
                                    height: '60px', 
                                    border: '2px solid #ff4d4f',
                                    borderRadius: '4px',
                                    overflow: 'hidden',
                                    cursor: 'pointer'
                                  }}
                                  onClick={() => handlePreviewChange(mockup.image)}
                                >
                                  <Image
                                    src={mockup.image}
                                    alt={mockup.name}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    preview={false}
                                  />
                                </div>
                              </Col>
                            ) : null;
                          })}
                        </Row>
                      )}
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        )}

        {currentStep === 2 && (
          <div className="pricing-step" style={{ padding: '40px', textAlign: 'center' }}>
            <Title level={3}>定价设置</Title>
            <Text type="secondary">此功能正在开发中...</Text>
          </div>
        )}

        {currentStep === 3 && (
          <div className="details-step" style={{ padding: '40px', textAlign: 'center' }}>
            <Title level={3}>详情配置</Title>
            <Text type="secondary">此功能正在开发中...</Text>
          </div>
        )}
        
        {/* 底部操作区 */}
        <div className="publish-footer" style={{ 
          padding: '20px 0', 
          borderTop: '1px solid #f0f0f0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Button 
            icon={<ArrowLeftOutlined />} 
            onClick={handleBack}
          >
            {currentStep === 1 ? '返回设计' : '上一步'}
          </Button>
          
          <Space>
            <Text type="secondary">
              {currentStep === 1 && `已选择 ${selectedMockups.length} 个样图`}
            </Text>
            <Button 
              type="primary" 
              danger
              onClick={handleContinue}
              disabled={currentStep === 1 && selectedMockups.length === 0}
            >
              {currentStep === 3 ? '完成发布' : '继续'}
            </Button>
          </Space>
        </div>
      </div>
    </Modal>
  );
};

export default ProductPublish;