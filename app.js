
let listaAmigos = [];
const minParticipantes = 4

function mayusculaNombre(nombre) {
  return nombre.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
}

function agregarAmigo() {
  const inputAmigo = document.getElementById("amigo");
  let nombreAmigo = inputAmigo.value.trim();
  nombreAmigo = mayusculaNombre(nombreAmigo)
  
  if (nombreAmigo === ""){
    alert("Por favor, debes ingresar un nombre válido");
    return;
    }
  
  if(listaAmigos.includes(nombreAmigo)) {
      alert(`El nombre ${nombreAmigo} ya esta en la lista`);
      return;
    }
    
      listaAmigos.push(nombreAmigo);
      actualizarLista();
      inputAmigo.value = "";
}

document.getElementById("amigo").addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
      event.preventDefault();
      agregarAmigo()
  }
});

function actualizarLista(){
  const ulListaAmigos = document.getElementById("listaAmigos");
  ulListaAmigos.innerHTML = "";

  listaAmigos.forEach((nombre) => {
      const li = document.createElement("li");
      li.textContent = nombre;

      const botonEliminar = document.createElement("button");
      botonEliminar.textContent = "✖";
      botonEliminar.classList.add("delete-button");
      botonEliminar.onclick = () => eliminarAmigo(nombre);
      
      li.appendChild(botonEliminar);
      ulListaAmigos.appendChild(li);
  });
}

function eliminarAmigo(nombre) {
  listaAmigos = listaAmigos.filter((amigo) => amigo !== nombre);
  actualizarLista();

}

function sortearAmigo(){
  const ulResultado = document.getElementById("resultado");

  if(listaAmigos.length === 0){ 
     alert("No hay amigos disponibles para sortear. Agrega al menos uno.");
     return;
  }

  if(listaAmigos.length < minParticipantes) {
    alert(`Se necesita más de ${minParticipantes} participantes para realizar el sorteo.`);
    return;
  }
  
  const random = Math.floor(Math.random() * listaAmigos.length);
  const amigoSecreto = listaAmigos[random];

  const li = document.createElement("li");
  li.innerHTML = `<strong>El Amigo Secreto es:</strong> <br>${amigoSecreto}`;
  ulResultado.innerHTML = "";
  ulResultado.appendChild(li);
}

function limpiarDOM () {
  document.getElementById('listaAmigos').innerHTML = '';
  document.getElementById('resultado').innerHTML = '';
  document.querySelector('#amigo').value = '';

}


function reiniciarJuego() {
  if (confirm("¿Estás seguro de que quieres reiniciar el juego? Esto eliminara todos los amigos de la lista")) {
   listaAmigos = [];
   limpiarDOM();
   alert('El juego ha sido reiniciado.');
 }

}