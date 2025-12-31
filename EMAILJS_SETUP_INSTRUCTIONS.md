# EmailJS Setup Instructions

## Current Configuration

Your Contact form is configured with:
- **Service ID**: `service_pw4xaaw`
- **Template ID**: `template_w8wy7ug`

## Steps to Complete Setup

### 1. Get Your Public Key

1. Go to [EmailJS Dashboard](https://dashboard.emailjs.com/)
2. Navigate to **Account** → **General**
3. Find your **Public Key** (also called User ID)
4. Copy it

### 2. Update the Code

Open `src/components/Contact.jsx` and replace:
```javascript
'YOUR_PUBLIC_KEY' // Replace with your EmailJS public key
```

With your actual public key:
```javascript
'your_actual_public_key_here'
```

### 3. Setup EmailJS Template

1. Log into [EmailJS Dashboard](https://dashboard.emailjs.com/)
2. Go to **Email Templates**
3. Find or create template with ID: `template_w8wy7ug`
4. Copy the content from `emailjs-template.html` into the template editor
5. Make sure these template variables are configured:
   - `{{name}}` - Sender's name
   - `{{email}}` - Sender's email
   - `{{message}}` - The message content

### 4. Template Variables

Your form sends these fields:
- **name**: From the "Your Name" input
- **email**: From the "Your Email" input
- **message**: From the "Message" textarea

These will automatically populate the template variables.

### 5. Email Service Connection

1. In EmailJS Dashboard, go to **Email Services**
2. Make sure `service_pw4xaaw` is connected to your email provider (Gmail, Outlook, etc.)
3. Test the connection

### 6. Test Your Form

1. Fill out the contact form on your website
2. Submit it
3. Check your email (the one connected to EmailJS service)
4. You should receive a beautifully formatted email!

## Template Features

The included template (`emailjs-template.html`) provides:
- ✨ Modern, professional design
- 📱 Mobile-responsive layout
- 🎨 Gradient header with your branding
- 📋 Clean sender information display
- 💬 Well-formatted message section
- 🔗 Quick reply button
- 👤 Your contact info in footer

## Troubleshooting

### Form not sending?
- Check console for errors
- Verify your public key is correct
- Make sure EmailJS service is active

### Not receiving emails?
- Check spam/junk folder
- Verify email service connection in EmailJS dashboard
- Ensure template ID matches

### Template not formatting correctly?
- Use the HTML provided in `emailjs-template.html`
- Don't modify variable names: `{{name}}`, `{{email}}`, `{{message}}`

## Additional Customization

### Change Email Recipient
In EmailJS dashboard, you can set where emails should be sent:
- Go to your email service settings
- Update the recipient email address

### Modify Template Design
Edit `emailjs-template.html` and update the template in EmailJS dashboard:
- Colors, fonts, layout can all be customized
- Just keep the template variables intact: `{{name}}`, `{{email}}`, `{{message}}`

## Important Notes

- 🔒 Never commit your public key to public repositories if using rate limits
- 📧 Free tier: 200 emails/month
- ⚡ Emails typically arrive within seconds
- 🎯 Check EmailJS dashboard for delivery statistics

---

**Need Help?**
- [EmailJS Documentation](https://www.emailjs.com/docs/)
- [EmailJS Support](https://www.emailjs.com/docs/support/)
