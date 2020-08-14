const { Issuer } = require('openid-client');
const cookie = require('cookie');
const URL = require('url');

const authEndpoint = process.env.OAUTH_URL;
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

const dpIssuer = new Issuer({
  authorization_endpoint: `${authEndpoint}/oauth2/authorize`,
  token_endpoint: `${authEndpoint}/oauth2/token`,
  userinfo_endpoint: `${authEndpoint}/oauth2/userInfo`,
});

const getClient = (applicationUrl = '') =>
  new dpIssuer.Client({
    client_id: clientId,
    client_secret: clientSecret,
    redirect_uris: [`${applicationUrl}/auth/callback`],
    response_types: ['code'],
  });

const getOrigin = (url) => {
  const parsed = URL.parse(url);
  return `${parsed.protocol}//${parsed.host}`;
};
const getPath = (url) => URL.parse(url).path;

exports.login = async (event) => {
  const { headers } = event;
  const referer = headers['referer'];

  return {
    statusCode: '302',
    headers: {
      Location: getClient(getOrigin(referer)).authorizationUrl({
        scope: 'email openid profile',
      }),
    },
    multiValueHeaders: {
      'Set-Cookie': [
        cookie.serialize('authReferer', referer, {
          path: '/',
          httpOnly: true,
          secure: true,
          sameSite: 'lax',
        }),
      ],
    },
  };
};

exports.callback = async (event) => {
  const { headers } = event;
  const referer = cookie.parse(headers['cookie']).authReferer;
  const origin = getOrigin(referer);

  const tokens = await getClient(origin).oauthCallback(
    `${origin}/auth/callback`,
    event.queryStringParameters
  );
  const cookieSettings = {
    maxAge: tokens.expires_in,
    sameSite: true,
    secure: true,
    path: '/',
  };

  return {
    statusCode: '302',
    headers: {
      Location: getPath(referer),
      'Cache-Control': 'no-cache="Set-Cookie"',
    },
    multiValueHeaders: {
      'Set-Cookie': [
        cookie.serialize('accessToken', tokens.access_token, {
          httpOnly: false,
          ...cookieSettings,
        }),
        cookie.serialize('refreshToken', tokens.refresh_token, {
          httpOnly: false,
          ...cookieSettings,
        }),
        // cookie.serialize('idToken', tokens.id_token, {httpOnly: true, ...cookieSettings})
      ],
    },
  };
};

exports.userInfo = async (event) => {
  const { headers } = event;
  const accessToken = (headers['Authorization'] || headers['authorization'])
    .split(/bearer/i)
    .pop()
    .trim();
  const userInfo = await getClient().userinfo(accessToken);
  return {
    statusCode: '200',
    body: JSON.stringify({
      name: [userInfo.given_name || '', userInfo.family_name || ''].join(' '),
      email: userInfo.email,
      picture: userInfo.picture,
    }),
  };
};
