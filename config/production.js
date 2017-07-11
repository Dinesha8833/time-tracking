module.exports = {
  db: {
    name: 'dd6h4jsht580vj',
    user: 'pfsyuiifhrnymq',
    pass: '78a035474dd0241353c1e69b077eec8cedf95c10ace3168c5e3eeeaf3e3f1752',
    settings: {
      host: 'ec2-23-23-248-162.compute-1.amazonaws.com',
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
    callbackURL: "https://gentle-sands-75649.herokuapp.com/auth/facebook/callback"
  }
}