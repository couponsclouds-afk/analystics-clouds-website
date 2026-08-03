import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface ContactPayload {
  name: string;
  email: string;
  phone: string;
  subject: string;
  service: string;
  message: string;
}

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function ownerNotificationHtml(data: ContactPayload) {
  const rows: [string, string][] = [
    ['Name', data.name],
    ['Email', data.email],
    ['Phone', data.phone],
    ['Looking For', data.service],
    ['Subject', data.subject],
  ];

  const rowsHtml = rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:10px 16px;font-size:12px;font-weight:700;color:#8b8fa3;text-transform:uppercase;letter-spacing:0.04em;white-space:nowrap;border-bottom:1px solid #f0f0f5;">${escapeHtml(label)}</td>
          <td style="padding:10px 16px;font-size:14px;color:#303360;font-weight:600;border-bottom:1px solid #f0f0f5;">${escapeHtml(value) || '-'}</td>
        </tr>`
    )
    .join('');

  return `
  <div style="background:#F5F5FA;padding:32px 16px;font-family:Arial,Helvetica,sans-serif;">
    <table role="presentation" width="100%" style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #eeeeee;">
      <tr>
        <td style="background:#303360;padding:24px 32px;">
          <span style="color:#FE7146;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;">Analytics Clouds</span>
          <h1 style="margin:6px 0 0;color:#ffffff;font-size:20px;font-weight:800;">New Contact Form Submission</h1>
        </td>
      </tr>
      <tr>
        <td style="padding:24px 32px 8px;">
          <p style="margin:0 0 16px;font-size:14px;color:#333333;">You've received a new inquiry from the website contact form.</p>
          <table role="presentation" width="100%" style="border-collapse:collapse;">
            ${rowsHtml}
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding:16px 32px 28px;">
          <p style="margin:0 0 6px;font-size:12px;font-weight:700;color:#8b8fa3;text-transform:uppercase;letter-spacing:0.04em;">Message</p>
          <p style="margin:0;font-size:14px;line-height:1.6;color:#333333;background:#F5F5FA;border-radius:12px;padding:14px 16px;white-space:pre-wrap;">${escapeHtml(data.message) || 'No additional message provided.'}</p>
        </td>
      </tr>
    </table>
  </div>`;
}

function userConfirmationHtml(data: ContactPayload) {
  return `
  <div style="background:#F5F5FA;padding:32px 16px;font-family:Arial,Helvetica,sans-serif;">
    <table role="presentation" width="100%" style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #eeeeee;">
      <tr>
        <td style="background:#303360;padding:24px 32px;">
          <span style="color:#FE7146;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;">Analytics Clouds</span>
          <h1 style="margin:6px 0 0;color:#ffffff;font-size:20px;font-weight:800;">Message Received!</h1>
        </td>
      </tr>
      <tr>
        <td style="padding:28px 32px;">
          <p style="margin:0 0 14px;font-size:14px;line-height:1.6;color:#333333;">
            Hi ${escapeHtml(data.name)},
          </p>
          <p style="margin:0 0 14px;font-size:14px;line-height:1.6;color:#333333;">
            Thank you for reaching out to Analytics Clouds regarding "<strong style="color:#303360;">${escapeHtml(data.subject)}</strong>". Our team has received your details and will get back to you at <strong style="color:#303360;">${escapeHtml(data.email)}</strong> within 2 hours.
          </p>
          <p style="margin:0 0 20px;font-size:14px;line-height:1.6;color:#333333;">
            In the meantime, if you have anything urgent to add, feel free to reply directly to this email or call us at
            <a href="tel:+919997969967" style="color:#FE7146;text-decoration:none;font-weight:700;">+91 99979 69967</a>.
          </p>
          <p style="margin:0;font-size:13px;color:#8b8fa3;">— The Analytics Clouds Team</p>
        </td>
      </tr>
      <tr>
        <td style="background:#F5F5FA;padding:16px 32px;text-align:center;">
          <p style="margin:0;font-size:11px;color:#8b8fa3;">Analytics Clouds &middot; B-101, Tower-B, Noida One, Sector 62, Noida - 201309</p>
        </td>
      </tr>
    </table>
  </div>`;
}

export async function POST(request: Request) {
  let payload: ContactPayload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request body.' }, { status: 400 });
  }

  const { name, email, phone, subject, service, message } = payload;

  if (!name?.trim() || !email?.trim() || !validateEmail(email) || !phone?.trim() || !subject?.trim()) {
    return NextResponse.json({ success: false, error: 'Missing or invalid required fields.' }, { status: 400 });
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASSWORD, SMTP_FROM, CONTACT_TO_EMAIL } = process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASSWORD || !SMTP_FROM || !CONTACT_TO_EMAIL) {
    console.error('Contact form: missing SMTP configuration in environment variables.');
    return NextResponse.json({ success: false, error: 'Email service is not configured.' }, { status: 500 });
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: SMTP_SECURE === 'true',
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASSWORD,
    },
  });

  const data: ContactPayload = { name, email, phone, subject, service, message };

  try {
    await transporter.sendMail({
      from: SMTP_FROM,
      to: CONTACT_TO_EMAIL,
      replyTo: email,
      subject: `New Contact Form Submission: ${subject}`,
      html: ownerNotificationHtml(data),
    });
  } catch (err) {
    console.error('Contact form: failed to send owner notification email.', err);
    return NextResponse.json({ success: false, error: 'Failed to send your message. Please try again later.' }, { status: 500 });
  }

  try {
    await transporter.sendMail({
      from: SMTP_FROM,
      to: email,
      subject: `We've received your message, ${name}!`,
      html: userConfirmationHtml(data),
    });
  } catch (err) {
    console.error('Contact form: failed to send user confirmation email (owner was still notified).', err);
  }

  return NextResponse.json({ success: true });
}
