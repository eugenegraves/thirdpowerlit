// This is a standalone test script for EmailJS
require('dotenv').config({ path: '.env.local' });
const emailjs = require('@emailjs/browser');

console.log('EmailJS Test Script');
console.log('-------------------');

// Check environment variables
console.log('Environment Variables:');
console.log(`- Service ID: ${process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ? 'Set' : 'Not Set'}`);
console.log(`- Template ID: ${process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ? 'Set' : 'Not Set'}`);
console.log(`- Public Key: ${process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ? 'Set' : 'Not Set'}`);

// Initialize EmailJS
emailjs.init({
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
});

// Create test params
const templateParams = {
  name: 'Test User',
  email: 'test@example.com',
  subject: 'Test Email from Script',
  message: 'This is a test message sent directly from a Node.js script.',
  serviceType: 'testing'
};

console.log('\nSending test email...');

// Send the email
emailjs.send(
  process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
  process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
  templateParams,
  { publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY }
)
.then(response => {
  console.log('SUCCESS!', response.status, response.text);
})
.catch(err => {
  console.log('FAILED...', err);
});

console.log('\nCheck above for results. If successful, check your email inbox.'); 