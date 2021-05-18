module.exports = {
  env: { API_URL: process.env.API_URL },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/signin',
        permanent: true,
      },
    ];
  },
};
