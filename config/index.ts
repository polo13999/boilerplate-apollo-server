
interface configType { production: boolean, origin: any, cookieKey: string, secret: string }
let config: configType

switch (process.env.NODE_ENV) {
  case 'production':
    config = {
      production: false,
      origin: ["http://localhost:3000", "http://localhost"],
      cookieKey: '123',
      secret: '123'
    }
    break
  default:
    config = {
      production: false,
      origin: ['http://192.168.0.10', 'http://localhost', 'http://localhost:8081', 'http://localhost:8082'],
      cookieKey: '123',
      secret: '123'
    }

}


export default config