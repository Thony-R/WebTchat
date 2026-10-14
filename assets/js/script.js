const socket = new WebSocket(`ws://${window.location.hostname}:9999`);
const box = document.getElementById("boxForm");
const pseudoBox = document.getElementById("pseudoBox");
let pseudo ="";
const btnBox =document.getElementById("btnBox");
const input = document.getElementById("message");
const btnSend = document.getElementById("send");
const boxMessageG = document.querySelector(".message__affichage");
const pseudoModif = document.getElementById("pseudoModif");
const btnModif = document.getElementById("valideModif");
const menuBurger = document.getElementById("menuBurger");
const burger = document.querySelector(".header_reglage_pseudoModif");

// Serveur
socket.onopen = function() {
    console.log('Connecté au serveur WebSocket');
};

socket.onmessage = function(event) {
    const message = document.createElement('p');
    message.textContent = event.data;
    boxMessageG.appendChild(message);
    // scroll message
    boxMessageG.scrollTo({
        top: boxMessageG.scrollHeight,
        behavior :'smooth'
    });
};


// envoie message aus serveur
function maj()
{
    const contMessage = formatMessage();
    input.value="";
    socket.send(contMessage);
}

btnModif.addEventListener("click",()=>{
    if(!verifPseudo(pseudoModif))
    {
        document.getElementById("pseudoModif").value= pseudo;
        document.querySelector(".burger").classList.toggle("active");
    }
})

// verif pseudo
function verifPseudo(nom)
{
    if(nom.value.trim() !=="")
    {
        pseudo = nom.value.trim();
        return true;
    }
    else
    {
        return false;
    }
}

// Mise en forme du message
function formatMessage()
{
    let textMessage = document.getElementById('message').value.replaceAll(/\r?\n/g,"\n\t");
    return "\nmessage "+pseudo+" ()\n{\n\t"+textMessage+"\n}";
}
// affichage Modal
box.showModal();
//////////// Listener ////////////
menuBurger.addEventListener("click",()=>{
    burger.classList.toggle('active');
})
btnSend.addEventListener("click", () => 
    {
        if(input.value.trim() !="")
        {
            maj()
        }
});

pseudoModif.addEventListener("keydown",(e)=>{
    if(e.key === "Enter")
    {
        if(verifPseudo(pseudoModif))
        {
            document.getElementById("pseudoModif").value= pseudo;
            // document.getElementById("pseudoModif").blur();
            // document.querySelector(".header_reglage_pseudoModif").classList.toggle("active");
        }
    }
})
btnModif.addEventListener("click",()=>{
    if(!verifPseudo(pseudoModif))
    {
        document.getElementById("pseudoModif").value= pseudo;
    }
})
pseudoBox.addEventListener("keydown",(e)=>{
    if(e.key === "Enter")
    {
        if(verifPseudo(pseudoBox))
        {
            document.getElementById("pseudoModif").value= pseudo;
            box.close();      
        }
        pseudoBox.value ="";
    }
})
btnBox.addEventListener("click",()=>{
    if(verifPseudo(pseudoBox))
    {
        document.getElementById("pseudoModif").value= pseudo;
        box.close();
    }
    pseudoBox.value = "";
})

// gestion de l'input message
input.addEventListener("keydown",(e)=>{
    if(e.key === "Enter")
    {
        e.preventDefault();
        if(e.shiftKey)
        {
            input.value = input.value.substring(0,input.selectionStart)+"\n"+input.value.substring(input.selectionEnd);
            input.selectionStart = input.selectionEnd = input.selectionStart +1;
        }
        else
        { 
            if(input.value.trim() != "")
            {
                maj();
                input.value = "";
            }
        }
    }
})