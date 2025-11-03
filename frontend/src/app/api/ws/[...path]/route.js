import { NextResponse } from 'next/server';

// WebSocket proxy configuration for Kanopy
// Returns the correct WebSocket URL based on environment
export async function GET(request, { params }) {
  const pathSegments = params.path || [];
  const pathString = Array.isArray(pathSegments) ? pathSegments.join('/') : pathSegments;

  // Determine WebSocket URL based on environment
  let backendWsUrl;

  if (process.env.INTERNAL_WS_URL) {
    // Use internal WebSocket URL if available (Kanopy)
    backendWsUrl = process.env.INTERNAL_WS_URL;
  } else if (process.env.INTERNAL_API_URL) {
    // Convert internal API URL to WebSocket URL
    backendWsUrl = process.env.INTERNAL_API_URL.replace('http://', 'ws://').replace('https://', 'wss://');
  } else if (process.env.NEXT_PUBLIC_BACKEND_URL) {
    // Convert public backend URL to WebSocket URL
    backendWsUrl = process.env.NEXT_PUBLIC_BACKEND_URL.replace('http://', 'ws://').replace('https://', 'wss://');
  } else {
    // Default for local development
    backendWsUrl = 'ws://localhost:8000';
  }

  // Build the complete WebSocket URL
  const wsUrl = `${backendWsUrl}/ws/${pathString}`;

  console.log(`[WS Proxy] WebSocket URL for path '${pathString}': ${wsUrl}`);

  return NextResponse.json({
    wsUrl: wsUrl,
    path: pathString,
    message: 'WebSocket proxy endpoint - use wsUrl for WebSocket connection'
  });
}