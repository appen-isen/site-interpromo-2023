console.log("Backend arbitrage start loading...");
import pb from './login.js'

//Récupération de l'id du match dans l'url
const idMatch = window.location.href.split("=")[1];
//Mise à jour du statut du match
const data = {
    "status": "in_progress",
};
const record = await pb.collection('match').update(idMatch, data);

//Récupération des données du match
const currentStatus = await pb.collection('match').getOne(idMatch, {
    expand: 'sport,team1,team2,mode',
});

const EquipeList = await pb.collection('equipes').getFullList({
    expand: 'promo,sport',
});

//Affichage des données initial du match
const textPoint1 = document.getElementById("textPoint1")
const textPoint2 = document.getElementById("textPoint2")

textPoint1.innerHTML = currentStatus.point1;
textPoint2.innerHTML = currentStatus.point2;

const buttonPoint1 = document.getElementById("btnPoint1")
const buttonPoint2 = document.getElementById("btnPoint2")

//Gestion du cas basketball
if(currentStatus.expand.sport.name === "basketball"){
    //Suppression des boutons de points
    document.getElementById("arbitrage").innerHTML = "";
    const arbitrageDiv = document.getElementById("arbitrage");
    //Création des boutons pour les différents points
    const arbitragePoint1 = document.createElement("div");
    arbitragePoint1.className = "text-center d-flex justify-content-evenly";
    const arbitragePoint1Btn1 = document.createElement("a");
    arbitragePoint1Btn1.className = "btn btn-primary";
    arbitragePoint1Btn1.id = "btnPoint1Btn1";
    arbitragePoint1Btn1.innerHTML = "1 point pour " + currentStatus.expand.team1.name;
    const arbitragePoint1Btn2 = document.createElement("a");
    arbitragePoint1Btn2.className = "btn btn-primary";
    arbitragePoint1Btn2.id = "btnPoint1Btn2";
    arbitragePoint1Btn2.innerHTML = "2 points pour " + currentStatus.expand.team1.name;
    const arbitragePoint1Btn3 = document.createElement("a");
    arbitragePoint1Btn3.className = "btn btn-primary";
    arbitragePoint1Btn3.id = "btnPoint1Btn3";
    arbitragePoint1Btn3.innerHTML = "3 points pour " + currentStatus.expand.team1.name;
    arbitragePoint1.appendChild(arbitragePoint1Btn1);
    arbitragePoint1.appendChild(arbitragePoint1Btn2);
    arbitragePoint1.appendChild(arbitragePoint1Btn3);
    arbitrageDiv.appendChild(arbitragePoint1);
    //Création de l'affichage des points
    const arbitrageDisplayPoint1 = document.createElement("h5");
    arbitrageDisplayPoint1.className = "text-center";
    arbitrageDisplayPoint1.id = "textPoint1";
    arbitrageDisplayPoint1.innerHTML = currentStatus.point1;
    arbitrageDiv.appendChild(arbitrageDisplayPoint1);
    arbitrageDiv.appendChild(document.createElement("br"));
    //Création de l'affichage des points
    const arbitrageDisplayPoint2 = document.createElement("h5");
    arbitrageDisplayPoint2.className = "text-center";
    arbitrageDisplayPoint2.id = "textPoint2";
    arbitrageDisplayPoint2.innerHTML = currentStatus.point2;
    arbitrageDiv.appendChild(arbitrageDisplayPoint2);
    //Création des boutons pour les différents points
    const arbitragePoint2 = document.createElement("div");
    arbitragePoint2.className = "text-center d-flex justify-content-evenly";
    const arbitragePoint2Btn1 = document.createElement("a");
    arbitragePoint2Btn1.className = "btn btn-primary";
    arbitragePoint2Btn1.id = "btnPoint2Btn1";
    arbitragePoint2Btn1.innerHTML = "1 point pour " + currentStatus.expand.team2.name;
    const arbitragePoint2Btn2 = document.createElement("a");
    arbitragePoint2Btn2.className = "btn btn-primary";
    arbitragePoint2Btn2.id = "btnPoint2Btn2";
    arbitragePoint2Btn2.innerHTML = "2 points pour " + currentStatus.expand.team2.name;
    const arbitragePoint2Btn3 = document.createElement("a");
    arbitragePoint2Btn3.className = "btn btn-primary";
    arbitragePoint2Btn3.id = "btnPoint2Btn3";
    arbitragePoint2Btn3.innerHTML = "3 points pour " + currentStatus.expand.team2.name;
    arbitragePoint2.appendChild(arbitragePoint2Btn1);
    arbitragePoint2.appendChild(arbitragePoint2Btn2);
    arbitragePoint2.appendChild(arbitragePoint2Btn3);
    arbitrageDiv.appendChild(arbitragePoint2);
    arbitrageDiv.appendChild(document.createElement("br"));
    //Création du bouton pour arrêter le match
    const arbitrageStopForm = document.createElement("form");
    arbitrageStopForm.id = "stopMatch";
    const arbitrageStopFormDiv = document.createElement("div");
    arbitrageStopFormDiv.className = "text-center";
    const arbitrageStopFormBtn = document.createElement("button");
    arbitrageStopFormBtn.type = "submit";
    arbitrageStopFormBtn.className = "btn btn-danger";
    arbitrageStopFormBtn.id = "btnStop";
    arbitrageStopFormBtn.innerHTML = "Arrêter le match";
    //Gestion de l'arrêt du match
    arbitrageStopFormDiv.appendChild(arbitrageStopFormBtn);
    arbitrageStopForm.appendChild(arbitrageStopFormDiv);
    arbitrageDiv.appendChild(arbitrageStopForm);


    //Comptage des points
    const point1Team1 = document.getElementById("btnPoint1Btn1");
    const point2Team1 = document.getElementById("btnPoint1Btn2");
    const point3Team1 = document.getElementById("btnPoint1Btn3");
    const point1Team2 = document.getElementById("btnPoint2Btn1");
    const point2Team2 = document.getElementById("btnPoint2Btn2");
    const point3Team2 = document.getElementById("btnPoint2Btn3");

    //Gestion des points
    point1Team1.addEventListener('click', async function(event) {
        //Annulation du comportement par défaut
        event.preventDefault();

        //Mise à jour du nombre de points
        const data = {
            "point1": currentStatus.point1 + 1,
        };
        //Envoi de la requête
        const record = await pb.collection('match').update(idMatch, data);
        //Mise à jour de l'affichage
        textPoint1.innerHTML = currentStatus.point1 + 1;
        //Rechargement de la page pour mettre à jour les données
        location.reload();
    });

    //Même chose pour les autres boutons
    point2Team1.addEventListener('click', async function(event) {
        event.preventDefault();
        const data = {
            "point1": currentStatus.point1 + 2,
        };
        const record = await pb.collection('match').update(idMatch, data);
        textPoint1.innerHTML = currentStatus.point1 + 2;
        location.reload();
    });

    //Même chose pour les autres boutons
    point3Team1.addEventListener('click', async function(event) {
        event.preventDefault();
        const data = {
            "point1": currentStatus.point1 + 3,
        };
        const record = await pb.collection('match').update(idMatch, data);
        textPoint1.innerHTML = currentStatus.point1 + 3;
        location.reload();
    });

    //Même chose pour les autres boutons
    point1Team2.addEventListener('click', async function(event) {
        event.preventDefault();
        const data = {
            "point2": currentStatus.point2 + 1,
        };
        const record = await pb.collection('match').update(idMatch, data);
        textPoint2.innerHTML = currentStatus.point2 + 1;
        location.reload();
    });

    //Même chose pour les autres boutons
    point2Team2.addEventListener('click', async function(event) {
        event.preventDefault();
        const data = {
            "point2": currentStatus.point2 + 2,
        };
        const record = await pb.collection('match').update(idMatch, data);
        textPoint2.innerHTML = currentStatus.point2 + 2;
        location.reload();
    });

    //Même chose pour les autres boutons
    point3Team2.addEventListener('click', async function(event) {
        event.preventDefault();
        const data = {
            "point2": currentStatus.point2 + 3,
        };
        const record = await pb.collection('match').update(idMatch, data);
        textPoint2.innerHTML = currentStatus.point2 + 3;
        location.reload();
    });
}
//Gestion des autres sports
else{
    //Mise à jour de l'affichage des boutons
    buttonPoint1.innerHTML = "1 point pour " + currentStatus.expand.team1.name;
    buttonPoint2.innerHTML = "1 point pour " + currentStatus.expand.team2.name;

    //Comptage des points
    buttonPoint1.addEventListener('click', async function(event) {
        //Annulation du comportement par défaut
        event.preventDefault();

        //Mise à jour du nombre de points
        const data = {
            "point1": currentStatus.point1 + 1,
        };
        //Envoi de la requête
        const record = await pb.collection('match').update(idMatch, data);
        //Mise à jour de l'affichage
        textPoint1.innerHTML = currentStatus.point1 + 1;
        //Rechargement de la page pour mettre à jour les données
        location.reload();
    });

    //Même chose pour l'autre bouton
    buttonPoint2.addEventListener('click', async function(event) {
        event.preventDefault();
        const data = {
            "point2": currentStatus.point2 + 1,
        };
        const record = await pb.collection('match').update(idMatch, data);
        textPoint2.innerHTML = currentStatus.point2 + 1;
        location.reload();
    });
}

//Gestion de l'arrêt du match
document.getElementById("btnStop").addEventListener('click', async function(event) {
    //Annulation du comportement par défaut
    event.preventDefault();
    //Mise à jour du statut du match
    const data = {
        "status": "finished",
    };
    //Envoi de la requête
    const record = await pb.collection('match').update(idMatch, data);
    console.log("deleted")
    console.log(currentStatus)
    if(currentStatus.expand.mode == "poules"){
        //Ajout des points victoire ou égalité
        if(currentStatus.point1 === currentStatus.point2){
            addPoints(currentStatus.team1, 1)
            addPoints(currentStatus.team2, 1)
        } else if(currentStatus.point1 > currentStatus.point2) {
            addPoints(currentStatus.team1, 3)
        } else if(currentStatus.point1 < currentStatus.point2) {
            addPoints(currentStatus.team2, 3)
        }
        //Calcul du classement de chaque équipe
        setTeamClassement(currentStatus.expand.sport.name)
    } else if(currentStatus.expand.mode == "tournoi") {
        console.log("tournoi sa mère")
        if(currentStatus.point1 > currentStatus.point2) {
            console.log("1 gagne")
            eliminateTeam(currentStatus.team2)
            promoteNextStade(currentStatus.team1)
        } else if(currentStatus.point1 < currentStatus.point2) {
            console.log("2 gagne")
            eliminateTeam(currentStatus.team1)
            promoteNextStade(currentStatus.team2)
        }
    }

    //Redirection vers la page d'arbitrage
    //window.location.href = "arbitrage.html";
});

function addPoints(teamId, points){
    const equipe = EquipeList.find(equipe => equipe.id === teamId)
    if(equipe){
        const data = {
            "point": equipe.points + points,
        };
        const record = pb.collection(EquipeList).update(equipe.id, data);
    }
}

function setTeamClassement(sport){
    sportTeams = []
    EquipeList.forEach(equipe => {
        if(equipe.expand.sport.name === sport){
            sportTeams.push(equipe)//On sélectionne toutes les équipes du sport indiqué en paramètres
        }
    })
    sportTeams.sort((teamA, teamB) => parseInt(teamB.points, 10) - parseInt(teamA.points, 10))//On range les équipes par ordre de points décroissant
    for(let i = 1; i <= sportTeams.length; i++){
        const data = {
            "classement": i,
        };
        const record = pb.collection(EquipeList).update(sportTeams[i-1].id, data);
    }
}

function eliminateTeam(teamId){
    console.log("eliminate")
    const data = {
        "eliminated": true,
    };
    const record = pb.collection(EquipeList).update(teamId, data);
}

function promoteNextStade(teamId){
    console.log("promote")
    equipe = EquipeList.find(equipe => equipe.id === teamId)
    if(equipe){
        if(equipe.stade !== '1'){
            const data = {
                "stade": (parseInt(equipe.stade, 10)/2).toString(),
            };
            const record = pb.collection(EquipeList).update(equipe.id, data);
        }
    }
}

console.log("Backend arbitrage loaded!");