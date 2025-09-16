# DiCreate.AI 平台官网标准化规范

## 项目概述

基于 **React + TypeScript + Vite + Ant Design + Tailwind CSS** 构建迪创数智化平台（DiCreate.AI）官网，定位为 “AI 驱动的全球服装新贸易平台” 核心入口。需覆盖 B/C 端多角色用户（中小 B 经销客户、科技公司、C 端消费者、迪尚内部团队），实现 “品牌展示 - 资源查询 - AI 设计 - 商城交易 - 企业信息” 全场景功能，且与 PLM/SCM/MES 等内部系统打通，支撑产品规划中 V0.1.0 至 V1.2.0 的迭代目标。

## 技术栈要求

### 核心技术栈（对齐 v2 规范，适配服装贸易场景）



| 技术类别      | 技术栈及版本                                                  | 选型说明                                    |
| --------- | ------------------------------------------------------- | --------------------------------------- |
| 前端框架      | React 18.3.1 + TypeScript 5.8.3                         | 确保组件化开发与类型安全，适配复杂表单（如 AI 设计参数配置）与系统对接需求 |
| 构建工具      | Vite 6.3.5                                              | 支持快速热重载，满足 AI 设计模块实时渲染的开发效率需求           |
| UI 组件库    | Ant Design 5.26.7                                       | 复用表格、表单、模态框等组件，适配资源库列表、商城订单管理等场景        |
| 图标库       | @ant-design/icons 6.0.0 + lucide-react 0.511.0          | 补充服装行业专属图标（如面料、模特、缝纫机等）                 |
| 路由管理      | React Router DOM 7.7.1                                  | 实现多角色路由权限控制（如游客 / 渠道商 / 管理员可见页面区分）      |
| 状态管理      | Zustand 5.0.3                                           | 管理用户角色、AI 设计方案、购物车等全局状态                 |
| 样式框架      | Tailwind CSS 3.4.17                                     | 快速适配多端（PC/H5 / 小程序）响应式布局，统一模块样式         |
| 工具库       | clsx 2.1.1 + tailwind-merge 3.0.2 + fabric.js 6.7.0（新增） | fabric.js 支撑 AI 设计模块的图形编辑（如校徽拖拽、面料替换）   |
| 3D 渲染（新增） | three.js 0.160.0 + @react-three/fiber 8.16.0            | 实现 AI 设计模块的 2D/3D 视图切换与实时渲染             |
| 通知组件      | sonner 2.0.2                                            | 统一订单状态、AI 设计进度等消息提示                     |

### 开发工具配置（完全对齐 v2 规范）



*   **代码检查**: ESLint 9.25.0 + TypeScript ESLint 8.30.1

*   **样式处理**: PostCSS 8.5.3 + Autoprefixer 10.4.21

*   **路径别名**: vite-tsconfig-paths 5.1.4

*   **类型定义**: @types/react 18.3.12 + @types/react-dom 18.3.1 + @types/node 22.15.30

*   **API 调试**: Axios 1.7.7（新增，用于对接 PLM/SCM 系统接口）

## 项目结构要求（适配官网业务模块）



```
src/

├── components/          # 通用组件（对齐v2，补充业务组件）

│   ├── Breadcrumb.tsx   # 面包屑导航（适配官网多频道路径）

│   ├── Empty.tsx        # 空状态组件（资源库/商城无数据场景）

│   ├── FabricCard.tsx   # 面料卡片（平台资源库专用）

│   ├── AIDesignTool.tsx # AI改款工具（加校徽/换面料等功能封装）

│   └── 3DViewer.tsx     # 3D视图组件（AI设计模块专用）

├── hooks/              # 自定义Hook（补充业务Hook）

│   ├── useTheme.ts      # 主题Hook（v2复用）

│   ├── useAIDesign.ts   # AI设计状态Hook（进度/渲染控制）

│   └── useMall.ts       # 商城Hook（购物车/订单状态管理）

├── lib/                # 工具库（补充业务工具）

│   ├── utils.ts         # 通用工具（v2复用）

│   ├── api.ts           # API请求（对接PLM/SCM/Shopify）

│   └── designUtils.ts   # AI设计工具函数（如面料替换、校徽生成）

├── pages/              # 页面组件（按官网频道拆分）

│   ├── Home.tsx         # 官网首页（品牌展示+核心服务）

│   ├── Login.tsx        # 登录页（多角色登录：中小B/消费者/管理员）

│   ├── ResourceLibrary.tsx # 平台资源库（面料/案例/模特库）

│   ├── Mall.tsx         # 平台商城（商品列表/详情/下单）

│   ├── AIDesign.tsx     # AI服装设计（基础改款+3D预览）

│   ├── Trends.tsx       # 流行趋势（行业动态+趋势文章）

│   ├── AboutUs.tsx      # 关于我们（公司信息+营业执照公示）

│   └── admin/           # 管理端页面（对齐admin.DiCreate.Al）

│       ├── ProductManagement.tsx # 商品管理（标品上架/上下架）

│       ├── OrderManagement.tsx   # 订单管理（订单跟踪/对账）

│       ├── ChannelManagement.tsx # 渠道管理（代理/加盟配置）

│       └── ResourceManagement.tsx # 资源管理（面料/案例库维护）

├── assets/             # 静态资源（补充品牌/服装资源）

│   ├── logos/           # 品牌LOGO（DiCreate.AI/迪尚集团）

│   ├── fabrics/         # 面料示例图（默认面料库资源）

│   └── licenses/        # 营业执照扫描件（威海+杭州公司）

├── App.tsx             # 应用主组件（多角色布局适配）

├── main.tsx            # 应用入口（初始化3D渲染环境）

├── index.css           # 全局样式（补充服装行业主题色）

└── vite-env.d.ts       # Vite类型定义（v2复用）
```

## 核心配置文件（对齐 v2，补充业务适配）

### package.json 脚本配置（新增 3D 渲染调试脚本）



```
{

&#x20; "scripts": {

&#x20;   "dev": "vite",

&#x20;   "build": "tsc -b && vite build",

&#x20;   "lint": "eslint .",

&#x20;   "preview": "vite preview",

&#x20;   "check": "tsc -b --noEmit",

&#x20;   "dev:3d": "vite --force" # 3D渲染模块调试（强制清除缓存）

&#x20; }

}
```

### vite.config.ts 配置（补充 3D 模块优化）



```
import { defineConfig } from 'vite'

import react from '@vitejs/plugin-react'

import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({

&#x20; plugins: \[

&#x20;   react(), // 禁用额外babel插件，避免依赖问题（v2规范）

&#x20;   tsconfigPaths()

&#x20; ],

&#x20; optimizeDeps: {

&#x20;   include: \['three', '@react-three/fiber', 'fabric'], // 预构建3D/图形依赖

&#x20;   exclude: \['@ant-design/icons']

&#x20; },

&#x20; server: {

&#x20;   port: 5173, // 开发端口（v2复用）

&#x20;   proxy: {

&#x20;     '/api': { // 对接PLM/SCM系统接口代理

&#x20;       target: 'https://internal.dicreate.ai',

&#x20;       changeOrigin: true,

&#x20;       rewrite: (path) => path.replace(/^\\/api/, '')

&#x20;     }

&#x20;   }

&#x20; }

})
```

### tailwind.config.js 配置（新增服装行业主题扩展）



```
export default {

&#x20; darkMode: "class",

&#x20; content: \["./index.html", "./src/\*\*/\*.{js,ts,jsx,tsx}"],

&#x20; theme: {

&#x20;   container: {

&#x20;     center: true,

&#x20;   },

&#x20;   extend: {

&#x20;     colors: {

&#x20;       // 补充服装行业辅助色（贴合业务场景）

&#x20;       fabric: {

&#x20;         light: '#f5f5f5', // 浅色面料色

&#x20;         dark: '#333333',  // 深色面料色

&#x20;         accent: '#e67e22'  // 服装点缀色（如刺绣/印花）

&#x20;       }

&#x20;     },

&#x20;     fontFamily: {

&#x20;       fashion: \['Inter', 'sans-serif'] // 服装行业通用字体

&#x20;     }

&#x20;   },

&#x20; },

&#x20; plugins: \[],

};
```

### tsconfig.json 路径别名配置（v2 完全复用）



```
{

&#x20; "compilerOptions": {

&#x20;   "baseUrl": ".",

&#x20;   "paths": {

&#x20;     "@/\*": \["./src/\*"]

&#x20;   },

&#x20;   "skipLibCheck": true, // 忽略three.js等第三方库类型检查

&#x20;   "jsxImportSource": "@emotion/react" // 适配Ant Design样式

&#x20; }

}
```

## 应用架构设计（对齐 v2 布局，补充业务特性）

### 主应用布局（App.tsx）

#### 布局结构（v2 基础上适配多角色）



*   **左侧可折叠导航栏（Sider）**: 按用户角色动态显示菜单（如 “渠道商” 显示 “分佣结算”，“消费者” 隐藏管理入口）

*   **顶部标题栏（Header）**: 品牌 LOGO + 搜索框（支持面料 / 商品搜索） + 用户菜单（角色标识 + 退出登录）

*   **主内容区域（Content）**: 模块化承载各频道页面，与 v2 间距规范一致

#### 关键特性（补充官网业务需求）



1.  **角色权限控制**: 基于 Zustand 存储用户角色（游客 / 中小 B/C 端 / 管理员），动态渲染菜单与功能按钮

*   游客：仅可见首页、关于我们、资源库（有限范围）

*   渠道商：额外显示 “渠道管理”“订单分佣”

*   管理员：显示完整 admin 模块入口

1.  **系统对接适配**: 预留 PLM/SCM/MES 接口入口，如商城商品数据同步自 PLM，订单状态同步自 MES

2.  **多端一致性**: 适配 PC/H5 / 微信小程序，布局逻辑与 v2 响应式规范一致

#### 样式规范（v2 基础上补充品牌特性）



```
// 侧边栏样式（品牌化调整）

const siderStyle = {

&#x20; background: '#fff', // v2白色背景复用

&#x20; boxShadow: '0 0 8px rgba(0,21,41,.05)' // 增强品牌精致感

};

// Logo区域样式（贴合DiCreate.AI品牌）

const logoStyle = {

&#x20; height: 36,

&#x20; margin: 16,

&#x20; background: '#1890ff', // 主色调（v2复用）

&#x20; borderRadius: 6,

&#x20; display: 'flex',

&#x20; alignItems: 'center',

&#x20; justifyContent: 'center',

&#x20; color: '#fff', // 白色文字

&#x20; fontWeight: 'bold',

&#x20; fontSize: 16

};

// 主内容区样式（完全对齐v2规范）

const contentStyle = {

&#x20; background: 'transparent',

&#x20; margin: '16px', // 统一外间距（v2核心规范）

&#x20; minHeight: 'calc(100vh - 112px)'

};
```

### 主内容区模块化布局规范（完全对齐 v2，补充业务模块拆分）

#### 设计原则（v2 复用）



*   主内容区透明背景，模块独立白色卡片

*   同行模块高度对齐（flex stretch）

*   模块间距统一（marginBottom: 16px）

#### 官网核心模块拆分策略（贴合业务场景）



| 模块类型  | 包含内容                                        | 应用页面         |
| ----- | ------------------------------------------- | ------------ |
| 筛选操作区 | 搜索框、分类筛选（如面料材质 / 商品品类）、操作按钮（如 “新增面料”“批量导出”） | 资源库、商城、管理端页面 |
| 数据列表区 | 表格 / 卡片列表（如面料列表、商品列表）、分页、排序                 | 资源库、商城、订单管理  |
| 预览交互区 | 2D/3D 视图、图片预览（如面料细节、AI 设计效果）、操作控件（如旋转 / 缩放） | AI 设计、商品详情   |
| 统计信息区 | 数据卡片（如 “本月订单量”“面料库存数”）、趋势图表（如商品销量趋势）        | 管理端首页、商城运营页  |

#### 高度对齐解决方案（v2 复用，补充 3D 模块适配）



```
// 3D预览与参数配置模块高度对齐示例

\<Row gutter={\[16, 16]} style={{ display: 'flex', alignItems: 'stretch' }}>

&#x20; {/\* 3D预览区 \*/}

&#x20; \<Col xs={24} lg={16} style={{ display: 'flex' }}>

&#x20;   \<Card&#x20;

&#x20;     style={{ width: '100%', display: 'flex', flexDirection: 'column' }}

&#x20;     bodyStyle={{ flex: 1, display: 'flex', flexDirection: 'column' }}

&#x20;   \>

&#x20;     <3DViewer modelUrl={currentModel} /> {/\* 3D渲染组件 \*/}

&#x20;   \</Card>

&#x20; \</Col>

&#x20; {/\* 参数配置区 \*/}

&#x20; \<Col xs={24} lg={8} style={{ display: 'flex' }}>

&#x20;   \<Card&#x20;

&#x20;     style={{ width: '100%', display: 'flex', flexDirection: 'column' }}

&#x20;     bodyStyle={{ flex: 1, display: 'flex', flexDirection: 'column' }}

&#x20;   \>

&#x20;     \<Form layout="vertical"> {/\* 面料/颜色配置表单 \*/}

&#x20;       \<Form.Item label="面料选择" name="fabricId">

&#x20;         \<Select options={fabricOptions} />

&#x20;       \</Form.Item>

&#x20;       \<Form.Item label="颜色替换" name="color">

&#x20;         \<ColorPicker />

&#x20;       \</Form.Item>

&#x20;     \</Form>

&#x20;   \</Card>

&#x20; \</Col>

\</Row>
```

## 页面设计规范（按官网频道拆分，对齐 v2）

### 1. 首页（Home.tsx）

#### 布局结构（贴合平台定位）



1.  **品牌 Banner 区**: 展示 “AI 驱动的全球服装新贸易平台” 核心定位，配服装场景图（工装 / 校园服 / 时装）

2.  **核心服务区**: 4 列卡片布局，显示 “AI 设计定制”“全球供应链”“数字化管理”“全链路赋能”，点击跳转对应频道

3.  **案例展示区**: 按品类（工装 / 校园服 / 学位服）展示成功案例，包含 “客户名称 + 定制亮点 + 成品图”

4.  **数据概览区**（仅登录可见）: 显示 “平台商品数”“合作渠道数”“AI 设计方案数” 统计卡片

5.  **快速入口区**: 校园代理、电商客户等角色专属入口，动态渲染

#### 样式规范（对齐 v2）



*   Banner 区: 16:9 比例，响应式适配（移动端自动裁剪）

*   服务卡片：白色背景（#fff）、8px 圆角、轻微阴影（v2 模块阴影规范）

*   案例区：卡片间距 16px，hover 时放大 1.02 倍（增强交互感）

#### 核心代码示例（模块布局）



```
return (

&#x20; \<div style={{ background: 'transparent' }}> {/\* 页面无padding（v2规范） \*/}

&#x20;   {/\* 品牌Banner区 \*/}

&#x20;   \<Card style={moduleCardStyle} className="mb-4">

&#x20;     \<Carousel autoplay>

&#x20;       {bannerList.map(item => (

&#x20;         \<div key={item.id} style={{ height: 400 }}>

&#x20;           \<img src={item.url} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />

&#x20;         \</div>

&#x20;       ))}

&#x20;     \</Carousel>

&#x20;   \</Card>

&#x20;   {/\* 核心服务区 \*/}

&#x20;   \<Row gutter={\[16, 16]} style={flexRowStyle} className="mb-4">

&#x20;     {serviceList.map(service => (

&#x20;       \<Col xs={12} lg={6} style={flexColStyle} key={service.id}>

&#x20;         \<Card style={moduleCardStyle} bodyStyle={{ flex: 1 }}>

&#x20;           \<div style={{ textAlign: 'center' }}>

&#x20;             {service.icon}

&#x20;             \<h3 style={{ fontSize: 16, margin: '8px 0' }}>{service.title}\</h3>

&#x20;             \<p style={{ color: '#8c8c8c' }}>{service.desc}\</p>

&#x20;             \<Button type="link" style={{ marginTop: 8 }} onClick={() => navigate(service.path)}>

&#x20;               了解更多

&#x20;             \</Button>

&#x20;           \</div>

&#x20;         \</Card>

&#x20;       \</Col>

&#x20;     ))}

&#x20;   \</Row>

&#x20; \</div>

);
```

### 2. 平台资源库（ResourceLibrary.tsx）

#### 核心模块（贴合文档 “平台资源库” 需求）



| 资源类型  | 功能要求                                                          | 样式规范                                      |
| ----- | ------------------------------------------------------------- | ----------------------------------------- |
| 面料库   | 1. 按材质（棉 / 毛呢 / 牛仔）分类；2. 显示 “材质参数 + 颜色选项 + 适用品类”；3. 支持收藏 / 下载 | 卡片布局（200px 宽 / 张），hover 显示操作按钮（收藏 / 查看详情） |
| 案例库   | 1. 按品类筛选；2. 包含 “需求背景 + 定制方案 + 成品图”；3. 关联商城商品                  | 列表 + 大图布局，时间列 160px（v2 表格列宽规范），居中对齐       |
| 模特库   | 1. 按性别 / 体型筛选；2. 支持选择后同步至 AI 设计模块                             | 网格布局（3 列 / 行），选中时加蓝色边框（#1890ff）           |
| 背景场景库 | 1. 按场景（校园 / 职场 / 户外）分类；2. 支持预览与应用                             | 卡片布局，右下角显示 “应用” 按钮（仅登录用户可见）               |

#### 表格规范（案例库列表，对齐 v2）



```
// 案例列表列配置（v2表格规范：居中对齐、固定列宽）

const columns = \[

&#x20; {

&#x20;   title: '案例名称',

&#x20;   dataIndex: 'name',

&#x20;   key: 'name',

&#x20;   align: 'center', // 居中对齐（v2强制规范）

&#x20;   width: 180, // 用户列宽规范（v2复用）

&#x20;   render: (text: string) => \<span style={{ fontWeight: 500 }}>{text}\</span>

&#x20; },

&#x20; {

&#x20;   title: '所属品类',

&#x20;   dataIndex: 'category',

&#x20;   key: 'category',

&#x20;   align: 'center',

&#x20;   width: 120, // 角色列宽规范（v2复用）

&#x20;   render: (text: string) => \<Tag color="blue">{text}\</Tag>

&#x20; },

&#x20; {

&#x20;   title: '创建时间',

&#x20;   dataIndex: 'createTime',

&#x20;   key: 'createTime',

&#x20;   align: 'center',

&#x20;   width: 160, // 时间列宽规范（v2复用）

&#x20;   sorter: true // 支持排序（v2表格功能规范）

&#x20; },

&#x20; {

&#x20;   title: '操作',

&#x20;   key: 'action',

&#x20;   align: 'center',

&#x20;   width: 200, // 操作列宽规范（v2复用）

&#x20;   render: (\_: any, record: CaseItem) => (

&#x20;     \<Space size={8}>

&#x20;       \<Button type="link" icon={\<EyeOutlined />} onClick={() => viewDetail(record)} size="small">

&#x20;         查看

&#x20;       \</Button>

&#x20;       \<Button type="link" icon={\<ShoppingOutlined />} onClick={() => toMall(record)} size="small">

&#x20;         去下单

&#x20;       \</Button>

&#x20;     \</Space>

&#x20;   )

&#x20; }

];
```

### 3. AI 服装设计（AIDesign.tsx）

#### 核心功能（贴合文档 “AI 服装设计” 需求）



1.  **基础改款工具**: 支持 “加校徽、换字体、换颜色、换面料、加印花”，操作后实时渲染（≤3 秒）

2.  **2D/3D 视图切换**: 2D 显示平面图，3D 支持 360° 旋转查看，依赖 three.js 实现

3.  **改款方案保存**: 登录用户可保存方案至 “我的设计”，支持后续编辑或直接下单

4.  **相似款衍生**: 基于当前方案推荐相似款（如同面料不同款式），关联商城商品

#### 交互规范（新增业务交互）



*   **改款操作反馈**: 点击 “换面料” 后显示加载动画，渲染完成后弹出 “修改成功” 提示（sonner 组件）

*   **3D 视图交互**: 鼠标拖拽旋转模型，滚轮缩放，右键平移

*   **组件操作限制**: 未选择 “基础款式” 时，改款按钮置灰（禁用状态）

#### 样式规范（对齐 v2 模块样式）



*   改款工具栏：白色背景卡片（#fff），固定在左侧，宽度 240px（响应式时折叠为图标）

*   预览区：透明背景，占页面主体，与工具栏间距 16px（v2 模块间距规范）

### 4. 关于我们（AboutUs.tsx）

#### 核心内容（贴合文档 “公司信息” 需求）



1.  **公司介绍**: 迪尚集团 “贸工一体” 背景，威海 / 杭州子公司基本信息（成立时间、注册资本、法定代表人）

2.  **营业执照公示**: 展示威海迪创（91371000MAEKRNCW99）、杭州迪创智启（91330108MAER4E920G）的扫描件，点击可放大

3.  **联系方式**: 双公司地址、电话、邮箱，关联 “国家企业信用信息公示系统” 链接

4.  **合规声明**: 用户协议、隐私政策，符合《电子商务法》要求

#### 样式规范（对齐 v2）



*   营业执照卡片：白色背景、8px 圆角、边框 1px solid #f0f0f0（v2 模块边框规范）

*   公司信息列表：文字颜色 #262626（主要文字），间距 8px（v2 组件间距规范）

## 样式和主题规范（对齐 v2，补充业务扩展）

### 颜色系统（v2 基础上补充品牌色）



| 颜色类型  | 色值                                           | 应用场景                       |
| ----- | -------------------------------------------- | -------------------------- |
| 主色调   | #1890ff（v2 复用）                               | 按钮、Logo、选中状态（如菜单选中、按钮主色）   |
| 业务辅助色 | #52c41a（成功）、#faad14（警告）、#ff4d4f（错误）（v2 复用）   | 订单状态（成功 - 绿色、失败 - 红色）、通知提示 |
| 服装行业色 | #f5f5f5（面料浅灰）、#333333（面料深灰）、#e67e22（点缀色）（新增） | 面料库默认色、AI 设计点缀色（如刺绣颜色）     |
| 文字色   | #262626（主要）、#8c8c8c（次要）（v2 复用）               | 标题 / 正文、辅助说明文字             |
| 背景色   | #f0f2f5（页面）、#ffffff（模块）（v2 复用）               | 官网整体背景、模块卡片背景              |

### 间距规范（完全对齐 v2 核心规范）



1.  **主内容区外间距**: App.tsx 的 Content 组件设置`margin: '16px'`，确保与导航栏 / 标题栏 / 屏幕边缘距离统一

2.  **页面容器内间距**: 所有页面（如 Home.tsx、AIDesign.tsx）禁止设置`padding`，仅通过模块`margin`控制布局

3.  **模块间距**: 模块卡片（Card）设置`marginBottom: '16px'`，同行模块间距通过 Row gutter={16} 控制

4.  **组件内间距**: 表单、表格等组件内部间距依赖 Ant Design 默认值（如 Form.Item 间距 16px）

### 字体与视觉规范（v2 复用）



*   **字体层级**: 标题 24px（h1）、18px（h2）、16px（h3），正文 14px，辅助文字 12px

*   **圆角规范**: 模块卡片 8px，按钮 6px（Ant Design 默认），头像 50%（圆形）

*   **阴影规范**: 模块卡片`0 1px 4px rgba(0,21,41,.08)`，登录卡片`0 4px 12px rgba(0, 0, 0, 0.15)`（v2 复用）

## 交互和动效要求（对齐 v2，补充业务动效）

### 通用交互（v2 复用）



*   按钮交互：主按钮（蓝色背景 + 白色文字）、次要按钮（白色背景 + 蓝色边框）、链接按钮（蓝色文字无背景）

*   表格交互：行 hover 高亮、排序图标显示、分页器完整功能（showSizeChanger/showQuickJumper）

*   模态框交互：遮罩层点击关闭、ESC 键支持、表单实时验证

### 业务专属交互（新增）



| 业务场景    | 交互要求                                                |
| ------- | --------------------------------------------------- |
| AI 设计渲染 | 改款操作时显示 “正在渲染...” 加载动画（Ant Design Spin 组件），完成后淡入新效果 |
| 3D 视图操作 | 鼠标拖拽旋转模型（平滑阻尼效果），缩放时保持模型中心不变                        |
| 商城下单流程  | 点击 “立即购买” 后跳转至下单页，路径通过面包屑显示（v2 面包屑组件复用）             |
| 角色切换    | 管理员切换 “渠道商视图” 时，菜单动态刷新（无刷新页面）                       |

## 数据管理规范（对齐 v2，补充业务数据）

### 状态管理（v2 复用 + 业务扩展）



*   **全局状态**: 使用 Zustand 管理用户角色、购物车、AI 设计方案，示例：



```
// store/designStore.ts（AI设计状态）

import { create } from 'zustand';

export const useDesignStore = create((set) => ({

&#x20; currentStyle: null, // 当前选中款式

&#x20; designHistory: \[], // 改款历史

&#x20; saveDesign: (design) => set(state => ({ designHistory: \[...state.designHistory, design] })),

&#x20; setCurrentStyle: (style) => set({ currentStyle: style })

}));
```



*   **页面状态**: 使用 React useState 管理表格分页、表单值等（如资源库筛选条件）

*   **表单状态**: 使用 Ant Design Form 管理 AI 设计参数、用户登录表单等

### 模拟数据（贴合业务场景）

#### 面料库模拟数据



```
export const mockFabrics = \[

&#x20; {

&#x20;   id: 'f001',

&#x20;   name: '精梳棉',

&#x20;   type: '棉',

&#x20;   params: '克重200g/㎡，纱支40s',

&#x20;   colors: \['#ffffff', '#f5f5f5', '#333333'],

&#x20;   applicable: \['工装', '校园服'],

&#x20;   url: '@/assets/fabrics/cotton.jpg'

&#x20; },

&#x20; {

&#x20;   id: 'f002',

&#x20;   name: '双面毛呢',

&#x20;   type: '毛呢',

&#x20;   params: '克重380g/㎡，含毛量70%',

&#x20;   colors: \['#000000', '#444444', '#888888'],

&#x20;   applicable: \['大衣', '学位服'],

&#x20;   url: '@/assets/fabrics/wool.jpg'

&#x20; }

];
```

## 响应式设计要求（完全对齐 v2）

### 断点设置（v2 复用）



*   桌面端: ≥1200px（多列布局，如 AI 设计 “工具栏 + 预览区” 并排）

*   平板端: 768px-1199px（2 列布局，如资源库 2 列卡片）

*   移动端: <768px（单列布局，侧边栏折叠为图标，AI 设计工具栏隐藏为底部浮层）

### 适配策略（补充业务适配）



*   商城商品列表：移动端单列显示，隐藏 “适用品类” 等次要信息

*   AI 设计 3D 视图：移动端禁用右键平移，仅保留拖拽旋转（避免误操作）

*   营业执照公示：移动端支持手势缩放（查看细节）

## 常见问题和解决方案（v2 基础上补充业务问题）

### 1. 3D 渲染兼容性问题

**问题描述**: 部分低版本浏览器（如 Chrome < 90）无法加载 3D 模型

**解决方案**:



```
// 3DViewer.tsx 兼容性检测

useEffect(() => {

&#x20; if (!window.WebGLRenderingContext) {

&#x20;   message.error('当前浏览器不支持3D渲染，请升级浏览器');

&#x20;   setSupport3D(false);

&#x20; }

}, \[]);

// 降级显示2D视图

return support3D ? \<ThreeViewer /> : \<img src={2dUrl} alt="2D预览" />;
```

### 2. AI 设计实时渲染卡顿

**问题描述**: 频繁改款（如连续换面料）导致页面卡顿

**解决方案**:



*   使用`useDebounce`延迟渲染请求（间隔 500ms）

*   优化 3D 模型多边形数量（控制在 10000 面以内）

### 3. 对接 Shopify 商城跨域问题（产品规划 V0.1.0 需求）

**问题描述**: 本地开发时调用 Shopify 接口报跨域错误

**解决方案**: 在 vite.config.ts 中配置代理：



```
server: {

&#x20; proxy: {

&#x20;   '/shopify': {

&#x20;     target: 'https://your-shop.myshopify.com',

&#x20;     changeOrigin: true,

&#x20;     rewrite: (path) => path.replace(/^\\/shopify/, '/admin/api/2024-04')

&#x20;   }

&#x20; }

}
```

## 执行指令（对齐 v2，明确业务验收标准）

请严格按照以上规范开发，确保满足以下要求：



1.  ✅ 技术栈版本与配置完全对齐（如 React 18.3.1、Vite 6.3.5）

2.  ✅ 项目结构与页面模块按业务拆分（如 admin 目录包含 “商品管理” 而非通用 “用户管理”）

3.  ✅ AI 设计模块实时渲染≤3 秒，3D 视图支持完整交互

4.  ✅ 表格列宽、对齐方式、操作按钮完全遵循 v2 规范

5.  ✅ 多角色权限控制生效（如游客无法查看渠道商分佣数据）

6.  ✅ 响应式适配所有断点，移动端体验无阻塞

7.  ✅ 与 PLM/SCM/Shopify 接口预留对接（按产品规划 V0.1.0 要求）

8.  ✅ 营业执照公示信息与文档完全一致（统一社会信用代码等）

> （注：文档部分内容可能由 AI 生成）