import sendFormData from "../../httpEndpoints/endpoints";
import '../css/styles.css'
import Toastify from 'toastify-js'

const form = document.forms['contactForm'];
form.addEventListener("submit", submitFormData);

function submitFormData(event) {
    event.preventDefault();

    let formData = new FormData(form);
    console.log([...formData])
  
    sendFormData([...formData])
        .then(response => {
            if(response.data.error){
                Toastify({
                    text: response.data.error,
                    duration: 3000,
                    gravity: "top", // `top` or `bottom`
                    position: "right", // `left`, `center` or `right`
                    stopOnFocus: true, // Prevents dismissing of toast on hover
                    style: {
                      background: "linear-gradient(to right, #00b09b, #96c93d)",
                    },
                  }).showToast();
            }else{
                if(response.data.message){
                    Toastify({
                        text: response.data.message,
                        duration: 3000,
                        gravity: "top", // `top` or `bottom`
                        position: "right", // `left`, `center` or `right`
                        stopOnFocus: true, // Prevents dismissing of toast on hover
                        style: {
                          background: "linear-gradient(to right, #00b09b, #873cds)",
                        },
                      }).showToast();
                }
            }
        }).catch((error) => {
            console.log(error);
        });
}
