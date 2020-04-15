import hapiJwt from 'hapi-auth-jwt2';
import jwksRsa from 'jwks-rsa';

/*
{
    id: '',
    email: '',
    displayName: ''
    scope: 'admin',
    iat: 1480563674,
    exp: 1481168474
}
*/
// const validate = async (decoded, request, callback) => callback(null, true);
const validate = async (decoded) => {
  return {
    isValid: true,
    credentials: decoded,
  };
};

const plugin = {
  pkg: {
    name: 'auth',
    version: '0.0.1',
  },
  register: async (server) => {
    await server.register(hapiJwt);

    server.auth.strategy('jwt', 'jwt', {
      complete: true,
      validate,
      key: jwksRsa.hapiJwt2KeyAsync({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
      }),
      verifyOptions: {
        issuer: `https://${process.env.AUTH0_DOMAIN}/`,
        algorithms: ['RS256'],
      },
    });

    server.auth.default('jwt');
  }
};

export default plugin;