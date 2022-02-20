const indent = require('../eslint/lib/rules/indent.js')

let createWrapper = function(context) {
  const originalCreateResult = indent.create(context)
  
  const originalProgramExit = originalCreateResult['Program:exit']
  originalCreateResult['Program:exit'] = function() {
    context
    .getSourceCode()
    .getAllComments()
    .filter(comment => comment.loc.start.column === 0)
    .forEach(comment => indent.create.offsets.ignoreToken(comment))

    originalProgramExit()
  }

  return originalCreateResult
}

module.exports = {
  rules: {
      "indent": {
        create: createWrapper,
        meta: indent.meta
      }
  },
  configs: {
    recommended: {

      plugins: ['literate-comments'],

      // Rules copied from 'standard'
      rules: {
        "indent": "off",
        "literate-comments/indent": ["error", 2, {
          "SwitchCase": 1,
          "VariableDeclarator": 1,
          "outerIIFEBody": 1,
          "MemberExpression": 1,
          "FunctionDeclaration": { "parameters": 1, "body": 1 },
          "FunctionExpression": { "parameters": 1, "body": 1 },
          "CallExpression": { "arguments": 1 },
          "ArrayExpression": 1,
          "ObjectExpression": 1,
          "ImportDeclaration": 1,
          "flatTernaryExpressions": false,
          "ignoreComments": false,
          "ignoredNodes": ["TemplateLiteral *"]
        }]
      }
    }
  }
}

