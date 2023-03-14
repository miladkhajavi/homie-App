import nodemailer from 'nodemailer'
import {
    CONFIG
} from '../config/userConfig'

const Email = async (to, token) => {
    const transporter = nodemailer.createTransport({
        host: CONFIG.HOST_EMAIL,
        port: CONFIG.PORT_EMAIL,
        secure: false,
        auth: {
            user: CONFIG.USERNAME_EMAIL,
            pass: CONFIG.PASSWORD_EMAIL
        }
        // true for 465, false for other ports

    });

    // send mail with defined transport object
     await transporter.sendMail({
            from: '"place App 👻" <Milad@palceAPP.com>', // sender address
            to: `${to}`, // list of receivers
            subject: "Forget password ✔", // Subject line
            text: "you can click link and change your password", // plain text body
            html: `<h1>link for change</h1>
                <a href="http:localhost:3000/user/password/forget/${token}">Click</a>
        `, // html body
        }).then(res => console.log('successfull sending email to ',res.envelope.to))
        .catch(err => console.log(err) )
    

}

export default Email;