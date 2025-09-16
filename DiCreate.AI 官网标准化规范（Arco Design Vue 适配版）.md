# DiCreate.AI 平台官网标准化规范（Arco Design Vue 适配版）

## 项目概述

基于 **Vue 3 + TypeScript + Vite + Arco Design Vue + Tailwind CSS** 构建迪创数智化平台（DiCreate.AI）官网，定位为 “AI 驱动的全球服装新贸易平台” 核心入口。需覆盖 B/C 端多角色用户（中小 B 经销客户、科技公司、C 端消费者、迪尚内部团队），实现 “品牌展示 - 资源查询 - AI 设计 - 商城交易 - 企业信息” 全场景功能，且与 PLM/SCM/MES 等内部系统打通，支撑产品规划中 V0.1.0 至 V1.2.0 的迭代目标。

## 技术栈要求

### 核心技术栈（适配 Arco Design Vue，对齐服装贸易场景）



| 技术类别      | 技术栈及版本                                                  | 选型说明                                       |
| --------- | ------------------------------------------------------- | ------------------------------------------ |
| 前端框架      | Vue 3.4.21 + TypeScript 5.8.3                           | 确保组件化开发与类型安全，适配复杂表单（如 AI 设计参数配置）与系统对接需求    |
| 构建工具      | Vite 6.3.5                                              | 支持快速热重载，满足 AI 设计模块实时渲染的开发效率需求              |
| UI 组件库    | Arco Design Vue 2.55.0                                  | 复用表格、表单、模态框等组件，适配资源库列表、商城订单管理等场景，提升 UI 精细度 |
| 图标库       | @arco-design/icons-vue 1.4.0 + lucide-vue 0.511.0       | 补充服装行业专属图标（如面料、模特、缝纫机等）                    |
| 路由管理      | Vue Router 4.4.5                                        | 实现多角色路由权限控制（如游客 / 渠道商 / 管理员可见页面区分）         |
| 状态管理      | Pinia 2.2.2                                             | 管理用户角色、AI 设计方案、购物车等全局状态                    |
| 样式框架      | Tailwind CSS 3.4.17                                     | 快速适配多端（PC/H5 / 小程序）响应式布局，统一模块样式            |
| 工具库       | clsx 2.1.1 + tailwind-merge 3.0.2 + fabric.js 6.7.0（新增） | fabric.js 支撑 AI 设计模块的图形编辑（如校徽拖拽、面料替换）      |
| 3D 渲染（新增） | three.js 0.160.0 + @vue-three/fiber 2.1.10              | 实现 AI 设计模块的 2D/3D 视图切换与实时渲染                |
| 通知组件      | Arco Design Vue 内置 Message/Notification                 | 统一订单状态、AI 设计进度等消息提示                        |

### 开发工具配置（适配 Vue 生态）



*   **代码检查**: ESLint 9.25.0 + eslint-plugin-vue 9.28.0 + @typescript-eslint 8.30.1

*   **样式处理**: PostCSS 8.5.3 + Autoprefixer 10.4.21

*   **路径别名**: vite-tsconfig-paths 5.1.4

*   **类型定义**: @types/vue 3.2.79 + @types/node 22.15.30

*   **API 调试**: Axios 1.7.7（对接 PLM/SCM 系统接口）

## 项目结构要求（适配 Vue 单文件组件）



```
src/

├── components/          # 通用组件（补充业务组件）

│   ├── Breadcrumb.vue   # 面包屑导航（适配官网多频道路径）

│   ├── Empty.vue        # 空状态组件（资源库/商城无数据场景）

│   ├── FabricCard.vue   # 面料卡片（平台资源库专用）

│   ├── AIDesignTool.vue # AI改款工具（加校徽/换面料等功能封装）

│   └── 3DViewer.vue     # 3D视图组件（AI设计模块专用）

├── composables/         # 自定义组合式API（替代React Hooks）

│   ├── useTheme.ts      # 主题Hook（适配Arco主题）

│   ├── useAIDesign.ts   # AI设计状态管理

│   └── useMall.ts       # 商城购物车/订单状态管理

├── lib/                 # 工具库（补充业务工具）

│   ├── utils.ts         # 通用工具

│   ├── api.ts           # API请求（对接PLM/SCM/Shopify）

│   └── designUtils.ts   # AI设计工具函数

├── pages/               # 页面组件（按官网频道拆分）

│   ├── Home.vue         # 官网首页（品牌展示+核心服务）

│   ├── Login.vue        # 登录页（多角色登录）

│   ├── ResourceLibrary.vue # 平台资源库

│   ├── Mall.vue         # 平台商城

│   ├── AIDesign.vue     # AI服装设计

│   ├── Trends.vue       # 流行趋势

│   ├── AboutUs.vue      # 关于我们

│   └── admin/           # 管理端页面

│       ├── ProductManagement.vue

│       ├── OrderManagement.vue

│       ├── ChannelManagement.vue

│       └── ResourceManagement.vue

├── assets/              # 静态资源

│   ├── logos/           # 品牌LOGO

│   ├── fabrics/         # 面料示例图

│   └── licenses/        # 营业执照扫描件

├── App.vue              # 应用主组件（多角色布局适配）

├── main.ts              # 应用入口（初始化3D渲染环境）

├── index.css            # 全局样式

└── env.d.ts             # 环境类型定义
```

## 核心配置文件（适配 Arco Design Vue）

### package.json 脚本配置



```
{

&#x20; "scripts": {

&#x20;   "dev": "vite",

&#x20;   "build": "vue-tsc -b && vite build",

&#x20;   "lint": "eslint . --ext .vue,.js,.ts",

&#x20;   "preview": "vite preview",

&#x20;   "check": "vue-tsc -b --noEmit",

&#x20;   "dev:3d": "vite --force"

&#x20; },

&#x20; "dependencies": {

&#x20;   "@arco-design/web-vue": "^2.55.0",

&#x20;   "@arco-design/icons-vue": "^1.4.0",

&#x20;   "vue": "^3.4.21",

&#x20;   "vue-router": "^4.4.5",

&#x20;   "pinia": "^2.2.2",

&#x20;   "three": "^0.160.0",

&#x20;   "@vue-three/fiber": "^2.1.10",

&#x20;   "fabric": "^6.7.0",

&#x20;   "axios": "^1.7.7"

&#x20; }

}
```

### vite.config.ts 配置



```
import { defineConfig } from 'vite'

import vue from '@vitejs/plugin-vue'

import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({

&#x20; plugins: \[

&#x20;   vue(),

&#x20;   tsconfigPaths()

&#x20; ],

&#x20; optimizeDeps: {

&#x20;   include: \['three', '@vue-three/fiber', 'fabric', '@arco-design/web-vue'],

&#x20;   exclude: \['@arco-design/icons-vue']

&#x20; },

&#x20; server: {

&#x20;   port: 5173,

&#x20;   proxy: {

&#x20;     '/api': {

&#x20;       target: 'https://internal.dicreate.ai',

&#x20;       changeOrigin: true,

&#x20;       rewrite: (path) => path.replace(/^\\/api/, '')

&#x20;     }

&#x20;   }

&#x20; }

})
```

### tailwind.config.js 配置（保持不变）



```
export default {

&#x20; darkMode: "class",

&#x20; content: \["./index.html", "./src/\*\*/\*.{js,ts,vue}"],

&#x20; theme: {

&#x20;   container: {

&#x20;     center: true,

&#x20;   },

&#x20;   extend: {

&#x20;     colors: {

&#x20;       fabric: {

&#x20;         light: '#f5f5f5',

&#x20;         dark: '#333333',

&#x20;         accent: '#e67e22'

&#x20;       }

&#x20;     },

&#x20;     fontFamily: {

&#x20;       fashion: \['Inter', 'sans-serif']

&#x20;     }

&#x20;   },

&#x20; },

&#x20; plugins: \[],

};
```

### tsconfig.json 配置



```
{

&#x20; "compilerOptions": {

&#x20;   "baseUrl": ".",

&#x20;   "paths": {

&#x20;     "@/\*": \["./src/\*"]

&#x20;   },

&#x20;   "skipLibCheck": true,

&#x20;   "jsx": "preserve",

&#x20;   "moduleResolution": "bundler",

&#x20;   "types": \["vue", "node"]

&#x20; },

&#x20; "include": \["src/\*\*/\*.ts", "src/\*\*/\*.d.ts", "src/\*\*/\*.tsx", "src/\*\*/\*.vue"]

}
```

## 应用架构设计（适配 Arco Design 布局）

### 主应用布局（App.vue）

#### 布局结构（基于 Arco Layout 组件）



*   **左侧可折叠导航栏（Sider）**: 使用 `<a-layout-sider>` 组件，按用户角色动态渲染菜单

*   **顶部标题栏（Header）**: 使用 `<a-layout-header>` 组件，包含品牌 LOGO + 搜索框 + 用户菜单

*   **主内容区域（Content）**: 使用 `<a-layout-content>` 组件，模块化承载各频道页面

#### 样式规范（Arco 主题适配）



```
\<template>

&#x20; \<a-layout style="min-height: 100vh">

&#x20;   \<!-- 侧边栏 -->

&#x20;   \<a-layout-sider&#x20;

&#x20;     :style="siderStyle"

&#x20;     :collapsible="true"

&#x20;     v-model:collapsed="collapsed"

&#x20;   \>

&#x20;     \<div :style="logoStyle">

&#x20;       \<span>DiCreate.AI\</span>

&#x20;     \</div>

&#x20;     \<a-menu&#x20;

&#x20;       mode="inline"&#x20;

&#x20;       :selected-keys="selectedKeys"

&#x20;       :items="menuItems"

&#x20;     />

&#x20;   \</a-layout-sider>

&#x20;  &#x20;

&#x20;   \<a-layout>

&#x20;     \<!-- 顶部导航 -->

&#x20;     \<a-layout-header :style="headerStyle">

&#x20;       \<!-- 搜索框与用户菜单 -->

&#x20;     \</a-layout-header>

&#x20;    &#x20;

&#x20;     \<!-- 主内容区 -->

&#x20;     \<a-layout-content :style="contentStyle">

&#x20;       \<router-view />

&#x20;     \</a-layout-content>

&#x20;   \</a-layout>

&#x20; \</a-layout>

\</template>

\<script setup>

const siderStyle = {

&#x20; background: '#fff',

&#x20; boxShadow: '0 0 8px rgba(0,21,41,.05)'

};

const logoStyle = {

&#x20; height: 36,

&#x20; margin: '16px',

&#x20; background: '#165DFF', // Arco 主色调

&#x20; borderRadius: 6,

&#x20; display: 'flex',

&#x20; alignItems: 'center',

&#x20; justifyContent: 'center',

&#x20; color: '#fff',

&#x20; fontWeight: 'bold',

&#x20; fontSize: 16

};

const contentStyle = {

&#x20; background: 'transparent',

&#x20; margin: '16px',

&#x20; minHeight: 'calc(100vh - 112px)'

};

\</script>
```

### 主内容区模块化布局规范

#### 3D 预览与参数配置模块示例（Arco 栅格组件）



```
\<template>

&#x20; \<a-row :gutter="\[16, 16]" class="flex-stretch">

&#x20;   \<!-- 3D预览区 -->

&#x20;   \<a-col :xs="24" :lg="16" class="flex">

&#x20;     \<a-card style="width: 100%; flex: 1; display: flex; flex-direction: column">

&#x20;       \<template #body>

&#x20;         <3DViewer :model-url="currentModel" />

&#x20;       \</template>

&#x20;     \</a-card>

&#x20;   \</a-col>

&#x20;  &#x20;

&#x20;   \<!-- 参数配置区 -->

&#x20;   \<a-col :xs="24" :lg="8" class="flex">

&#x20;     \<a-card style="width: 100%; flex: 1; display: flex; flex-direction: column">

&#x20;       \<template #body>

&#x20;         \<a-form layout="vertical">

&#x20;           \<a-form-item label="面料选择" name="fabricId">

&#x20;             \<a-select :options="fabricOptions" />

&#x20;           \</a-form-item>

&#x20;           \<a-form-item label="颜色替换" name="color">

&#x20;             \<a-color-picker />

&#x20;           \</a-form-item>

&#x20;         \</a-form>

&#x20;       \</template>

&#x20;     \</a-card>

&#x20;   \</a-col>

&#x20; \</a-row>

\</template>
```

## 页面设计规范（Arco 组件适配）

### 1. 首页（Home.vue）核心代码示例



```
\<template>

&#x20; \<div style="background: 'transparent'">

&#x20;   \<!-- 品牌Banner区 -->

&#x20;   \<a-card :style="moduleCardStyle" class="mb-4">

&#x20;     \<a-carousel autoplay>

&#x20;       \<template v-for="item in bannerList" :key="item.id">

&#x20;         \<div style="height: 400px">

&#x20;           \<img&#x20;

&#x20;             :src="item.url"&#x20;

&#x20;             :alt="item.title"&#x20;

&#x20;             style="width: 100%; height: 100%; object-fit: cover"&#x20;

&#x20;           />

&#x20;         \</div>

&#x20;       \</template>

&#x20;     \</a-carousel>

&#x20;   \</a-card>

&#x20;  &#x20;

&#x20;   \<!-- 核心服务区 -->

&#x20;   \<a-row :gutter="\[16, 16]" class="mb-4">

&#x20;     \<a-col :xs="12" :lg="6" v-for="service in serviceList" :key="service.id">

&#x20;       \<a-card :style="moduleCardStyle">

&#x20;         \<div style="textAlign: center">

&#x20;           \<component :is="service.icon" />

&#x20;           \<h3 style="fontSize: 16px; margin: '8px 0'">{{ service.title }}\</h3>

&#x20;           \<p style="color: '#8c8c8c'">{{ service.desc }}\</p>

&#x20;           \<a-button&#x20;

&#x20;             type="text"&#x20;

&#x20;             style="marginTop: 8px"

&#x20;             @click="\$router.push(service.path)"

&#x20;           \>

&#x20;             了解更多

&#x20;           \</a-button>

&#x20;         \</div>

&#x20;       \</a-card>

&#x20;     \</a-col>

&#x20;   \</a-row>

&#x20; \</div>

\</template>
```

### 2. 平台资源库（ResourceLibrary.vue）表格规范



```
\<template>

&#x20; \<a-table&#x20;

&#x20;   :columns="columns"&#x20;

&#x20;   :data="caseList"&#x20;

&#x20;   :pagination="pagination"

&#x20;   row-key="id"

&#x20; />

\</template>

\<script setup>

const columns = \[

&#x20; {

&#x20;   title: '案例名称',

&#x20;   dataIndex: 'name',

&#x20;   key: 'name',

&#x20;   align: 'center',

&#x20;   width: 180,

&#x20;   render: (text) => \<span style="fontWeight: 500">{text}\</span>

&#x20; },

&#x20; {

&#x20;   title: '所属品类',

&#x20;   dataIndex: 'category',

&#x20;   key: 'category',

&#x20;   align: 'center',

&#x20;   width: 120,

&#x20;   render: (text) => \<a-tag color="blue">{text}\</a-tag>

&#x20; },

&#x20; {

&#x20;   title: '创建时间',

&#x20;   dataIndex: 'createTime',

&#x20;   key: 'createTime',

&#x20;   align: 'center',

&#x20;   width: 160,

&#x20;   sorter: true

&#x20; },

&#x20; {

&#x20;   title: '操作',

&#x20;   key: 'action',

&#x20;   align: 'center',

&#x20;   width: 200,

&#x20;   render: (\_, record) => (

&#x20;     \<a-space size="small">

&#x20;       \<a-button&#x20;

&#x20;         type="text"&#x20;

&#x20;         icon={\<EyeOutlined />}&#x20;

&#x20;         size="small"

&#x20;         @click="viewDetail(record)"

&#x20;       \>

&#x20;         查看

&#x20;       \</a-button>

&#x20;       \<a-button&#x20;

&#x20;         type="text"&#x20;

&#x20;         icon={\<ShoppingOutlined />}&#x20;

&#x20;         size="small"

&#x20;         @click="toMall(record)"

&#x20;       \>

&#x20;         去下单

&#x20;       \</a-button>

&#x20;     \</a-space>

&#x20;   )

&#x20; }

];

\</script>
```

### 3. AI 服装设计（AIDesign.vue）交互规范



*   改款操作反馈：使用 Arco 的 `<a-spin>` 组件显示加载状态

*   操作结果提示：使用 `message.success()` / `message.error()` 替代 sonner

*   按钮状态控制：通过 `:disabled` 属性控制改款按钮禁用状态

## 样式和主题规范（Arco 主题适配）

### 颜色系统（基于 Arco 主色调调整）



| 颜色类型  | 色值                                            | 应用场景            |
| ----- | --------------------------------------------- | --------------- |
| 主色调   | #165DFF（Arco 主色）                              | 按钮、Logo、选中状态    |
| 业务辅助色 | #00B42A（成功）、#FF7D00（警告）、#F53F3F（错误）（Arco 标准色） | 订单状态、通知提示       |
| 服装行业色 | #f5f5f5（面料浅灰）、#333333（面料深灰）、#e67e22（点缀色）      | 面料库默认色、AI 设计点缀色 |
| 文字色   | #1D2129（主要）、#86909C（次要）（Arco 标准文字色）           | 标题 / 正文、辅助说明文字  |
| 背景色   | #F2F3F5（页面）、#FFFFFF（模块）（Arco 标准背景色）           | 官网整体背景、模块卡片背景   |

### 主题定制（通过 Arco Design 主题配置）



```
// main.ts

import { createApp } from 'vue'

import App from './App.vue'

import { Button, Input } from '@arco-design/web-vue'

import '@arco-design/web-vue/dist/arco.css'

// 全局配置

createApp(App)

&#x20; .use(Button, {

&#x20;   theme: {

&#x20;     colorPrimary: '#165DFF'

&#x20;   }

&#x20; })

&#x20; .use(Input, {

&#x20;   theme: {

&#x20;     borderRadius: 6

&#x20;   }

&#x20; })
```

## 数据管理规范（Pinia 状态管理）



```
// stores/designStore.ts

import { defineStore } from 'pinia'

export const useDesignStore = defineStore('design', {

&#x20; state: () => ({

&#x20;   currentStyle: null,

&#x20;   designHistory: \[]

&#x20; }),

&#x20; actions: {

&#x20;   saveDesign(design) {

&#x20;     this.designHistory.push(design)

&#x20;   },

&#x20;   setCurrentStyle(style) {

&#x20;     this.currentStyle = style

&#x20;   }

&#x20; }

})
```

## 常见问题和解决方案（Arco 适配）

### 1. 3D 渲染兼容性处理



```
\<template>

&#x20; \<div>

&#x20;   \<a-spin v-if="loading" />

&#x20;   \<template v-else-if="support3D">

&#x20;     \<three-viewer :model-url="modelUrl" />

&#x20;   \</template>

&#x20;   \<template v-else>

&#x20;     \<a-alert

&#x20;       message="当前浏览器不支持3D渲染"

&#x20;       description="请升级浏览器至最新版本"

&#x20;       type="error"

&#x20;     />

&#x20;     \<img :src="twoDUrl" alt="2D预览" />

&#x20;   \</template>

&#x20; \</div>

\</template>
```

### 2. 表单验证适配（使用 Arco Form 验证）



```
\<template>

&#x20; \<a-form&#x20;

&#x20;   :model="form"&#x20;

&#x20;   :rules="rules"&#x20;

&#x20;   ref="formRef"

&#x20;   @submit="handleSubmit"

&#x20; \>

&#x20;   \<a-form-item label="面料选择" name="fabricId">

&#x20;     \<a-select v-model:value="form.fabricId" />

&#x20;   \</a-form-item>

&#x20; \</a-form>

\</template>

\<script setup>

const rules = {

&#x20; fabricId: \[{ required: true, message: '请选择面料', trigger: 'change' }]

}

\</script>
```

## 执行指令（更新适配要求）



1.  ✅ 技术栈版本与配置完全对齐（如 Vue 3.4.21、Arco Design Vue 2.55.0）

2.  ✅ 组件命名与使用遵循 Arco Design Vue 规范（如 `<a-button>` 而非 `<Button>`）

3.  ✅ 状态管理统一使用 Pinia，替代原 Zustand 实现

4.  ✅ 表单验证、通知提示等交互完全使用 Arco 内置组件

5.  ✅ 主题色与视觉规范对齐 Arco Design 设计语言

6.  ✅ 其他业务需求（AI 渲染性能、权限控制等）保持不变

> （注：文档部分内容可能由 AI 生成）