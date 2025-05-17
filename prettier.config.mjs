/**
 * @type {import('prettier').Config}
 * @see https://www.prettier.cn/docs/options.html
 */

// Prettier 默认会忽略 node_modules
const prettierConfig = {
  singleQuote: true,
  semi: false,
  printWidth: 80,
  plugins: ['prettier-plugin-organize-imports', 'prettier-plugin-tailwindcss'],
}

export default prettierConfig
