import { NextResponse } from 'next/server';

// API proxy to bypass Kanopy SSO issues and enable internal service communication
export async function GET(request, { params }) {
  return handleRequest(request, params, 'GET');
}

export async function POST(request, { params }) {
  return handleRequest(request, params, 'POST');
}

export async function PUT(request, { params }) {
  return handleRequest(request, params, 'PUT');
}

export async function DELETE(request, { params }) {
  return handleRequest(request, params, 'DELETE');
}

export async function PATCH(request, { params }) {
  return handleRequest(request, params, 'PATCH');
}

async function handleRequest(request, params, method) {
  const pathSegments = params.path || [];
  const pathString = Array.isArray(pathSegments) ? pathSegments.join('/') : pathSegments;

  // Use internal service URL in Kanopy, fallback to other options
  const backendUrl = process.env.INTERNAL_API_URL ||
                     process.env.NEXT_PUBLIC_BACKEND_URL ||
                     'http://localhost:8080';

  const targetUrl = `${backendUrl}/${pathString}`;

  console.log(`[API Proxy] ${method} ${targetUrl}`);

  try {
    const headers = {
      'Content-Type': 'application/json',
    };

    // Forward specific headers from the original request if needed
    const forwardHeaders = ['authorization', 'x-api-key'];
    forwardHeaders.forEach(header => {
      const value = request.headers.get(header);
      if (value) {
        headers[header] = value;
      }
    });

    let body = undefined;
    if (method !== 'GET' && method !== 'DELETE') {
      try {
        body = await request.json();
      } catch (e) {
        // Body might be empty or not JSON
        console.log('[API Proxy] No JSON body or empty body');
      }
    }

    const response = await fetch(targetUrl, {
      method: method,
      headers: headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    const data = await response.text();
    let jsonData;

    try {
      jsonData = JSON.parse(data);
    } catch (e) {
      // Response might not be JSON
      console.error('[API Proxy] Response is not JSON:', data);
      return new NextResponse(data, {
        status: response.status,
        headers: {
          'Content-Type': response.headers.get('content-type') || 'text/plain',
        },
      });
    }

    return NextResponse.json(jsonData, {
      status: response.status,
    });
  } catch (error) {
    console.error('[API Proxy] Backend communication error:', error);
    return NextResponse.json(
      {
        error: 'Backend communication failed',
        details: error.message,
        backendUrl: backendUrl,
        path: pathString
      },
      { status: 500 }
    );
  }
}