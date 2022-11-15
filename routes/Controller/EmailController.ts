import { Request, Response } from "express";
import { ValidationError } from "sequelize";
import { ApiException } from "../../types/exception";
import { MLogs } from "../../Config";

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: MLogs.service,
  auth: {
    user: MLogs.user,
    pass: MLogs.pass
  }
});

/**
 * @swagger
 * tags:
 *      name: Email
 *      description: Manage les routes Email
 */

/**
 * @openapi
 * /api/email:
 *  post:
 *      tags: [Email]
 *      description: Envoie un Email
 *      consumes:
 *       - application/json
 *      parameters:
 *       - name: JSON
 *         in: body
 *         required: true
 *         type: object
 *         default: {"target": "testmail@test.fr", "subject": "Test D'Envoi", "content": "Bonjour, ceci est un test, Cordialement"}
 *      responses:
 *        200:
 *          description: La requête s'est bien déroulée.
 */
export const sendEmail = async (req: Request, res: Response) => {
    const mailOptions = {
        from: MLogs.user,
        to: req.body.target,
        subject: req.body.subject,
        text: req.body.content
      };
    transporter.sendMail(mailOptions).then(() => {
            const message: string = `Le mail concernant ${req.body.subject} a bien été envoyé.`;
            res.json({ message, data: req.body });
        })
        .catch((error: ApiException) => {
            if (error instanceof ValidationError) {
                return res.status(400).json({ message: error.message, data: error });
            }
            const message = `Le mail n'a pas pu être envoyé.`;
            res.status(500).json({ message, data: error });
        });
};
;