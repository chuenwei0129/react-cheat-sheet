import path from 'node:path'

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' --file ')}`

const buildPrettierCommand = (filenames) =>
  `prettier --write ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' ')}`

/**
 * @type {import('lint-staged').Config}
 * @see https://github.com/okonet/lint-staged#configuration
 */

const lintStagedConfig = {
  '*.{js,jsx,ts,tsx,mjs,json,md}': [buildEslintCommand, buildPrettierCommand],
}

export default lintStagedConfig
