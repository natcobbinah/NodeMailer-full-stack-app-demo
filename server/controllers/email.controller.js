const path = require('path')
import smtpTransport from '../services/smtpService'
const fs = require('fs')
const { IncomingForm } = require('formidable');
import config from '../../config/config';

const sendEmail = async (req, res) => {
    //console.log(req.body)

    let options = {
        keepExtensions: true,
        multiples: true
    }

    let form = new IncomingForm(options);
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "form data not valid"
            })
        }

        //console.log(files)
        //console.log(fields)
        let fileData = [];
        let attachmentData = [];
        if (files) {
            for (const [key, value] of Object.entries(files)) {
                fileData.push(JSON.stringify(value))
            }

            fileData.forEach((fileObj) => {
                let parsedFileObject = JSON.parse(fileObj);
                attachmentData.push({
                    filename: JSON.stringify(parsedFileObject.originalFilename),
                    content: fs.createReadStream(parsedFileObject.filepath),
                    contentType: JSON.stringify(parsedFileObject.mimetype)
                })
            })
        }

        console.log(fields)
        let fieldData = [];
        for(const [key,value] of Object.entries(fields)){
            fieldData.push(value[1])
        }
    
        //console.log(fileData)

        try {
            smtpTransport.verify((error, progress) => {
                if (error) {
                    console.log(error)
                } else {
                    console.log("Server is ready to take our messages")
                }
            })

            let  mailOptions = {
                from: fieldData[1],
                to: config.USER_EMAIL,
                subject: fieldData[2],
                html: `
                    Hello, I am ${fieldData[0]}
                    <p>${fieldData[3]}</p>
                    <p>Kind Regards</p>
                    <p>${fieldData[0]}</p>
                `,
                attachments : attachmentData
              };

            smtpTransport.sendMail(mailOptions, (error, info) => {
                if(error){
                    return res.status(400).json({
                        error: "Error sending email, try again later"
                    })
                }else{
                    console.log("Email send:" + info.response)
                    return res.status(200).json({
                        message: "Email sent successfully"
                    })
                }
            })


        } catch (error) {
            return res.status(400).json({
                error: "Sending email error"
            })
        }
    });


}

export default { sendEmail };