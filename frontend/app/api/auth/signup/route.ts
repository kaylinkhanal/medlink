import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        { msg: 'Please provide all required fields' },
        { status: 400 }
      );
    }

    // Forward request to backend
    const backendResponse = await fetch('http://localhost:5000/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    if (backendResponse.ok) {
      return NextResponse.json({ msg: 'Signup successful' }, { status: 200 });
    } else {
      const error = await backendResponse.json();
      return NextResponse.json(error, { status: backendResponse.status });
    }
  } catch (error) {
    return NextResponse.json(
      { msg: 'Server error during signup' },
      { status: 500 }
    );
  }
}