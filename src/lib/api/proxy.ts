import { NextResponse } from 'next/server';

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

interface ProxyOptions {
  pathPrefix: string; // The prefix to prepend to the incoming request path for the external API
}

export function createProxyRoute({ pathPrefix }: ProxyOptions) {
  return async function GET(request: Request) {
    const { pathname, searchParams } = new URL(request.url);
    const query = searchParams.toString();

    // Construct the external API URL
    const externalApiPath = `${pathPrefix}${query ? `?${query}` : ''}`;
    const apiUrl = `${NEXT_PUBLIC_API_URL}${externalApiPath}`;

    try {
      const response = await fetch(apiUrl, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        return new NextResponse(errorText, { status: response.status });
      }

      const data = await response.json();
      return NextResponse.json(data);
    } catch (error: any) {
      return new NextResponse('Internal Server Error: ' + error.message, { status: 500 });
    }
  };
}
