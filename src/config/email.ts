import nodemailer from 'nodemailer';
import { MAIL_HOST, MAIL_PASSWORD, MAIL_USERNAME } from './variables.env';


export const transporter = nodemailer.createTransport({
  host: MAIL_HOST,
  port: 465,
  secure: true,
  auth: {
    user: MAIL_USERNAME,
    pass: MAIL_PASSWORD,
  },
});