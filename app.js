//$("[data-toggle=popover]").popover();

// Crear proyecto de node

// npm init -> agregar la configuración

// npm i sass -> instalar dependencia de sass desde https://www.npmjs.com/package/sass

// crear .gitignore y agregar texto de la pagina -> https://www.toptal.com/developers/gitignore/api/node

// ejecutar comando -> ./node_modules/sass/sass.js --watch ./scss/main.scss output.css

// Si es desde windows -> node ./node_modules/sass/sass.js --watch ./scss/main.scss output.css


// Variables -----------------------------------------------------------

// const x = 5
// let y = 5

// console.log(y);

// y = 6

// var z = 6
// z = 8

// console.log(z);
// ------------------------------------------------------------

// console.log(forms);

// function suma(a, b) {
//   return a + b
// }



// function sendEmail(miVariable) {
//   miVariable.preventDefault()
//   const email = miVariable.target.querySelector("input").value
//   getTemplate()
//     .then((response) => {
//       console.log(response);
//     })
//     .catch((error) => {
//       console.log(error, "error al obtener el templete");
//     })
// }


/*Variable que accede al elemento con la clase definida*/
const forms = document.querySelectorAll(".signup-form");
//console.log(forms);

const getTemplate = () => {
    return fetch("./template.html")
      .then((response) => response.text())
  };

//Funcion que llama el servico para enviar el correo
  const sendEmailToApi = (address, template) => {
    fetch(`https://bedu-email-sender-api.herokuapp.com/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        address: address,
        template: template,
      }),
    })
      .then((results) => {
          if(results.status == 200){
            alert("E-mail send!!!");
          }else{
            alert("Send failed");
          }

        //console.log(results);
        document.getElementById("email").value = ""
        
      })
      .catch((error) => {
        console.error(error);
        document.getElementById("email").value = ""
        alert("Send failed")
      });
  };

//Es una funcion que se declara como varibale (funcion flecha) porque no cambia version 6 de JS
const sendEmail = (miVariable) => {
    //Detiene los eventos del formulario
    miVariable.preventDefault();
    //console.log(miVariable);
    //Con target se accede al elemento input 
    const email = miVariable.target.querySelector("input").value;
    console.log(email);
    getTemplate()
    .then((template) => {
      //console.log(response);
      sendEmailToApi(email, template)
    })
    .catch((error) => {
      console.log(error, "error al obtener el templete");
    })
};//Aqui termina la funcion sendEmail

for (let i = 0; i < forms.length; i++){
    //console.log(i);
    forms[i].addEventListener("submit",sendEmail);
}
