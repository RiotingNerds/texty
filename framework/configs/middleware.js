module.exports = {
  middleware: {
    'logger': require('morgan')('dev'),
    'cookie': require('cookie-parser')(),
    'adminView':  require('../middlewares/templateView')
  },
  order: [
    'logger',
    'cookie',
    'adminView'
  ]
}