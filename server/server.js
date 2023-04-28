const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
import path from 'path'
const CURRENT_WORKING_DIRECTORY = process.cwd();
import config from '../config/config';
import emailRoute from './routes/email.route'

const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

app.use('/dist', express.static(path.join(CURRENT_WORKING_DIRECTORY, '/dist')))
app.use('/client/assets', express.static(path.join(CURRENT_WORKING_DIRECTORY, '/client/assets')))

app.get('/', (req, res) => {
    res.status(200).sendFile(path.join(CURRENT_WORKING_DIRECTORY, '/client/index.html'));
})

//emailRoute
app.use('/', emailRoute)

app.listen(config.port, (err) => {
    if(err){
        console.log(err)
    }
    console.log("Server started on port %s", config.port)
    console.log("Nodemailer app is available on  http://localhost:%d", config.port)
})





