let valueEquipos = document.getElementById("tagEquipoId");
let radioGanados = document.getElementById("radio_Ganados");
let radioPerdidos = document.getElementById("radio_Perdidos");
let radioEmpatados = document.getElementById("radio_Empatados");
let radioTodos = document.getElementById("radio_Todos");
let elementosRadio = document.getElementsByClassName("elementosRadio");
let infoPartidos = [];

let partidos2020 = matches[0].matches;
let tablebody = document.getElementById("table-body");

let equipoVisitante = partidos2020[0].awayTeam.name;
let equipoLocal = partidos2020[0].homeTeam.name;
let homeT = partidos2020[0].score.fullTime.homeTeam;
let awayT = partidos2020[0].score.fullTime.awayTeam;
let winner = partidos2020[0].score.winner;

// <----------------------------------------------------------------->

let filtrar = () => {
  let equipo = valueEquipos.value;
  let partidos = obtenerPartido(equipo);
  let partidosObtenidos = filtrarPartidosObtenidos(partidos);
  // limpiarTabla();
  // pintarPartidosObtenidos(partidosObtenidos);
};

let obtenerPartido = (equipoElegido) => {
  let partidosEquipo = [];
  for (let i = 0; i < partidos2020.length; i++) {
    if (
      partidos2020[i].awayTeam.name == equipoElegido ||
      partidos2020[i].homeTeam.name == equipoElegido
    ) {
      partidosEquipo.push(partidos2020[i]);
    }
  }
  return partidosEquipo;
};

let filtrarPartidosObtenidos = (partidosSeleccionados) => {
  
  let equiposFiltrados = [];
  for (let i = 0; i < partidosSeleccionados.length; i++) {
      
    if (
      (radioGanados.checked == true &&
        partidosSeleccionados[i].score.winner == "HOME_TEAM" &&
        partidosSeleccionados[i].homeTeam.name == valueEquipos.value) ||
      (radioGanados.checked == true &&
        partidosSeleccionados[i].score.winner == "AWAY_TEAM" &&
        partidosSeleccionados[i].awayTeam.name == valueEquipos.value)
     ) {
     equiposFiltrados.push(partidosSeleccionados[i]);
    }
    else if(
        (radioPerdidos.checked == true &&
        partidosSeleccionados[i].score.winner == "HOME_TEAM" &&
        partidosSeleccionados[i].homeTeam.name != valueEquipos.value) ||
        (radioPerdidos.checked == true &&
        partidosSeleccionados[i].score.winner == "AWAY_TEAM" &&
        partidosSeleccionados[i].awayTeam.name != valueEquipos.value)){
        equiposFiltrados.push(partidosSeleccionados[i]);
        }
    else if(
        (radioEmpatados.checked == true &&
        partidosSeleccionados[i].score.winner == "DRAW" &&
        partidosSeleccionados[i].homeTeam.name == valueEquipos.value) ||
        (radioEmpatados.checked == true &&
        partidosSeleccionados[i].score.winner == "DRAW" &&
        partidosSeleccionados[i].awayTeam.name == valueEquipos.value)){
        equiposFiltrados.push(partidosSeleccionados[i]);
        }
    else (
        radioGanados == false &&
        radioPerdidos == false &&
        radioEmpatados == false &&
        radioTodos == false
        )
        {
        equiposFiltrados = partidosSeleccionados;
        }
   } 
 console.log(equiposFiltrados); 
};

let pintarPartidosObtenidos = (arrayEquiposObtenidos) => {
  for (let i = 0; i < arrayEquiposObtenidos.length; i++) {
    pintarPartidos(arrayEquiposObtenidos[i]);
  }
};

// ---- PINTAR---
let pintarPartidos = (obj) => {
  let tr = document.createElement("tr");
  tr.innerHTML = `<td>${infoPartidos.equipoVisitante}</td><td><img class="logoescudo" src="https://crests.football-data.org/${partidos2020.awayTeam.id}.svg"><td style="text-align: center">${marcador}</td><td><img class="logoescudo" src="https://crests.football-data.org/${partidos2020[i].homeTeam.id}.svg"><td>${equipoLocal}</td>`;
  tablebody.appendChild(tr);
};
// -----LIMPIAR -----
let limpiarTabla = () => {
  valueEquipos.value = "";
  for (let i = 0; i < elementosRadio.length; i++) {
    elementosRadio[i].checked = false;
  }
  tablebody.innerHTML = "";
};

// pintarPartidosObtenidos(partidos2020);

/*for (let i= 0; i<partidos2020.length; i++){

    let equipoVisitante = partidos2020[i].awayTeam.name;
    let equipoLocal = partidos2020[i].homeTeam.name;
    let homeT = partidos2020[i].score.fullTime.homeTeam;
    let awayT = partidos2020[i].score.fullTime.awayTeam;
    let marcador = partidos2020[i].score.fullTime; 
    let pendientes = partidos2020[i].score.winner;
    let infoPartido ={
        equipoVisitante, 
        equipoLocal, 
        homeT, 
        awayT, 
        marcador, 
        pendientes,};
    infoPartidos.push(infoPartido);

    marcador = `${homeT} - ${awayT}`;

    if(pendientes == null){
        marcador = "Pendiente"
    }
    */

// let tr = document.createElement("tr");
//     tr.innerHTML =`<td>${equipoVisitante}</td><td><img class="logoescudo" src="https://crests.football-data.org/${partidos2020[i].awayTeam.id}.svg"><td style="text-align: center">${marcador}</td><td><img class="logoescudo" src="https://crests.football-data.org/${partidos2020[i].homeTeam.id}.svg"><td>${equipoLocal}</td>`;
//     tablebody.appendChild(tr);}
