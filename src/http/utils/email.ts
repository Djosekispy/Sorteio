import { MAIL_USERNAME } from "../../config/variables.env";
import { transporter } from "../../config/email";

class Mailer {
  static async SendEmail(email: string, title: string, htmlContent: string) {
    try {
      const mailOptions = {
        from: MAIL_USERNAME,
        to: email,
        subject: title,
        html: htmlContent, 
      };
      const send = await transporter.sendMail(mailOptions);
      return send; 
    } catch (err) {
      console.error(err);
      throw new Error('Erro no envio do email: ' + err);
    }
  }

 static  EmailContent(title: string, text: string){

    const emailContent = `
    <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px; background-color: #f9f9f9;">
      <h1 style="color: #4CAF50; text-align: center;">${title}!</h1>
      <p style="font-size: 16px; line-height: 1.5;">Olá,</p>
      <p style="font-size: 16px; line-height: 1.5;">${text}</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="#" style="background-color: #4CAF50; color: white; padding: 15px 25px; text-decoration: none; font-size: 16px; border-radius: 5px;">Confirmar Email</a>
      </div>
      
      <p style="font-size: 16px; line-height: 1.5;">Linhas de suporte</p><br/>
      <b>Telefone 927023710 </b>
      <b> Email : osvaldivilsondejosekispy@gmail.com </b>
      <p style="font-size: 16px; line-height: 1.5; margin-top: 20px;">Atenciosamente,<br><strong>Equipe da Kilapi</strong></p>
    </div>
  `;
  
  return emailContent;
  }
  
}



export default Mailer;
