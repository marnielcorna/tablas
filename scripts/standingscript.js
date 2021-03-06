// let clasificacionT1 = standings[0].standings[0].table;

let tablaclasificacion = document.getElementById("tablaclas");

let logoBien = "/documentation/download.svg";
let logoMal = "/documentation/download_2.svg";
let logoEmpate = "/documentation/download_1.svg";
let textoCargando = document.getElementById("cargando");
let rankingUrl = "http://api.football-data.org/v2/competitions/2014/standings";
let error = document.getElementById("mensajeError");
let funCargando = () => {
  textoCargando.innerHTML = `<p>Cargando...</p>`;
};
let limpiarCargando = () => {
  textoCargando.innerHTML = "";
};

funCargando();

fetch(rankingUrl, {
  method: "GET",
  headers: { "X-Auth-Token": "737c29d8585841f4b4d20ee923d70304" },
})
  .then((response) => response.json())
  .then((data) => {
    let clasificacionT1 = data.standings[0].table;
    // limpiarCargando();
    for (let i = 0; i < clasificacionT1.length; i++) {
      let club = clasificacionT1[i].position;
      let escudo = clasificacionT1[i].team.crestUrl;
      let nombre = clasificacionT1[i].team.name;
      let partidosJugados = clasificacionT1[i].playedGames;
      let partidosVencidos = clasificacionT1[i].won;
      let partidosEmpatados = clasificacionT1[i].draw;
      let partidosPerdidos = clasificacionT1[i].lost;
      let golesAFavor = clasificacionT1[i].goalsFor;
      let golesEnContra = clasificacionT1[i].goalsAgainst;
      let golesDiferencia = clasificacionT1[i].goalDifference;
      let puntos = clasificacionT1[i].points;
      let ultimosCinco = clasificacionT1[i].form;

      ultimosCinco = ultimosCinco.split(",");
      let array22 = [];

      for (let j = 0; j < ultimosCinco.length; j++) {
        if (ultimosCinco[j] == "W") {
          array22.push(logoBien);
        } else if (ultimosCinco[j] == "L") {
          array22.push(logoMal);
        } else {
          array22.push(logoEmpate);
        }
      }

      let tr = document.createElement("tr");
      tr.innerHTML = `<td style="text-align: center">${club}</td><td><img class="logoescudo" src="${escudo}"></td><td>${nombre}</td><td>${partidosJugados}</td><td>${partidosVencidos}</td><td>${partidosEmpatados}</td><td>${partidosPerdidos}</td><td>${golesAFavor}</td><td>${golesEnContra}</td><td>${golesDiferencia}</td><td>${puntos}</td><td><img src=${array22[0]} HSPACE="10"><img src=${array22[1]} HSPACE="10"><img src=${array22[2]} HSPACE="10"><img src=${array22[3]} HSPACE="10"><img src=${array22[4]} HSPACE="10"></td>`;
      tablaclasificacion.appendChild(tr);
    }
  })
  .catch((elError)=>{
    console.log(elError);
    error.innerHTML = "SERVIDOR SATURADO..";
    limpiarCargando();
  })
