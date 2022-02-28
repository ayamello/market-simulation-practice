import nodemailer from "nodemailer"; 

export const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "b4f87e00bb917e",
      pass: "d46bfe10c049dc"
    }
  });

export const mailOptions = (from: string, to: string, subject: string, text: string) => {
    return {
        from,
        to,
        subject,
        text
    }
}