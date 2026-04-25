import { createProxyRoute } from '@/lib/api/proxy';

export const GET = createProxyRoute({
  pathPrefix: '/api/v1/explorer/elders',
});
