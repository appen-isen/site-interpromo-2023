console.log("Backend arbitrage start loading...");
import pb from './login.js'

const idMatch = window.location.href.split("=")[1];
const data = {
    "status": "in_progress",
};

const record = await pb.collection('match').update(idMatch, data);

const currentStatus = await pb.collection('match').getOne(idMatch, {
    expand: 'sport,team1,team2',
});

const textPoint1 = document.getElementById("textPoint1")
const textPoint2 = document.getElementById("textPoint2")

textPoint1.innerHTML = currentStatus.point1;
textPoint2.innerHTML = currentStatus.point2;

const buttonPoint1 = document.getElementById("btnPoint1")
const buttonPoint2 = document.getElementById("btnPoint2")


if(currentStatus.expand.sport.name === "basketball"){
    document.getElementById("arbitrage").innerHTML = "";
    const arbitrageDiv = document.getElementById("arbitrage");
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
    const arbitrageDisplayPoint1 = document.createElement("h5");
    arbitrageDisplayPoint1.className = "text-center";
    arbitrageDisplayPoint1.id = "textPoint1";
    arbitrageDisplayPoint1.innerHTML = currentStatus.point1;
    arbitrageDiv.appendChild(arbitrageDisplayPoint1);
    arbitrageDiv.appendChild(document.createElement("br"));
    const arbitrageDisplayPoint2 = document.createElement("h5");
    arbitrageDisplayPoint2.className = "text-center";
    arbitrageDisplayPoint2.id = "textPoint2";
    arbitrageDisplayPoint2.innerHTML = currentStatus.point2;
    arbitrageDiv.appendChild(arbitrageDisplayPoint2);
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
    const arbitrageStopForm = document.createElement("form");
    arbitrageStopForm.id = "stopMatch";
    const arbitrageStopFormDiv = document.createElement("div");
    arbitrageStopFormDiv.className = "text-center";
    const arbitrageStopFormBtn = document.createElement("button");
    arbitrageStopFormBtn.type = "submit";
    arbitrageStopFormBtn.className = "btn btn-danger";
    arbitrageStopFormBtn.id = "btnStop";
    arbitrageStopFormBtn.innerHTML = "Arrêter le match";
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

    point1Team1.addEventListener('click', async function(event) {
        event.preventDefault();
        const data = {
            "point1": currentStatus.point1 + 1,
        };
        const record = await pb.collection('match').update(idMatch, data);
        textPoint1.innerHTML = currentStatus.point1 + 1;
        location.reload();
    });

    point2Team1.addEventListener('click', async function(event) {
        event.preventDefault();
        const data = {
            "point1": currentStatus.point1 + 2,
        };
        const record = await pb.collection('match').update(idMatch, data);
        textPoint1.innerHTML = currentStatus.point1 + 2;
        location.reload();
    });

    point3Team1.addEventListener('click', async function(event) {
        event.preventDefault();
        const data = {
            "point1": currentStatus.point1 + 3,
        };
        const record = await pb.collection('match').update(idMatch, data);
        textPoint1.innerHTML = currentStatus.point1 + 3;
        location.reload();
    });

    point1Team2.addEventListener('click', async function(event) {
        event.preventDefault();
        const data = {
            "point2": currentStatus.point2 + 1,
        };
        const record = await pb.collection('match').update(idMatch, data);
        textPoint2.innerHTML = currentStatus.point2 + 1;
        location.reload();
    });

    point2Team2.addEventListener('click', async function(event) {
        event.preventDefault();
        const data = {
            "point2": currentStatus.point2 + 2,
        };
        const record = await pb.collection('match').update(idMatch, data);
        textPoint2.innerHTML = currentStatus.point2 + 2;
        location.reload();
    });

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
else{
    buttonPoint1.innerHTML = "1 point pour " + currentStatus.expand.team1.name;
    buttonPoint2.innerHTML = "1 point pour " + currentStatus.expand.team2.name;

    buttonPoint1.addEventListener('click', async function(event) {
        event.preventDefault();
        const data = {
            "point1": currentStatus.point1 + 1,
        };
        const record = await pb.collection('match').update(idMatch, data);
        textPoint1.innerHTML = currentStatus.point1 + 1;
        location.reload();
    });

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

document.getElementById("btnStop").addEventListener('click', async function(event) {
    event.preventDefault();
    const data = {
        "status": "finished",
    };
    const record = await pb.collection('match').update(idMatch, data);
    window.location.href = "arbitrage.html";
});

console.log("Backend arbitrage loaded!");