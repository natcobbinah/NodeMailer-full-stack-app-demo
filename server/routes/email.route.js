const express = require('express')
const router = express.Router()
import emailController from '../controllers/email.controller.js'

router.route('/api/sendEmail')
    .post(emailController.sendEmail);

export default router;