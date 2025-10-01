const nodemailer = require('nodemailer');
const { MailtrapTransport } = require('mailtrap');
const emailConfig = require('../config/email');

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport(
      MailtrapTransport({
        token: emailConfig.token,
      })
    );
    this.sender = {
      address: "hello@demomailtrap.co",
      name: "Birthday Reminder App"
    };
  }

  async sendBirthdayEmail(user) {
    try {
      const result = await this.transporter.sendMail({
        from: this.sender,
        to: [user.email],
        subject: `🎉 Happy Birthday, ${user.username}!`,
        html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 500px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
            <div style="background: white; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); overflow: hidden;">
                <div style="background: linear-gradient(90deg, #4f46e5 0%, #7c3aed 100%); padding: 25px 20px; text-align: center;">
                <h1 style="font-size: 1.8em; margin: 0 0 8px 0; color: white; font-weight: 600;">Happy Birthday</h1>
                <h2 style="font-size: 1.3em; margin: 0; color: rgba(255,255,255,0.9); font-weight: 400;">Dear ${user.username}</h2>
                </div>
                <div style="padding: 30px 25px;">
                <p style="font-size: 1.1em; line-height: 1.5; color: #374151; margin: 0 0 20px 0;">
                    Wishing you a day filled with happiness and a year filled with joy! 
                    May all your dreams and wishes come true on this special day.
                </p>
                <p style="font-size: 1em; line-height: 1.5; color: #6b7280; margin: 0;">
                    From Hafiz.Inc :)
                </p>
                </div>
                <div style="border-top: 1px solid #e5e7eb; padding: 15px 20px; text-align: center; color: #9ca3af; font-size: 0.85em;">
                <p style="margin: 0;">This message was sent by a ron job, please do not respond</p>
                </div>
            </div>
        </div>
        `,
        category: "Birthday Wishes"
      });

      console.log(`Birthday email sent to ${user.email}`);
      return true;
    } catch (error) {
      console.error(`Failed to send email to ${user.email}:`, error);
      return false;
    }
  }
}

module.exports = new EmailService();