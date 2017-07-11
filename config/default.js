module.exports = {
  app: {
    name: 'time_tracker',
    description: 'Time tracker for tasks'
  },
  port: process.env.PORT || 3000,
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
  },
  fb: {
    clientID: "336550850115669",
    clientSecret: "285c1ccb41ccbc6cdecf44bad22d8ec8",
    callbackURL: "http://localhost:3000/auth/facebook/callback"
  }
};