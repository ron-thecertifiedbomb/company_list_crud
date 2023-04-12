import { createProxyMiddleware } from 'http-proxy-middleware';

export default function setupProxy(app) {
  if (app) {
    app.use(
      '/api',
      createProxyMiddleware({ target: 'https://jhayrftpnew.bsite.net', changeOrigin: true })
    );
  }
}
