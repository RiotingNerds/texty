module.exports = {
  middleware: {
    'logger': require('morgan')('dev'),
    'cookie': require('cookie-parser')(),
    'adminView':  require('../middlewares/templateView'),
    'layout':  require('../middlewares/layout')
  },
  order: [
    'logger',
    'cookie',
    'adminView',
    'layout',
  ]
}