
let valueEquipos = document.getElementById("tagEquipoId");
let radioGanados = document.getElementById("radio_Ganados");
let radioPerdidos = document.getElementById("radio_Perdidos");
let radioEmpatados = document.getElementById("radio_Empatados");
let elementosRadio = document.getElementsByClassName("elementosRadio");
let infoPartidos = [];

let partidos2020 = matches[0].matches;
let tablebody = document.getElementById("table-body");

// <----------------------------------------------------------------->

let iniciar = () => {
  let equipo = valueEquipos.value;
  let partidos = obtenerPartido(equipo);
  let partidosObtenidos = filtrarPartidosObtenidos(partidos);
  limpiarTabla();
  if (partidosObtenidos == 0) {
    pintarPartidos(partidos2020);
  } else {
    pintarPartidos(partidosObtenidos);
  }
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
    } else if (
      (radioPerdidos.checked == true &&
        partidosSeleccionados[i].score.winner == "HOME_TEAM" &&
        partidosSeleccionados[i].homeTeam.name != valueEquipos.value) ||
      (radioPerdidos.checked == true &&
        partidosSeleccionados[i].score.winner == "AWAY_TEAM" &&
        partidosSeleccionados[i].awayTeam.name != valueEquipos.value)
    ) {
      equiposFiltrados.push(partidosSeleccionados[i]);
    } else if (
      (radioEmpatados.checked == true &&
        partidosSeleccionados[i].score.winner == "DRAW" &&
        partidosSeleccionados[i].homeTeam.name == valueEquipos.value) ||
      (radioEmpatados.checked == true &&
        partidosSeleccionados[i].score.winner == "DRAW" &&
        partidosSeleccionados[i].awayTeam.name == valueEquipos.value)
    ) {
      equiposFiltrados.push(partidosSeleccionados[i]);
    } else if (
      radioGanados.checked == false &&
      radioPerdidos.checked == false &&
      radioEmpatados.checked == false
    ) {
      equiposFiltrados = partidosSeleccionados;
    }
  }
  return equiposFiltrados;
};

// ---- PINTAR---
let pintarPartidos = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    let equipoVisitante = arr[i].awayTeam.name;
    let equipoLocal = arr[i].homeTeam.name;
    let scoreHome = arr[i].score.fullTime.homeTeam;
    let scoreAway = arr[i].score.fullTime.awayTeam;
    let marcador = `${scoreHome} - ${scoreAway}`;
    let winner = arr[i].score.winner;
    if (winner == null) {
      marcador = "Pendiente";
    }
    let tr = document.createElement("tr");
    tr.innerHTML = `<td>${equipoVisitante}</td><td><img class="logoescudo" src="https://crests.football-data.org/${arr[i].awayTeam.id}.svg"><td style="text-align: center">${marcador}</td><td><img class="logoescudo" src="https://crests.football-data.org/${arr[i].homeTeam.id}.svg"><td>${equipoLocal}</td>`;
    tablebody.appendChild(tr);
  }
};
// -----LIMPIAR -----
let limpiarTabla = () => {
  valueEquipos.value = "";
  for (let i = 0; i < elementosRadio.length; i++) {
    elementosRadio[i].checked = false;
  }
  tablebody.innerHTML = "";
};
pintarPartidos(partidos2020);
