const socket = new WebSocket(`ws://${window.location.hostname}:9999`);
const box = document.getElementById("boxForm");
const pseudoBox = document.getElementById("pseudoBox");
const btnBox =document.getElementById("btnBox");
const input = document.getElementById("message");
const btnSend = document.getElementById("send");
const boxMessageG = document.querySelector(".message__affichage"); 

// Serveur
socket.onopen = function() {
    console.log('Connecté au serveur WebSocket');
};

socket.onmessage = function(event) {
    const message = document.createElement('div');
    message.textContent = event.data;
    boxMessageG.appendChild(message);
    // boxMessageG.style
};

btnSend.addEventListener("click", () => 
    {
        if(input.value !="")
        {
            maj()
        }
    });

function maj()
{
    const contMessage = formatMessage();
    input.value="";
    socket.send(contMessage);
}

// affichage Modal
box.showModal();
// recupérationdupseudo
btnBox.addEventListener("click",()=>{
    box.close();
})
// gestion de l'input message 
input.addEventListener("keydown",(e)=>{
    if(e.key === "Enter")
    {
        e.preventDefault();
        if(e.ctrlKey)
        {
            input.value = input.value.substring(0,input.selectionStart)+"\n"+input.value.substring(input.selectionEnd);
            input.selectionStart = input.selectionEnd = input.selectionStart +1;
        }
        else
        { 
            if(input.value != "")
            {
                maj();
                input.value = "";
            }
        }
    }
})

function formatMessage()
{
    let textMessage = document.getElementById('message').value.replaceAll(/\r?\n/g,"\n\t");
    return "\nmessage "+pseudoBox.value+" ()\n{\n\t"+textMessage+"\n}";
}