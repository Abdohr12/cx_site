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

    // Try FormSubmit as primary
    try {
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
      }
    } catch {
      // FormSubmit failed, continue
    }

    // Fallback: try EmailJS
    try {
      const emailRes = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id: 'default',
          template_id: 'default',
          user_id: 'default',
          template_params: {
            to_email: 'contactcodex.ma@gmail.com',
            from_name: name,
            from_email: email,
            phone: phone || 'N/A',
            company: company || 'N/A',
            message,
          },
        }),
      });
      if (emailRes.ok) {
        return NextResponse.json({ success: true });
      }
    } catch {
      // EmailJS also failed
    }

    // Both failed - return error with mailto hint
    return NextResponse.json(
      { success: false, message: 'Server error', useMailto: true },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { success: false, message: 'Server error', useMailto: true },
      { status: 200 }
    );
  }
}
