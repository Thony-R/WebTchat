const socket = new WebSocket('ws://localhost:9999');

socket.onopen = function() {
    console.log('Connecté au serveur WebSocket');
};

socket.onmessage = function(event) {
    const message = document.createElement('div');
    message.textContent = event.data;
    document.querySelector('.message').appendChild(message);
};


const btnSend = document.getElementById("send");
btnSend.addEventListener("click",()=>{
    const contMessage = document.getElementById('message').value;
    socket.send(contMessage);
})