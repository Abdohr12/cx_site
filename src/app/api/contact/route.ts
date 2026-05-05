import { NextRequest, NextResponse } from 'next/server';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mlgzbdgp';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, company, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    // Forward to Formspree — all fields will be sent as form data
    // Formspree uses field names to build the email
    const formData = new URLSearchParams();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('_replyto', email);
    if (phone) formData.append('phone', phone);
    if (company) formData.append('company', company);
    formData.append('message', message);
    formData.append('_subject', `[Codex Contact] Nouveau message de ${name}`);

    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
      },
      body: formData.toString(),
    });

    const data = await response.json();

    if (response.ok && data.ok) {
      return NextResponse.json({ success: true, message: 'Email sent successfully' });
    } else {
      console.error('Formspree error:', data);
      return NextResponse.json(
        { success: false, message: data.error || 'Failed to send message' },
        { status: response.status }
      );
    }
  } catch (error: unknown) {
    console.error('Contact form error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, message: `Server error: ${errorMessage}` },
      { status: 500 }
    );
  }
}
