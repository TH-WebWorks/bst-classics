# 📧 EmailJS Setup Guide for BST Classics

This guide will walk you through setting up EmailJS to handle contact form submissions on the BST Classics website.

## 🎯 What is EmailJS?

EmailJS allows you to send emails directly from your website's contact form **without needing a server**. Perfect for static websites hosted on GitHub Pages!

## 📧 Professional Email Templates

The website includes professional email templates that match BST's branding:

- **`email-templates/bst-contact-form.html`** - Professional HTML email for business
- **`email-templates/customer-confirmation.html`** - Professional HTML auto-reply for customers
- **`email-templates/simple-templates.txt`** - Simple text versions (easier setup)

**HTML Templates Feature:**
- **BST brand colors** (black, red, white)
- **Professional layout** with organized sections
- **Mobile-responsive** design
- **Action buttons** for easy customer contact
- **Complete customer information** display

**Text Templates Feature:**
- **Quick setup** - just copy and paste
- **Works everywhere** - all email clients supported
- **Clean formatting** - professional appearance
- **Easy to customize** - simple text editing

## 🚀 Setup Steps

### 1. Create EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Click **"Sign Up"** 
3. Create a free account (up to 200 emails/month)
4. Verify your email address

### 2. Add Email Service

1. **Login to EmailJS Dashboard**
2. Click **"Add New Service"**
3. Choose your email provider:
   - **Gmail** (recommended for ease)
   - **Outlook**
   - **Yahoo**
   - **Custom SMTP**

4. **For Gmail Setup:**
   - Click "Gmail"
   - Click "Connect Account" 
   - Login with your Gmail account
   - Allow EmailJS permissions
   - Give your service a name (e.g., "BST Contact Form")

### 3. Create Email Template

1. **Go to "Email Templates"** in dashboard
2. Click **"Create New Template"**
3. **Template Settings:**
   - **Template Name**: `bst_contact_form`
   - **Template ID**: `bst_contact_form` (you'll need this)

4. **Email Template Content:**

**Option A: Simple Text Template (Quick Setup)**
```
Subject: New Contact Form Submission - BST Classics

From: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}

Vehicle Information:
Year: {{vehicle_year}}
Make: {{vehicle_make}} 
Model: {{vehicle_model}}
Project Type: {{project_type}}

Message:
{{message}}

---
This message was sent from the BST Classics website contact form.
Reply directly to this email to respond to the customer.
```

**Option B: Professional HTML Template (Recommended)**
- Copy the content from `email-templates/bst-contact-form.html`
- Paste into the EmailJS template editor
- This gives you a beautifully styled email that matches your brand

5. **Test Settings:**
   - **To Email**: Your business email (where you want to receive messages)
   - **From Name**: `{{from_name}}`
   - **Reply To**: `{{from_email}}`

6. **Switch to HTML mode** (if using HTML template):
   - Click the **"HTML"** tab in the template editor
   - Paste your HTML template content
   - Preview to ensure it looks correct

7. Click **"Save"**

### 4. Get Your Credentials

You'll need these three pieces of information:

1. **Public Key** (from Account settings)
2. **Service ID** (from your email service)  
3. **Template ID** (from your template)

**To Find Them:**
- **Public Key**: Account → General → Public Key
- **Service ID**: Services → Your Service → Service ID
- **Template ID**: Templates → Your Template → Template ID

### 5. Update Website Code

1. **Open `contact.html`** in your code editor

2. **Find these lines** (around line 294):
```javascript
emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your actual public key
```

```javascript
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
```

3. **Replace with your actual credentials:**
```javascript
emailjs.init("your_actual_public_key_here");
```

```javascript
emailjs.send('your_service_id_here', 'your_template_id_here', templateParams)
```

### 6. Test the Form

1. **Save your changes**
2. **Upload to GitHub** (or test locally)
3. **Fill out the contact form** on your website
4. **Submit the form**
5. **Check your email** for the message

## 🎨 Email Template Customization

### Advanced Template Example:

```html
Subject: 🚗 New Project Inquiry - {{project_type}}

Hello BST Classics,

You have received a new project inquiry through your website:

CUSTOMER INFORMATION:
═══════════════════
Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}

VEHICLE DETAILS:
═══════════════════
Year: {{vehicle_year}}
Make: {{vehicle_make}}
Model: {{vehicle_model}}
Project Type: {{project_type}}

PROJECT DETAILS:
═══════════════════
{{message}}

═══════════════════
Sent from BST Classics Website
Reply to this email to respond directly to the customer.
```

## 🔧 Advanced Features

### Auto-Reply to Customer

Create a **second template** for customer confirmation:

1. **Template Name**: `customer_confirmation`
2. **Template Content Options**:

**Option A: Simple Text Template**
```
Subject: Thank you for contacting BST Classics!

Hi {{from_name}},

Thank you for your interest in BST Classic Rod & Custom! We've received your inquiry about your {{vehicle_year}} {{vehicle_make}} {{vehicle_model}}.

We'll review your project details and get back to you within 24 hours with:
• Initial project assessment
• Estimated timeline  
• Next steps for your restoration

In the meantime, feel free to call us at (515) 446-1215 if you have any immediate questions.

Best regards,
Brandon Tjaden
BST Classic Rod & Custom
```

**Option B: Professional HTML Template (Recommended)**
- Copy the content from `email-templates/customer-confirmation.html`
- This creates a stunning branded confirmation email with:
  - Professional BST branding
  - Step-by-step process explanation
  - Company highlights and credentials
  - Clear next steps for the customer

3. **Add to JavaScript** (in contact.html):

```javascript
// Send confirmation to customer
emailjs.send('your_service_id', 'customer_confirmation', {
    from_name: templateParams.from_name,
    from_email: templateParams.from_email,
    vehicle_year: templateParams.vehicle_year,
    vehicle_make: templateParams.vehicle_make,
    vehicle_model: templateParams.vehicle_model
});
```

## 📊 Usage Limits

### Free Plan (200 emails/month):
- Perfect for most small businesses
- Upgrade if you get more inquiries

### Paid Plans:
- **Personal**: $15/month (1,000 emails)
- **Team**: $30/month (2,500 emails)

## 🛠️ Troubleshooting

### Common Issues:

**❌ "Failed to send message"**
- Check your Service ID and Template ID
- Verify your Public Key
- Make sure template variables match

**❌ "EmailJS is not defined"**
- Make sure EmailJS script loads before your code
- Check browser console for errors

**❌ "Template not found"**  
- Verify Template ID exactly matches
- Check template is saved and published

**❌ "Service not found"**
- Verify Service ID exactly matches
- Check service is active

### Testing Tips:
1. **Check browser console** for error messages
2. **Test with simple data** first
3. **Verify all credentials** are correct
4. **Check spam folder** for test emails

## 🔒 Security Notes

- **Public Key is safe** to use in frontend code
- **Never expose** your Private Key
- **Service ID and Template ID** are also safe for frontend

## 📞 Support

- **EmailJS Documentation**: [docs.emailjs.com](https://www.emailjs.com/docs/)
- **EmailJS Support**: support@emailjs.com
- **BST Website Issues**: Check GitHub Issues

---

**🎉 Once set up, your contact form will automatically send emails to your business email address, and you can respond directly to customers!** 