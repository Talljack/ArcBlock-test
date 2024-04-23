// @ts-check
import createEslintConfig from 'talljack-eslint-config'

export default createEslintConfig({
  react: true,
  typescript: true,
  formatters: true,
  rules: {
    'no-console': 'warn',
    'react-hooks/exhaustive-deps': 'off',
  },
})
