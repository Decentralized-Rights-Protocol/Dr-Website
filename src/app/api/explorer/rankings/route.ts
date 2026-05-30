import { createProxyRoute } from '@/lib/api/proxy';

export const dynamic = 'force-dynamic';

export const GET = createProxyRoute({
  pathPrefix: '/api/status/rankings',
});
