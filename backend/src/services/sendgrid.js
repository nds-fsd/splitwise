const sendgrid = require('@sendgrid/mail');
sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = (to, subject, text) => {
    const msg = {
        to,
        from: {
            email: process.env.SENGRID_EMAIL,
            name: 'DivvyUp'
        },
        subject,
        text
    }
    sendgrid.send(msg);
};

module.exports = sendEmail