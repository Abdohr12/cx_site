import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

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

    // Gmail SMTP configuration using App Password
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER || 'contactcodex.ma@gmail.com',
        pass: process.env.GMAIL_APP_PASSWORD || '',
      },
    });

    // Verify transporter is configured
    if (!process.env.GMAIL_APP_PASSWORD) {
      console.error('GMAIL_APP_PASSWORD is not set in environment variables');
      return NextResponse.json(
        { success: false, message: 'Email service not configured. Please set GMAIL_APP_PASSWORD environment variable.' },
        { status: 500 }
      );
    }

    // HTML email template
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f0f4f8; padding: 40px 20px; }
          .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,42,92,0.08); }
          .header { background: linear-gradient(135deg, #002A5C 0%, #004d8a 100%); padding: 32px 40px; text-align: center; }
          .header h1 { color: #ffffff; font-size: 24px; font-weight: 800; }
          .header p { color: rgba(255,255,255,0.8); font-size: 14px; margin-top: 8px; }
          .body { padding: 32px 40px; }
          .field { margin-bottom: 20px; padding: 16px; background: #f8fafc; border-radius: 12px; border-left: 4px solid #00B0F0; }
          .field-label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #00B0F0; margin-bottom: 6px; }
          .field-value { font-size: 15px; color: #002A5C; font-weight: 600; word-wrap: break-word; }
          .field-value a { color: #00B0F0; text-decoration: none; }
          .divider { height: 1px; background: #e0e7ef; margin: 8px 0 24px; }
          .footer { background: #f8fafc; padding: 20px 40px; text-align: center; border-top: 1px solid #e0e7ef; }
          .footer p { font-size: 12px; color: #8a96a8; }
          .badge { display: inline-block; background: #00B0F0; color: white; font-size: 10px; font-weight: 700; padding: 4px 12px; border-radius: 20px; letter-spacing: 0.5px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Nouveau Message de Contact</h1>
            <p>Vous avez reçu un nouveau message depuis le formulaire de contact Codex</p>
          </div>
          <div class="body">
            <div style="text-align: center; margin-bottom: 24px;">
              <span class="badge">NOUVEAU MESSAGE</span>
            </div>
            
            <div class="field">
              <div class="field-label">Nom complet</div>
              <div class="field-value">${escapeHtml(name)}</div>
            </div>

            <div class="field">
              <div class="field-label">Email</div>
              <div class="field-value"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></div>
            </div>

            ${phone ? `
            <div class="field">
              <div class="field-label">Téléphone</div>
              <div class="field-value"><a href="tel:${escapeHtml(phone)}">${escapeHtml(phone)}</a></div>
            </div>
            ` : ''}

            ${company ? `
            <div class="field">
              <div class="field-label">Entreprise</div>
              <div class="field-value">${escapeHtml(company)}</div>
            </div>
            ` : ''}

            <div class="field" style="border-left-color: #002A5C;">
              <div class="field-label" style="color: #002A5C;">Message</div>
              <div class="field-value" style="white-space: pre-wrap; line-height: 1.7;">${escapeHtml(message)}</div>
            </div>
          </div>
          <div class="footer">
            <p>Ce message a été envoyé automatiquement depuis le formulaire de contact du site Codex.</p>
            <p style="margin-top: 4px; color: #a0aab8;">Codex &copy; ${new Date().getFullYear()} - Agence de Programmation</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send email
    await transporter.sendMail({
      from: `"Codex Website" <${process.env.GMAIL_USER || 'contactcodex.ma@gmail.com'}>`,
      to: 'contactcodex.ma@gmail.com',
      replyTo: email,
      subject: `[Codex Contact] Nouveau message de ${name}`,
      html: htmlContent,
      text: `Nouveau message de contact Codex\n\nNom: ${name}\nEmail: ${email}\nTéléphone: ${phone || 'Non renseigné'}\nEntreprise: ${company || 'Non renseigné'}\n\nMessage:\n${message}`,
    });

    return NextResponse.json({ success: true, message: 'Email sent successfully' });
  } catch (error: unknown) {
    console.error('Contact form error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, message: `Failed to send email: ${errorMessage}` },
      { status: 500 }
    );
  }
}

// Helper function to prevent XSS in email content
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}
