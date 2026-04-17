# NextFlow UmiJS 国际化演示项目

## 项目说明

这是一个使用 **UmiJS 4 + 内置 locale 插件 + AI 翻译** 的国际化演示网站。目的是验证：在 UmiJS 项目中，开发者只需维护中文翻译文件，英文翻译文件由 AI 自动生成，实现低成本的中英文双语网站。

### 在线访问地址

| 版本 | 地址 |
|------|------|
| **线上地址** | https://dist-one-roan-61.vercel.app |
| **GitHub 仓库** | https://github.com/bahe666/nextflow-umi-demo |

打开网站后，点击右上角的 **EN / 中文** 按钮即可切换语言。

---

## 这个项目是怎么做的

### 第一步：告诉 UmiJS "我要做多语言"

在 UmiJS 的配置文件 `.umirc.ts` 中加一行配置，启用官方的语言切换插件：

```ts
locale: {
  default: 'zh-CN',    // 默认显示中文
  useLocalStorage: true // 记住用户选择的语言
}
```

这一步相当于告诉 UmiJS："我的网站有多种语言，请帮我处理语言切换的底层逻辑。"

### 第二步：把中文文字集中写在一个文件里

不同于直接在页面代码中写死中文，我们把所有中文文字集中放在一个"翻译文件"中（`src/locales/zh-CN.ts`）：

```ts
export default {
  'home.title': '让团队协作效率提升 3 倍',
  'home.cta.primary': '免费开始使用',
  'nav.login': '登录',
  'pricing.starter.name': '基础版',
  // ... 共 68 条
};
```

每条翻译有一个"键名"（如 `home.title`）和对应的中文内容。这个文件就是中文版网站的全部文字。

### 第三步：用 AI 自动生成英文翻译文件

有了中文翻译文件后，我们把它交给 AI（Claude / GPT-4 等大语言模型），让 AI 翻译成英文，生成 `src/locales/en-US.ts`：

```ts
export default {
  'home.title': 'Boost Your Team\'s Collaboration Efficiency by 3x',
  'home.cta.primary': 'Get Started Free',
  'nav.login': 'Sign In',
  'pricing.starter.name': 'Starter',
  // ... 68 条全部自动翻译
};
```

**这一步是方案的核心价值** — 开发者不需要懂英文，也不需要找翻译，AI 直接生成高质量的英文翻译。翻译时还可以给 AI 一份"术语表"，确保品牌关键词始终翻译一致（比如"登录"永远翻译成"Sign In"而非"Log In"）。

在实际团队中，这一步会由 CI/CD 流水线自动完成 — 开发者提交代码后，系统自动检测中文翻译文件的变化，调用 AI 生成英文翻译，以 PR 的形式提交给团队审核。

### 第四步：在页面中使用翻译

页面代码中，用 `FormattedMessage` 组件来引用翻译，而不是直接写中文：

```tsx
// 传统写法（直接写中文，无法切换语言）
<h1>让团队协作效率提升 3 倍</h1>

// 国际化写法（通过键名引用翻译，可自动切换语言）
<h1><FormattedMessage id="home.title" /></h1>
```

当用户切换到英文时，`FormattedMessage` 会自动找到 `en-US.ts` 中对应的英文翻译并显示。开发者不需要写任何条件判断逻辑。

### 第五步：添加语言切换按钮

在页面上放一个按钮，调用 UmiJS 提供的 `setLocale` 函数即可切换语言：

```tsx
<button onClick={() => setLocale('en-US')}>EN</button>
<button onClick={() => setLocale('zh-CN')}>中文</button>
```

用户的选择会被保存在浏览器中，下次打开网站时自动恢复上次的语言选择。

---

## 项目文件结构

```
nextflow-umi-demo/
├── .umirc.ts                  ← UmiJS 配置文件（启用 locale 插件的地方）
├── src/
│   ├── locales/
│   │   ├── zh-CN.ts           ← 中文翻译文件（开发者维护，68 条翻译）
│   │   └── en-US.ts           ← 英文翻译文件（AI 自动生成）
│   └── pages/
│       ├── index.tsx           ← 首页
│       ├── index.module.scss   ← 首页样式
│       ├── pricing.tsx         ← 定价页
│       ├── pricing.module.scss ← 定价页样式
│       ├── register.tsx        ← 注册页
│       └── register.module.scss← 注册页样式
├── dist/                       ← 构建产物（部署到 Vercel 的内容）
└── package.json
```

### 关键文件说明

| 文件 | 谁来写 | 作用 |
|------|--------|------|
| `src/locales/zh-CN.ts` | 开发者 | 中文翻译的唯一数据源 |
| `src/locales/en-US.ts` | AI 自动生成 | 英文翻译，开发者无需手动维护 |
| `.umirc.ts` | 开发者（一次性配置） | 启用语言切换功能 |
| `src/pages/*.tsx` | 开发者 | 页面代码，使用 `FormattedMessage` 引用翻译 |

---

## 技术栈

| 技术 | 说明 |
|------|------|
| **UmiJS 4 / @umijs/max** | 阿里巴巴开源的企业级 React 框架 |
| **@umijs/plugins/locale** | UmiJS 官方国际化插件（底层为 react-intl） |
| **SASS** | CSS 样式预处理器 |
| **TypeScript** | 类型安全的 JavaScript |
| **AI 翻译** | 使用大语言模型自动生成英文翻译文件 |

---

## 本地运行

```bash
# 安装依赖
npm install

# 构建（Node.js 20 LTS 推荐）
npm run build

# 预览构建产物
npx serve dist
```

打开 http://localhost:3000 查看效果。

> 注意：UmiJS 4 的 dev 模式在 Node.js 25 上有已知兼容性问题，建议使用 Node.js 20 LTS。构建模式不受影响。

---

## 与 Lingo.dev 方案的区别

本项目是 Lingo.dev 方案在 UmiJS 上不可用后的替代验证。两者的核心区别：

| 对比 | Lingo.dev（Next.js） | 本方案（UmiJS） |
|------|---------------------|----------------|
| 开发者写代码方式 | 直接写中文，如 `<h1>登录</h1>` | 用翻译函数，如 `<FormattedMessage id="nav.login" />` |
| 翻译文件 | 不需要，构建时自动处理 | 中文文件手动维护，英文文件 AI 生成 |
| 语言切换方式 | URL 路径（`/en`） | 客户端切换（localStorage） |
| 适用框架 | 仅 Next.js 15+ | UmiJS、任何 React 项目 |

两种方案的翻译质量相同（调用同样的 AI 模型），只是开发体验上 Lingo.dev 更省事（不需要写翻译函数），而本方案更通用（不限框架）。
