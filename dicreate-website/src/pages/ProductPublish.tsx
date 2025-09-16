import React, { useState } from 'react';
import { Button, Tabs, Radio, Row, Col, Card, Image, Space, Typography, Badge, Select, Slider, Switch, Input, Divider, Modal, Checkbox } from 'antd';
import { ArrowLeftOutlined, StarOutlined, StarFilled, PlayCircleOutlined, SettingOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import type { TabsProps } from 'antd';
import '../styles/ProductPublish.css';
import { IMAGES } from '../utils/assets';

const { Title, Text } = Typography;
const { TextArea } = Input;

interface MockupItem {
  id: string;
  name: string;
  image: string;
  type: 'flat' | 'model' | 'hanging' | 'detail';
}

interface ModelItem {
  id: string;
  name: string;
  image: string;
  gender: 'male' | 'female';
  style: string;
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

// 模特数据
const modelImages = [
  { id: '1', name: '模特A', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face' },
  { id: '2', name: '模特B', url: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face' },
  { id: '3', name: '模特C', url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' },
  { id: '4', name: '模特D', url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face' },
  { id: '5', name: '模特E', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face' },
  { id: '6', name: '模特F', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face' },
];

// 模拟模特数据
const modelData: ModelItem[] = [
  { id: '1', name: '商务男模', image: IMAGES.xueweifu.flat1, gender: 'male', style: '商务' },
  { id: '2', name: '时尚女模', image: IMAGES.xueweifu.flat2, gender: 'female', style: '时尚' },
  { id: '3', name: '学院男模', image: IMAGES.xueweifu.flat3, gender: 'male', style: '学院' },
  { id: '4', name: '优雅女模', image: IMAGES.xueweifu.model1, gender: 'female', style: '优雅' },
];

const ProductPublish: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('mockups');
  const [fileFormat, setFileFormat] = useState('PNG');
  const [selectedMockups, setSelectedMockups] = useState<string[]>(['1']); // 默认选中第一张
  const [mainMockup, setMainMockup] = useState<string>('1'); // 默认第一张为主图
  const [previewImage, setPreviewImage] = useState<string>(mockupData[0]?.image || '');
  const [currentStep, setCurrentStep] = useState(1);
  
  // AI视频相关状态
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [videoSettings, setVideoSettings] = useState({
    duration: 15, // 视频时长（秒）
    style: 'professional', // 视频风格
    background: 'campus', // 背景场景
    music: true, // 是否添加背景音乐
    text: '展示您的学位服设计', // 宣传文案
  });
  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string>('');

  // 定价相关状态
  const [pricingMode, setPricingMode] = useState<'product' | 'sku'>('product');
  const [productPrice, setProductPrice] = useState<number>(30);
  const [shippingCost, setShippingCost] = useState<number>(0);
  
  // 发布平台弹窗状态
  const [publishModalVisible, setPublishModalVisible] = useState(false);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [includeShipping, setIncludeShipping] = useState<boolean>(true);
  const [shippingDestination, setShippingDestination] = useState<string>('CN');
  const [retailPrice, setRetailPrice] = useState<number>(0);
  const [estimatedEarnings, setEstimatedEarnings] = useState<number>(0);

  const toggleMockupSelection = (mockupId: string) => {
    setSelectedMockups(prev => {
      if (prev.includes(mockupId)) {
        const newSelected = prev.filter(id => id !== mockupId);
        // 如果取消选择的是主图，则设置第一个选中的为主图
        if (mockupId === mainMockup && newSelected.length > 0) {
          setMainMockup(newSelected[0]);
          const newMainImage = mockupData.find(item => item.id === newSelected[0])?.image;
          if (newMainImage) setPreviewImage(newMainImage);
        }
        return newSelected;
      } else {
        return [...prev, mockupId];
      }
    });
  };

  const handleSetMainMockup = (mockupId: string) => {
    if (selectedMockups.includes(mockupId)) {
      setMainMockup(mockupId);
      const mockup = mockupData.find(item => item.id === mockupId);
      if (mockup) {
        setPreviewImage(mockup.image);
      }
    }
  };

  const handlePreviewChange = (image: string) => {
    setPreviewImage(image);
  };

  const handleContinue = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      // 显示发布平台选择弹窗
      setPublishModalVisible(true);
    }
  };

  const handlePublishConfirm = () => {
    if (selectedPlatforms.length > 0) {
      setPublishModalVisible(false);
      // 跳转到产品管理界面
      navigate('/product-management');
    }
  };

  const handlePlatformChange = (checkedValues: string[]) => {
    setSelectedPlatforms(checkedValues);
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate('/ai-design');
    }
  };

  const handleGenerateVideo = async () => {
    if (!selectedModel) return;
    
    setIsGeneratingVideo(true);
    // 模拟视频生成过程
    setTimeout(() => {
      setGeneratedVideoUrl('/video/sample-graduation-video.mp4');
      setIsGeneratingVideo(false);
    }, 3000);
  };

  const tabItems: TabsProps['items'] = [
    {
      key: 'mockups',
      label: '商品样图',
      icon: <Image style={{ width: 16, height: 16 }} preview={false} />,
    },
    {
      key: 'video',
      label: 'AI宣传视频',
      icon: <VideoCameraOutlined />,
    },
  ];

  const stepTitles = {
    1: '素材选择',
    2: '定价设置',
    3: '商品详情'
  };

  return (
    <div className="product-publish-page animate-fade-in-up" style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)', minHeight: '100vh' }}>
      {/* 步骤条 */}
      <div className="publish-steps modern-card animate-fade-in-up animate-delay-100" style={{ 
        padding: '24px', 
        borderBottom: 'none',
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        borderRadius: '0 0 16px 16px',
        boxShadow: 'var(--shadow-lg)'
      }}>
        <Button 
          icon={<ArrowLeftOutlined />} 
          onClick={handleBack}
          type="text"
        >
          返回
        </Button>
        <div className="step-indicator" style={{ display: 'flex', alignItems: 'center', gap: '20px', flex: 1, justifyContent: 'center' }}>
          {[1, 2, 3].map((step) => (
            <div key={step} style={{ display: 'flex', alignItems: 'center' }}>
              <div 
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: step <= currentStep ? '#ff4d4f' : '#f0f0f0',
                  color: step <= currentStep ? 'white' : '#999',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '14px',
                  fontWeight: 'bold'
                }}
              >
                {step}
              </div>
              <Text style={{ marginLeft: '8px', color: step <= currentStep ? '#ff4d4f' : '#999', fontWeight: step === currentStep ? 'bold' : 'normal' }}>
                {stepTitles[step as keyof typeof stepTitles]}
              </Text>
              {step < 3 && (
                <div style={{ width: '40px', height: '2px', backgroundColor: step < currentStep ? '#ff4d4f' : '#f0f0f0', margin: '0 16px' }} />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="publish-content animate-fade-in-up animate-delay-200" style={{ padding: '32px 24px', maxWidth: '1400px', margin: '0 auto' }}>
        {currentStep === 1 && (
          <Row gutter={32}>
            {/* 左侧内容选择面板 */}
            <Col span={16} className="animate-fade-in-left animate-delay-300">
              <div className="content-selection-panel">
                <Tabs 
                  activeKey={activeTab} 
                  onChange={setActiveTab} 
                  items={tabItems}
                  size="large"
                  style={{ marginBottom: '24px' }}
                />
                
                {activeTab === 'mockups' && (
                  <div>
                    {/* 文件格式选择 */}
                    <div style={{ marginBottom: '24px' }}>
                      <div style={{ fontSize: '14px', fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.85)', marginBottom: '8px' }}>导出格式</div>
                      <Radio.Group 
                        value={fileFormat} 
                        onChange={(e) => setFileFormat(e.target.value)}
                        style={{ marginLeft: '12px' }}
                      >
                        <Radio value="PNG">PNG</Radio>
                        <Radio value="JPG">JPG</Radio>
                      </Radio.Group>
                    </div>
                    
                    {/* 样图选择 */}
                    <div>
                      <div style={{ marginBottom: '16px' }}>
                        <div style={{ fontSize: '14px', fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.85)' }}>选择商品样图</div>
                        <Text type="secondary" style={{ display: 'block', marginTop: '4px' }}>
                          选择要展示的样图，点击左上角勾选
                        </Text>
                      </div>
                      
                      <Row gutter={[16, 16]}>
                        {mockupData.map((mockup) => (
                          <Col span={6} key={mockup.id}>
                            <Card
                              hoverable
                              size="small"
                              className={`mockup-card modern-card modern-hover-lift ${selectedMockups.includes(mockup.id) ? 'selected' : ''}`}
                              style={{
                                borderRadius: '16px',
                                overflow: 'hidden',
                                border: selectedMockups.includes(mockup.id) ? '2px solid var(--color-primary-500)' : '1px solid rgba(255, 255, 255, 0.2)',
                                boxShadow: selectedMockups.includes(mockup.id) ? 'var(--shadow-primary-glow), var(--shadow-lg)' : 'var(--shadow-md)'
                              }}
                              cover={
                                <div style={{ position: 'relative', height: '160px', overflow: 'hidden' }}>
                                  <Image
                                    src={mockup.image}
                                    alt={mockup.name}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    preview={false}
                                    onClick={() => {
                                      toggleMockupSelection(mockup.id);
                                      handlePreviewChange(mockup.image);
                                    }}
                                  />

                                  {/* 左上角勾选框 */}
                                  <div style={{
                                    position: 'absolute',
                                    top: '8px',
                                    left: '8px',
                                    width: '20px',
                                    height: '20px',
                                    backgroundColor: selectedMockups.includes(mockup.id) ? '#1890ff' : 'rgba(255, 255, 255, 0.8)',
                                    border: selectedMockups.includes(mockup.id) ? 'none' : '1px solid #d9d9d9',
                                    borderRadius: '3px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: selectedMockups.includes(mockup.id) ? 'white' : '#999',
                                    fontSize: '12px',
                                    fontWeight: 'bold',
                                    zIndex: 10
                                  }}>
                                    {selectedMockups.includes(mockup.id) && '✓'}
                                  </div>

                                  {/* 右上角主图选择 */}
                                  <div 
                                    style={{
                                      position: 'absolute',
                                      top: '8px',
                                      right: '8px',
                                      width: '20px',
                                      height: '20px',
                                      backgroundColor: mainMockup === mockup.id ? '#52c41a' : 'rgba(255, 255, 255, 0.8)',
                                      border: mainMockup === mockup.id ? 'none' : '1px solid #d9d9d9',
                                      borderRadius: '50%',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      cursor: 'pointer',
                                      zIndex: 11
                                    }}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleSetMainMockup(mockup.id);
                                    }}
                                  >
                                    <StarFilled style={{ 
                                      fontSize: '10px', 
                                      color: mainMockup === mockup.id ? 'white' : '#999' 
                                    }} />
                                  </div>
                                  
                                  {/* 选中状态覆盖层 */}
                                  {selectedMockups.includes(mockup.id) && (
                                    <div style={{
                                      position: 'absolute',
                                      top: 0,
                                      left: 0,
                                      right: 0,
                                      bottom: 0,
                                      backgroundColor: 'rgba(255, 77, 79, 0.1)',
                                      border: '2px solid #ff4d4f',
                                      borderRadius: '8px'
                                    }} />
                                  )}
                                </div>
                              }
                              styles={{ body: { padding: '12px' } }}
                            >
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={{ fontSize: '13px', fontWeight: '500' }}>{mockup.name}</Text>
                                {mainMockup === mockup.id && (
                                  <Badge status="processing" text="主图" style={{ fontSize: '12px' }} />
                                )}
                              </div>
                            </Card>
                          </Col>
                        ))}
                      </Row>
                    </div>
                  </div>
                )}
                
                {activeTab === 'video' && (
                  <div>
                    <div style={{ marginBottom: '24px' }}>
                      <div style={{ fontSize: '14px', fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.85)' }}>AI宣传视频生成</div>
                      <Text type="secondary" style={{ display: 'block', marginTop: '4px' }}>
                        选择模特并设置参数，AI将为您生成专业的学位服宣传视频
                      </Text>
                    </div>
                    
                    {/* 模特选择 */}
                    <div style={{ marginBottom: '24px' }}>
                      <div style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.85)' }}>选择模特</div>
                      <Row gutter={[16, 16]}>
                        {modelData.map((model) => (
                          <Col span={6} key={model.id}>
                            <Card
                              hoverable
                              size="small"
                              className={`model-card ${selectedModel === model.id ? 'selected' : ''}`}
                              cover={
                                <div style={{ position: 'relative', height: '160px', overflow: 'hidden' }}>
                                  <Image
                                    src={model.image}
                                    alt={model.name}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    preview={false}
                                    onClick={() => setSelectedModel(model.id)}
                                  />
                                  {selectedModel === model.id && (
                                    <div style={{
                                      position: 'absolute',
                                      top: 0,
                                      left: 0,
                                      right: 0,
                                      bottom: 0,
                                      backgroundColor: 'rgba(255, 77, 79, 0.1)',
                                      border: '2px solid #ff4d4f',
                                      borderRadius: '8px'
                                    }} />
                                  )}
                                </div>
                              }
                              styles={{ body: { padding: '12px' } }}
                            >
                              <div>
                                <Text style={{ fontSize: '13px', fontWeight: '500' }}>{model.name}</Text>
                              </div>
                            </Card>
                          </Col>
                        ))}
                      </Row>
                    </div>
                    
                    {/* 视频设置 */}
                    <div style={{ marginBottom: '24px' }}>
                      <div style={{ marginBottom: '16px', fontSize: '14px', fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.85)' }}>视频设置</div>
                      <div style={{ backgroundColor: '#fafafa', padding: '20px', borderRadius: '8px' }}>
                        <Row gutter={[24, 16]}>
                          <Col span={12}>
                            <div>
                              <div style={{ fontSize: '14px', fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.85)', marginBottom: '8px' }}>视频时长 {videoSettings.duration}秒</div>
                              <Slider
                                min={10}
                                max={30}
                                value={videoSettings.duration}
                                onChange={(value) => setVideoSettings(prev => ({ ...prev, duration: value }))}
                                style={{ marginTop: '8px' }}
                              />
                            </div>
                          </Col>
                          <Col span={12}>
                            <div>
                              <div style={{ fontSize: '14px', fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.85)', marginBottom: '8px' }}>视频风格</div>
                              <Select
                                value={videoSettings.style}
                                onChange={(value) => setVideoSettings(prev => ({ ...prev, style: value }))}
                                style={{ width: '100%' }}
                              >
                                <Select.Option value="professional">专业商务</Select.Option>
                                <Select.Option value="casual">轻松休闲</Select.Option>
                                <Select.Option value="elegant">优雅正式</Select.Option>
                                <Select.Option value="modern">现代时尚</Select.Option>
                              </Select>
                            </div>
                          </Col>
                          <Col span={12}>
                            <div>
                              <div style={{ fontSize: '14px', fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.85)', marginBottom: '8px' }}>背景场景</div>
                              <Select
                                value={videoSettings.background}
                                onChange={(value) => setVideoSettings(prev => ({ ...prev, background: value }))}
                                style={{ width: '100%' }}
                              >
                                <Select.Option value="campus">校园场景</Select.Option>
                                <Select.Option value="studio">摄影棚</Select.Option>
                                <Select.Option value="office">办公环境</Select.Option>
                                <Select.Option value="outdoor">户外自然</Select.Option>
                              </Select>
                            </div>
                          </Col>
                          <Col span={12}>
                            <div>
                              <div style={{ fontSize: '14px', fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.85)', marginBottom: '8px' }}>背景音乐</div>
                              <Switch
                                checked={videoSettings.music}
                                onChange={(checked) => setVideoSettings(prev => ({ ...prev, music: checked }))}
                                checkedChildren="开启"
                                unCheckedChildren="关闭"
                              />
                            </div>
                          </Col>
                          <Col span={24}>
                            <div>
                              <div style={{ fontSize: '14px', fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.85)', marginBottom: '8px' }}>宣传文案</div>
                              <TextArea
                                value={videoSettings.text}
                                onChange={(e) => setVideoSettings(prev => ({ ...prev, text: e.target.value }))}
                                placeholder="输入视频中要展示的宣传文案"
                                rows={3}
                              />
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </div>
                    
                    {/* 生成按钮 */}
                    <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                      <Button
                        type="primary"
                        size="large"
                        icon={<PlayCircleOutlined />}
                        onClick={handleGenerateVideo}
                        loading={isGeneratingVideo}
                        disabled={!selectedModel}
                        style={{ backgroundColor: '#ff4d4f', borderColor: '#ff4d4f' }}
                      >
                        {isGeneratingVideo ? '正在生成视频...' : '生成AI宣传视频'}
                      </Button>
                    </div>
                    
                    {/* 生成的视频预览 */}
                    {generatedVideoUrl && (
                      <div style={{ textAlign: 'center' }}>
                        <Text strong style={{ marginBottom: '12px', display: 'block' }}>生成的宣传视频</Text>
                        <video
                          controls
                          style={{ width: '100%', maxWidth: '600px', borderRadius: '8px' }}
                          poster={selectedModel ? modelImages.find(m => m.id === selectedModel)?.url : ''}
                        >
                          <source src={generatedVideoUrl} type="video/mp4" />
                          您的浏览器不支持视频播放。
                        </video>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </Col>
            
            {/* 右侧预览区域 */}
            <Col span={8}>
              <div className="preview-panel" style={{ position: 'sticky', top: '100px' }}>
                <Title level={4}>预览</Title>
                
                {activeTab === 'mockups' && (
                  <div>
                    {/* 主图预览 */}
                    <div style={{ marginBottom: '20px' }}>
                      <div style={{ 
                        width: '100%', 
                        height: '400px', 
                        border: '1px solid #f0f0f0', 
                        borderRadius: '12px',
                        overflow: 'hidden',
                        position: 'relative',
                        backgroundColor: '#fafafa'
                      }}>
                        <Image
                          src={previewImage}
                          alt="主图预览"
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          preview={false}
                        />
                        {/* 设计图案叠加层 */}
                        <div style={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          width: '100px',
                          height: '100px',
                          opacity: 0.8
                        }}>
                          <Image
                            src={IMAGES.xueweifu.default}
                            alt="设计图案"
                            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                            preview={false}
                          />
                        </div>
                      </div>
                    </div>
                    
                    {/* 已选样图展示 */}
                    {selectedMockups.length > 0 && (
                      <div style={{ marginTop: '20px' }}>
                        <Text strong style={{ marginBottom: '12px', display: 'block' }}>已选样图 ({selectedMockups.length})</Text>
                        <div className="selected-images-grid">
                          {selectedMockups.map((mockupId) => {
                            const mockup = mockupData.find(item => item.id === mockupId);
                            return (
                              <div 
                                key={mockupId}
                                className={`selected-image-item ${mainMockup === mockupId ? 'main' : ''}`}
                                onClick={() => handleSetMainMockup(mockupId)}
                                style={{
                                  position: 'relative',
                                  height: '80px',
                                  border: mainMockup === mockupId ? '2px solid #faad14' : '1px solid #f0f0f0',
                                  borderRadius: '6px',
                                  overflow: 'hidden',
                                  cursor: 'pointer',
                                  width: '30%',
                                  display: 'inline-block',
                                  margin: '4px'
                                }}
                              >
                                {mainMockup === mockupId && (
                                  <div className="main-badge" style={{
                                    position: 'absolute',
                                    top: '4px',
                                    left: '4px',
                                    backgroundColor: '#faad14',
                                    color: 'white',
                                    fontSize: '10px',
                                    padding: '2px 4px',
                                    borderRadius: '2px',
                                    zIndex: 10
                                  }}>主</div>
                                )}
                                <Image
                                  src={mockup?.image}
                                  alt={mockup?.name}
                                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                  preview={false}
                                />
                                <Button 
                                  className="remove-image-btn"
                                  size="small"
                                  type="text"
                                  danger
                                  style={{
                                    position: 'absolute',
                                    top: '4px',
                                    right: '4px',
                                    width: '16px',
                                    height: '16px',
                                    backgroundColor: 'rgba(0,0,0,0.5)',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                    fontSize: '12px',
                                    cursor: 'pointer',
                                    border: 'none',
                                    padding: 0
                                  }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleMockupSelection(mockupId);
                                  }}
                                >
                                  ×
                                </Button>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                    
                    {/* 统计信息 */}
                    <div style={{ 
                      padding: '16px', 
                      backgroundColor: '#f8f9fa', 
                      borderRadius: '8px',
                      textAlign: 'center',
                      marginTop: '20px'
                    }}>
                      <div style={{ fontSize: '14px', fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.85)' }}>已选择 {selectedMockups.length} 张样图</div>
                      <Text type="secondary" style={{ display: 'block', marginTop: '4px' }}>
                        主图：{mockupData.find(item => item.id === mainMockup)?.name || '未设置'}
                      </Text>
                    </div>
                  </div>
                )}
                
                {activeTab === 'video' && (
                  <div>
                    <div style={{ 
                      padding: '24px', 
                      backgroundColor: '#f8f9fa', 
                      borderRadius: '12px',
                      textAlign: 'center',
                      minHeight: '300px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center'
                    }}>
                      {selectedModel ? (
                        <div>
                          <Image
                            src={modelData.find(m => m.id === selectedModel)?.image}
                            alt="选中的模特"
                            style={{ width: '120px', height: '160px', objectFit: 'cover', borderRadius: '8px', margin: '0 auto' }}
                            preview={false}
                          />
                          <div style={{ fontSize: '14px', fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.85)', display: 'block', marginTop: '12px' }}>
                            {modelData.find(m => m.id === selectedModel)?.name}
                          </div>
                          <Text type="secondary">
                            {videoSettings.duration}秒 · {videoSettings.style === 'professional' ? '专业商务' : videoSettings.style === 'casual' ? '轻松休闲' : videoSettings.style === 'elegant' ? '优雅正式' : '现代时尚'}风格
                          </Text>
                        </div>
                      ) : (
                        <div>
                          <VideoCameraOutlined style={{ fontSize: '48px', color: '#ccc', marginBottom: '16px' }} />
                          <Text type="secondary">请选择模特开始生成视频</Text>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </Col>
          </Row>
        )}

        {currentStep === 2 && (
          <div className="pricing-step" style={{ padding: '24px' }}>
            <Row gutter={24}>
              {/* 左侧产品预览 */}
              <Col span={10} className="animate-fade-in-left animate-delay-300">
                <div style={{ 
                  border: '1px solid #f0f0f0', 
                  borderRadius: '8px', 
                  padding: '24px',
                  backgroundColor: '#fff'
                }}>
                  <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                    <Image
                      src={previewImage}
                      alt="产品预览"
                      style={{ 
                        width: '200px', 
                        height: '200px', 
                        objectFit: 'cover',
                        borderRadius: '8px'
                      }}
                    />
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.85)', marginBottom: '8px' }}>
                    产品模板示例 产品模板示例
                  </div>
                  <div style={{ fontSize: '14px', color: 'rgba(0, 0, 0, 0.65)', marginBottom: '16px' }}>
                    Unisex Staple T-Shirt | Bella + Canvas 3001
                  </div>

                  <Button type="default" style={{ width: '100%' }}>
                    编辑产品
                  </Button>
                </div>
              </Col>

              {/* 右侧定价设置 */}
              <Col span={14} className="animate-fade-in-right animate-delay-400">
                <div style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '24px' }}>
                  设置定价
                </div>

                {/* 定价方式选择 */}
                <Tabs 
                  activeKey={pricingMode}
                  onChange={(key) => setPricingMode(key as 'product' | 'sku')}
                  items={[
                    {
                      key: 'product',
                      label: '产品定价',
                      children: (
                        <div>


                          {/* 价格设置 */}
                          <div style={{ marginBottom: '24px' }}>
                            <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>
                              批发价
                            </div>
                            <div style={{ fontSize: '16px', color: '#1890ff', marginBottom: '16px' }}>
                              $17.5–$19.69
                            </div>




                            {/* 价格输入 */}
                            <div style={{ marginBottom: '24px' }}>
                              <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>
                                价格和收益
                              </div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                                <Radio.Group defaultValue="retail">
                                  <Radio value="retail">设置零售价</Radio>
                                  <Radio value="earnings">设置利润</Radio>
                                  <Radio value="markup">设置利润率</Radio>
                                </Radio.Group>
                              </div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span>¥</span>
                                <Input
                                  type="number"
                                  value={productPrice}
                                  onChange={(e) => setProductPrice(Number(e.target.value))}
                                  style={{ width: '100px' }}
                                />
                                <Button type="primary">设置</Button>
                              </div>
                            </div>

                            {/* 价格汇总表格 */}
                            <div style={{
                              border: '1px solid #f0f0f0',
                              borderRadius: '8px',
                              overflow: 'hidden'
                            }}>
                              <div style={{
                                backgroundColor: '#fafafa',
                                padding: '12px 16px',
                                borderBottom: '1px solid #f0f0f0',
                                display: 'flex',
                                justifyContent: 'space-between'
                              }}>
                                <span style={{ fontSize: '14px', fontWeight: 'bold' }}>零售价</span>
                                <span style={{ fontSize: '14px', fontWeight: 'bold' }}>¥30 → ¥50</span>
                              </div>
                              <div style={{
                                padding: '12px 16px',
                                borderBottom: '1px solid #f0f0f0',
                                display: 'flex',
                                justifyContent: 'space-between'
                              }}>
                                <span style={{ fontSize: '14px', color: '#ff4d4f' }}>预计收入</span>
                                <span style={{ fontSize: '14px', color: '#ff4d4f' }}>¥12.5 → ¥32.31</span>
                              </div>
                            </div>


                          </div>
                        </div>
                      )
                    },
                    {
                      key: 'sku',
                      label: 'SKU 定价',
                      children: (
                        <div>
                          {/* 定价方式选择和输入 */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                            <Select
                              defaultValue="markup"
                              style={{ width: 150 }}
                              options={[
                                { value: 'retail', label: '设置零售价' },
                                { value: 'profit', label: '设置利润' },
                                { value: 'markup', label: '设置利润率' }
                              ]}
                            />
                            <Input
                              type="number"
                              defaultValue={2000}
                              style={{ width: 100 }}
                            />
                            <span>%</span>
                            <Button type="primary">设置</Button>
                          </div>

                          {/* SKU定价表格 */}
                          <div style={{
                            border: '1px solid #f0f0f0',
                            borderRadius: '8px',
                            overflow: 'hidden'
                          }}>
                            {/* 表头 */}
                            <div style={{
                              backgroundColor: '#fafafa',
                              padding: '12px 16px',
                              borderBottom: '1px solid #f0f0f0',
                              display: 'grid',
                              gridTemplateColumns: '1fr 2fr 2fr 2fr',
                              gap: '16px',
                              fontSize: '14px',
                              fontWeight: 'bold'
                            }}>
                              <div>SKU</div>
                              <div>批发价</div>
                              <div>零售价</div>
                              <div style={{ backgroundColor: '#f6ffed', padding: '8px', borderRadius: '4px' }}>预计收益</div>
                            </div>



                            {/* S尺寸行 */}
                            <div style={{
                              padding: '12px 16px',
                              borderBottom: '1px solid #f0f0f0',
                              display: 'grid',
                              gridTemplateColumns: '1fr 2fr 2fr 2fr',
                              gap: '16px',
                              alignItems: 'center'
                            }}>
                              <div>S</div>
                              <div style={{ fontSize: '14px' }}>¥18.50</div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Button size="small" style={{ border: 'none', boxShadow: 'none' }}>−</Button>
                                <span style={{ fontSize: '16px', fontWeight: 'bold' }}>¥30.26</span>
                                <Button size="small" style={{ border: 'none', boxShadow: 'none' }}>+</Button>
                              </div>
                              <div style={{ backgroundColor: '#f6ffed', padding: '8px', borderRadius: '4px', fontSize: '16px', fontWeight: 'bold', color: '#52c41a' }}>
                                ¥28.82
                              </div>
                            </div>

                            {/* M尺寸行 */}
                            <div style={{
                              padding: '12px 16px',
                              borderBottom: '1px solid #f0f0f0',
                              display: 'grid',
                              gridTemplateColumns: '1fr 2fr 2fr 2fr',
                              gap: '16px',
                              alignItems: 'center'
                            }}>
                              <div>M</div>
                              <div style={{ fontSize: '14px' }}>¥19.20</div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Button size="small" style={{ border: 'none', boxShadow: 'none' }}>−</Button>
                                <span style={{ fontSize: '16px', fontWeight: 'bold' }}>¥32.15</span>
                                <Button size="small" style={{ border: 'none', boxShadow: 'none' }}>+</Button>
                              </div>
                              <div style={{ backgroundColor: '#f6ffed', padding: '8px', borderRadius: '4px', fontSize: '16px', fontWeight: 'bold', color: '#52c41a' }}>
                                ¥30.95
                              </div>
                            </div>

                            {/* L尺寸行 */}
                            <div style={{
                              padding: '12px 16px',
                              borderBottom: '1px solid #f0f0f0',
                              display: 'grid',
                              gridTemplateColumns: '1fr 2fr 2fr 2fr',
                              gap: '16px',
                              alignItems: 'center'
                            }}>
                              <div>L</div>
                              <div style={{ fontSize: '14px' }}>¥20.80</div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Button size="small" style={{ border: 'none', boxShadow: 'none' }}>−</Button>
                                <span style={{ fontSize: '16px', fontWeight: 'bold' }}>¥35.60</span>
                                <Button size="small" style={{ border: 'none', boxShadow: 'none' }}>+</Button>
                              </div>
                              <div style={{ backgroundColor: '#f6ffed', padding: '8px', borderRadius: '4px', fontSize: '16px', fontWeight: 'bold', color: '#52c41a' }}>
                                ¥33.80
                              </div>
                            </div>

                            {/* XL尺寸行 */}
                            <div style={{
                              padding: '12px 16px',
                              borderBottom: '1px solid #f0f0f0',
                              display: 'grid',
                              gridTemplateColumns: '1fr 2fr 2fr 2fr',
                              gap: '16px',
                              alignItems: 'center'
                            }}>
                              <div>XL</div>
                              <div style={{ fontSize: '14px' }}>¥22.15</div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Button size="small" style={{ border: 'none', boxShadow: 'none' }}>−</Button>
                                <span style={{ fontSize: '16px', fontWeight: 'bold' }}>¥38.03</span>
                                <Button size="small" style={{ border: 'none', boxShadow: 'none' }}>+</Button>
                              </div>
                              <div style={{ backgroundColor: '#f6ffed', padding: '8px', borderRadius: '4px', fontSize: '16px', fontWeight: 'bold', color: '#52c41a' }}>
                                ¥36.22
                              </div>
                            </div>

                            {/* 2XL尺寸行 */}
                            <div style={{
                              padding: '12px 16px',
                              display: 'grid',
                              gridTemplateColumns: '1fr 2fr 2fr 2fr',
                              gap: '16px',
                              alignItems: 'center'
                            }}>
                              <div>2XL</div>
                              <div style={{ fontSize: '14px' }}>¥23.25</div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Button size="small" style={{ border: 'none', boxShadow: 'none' }}>−</Button>
                                <span style={{ fontSize: '16px', fontWeight: 'bold' }}>¥38.03</span>
                                <Button size="small" style={{ border: 'none', boxShadow: 'none' }}>+</Button>
                              </div>
                              <div style={{ backgroundColor: '#f6ffed', padding: '8px', borderRadius: '4px', fontSize: '16px', fontWeight: 'bold', color: '#52c41a' }}>
                                ¥36.21
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    }
                  ]}
                />
              </Col>
            </Row>
          </div>
        )}

        {currentStep === 3 && (
          <div className="details-step" style={{ padding: '24px' }}>
            <Row gutter={32}>
              {/* 左侧商品预览 */}
              <Col span={10}>
                <div className="modern-card modern-card-gradient" style={{ 
                  borderRadius: '16px', 
                  padding: '32px',
                  position: 'sticky',
                  top: '24px',
                  boxShadow: 'var(--shadow-xl)'
                }}>
                  <Title level={4} style={{ marginBottom: '16px' }}>商品预览</Title>
                  
                  {/* 主图展示 */}
                  <div style={{ marginBottom: '16px' }}>
                    <Image
                      src={previewImage}
                      alt="商品预览"
                      style={{ 
                        width: '100%', 
                        height: '300px', 
                        objectFit: 'cover',
                        borderRadius: '8px'
                      }}
                    />
                  </div>
                  
                  {/* 图片轮播 */}
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {mockupData
                      .filter(item => selectedMockups.includes(item.id))
                      .map(item => (
                        <div
                          key={item.id}
                          onClick={() => handlePreviewChange(item.image)}
                          style={{
                            width: '60px',
                            height: '60px',
                            border: previewImage === item.image ? '2px solid #ff4d4f' : '1px solid #f0f0f0',
                            borderRadius: '4px',
                            overflow: 'hidden',
                            cursor: 'pointer'
                          }}
                        >
                          <Image
                            src={item.image}
                            alt={item.name}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            preview={false}
                          />
                        </div>
                      ))
                    }
                  </div>
                  
                  {/* 商品信息预览 */}
                  <Divider />
                  <div>
                    <Title level={5} style={{ marginBottom: '8px' }}>学位服 - 理学学士</Title>
                    <Text type="secondary" style={{ display: 'block', marginBottom: '12px' }}>
                      采用优质面料制作，符合学位服标准规范
                    </Text>

                  </div>
                </div>
              </Col>
              
              {/* 右侧商品信息填写 */}
              <Col span={14}>
                <div className="modern-card modern-card-gradient" style={{ 
                  borderRadius: '16px', 
                  padding: '32px',
                  boxShadow: 'var(--shadow-xl)'
                }}>
                  <Title level={4} style={{ marginBottom: '24px' }}>商品信息</Title>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    {/* 基础信息 */}
                    <div>
                      <Title level={5} style={{ marginBottom: '16px' }}>基础信息</Title>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div>
                          <Text strong style={{ display: 'block', marginBottom: '8px' }}>商品标题</Text>
                          <Input 
                            placeholder="请输入商品标题"
                            defaultValue="学位服 - 理学学士"
                            size="large"
                            className="modern-input"
                            style={{
                              borderRadius: '12px',
                              border: '2px solid #e5e7eb',
                              background: 'rgba(255, 255, 255, 0.9)',
                              backdropFilter: 'blur(10px)',
                              height: '48px'
                            }}
                          />
                        </div>
                        <div>
                          <Text strong style={{ display: 'block', marginBottom: '8px' }}>商品描述</Text>
                          <TextArea 
                            placeholder="请输入商品描述"
                            defaultValue="采用优质面料制作，符合学位服标准规范，适合理学学士学位授予仪式使用。"
                            rows={4}
                            size="large"
                            className="modern-input"
                            style={{
                              borderRadius: '12px',
                              border: '2px solid #e5e7eb',
                              background: 'rgba(255, 255, 255, 0.9)',
                              backdropFilter: 'blur(10px)',
                              resize: 'none'
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    

                    
                    {/* 商品分类 */}
                    <div>
                      <Title level={5} style={{ marginBottom: '16px' }}>商品分类</Title>
                      <Row gutter={16}>
                        <Col span={12}>
                          <Text strong style={{ display: 'block', marginBottom: '8px' }}>主分类</Text>
                          <Select 
                            defaultValue="degree-clothing"
                            size="large"
                            className="modern-select"
                            style={{ 
                              width: '100%',
                              borderRadius: '12px',
                              height: '48px'
                            }}
                            options={[
                              { value: 'degree-clothing', label: '学位服' },
                              { value: 'ceremony-clothing', label: '典礼服装' },
                              { value: 'accessories', label: '配饰' }
                            ]}
                          />
                        </Col>
                        <Col span={12}>
                          <Text strong style={{ display: 'block', marginBottom: '8px' }}>子分类</Text>
                          <Select 
                            defaultValue="bachelor"
                            size="large"
                            className="modern-select"
                            style={{ 
                              width: '100%',
                              borderRadius: '12px',
                              height: '48px'
                            }}
                            options={[
                              { value: 'bachelor', label: '学士袍' },
                              { value: 'master', label: '硕士袍' },
                              { value: 'doctor', label: '博士袍' }
                            ]}
                          />
                        </Col>
                      </Row>
                    </div>
                    
                    {/* 商品标签 */}
                    <div>
                      <Title level={5} style={{ marginBottom: '16px' }}>商品标签</Title>
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
                        <Badge count="热销" style={{ backgroundColor: '#ff4d4f' }} />
                        <Badge count="新品" style={{ backgroundColor: '#52c41a' }} />
                        <Badge count="经典款" style={{ backgroundColor: '#1890ff' }} />
                      </div>
                      <Input 
                        placeholder="输入标签，按回车添加"
                        size="large"
                      />
                    </div>
                    
                    {/* SEO设置 */}
                    <div>
                      <Title level={5} style={{ marginBottom: '16px' }}>SEO设置</Title>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div>
                          <Text strong style={{ display: 'block', marginBottom: '8px' }}>页面标题</Text>
                          <Input 
                            placeholder="SEO页面标题"
                            defaultValue="学位服 - 理学学士 | DiCreate"
                            size="large"
                          />
                        </div>
                        <div>
                          <Text strong style={{ display: 'block', marginBottom: '8px' }}>Meta描述</Text>
                          <TextArea 
                            placeholder="搜索引擎描述"
                            defaultValue="优质理学学士学位服，符合标准规范，适合学位授予仪式使用。"
                            rows={2}
                            size="large"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        )}
      </div>
      
      {/* 底部操作栏 */}
      <div className="publish-footer" style={{ 
        padding: '16px 24px', 
        borderTop: '1px solid #f0f0f0',
        backgroundColor: '#fff',
        position: 'sticky',
        bottom: 0,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          {currentStep === 1 && activeTab === 'mockups' && (
            <Text type="secondary">
              已选择 {selectedMockups.length} 个样图 {mainMockup && `· 主图：${mockupData.find(item => item.id === mainMockup)?.name}`}
            </Text>
          )}
          {currentStep === 1 && activeTab === 'video' && (
            <Text type="secondary">
              {selectedModel ? `已选择模特：${modelData.find(m => m.id === selectedModel)?.name}` : '请选择模特'}
            </Text>
          )}
        </div>
        
        <Space>
          <Button 
            onClick={handleBack}
            className="modern-button"
            style={{
              borderRadius: '12px',
              height: '44px',
              padding: '0 24px',
              fontWeight: '500',
              border: '2px solid #e5e7eb',
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)'
            }}
          >
            {currentStep === 1 ? '返回设计' : '上一步'}
          </Button>
          <Button 
            type="primary" 
            onClick={handleContinue}
            disabled={
              currentStep === 1 && 
              ((activeTab === 'mockups' && selectedMockups.length === 0) || 
               (activeTab === 'video' && !selectedModel))
            }
            className="modern-button modern-button-primary"
            style={{
              background: 'var(--gradient-primary)',
              border: 'none',
              borderRadius: '12px',
              height: '44px',
              padding: '0 32px',
              fontWeight: '600',
              fontSize: '15px',
              boxShadow: 'var(--shadow-md)',
              transition: 'all var(--duration-normal) var(--easing-smooth)'
            }}
          >
            {currentStep === 3 ? '去发布' : '继续'}
          </Button>
        </Space>
      </div>
      
      {/* 发布平台选择弹窗 */}
      <Modal
        title="选择发布平台"
        open={publishModalVisible}
        onOk={handlePublishConfirm}
        onCancel={() => setPublishModalVisible(false)}
        okText="确定"
        cancelText="取消"
        okButtonProps={{ disabled: selectedPlatforms.length === 0 }}
      >
        <div style={{ padding: '16px 0' }}>
          <Text style={{ marginBottom: '16px', display: 'block' }}>请选择要发布的商城平台：</Text>
          <Checkbox.Group
            style={{ width: '100%' }}
            onChange={handlePlatformChange}
            value={selectedPlatforms}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Checkbox value="shopify">Shopify</Checkbox>
              <Checkbox value="ebay">eBay</Checkbox>
              <Checkbox value="taobao">淘宝</Checkbox>
              <Checkbox value="jd">京东</Checkbox>
            </div>
          </Checkbox.Group>
        </div>
      </Modal>
    </div>
  );
};

export default ProductPublish;