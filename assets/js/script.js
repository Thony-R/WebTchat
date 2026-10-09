const socket = new WebSocket(`ws://${window.location.hostname}:9999`);

socket.onopen = function() {
    console.log('Connecté au serveur WebSocket');
};

socket.onmessage = function(event) {
    const message = document.createElement('div');
    message.textContent = event.data;
    document.querySelector('.message').appendChild(message);
};

const input = document.getElementById("message");
input.addEventListener("keydown",(event)=>{
    if(event.key === "Enter")
    {
        maj()
        event.preventDefault();
    }
})
const btnSend = document.getElementById("send");
btnSend.addEventListener("click",maj());

function maj()
{
    const contMessage = document.getElementById('message').value;
    socket.send(contMessage);
}