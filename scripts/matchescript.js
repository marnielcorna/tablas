let valueEquipos = document.getElementById("tagEquipoId");
let radioGanados = document.getElementById("radio_Ganados");
let radioPerdidos = document.getElementById("radio_Perdidos");
let radioEmpatados = document.getElementById("radio_Empatados");
let elementosRadio = document.getElementsByClassName("elementosRadio");
let matchesUrl = "https://api.football-data.org/v2/competitions/2014/matches";
let tablebody = document.getElementById("table-body");
let infoPartidos = [];



let iniciar = () => {
  let equipo = valueEquipos.value;
  obtenerPartidos(equipo);
};

let obtenerPartidos = (equipoElegido) => {
  fetch(matchesUrl, {
    method: "GET",
    headers: { "X-Auth-Token": "737c29d8585841f4b4d20ee923d70304" },
  })
    .then((response) => response.json())
    .then((data) => {
      let partidos2020 = data.matches;

      if (equipoElegido == undefined) {
        pintarPartidos(partidos2020);
        
      } else {
        let partidosEquipo = [];
        for (let i = 0; i < partidos2020.length; i++) {
          if (
            partidos2020[i].awayTeam.name == equipoElegido ||
            partidos2020[i].homeTeam.name == equipoElegido
          ) {
            partidosEquipo.push(partidos2020[i]);
          }
        }
        let partidosObtenidos = filtrarPartidosObtenidos(partidosEquipo);
        limpiarTabla();
        
        if (partidosObtenidos == 0) {
          pintarPartidos(partidos2020);
        } else {
          pintarPartidos(partidosObtenidos);
        }
      }
    });
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
    ) 
    
    {
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
      
    }
    else if (
      (radioEmpatados.checked == true &&
        partidosSeleccionados[i].score.winner == "DRAW" &&
        partidosSeleccionados[i].homeTeam.name == valueEquipos.value) ||
      (radioEmpatados.checked == true &&
        partidosSeleccionados[i].score.winner == "DRAW" &&
        partidosSeleccionados[i].awayTeam.name == valueEquipos.value)
    ) {
      equiposFiltrados.push(partidosSeleccionados[i]);
     
    } 
    else if (
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
    let marcador = `${scoreAway} - ${scoreHome}`;
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
obtenerPartidos();
