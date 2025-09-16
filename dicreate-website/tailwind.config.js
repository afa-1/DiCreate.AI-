export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        // 补充服装行业辅助色（贴合业务场景）
        fabric: {
          light: '#f5f5f5', // 浅色面料色
          dark: '#333333',  // 深色面料色
          accent: '#e67e22'  // 服装点缀色（如刺绣/印花）
        }
      },
      fontFamily: {
        fashion: ['Inter', 'sans-serif'] // 服装行业通用字体
      }
    },
  },
  plugins: [],
}