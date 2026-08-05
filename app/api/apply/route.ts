import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface ApplyPayload {
  role: string;
  name: string;
  email: string;
  phone: string;
  resumeUrl: string;
  experience: string;
  portfolio: string;
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

function ownerNotificationHtml(data: ApplyPayload) {
  const rows: [string, string][] = [
    ['Role Applied For', data.role],
    ['Name', data.name],
    ['Email', data.email],
    ['Phone', data.phone],
    ['Experience', data.experience],
    ['Resume Link', data.resumeUrl],
    ['Portfolio / LinkedIn', data.portfolio],
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
          <h1 style="margin:6px 0 0;color:#ffffff;font-size:20px;font-weight:800;">New Job Application</h1>
        </td>
      </tr>
      <tr>
        <td style="padding:24px 32px 8px;">
          <p style="margin:0 0 16px;font-size:14px;color:#333333;">You've received a new application via the Careers page.</p>
          <table role="presentation" width="100%" style="border-collapse:collapse;">
            ${rowsHtml}
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding:16px 32px 28px;">
          <p style="margin:0 0 6px;font-size:12px;font-weight:700;color:#8b8fa3;text-transform:uppercase;letter-spacing:0.04em;">Cover Note</p>
          <p style="margin:0;font-size:14px;line-height:1.6;color:#333333;background:#F5F5FA;border-radius:12px;padding:14px 16px;white-space:pre-wrap;">${escapeHtml(data.message) || 'No cover note provided.'}</p>
        </td>
      </tr>
    </table>
  </div>`;
}

function userConfirmationHtml(data: ApplyPayload) {
  return `
  <div style="background:#F5F5FA;padding:32px 16px;font-family:Arial,Helvetica,sans-serif;">
    <table role="presentation" width="100%" style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #eeeeee;">
      <tr>
        <td style="background:#303360;padding:24px 32px;">
          <span style="color:#FE7146;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;">Analytics Clouds</span>
          <h1 style="margin:6px 0 0;color:#ffffff;font-size:20px;font-weight:800;">Application Received!</h1>
        </td>
      </tr>
      <tr>
        <td style="padding:28px 32px;">
          <p style="margin:0 0 14px;font-size:14px;line-height:1.6;color:#333333;">
            Hi ${escapeHtml(data.name)},
          </p>
          <p style="margin:0 0 14px;font-size:14px;line-height:1.6;color:#333333;">
            Thank you for applying for the <strong style="color:#303360;">${escapeHtml(data.role)}</strong> role at Analytics Clouds. Our Noida Talent Acquisition team has received your details and will review your profile and reach out at <strong style="color:#303360;">${escapeHtml(data.email)}</strong> within 3 business days.
          </p>
          <p style="margin:0 0 20px;font-size:14px;line-height:1.6;color:#333333;">
            If you have anything to add, feel free to reply directly to this email or call us at
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
  let payload: ApplyPayload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request body.' }, { status: 400 });
  }

  const { role, name, email, phone, resumeUrl, experience, portfolio, message } = payload;

  if (!name?.trim() || !email?.trim() || !validateEmail(email) || !phone?.trim() || !role?.trim()) {
    return NextResponse.json({ success: false, error: 'Missing or invalid required fields.' }, { status: 400 });
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASSWORD, SMTP_FROM, CONTACT_TO_EMAIL } = process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASSWORD || !SMTP_FROM || !CONTACT_TO_EMAIL) {
    console.error('Apply form: missing SMTP configuration in environment variables.');
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

  const data: ApplyPayload = { role, name, email, phone, resumeUrl, experience, portfolio, message };

  try {
    await transporter.sendMail({
      from: SMTP_FROM,
      to: CONTACT_TO_EMAIL,
      replyTo: email,
      subject: `New Job Application: ${role} — ${name}`,
      html: ownerNotificationHtml(data),
    });
  } catch (err) {
    console.error('Apply form: failed to send owner notification email.', err);
    return NextResponse.json({ success: false, error: 'Failed to submit your application. Please try again later.' }, { status: 500 });
  }

  try {
    await transporter.sendMail({
      from: SMTP_FROM,
      to: email,
      subject: `We've received your application, ${name}!`,
      html: userConfirmationHtml(data),
    });
  } catch (err) {
    console.error('Apply form: failed to send user confirmation email (owner was still notified).', err);
  }

  return NextResponse.json({ success: true });
}
