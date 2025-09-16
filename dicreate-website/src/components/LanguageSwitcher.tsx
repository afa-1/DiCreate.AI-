import React from 'react'
import { Dropdown, Button } from 'antd'
import { GlobalOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'

interface LanguageSwitcherProps {
  currentLanguage?: string
  onLanguageChange?: (language: string) => void
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  currentLanguage = 'zh',
  onLanguageChange
}) => {
  const languages = [
    { key: 'zh', label: '中文', flag: '🇨🇳' },
    { key: 'en', label: 'English', flag: '🇺🇸' },
    { key: 'ja', label: '日本語', flag: '🇯🇵' },
    { key: 'ko', label: '한국어', flag: '🇰🇷' }
  ]

  const handleLanguageChange = (language: string) => {
    onLanguageChange?.(language)
  }

  const menuItems: MenuProps['items'] = languages.map(lang => ({
    key: lang.key,
    label: (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '4px 0'
      }}>
        <span style={{ fontSize: '16px' }}>{lang.flag}</span>
        <span>{lang.label}</span>
        {currentLanguage === lang.key && (
          <span style={{ color: '#1890ff', marginLeft: 'auto' }}>✓</span>
        )}
      </div>
    ),
    onClick: () => handleLanguageChange(lang.key)
  }))

  const currentLang = languages.find(lang => lang.key === currentLanguage)

  return (
    <Dropdown
      menu={{ items: menuItems }}
      placement="bottomRight"
      trigger={['click']}
    >
      <Button
        type="text"
        icon={<GlobalOutlined />}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          color: 'var(--printful-text-primary)',
          border: '1px solid var(--printful-border)',
          borderRadius: 'var(--printful-border-radius-sm)'
        }}
      >
        <span style={{ fontSize: '14px' }}>{currentLang?.flag}</span>
        <span style={{ fontSize: '12px', display: window.innerWidth > 768 ? 'inline' : 'none' }}>
          {currentLang?.label}
        </span>
      </Button>
    </Dropdown>
  )
}

export default LanguageSwitcher