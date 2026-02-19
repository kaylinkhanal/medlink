import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { msg: 'Please provide email and password' },
        { status: 400 }
      );
    }

    // Forward request to backend
    const backendResponse = await fetch('http://localhost:5000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (backendResponse.ok) {
      const data = await backendResponse.json();
      return NextResponse.json(data, { status: 200 });
    } else {
      const error = await backendResponse.json();
      return NextResponse.json(error, { status: backendResponse.status });
    }
  } catch (error) {
    return NextResponse.json(
      { msg: 'Server error during login' },
      { status: 500 }
    );
  }
}