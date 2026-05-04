import { NextRequest, NextResponse } from 'next/server';

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

    const response = await fetch('https://formsubmit.co/ajax/contactcodex.ma@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        phone: phone || 'Non renseigné',
        company: company || 'Non renseigné',
        message,
        _subject: `Nouveau message de ${name} - Codex Contact`,
        _captcha: 'false',
        _template: 'box',
        _replyto: email,
      }),
    });

    const result = await response.json();

    if (result.success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { success: false, message: result.message || 'Failed to send message. Try the Email button.' },
        { status: 500 }
      );
    }
  } catch (err) {
    console.error('Contact form error:', err);
    return NextResponse.json(
      { success: false, message: 'Server error. Please use the Email button to send your message directly.' },
      { status: 500 }
    );
  }
}
