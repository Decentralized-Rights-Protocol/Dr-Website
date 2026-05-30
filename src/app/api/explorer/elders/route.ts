import { createProxyRoute } from '@/lib/api/proxy';

export const dynamic = 'force-dynamic';

export const GET = createProxyRoute({
  pathPrefix: '/api/v1/explorer/elders',
});
