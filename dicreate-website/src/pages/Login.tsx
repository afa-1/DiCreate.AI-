import React, { useState } from 'react'
import {
  Button,
  Input,
  Form,
  Divider,
  message,
  Checkbox,
  Modal,
  Space
} from 'antd'
import {
  MailOutlined,
  LockOutlined,
  GoogleOutlined,
  AppleOutlined,
  WechatOutlined,
  MobileOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone
} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

const Login: React.FC = () => {
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email')
  const [showVerificationModal, setShowVerificationModal] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [verificationCode, setVerificationCode] = useState('')
  const [countdown, setCountdown] = useState(0)

  // 邮箱登录
  const handleEmailLogin = async (values: any) => {
    setLoading(true)
    try {
      // 模拟登录请求
      await new Promise(resolve => setTimeout(resolve, 1000))
      message.success('登录成功！')
      navigate('/') // 跳转到首页
    } catch (error) {
      message.error('登录失败，请检查邮箱和密码')
    } finally {
      setLoading(false)
    }
  }

  // 手机验证码登录
  const handlePhoneLogin = () => {
    if (!phoneNumber) {
      message.error('请输入手机号码')
      return
    }
    setShowVerificationModal(true)
    sendVerificationCode()
  }

  // 发送验证码
  const sendVerificationCode = () => {
    setCountdown(60)
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    message.success('验证码已发送')
  }

  // 验证码登录
  const handleVerificationLogin = async () => {
    if (!verificationCode) {
      message.error('请输入验证码')
      return
    }
    setLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      message.success('登录成功！')
      setShowVerificationModal(false)
      navigate('/')
    } catch (error) {
      message.error('验证码错误')
    } finally {
      setLoading(false)
    }
  }

  // 第三方登录
  const handleSocialLogin = (provider: string) => {
    message.info(`正在跳转到${provider}登录...`)
    // 这里可以集成实际的第三方登录逻辑
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '400px',
        background: '#ffffff',
        borderRadius: '16px',
        padding: '40px',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
        position: 'relative'
      }}>
        {/* Logo 和标题 */}
        <div style={{
          textAlign: 'center',
          marginBottom: '32px'
        }}>
          <div style={{
            fontSize: '32px',
            fontWeight: '700',
            color: '#1a1a2e',
            marginBottom: '8px'
          }}>
            DiCreate.AI
          </div>
          <div style={{
            fontSize: '16px',
            color: '#6b7280',
            fontWeight: '400'
          }}>
            欢迎回来，请登录您的账户
          </div>
        </div>

        {/* 登录方式切换 */}
        <div style={{
          display: 'flex',
          marginBottom: '24px',
          background: '#f8fafc',
          borderRadius: '8px',
          padding: '4px'
        }}>
          <Button
            type={loginMethod === 'email' ? 'primary' : 'text'}
            onClick={() => setLoginMethod('email')}
            style={{
              flex: 1,
              border: 'none',
              borderRadius: '6px',
              height: '40px',
              backgroundColor: loginMethod === 'email' ? '#667eea' : 'transparent',
              color: loginMethod === 'email' ? '#ffffff' : '#6b7280'
            }}
          >
            邮箱登录
          </Button>
          <Button
            type={loginMethod === 'phone' ? 'primary' : 'text'}
            onClick={() => setLoginMethod('phone')}
            style={{
              flex: 1,
              border: 'none',
              borderRadius: '6px',
              height: '40px',
              backgroundColor: loginMethod === 'phone' ? '#667eea' : 'transparent',
              color: loginMethod === 'phone' ? '#ffffff' : '#6b7280'
            }}
          >
            手机登录
          </Button>
        </div>

        {/* 邮箱登录表单 */}
        {loginMethod === 'email' && (
          <Form
            form={form}
            onFinish={handleEmailLogin}
            layout="vertical"
            requiredMark={false}
          >
            <Form.Item
              name="email"
              rules={[
                { required: true, message: '请输入邮箱地址' },
                { type: 'email', message: '请输入有效的邮箱地址' }
              ]}
            >
              <Input
                prefix={<MailOutlined style={{ color: '#9ca3af' }} />}
                placeholder="请输入邮箱地址"
                size="large"
                style={{
                  borderRadius: '8px',
                  border: '1px solid #e5e7eb',
                  padding: '12px 16px'
                }}
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: '请输入密码' }]}
            >
              <Input.Password
                prefix={<LockOutlined style={{ color: '#9ca3af' }} />}
                placeholder="请输入密码"
                size="large"
                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                style={{
                  borderRadius: '8px',
                  border: '1px solid #e5e7eb',
                  padding: '12px 16px'
                }}
              />
            </Form.Item>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '24px'
            }}>
              <Checkbox>记住我</Checkbox>
              <Button type="link" style={{ padding: 0, color: '#667eea' }}>
                忘记密码？
              </Button>
            </div>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                size="large"
                block
                style={{
                  height: '48px',
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  border: 'none',
                  fontSize: '16px',
                  fontWeight: '600'
                }}
              >
                登录
              </Button>
            </Form.Item>
          </Form>
        )}

        {/* 手机登录表单 */}
        {loginMethod === 'phone' && (
          <div>
            <Input
              prefix={<MobileOutlined style={{ color: '#9ca3af' }} />}
              placeholder="请输入手机号码"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              size="large"
              style={{
                borderRadius: '8px',
                border: '1px solid #e5e7eb',
                padding: '12px 16px',
                marginBottom: '24px'
              }}
            />
            <Button
              type="primary"
              onClick={handlePhoneLogin}
              size="large"
              block
              style={{
                height: '48px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: 'none',
                fontSize: '16px',
                fontWeight: '600'
              }}
            >
              获取验证码
            </Button>
          </div>
        )}

        {/* 分割线 */}
        <Divider style={{ margin: '32px 0', color: '#9ca3af' }}>或使用以下方式登录</Divider>

        {/* 第三方登录按钮 */}
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <Button
            onClick={() => handleSocialLogin('Google')}
            size="large"
            block
            style={{
              height: '48px',
              borderRadius: '8px',
              border: '1px solid #e5e7eb',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              fontSize: '16px'
            }}
          >
            <GoogleOutlined style={{ fontSize: '20px', color: '#ea4335' }} />
            使用 Google 登录
          </Button>

          <Button
            onClick={() => handleSocialLogin('Apple')}
            size="large"
            block
            style={{
              height: '48px',
              borderRadius: '8px',
              border: '1px solid #e5e7eb',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              fontSize: '16px'
            }}
          >
            <AppleOutlined style={{ fontSize: '20px', color: '#000000' }} />
            使用 Apple 登录
          </Button>

          <Button
            onClick={() => handleSocialLogin('微信')}
            size="large"
            block
            style={{
              height: '48px',
              borderRadius: '8px',
              border: '1px solid #e5e7eb',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              fontSize: '16px'
            }}
          >
            <WechatOutlined style={{ fontSize: '20px', color: '#07c160' }} />
            使用微信登录
          </Button>
        </Space>

        {/* 注册链接 */}
        <div style={{
          textAlign: 'center',
          marginTop: '32px',
          color: '#6b7280'
        }}>
          还没有账户？
          <Button type="link" style={{ padding: '0 4px', color: '#667eea' }}>
            立即注册
          </Button>
        </div>
      </div>

      {/* 验证码弹窗 */}
      <Modal
        title="输入验证码"
        open={showVerificationModal}
        onCancel={() => setShowVerificationModal(false)}
        footer={null}
        width={400}
        centered
      >
        <div style={{ padding: '20px 0' }}>
          <div style={{
            marginBottom: '20px',
            color: '#6b7280',
            textAlign: 'center'
          }}>
            验证码已发送至 {phoneNumber}
          </div>
          
          <Input
            placeholder="请输入6位验证码"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            size="large"
            maxLength={6}
            style={{
              borderRadius: '8px',
              textAlign: 'center',
              fontSize: '18px',
              letterSpacing: '4px',
              marginBottom: '20px'
            }}
          />
          
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '24px'
          }}>
            <span style={{ color: '#6b7280' }}>没有收到验证码？</span>
            <Button
              type="link"
              disabled={countdown > 0}
              onClick={sendVerificationCode}
              style={{ padding: 0, color: countdown > 0 ? '#9ca3af' : '#667eea' }}
            >
              {countdown > 0 ? `${countdown}s后重发` : '重新发送'}
            </Button>
          </div>
          
          <Button
            type="primary"
            onClick={handleVerificationLogin}
            loading={loading}
            size="large"
            block
            style={{
              height: '48px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              border: 'none',
              fontSize: '16px',
              fontWeight: '600'
            }}
          >
            登录
          </Button>
        </div>
      </Modal>
    </div>
  )
}

export default Login