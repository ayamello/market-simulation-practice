import { Request, Response, NextFunction } from "express";
import { transport, mailOptions } from "../services/email.service";

export const sendEmail = async (req: Request, res: Response, next: NextFunction) => {
  const { from, to, subject, text } = req.body;

  try {
    const options = mailOptions(from, to, subject, text);

    transport.sendMail(options, function(err, info) {
      if(err) {
        console.log(err);
      }
      else {
        console.log(info)
        return res.status(200).json({ "message": "Email sended!" });
      }
    });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};
