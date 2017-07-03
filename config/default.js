module.exports = {
  app: {
    name: 'time_tracker',
    description: 'Time tracker for tasks'
  },
  loglevel: 'error',
  db: {
    name: 'time_tracker',
    user: 'postgres',
    pass: 'pass',
    settings: {
      host: 'localhost',
      port: 5432,
      dialect: 'postgres',
      pool: {
        max: 5,
        min: 0,
        idle: 10000
      }
    }
  }
};