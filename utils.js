const { merge } = require('webpack-merge')

const syntacticLevel = process.env.LINT_SYNTAX || 'off'
const semanticLevel = process.env.LINT_SEMANTIC || 'error'

function makeEslintrcConfig(syntacticConfig, semanticConfig) {
  const configs = [
    {
      config: syntacticConfig,
      level: syntacticLevel,
    },
    {
      config: semanticConfig,
      level: semanticLevel
    }
  ]

  return merge(configs.filter(level => level === 'error'))
}


module.exports = {
  makeEslintrcConfig
}