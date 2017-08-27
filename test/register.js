require('babel-register')({
  presets: [
    ['env', {
      targets: {
        node: 'current'
      }
    }]
  ],
  plugins: [
    'transform-async-generator-functions'
  ]
})

require('babel-polyfill')
