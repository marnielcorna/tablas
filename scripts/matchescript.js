let partidos2020 = matches[0].matches;

let tablebody = document.getElementById("table-body");
// console.log(partidos2020[0].awayTeam.name);


for (let i= 0; i<partidos2020.length; i++){

    let equipoVisitante = partidos2020[i].awayTeam.name;
    let equipoLocal = partidos2020[i].homeTeam.name;
    let homeT = partidos2020[i].score.fullTime.homeTeam;
    let awayT = partidos2020[i].score.fullTime.awayTeam;
    let marcador = partidos2020[i].score.fullTime; 
    let pendientes = partidos2020[i].score.winner;
    marcador = `${homeT} - ${awayT}`;

    if(pendientes == null){
        marcador = "Pendiente"
    }
    

    let tr = document.createElement("tr");
    tr.innerHTML =`<td>${equipoVisitante}</td><td><img class="logoescudo" src="https://crests.football-data.org/${partidos2020[i].awayTeam.id}.svg"><td style="text-align: center">${marcador}</td><td><img class="logoescudo" src="https://crests.football-data.org/${partidos2020[i].homeTeam.id}.svg"><td>${equipoLocal}</td>`;
    tablebody.appendChild(tr);

}