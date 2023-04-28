import axios from 'axios';

const sendFormData = async (data) => {
    return await axios.post("/api/sendEmail", data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

export default sendFormData;