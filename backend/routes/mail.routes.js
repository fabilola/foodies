module.exports = app => {
    let nodemailer = require('nodemailer');
    let helper = require('../helperFunction.js');
    require('dotenv').config();

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.FOODIES_MAIL,
            pass:  process.env.FOODIES_PWD
        }
    });

    app.post('/api/email', (req, res) => {
            let htmlString = helper.generateHtmlString(req.body);
            let userName = req.body.displayName;
            let toMail = req.body.mail;

            let mailOptions = {
                from: process.env.FOODIES_MAIL,
                to: toMail,
                subject: userName + ' wants to share this recipe with you',
                html: htmlString
            };

            if (req.body.image) {
                mailOptions = {
                    ...mailOptions,
                    attachments: [
                        {
                            filename: 'recipe.jpg',
                            content:  req.body.image,
                            encoding: 'base64'
                        }
                    ]
                }
            }

            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    res.sendStatus(400).send({message: info});
                } else {
                    res.sendStatus(201).send({message: info});
                }
            })
        }
    );
};

