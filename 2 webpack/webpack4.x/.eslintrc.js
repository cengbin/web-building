// https://eslint.org/docs/user-guide/configuring
module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  plugins: [],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-useless-constructor':'off',
    "no-new": "off"
  },
  globals: {
    'Phaser': true,
    'VConsole': true,
    'VKEvent': true,
    'TweenMax': true,
    'TimelineMax': true,
    'Power0': true,
    'Power1': true,
    'Power2': true,
    'Power3': true,
    'Power4': true,
    'Back': true,
    'Elastic': true,
    'Strong': true
  }
}
