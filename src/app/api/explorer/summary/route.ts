import { createProxyRoute } from '@/lib/api/proxy';

export const GET = createProxyRoute({
  pathPrefix: '/api/ai/summary',
});
