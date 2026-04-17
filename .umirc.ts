import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: "/", component: "index" },
    { path: "/pricing", component: "pricing" },
    { path: "/register", component: "register" },
  ],
  sassLoader: {},
  locale: {
    default: "zh-CN",
    baseSeparator: "-",
    antd: false,
    baseNavigator: true,
    useLocalStorage: true,
  },
});
