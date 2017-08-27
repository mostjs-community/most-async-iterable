require('babel-register')({
  plugins: [
    'transform-async-generator-functions',
    'transform-es2015-modules-commonjs'
  ]
})

require('babel-polyfill')
