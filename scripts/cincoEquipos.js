let equipos = standings[0].standings[0].table;
let topFiltrados = document.getElementById("table-filtros");
let rankingUrl = "http://api.football-data.org/v2/competitions/2014/standings";
let infoEquipos = [];

fetch(rankingUrl, {
  method: "GET",
  headers: { "X-Auth-Token": "737c29d8585841f4b4d20ee923d70304" },
})
  .then((response) => response.json())
  .then((data) => {
    equipos = data.standings[0].table;

  for (let i = 0; i < equipos.length; i++) {
  let name = equipos[i].team.name;
  let idTeam = equipos[i].team.id;
  let equipoGoals = equipos[i].goalsFor;
  let partidosJugados = equipos[i].playedGames;
  let promedioGoles = equipoGoals / partidosJugados;
  let promedioRedondeado = round(promedioGoles);
  let infoEquipo = {
    nombre: name,
    id: idTeam, 
    promedio: promedioRedondeado,
  };
  infoEquipos.push(infoEquipo);
}

infoEquipos.sort(function (a, b) {
  return b.promedio - a.promedio;
});

 for(let i=0; i<5; i++){
    let row = document.createElement("tr");
    row.innerHTML = `<td class="tdTabla"><img class="logo" src="https://crests.football-data.org/${infoEquipos[i].id}.svg"></td><td class="tdTabla">${infoEquipos[i].nombre}</td><td class="tdTabla">${infoEquipos[i].promedio}</td>`;
    topFiltrados.appendChild(row);
 
}  
  });


function round(num, decimales = 2) {
  var signo = num >= 0 ? 1 : -1;
  num = num * signo;
  if (decimales === 0) return signo * Math.round(num);
  num = num.toString().split("e");
  num = Math.round(
    +(num[0] + "e" + (num[1] ? +num[1] + decimales : decimales))
  );
  num = num.toString().split("e");
  return signo * (num[0] + "e" + (num[1] ? +num[1] - decimales : -decimales));
}





