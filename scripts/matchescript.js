let valueEquipos = document.getElementById("tagEquipoId");
let radio_Ganados = document.getElementById("radio_Ganados");
let radio_Perdidos = document.getElementById("radio_Perdidos");
let radio_Empatados = document.getElementById("radio_Empatados");
let radio_Todos = document.getElementById("radio_Todos");
let infoPartidos = [];

let partidos2020 = matches[0].matches;
let tablebody = document.getElementById("table-body");


// let pintarEquiposObtenidos = (arrayEquiposObtenidos) =>{
//     for(let i=0; i<arrayEquiposObtenidos.length; i++){
//         pintarEquipos(arrayEquiposObtenidos[i]);
//     }
// };

// let pintarEquipos = (obj)=>{
//     let tr = document.createElement("tr");
//     tr.innerHTML =`<td>${equipoVisitante}</td><td><img class="logoescudo" src="https://crests.football-data.org/${partidos2020[i].awayTeam.id}.svg"><td style="text-align: center">${marcador}</td><td><img class="logoescudo" src="https://crests.football-data.org/${partidos2020[i].homeTeam.id}.svg"><td>${equipoLocal}</td>`;
//     tablebody.appendChild(tr);

// }


// pintarEquiposObtenidos(partidos2020);

// <----------------------------------------------------------------->

console.log(infoPartidos);

for (let i= 0; i<partidos2020.length; i++){

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
    

    let tr = document.createElement("tr");
    tr.innerHTML =`<td>${equipoVisitante}</td><td><img class="logoescudo" src="https://crests.football-data.org/${partidos2020[i].awayTeam.id}.svg"><td style="text-align: center">${marcador}</td><td><img class="logoescudo" src="https://crests.football-data.org/${partidos2020[i].homeTeam.id}.svg"><td>${equipoLocal}</td>`;
    tablebody.appendChild(tr);

}