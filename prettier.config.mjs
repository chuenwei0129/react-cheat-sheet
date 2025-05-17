/**
 * @type {import('prettier').Config}
 * @see https://www.prettier.cn/docs/options.html
 */

const prettierConfig = {
  // 在多行时尽可能打印尾随逗号
  trailingComma: 'all',
  // 使用单引号而不是双引号
  singleQuote: true,
  // 在语句末尾不使用分号
  semi: false,
  // 每行代码长度
  printWidth: 80,
  // 箭头函数始终使用括号包裹参数
  arrowParens: 'always',
  // 按照文件原样折行
  proseWrap: 'always',
  // 换行符使用 lf
  endOfLine: 'lf',
  // 不使用实验性的三元运算符格式化
  experimentalTernaries: false,
  // 缩进空格数
  tabWidth: 2,
  // 使用空格而不是制表符缩进
  useTabs: false,
  // 对象属性引号处理
  quoteProps: 'consistent',
  // JSX 中使用双引号
  jsxSingleQuote: false,
  // 在对象字面量中的括号之间添加空格
  bracketSpacing: true,
  // 将多行 JSX 元素的 > 放在最后一行的末尾
  bracketSameLine: false,
  // 不对 Vue 文件中的 script 和 style 标签缩进
  vueIndentScriptAndStyle: false,
  // 不强制要求 HTML 元素属性单独一行
  singleAttributePerLine: false,
}

export default prettierConfig
