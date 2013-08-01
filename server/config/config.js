var path = require('path')
  , distFolder = path.normalize(__dirname + '../client/dist');

module.exports = {
  development: {
    db: 'mongodb://localhost:27017/appoyntmedb',
    session: {
      secret: 'skZ!@@VVMja6*KJlFksl%j6m'
    },
    server: {
        distFolder: distFolder,
        listenPort: 3000,
        securePort: 8433,
        staticUrl: '/static'
    }
  },
  production: {
    db: process.env.MONGOLAB_URI || process.env.MONGOHQ_URL,
    session: {
      cookieSecret: 'skZ!@@VVMja6*KJlFksl%j6m'
    },
    longPolling: true,
    server: {
        distFolder: distFolder,
        listenPort: process.env.PORT,
        securePort: 8433,
        staticUrl: '/static'
    }
  },
}