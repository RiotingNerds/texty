module.exports.http = {
  port:1337,
  staticPath:'www',
  middleware: {
    'logger': require('morgan')('dev'),
    'cookie': require('cookie-parser')(),
    'layout':  require('../middlewares/layout'),
    'state': require('../middlewares/reduxState'),
    'stateRoute':require('../middlewares/stateRoute'),
    'commonState':require('../middlewares/header'),
    'bodyParserJson': require('body-parser').json(),
    'urlencoded': require('body-parser').urlencoded({ extended: false }),
    'api':require('../middlewares/api'),
  },
  order: [
    'logger',
    'bodyParserJson',
    'urlencoded',
    'cookie',
    {route:"/api/*",middleware:'api'},
    'layout',
    'state',
    'commonState'
  ]
}
