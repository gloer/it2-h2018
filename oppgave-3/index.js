// Jeg bruker et Array for å lagre data om hytter
// I produksjon ville jeg nok ha brukt en database for å lagre endringer

const hytter = [
    {
        navn: "Granstua",
        bilde: "granstua.jpg",
        ukepris: 12000,
        badstue: "Ja",
        standard: "Høy",
        sengeplasser: 4,
        ledig_jul: false,
        ledig_vinter: false,
        ledig_paaske: true
    },
    {
        navn: "Granbo",
        bilde: "granbo.jpg",
        ukepris: 15000,
        badstue: "Nei",
        standard: "Middels",
        sengeplasser: 6,
        ledig_jul: true,
        ledig_vinter: true,
        ledig_paaske: false
    },
    {
        navn: "Grantoppen",
        bilde: "grantoppen.jpg",
        ukepris: 16000,
        badstue: "Nei",
        standard: "Lav",
        sengeplasser: 8,
        ledig_jul: false,
        ledig_vinter: true,
        ledig_paaske: false
    },
    {
        navn: "Granhaug",
        bilde: "granhaug.jpg",
        ukepris: 30000,
        badstue: "Ja",
        standard: "Høy",
        sengeplasser: 10,
        ledig_jul: false,
        ledig_vinter: true,
        ledig_paaske: false
    }
];

// HTML-elementer
const velgFerie = document.querySelector("#velgFerie");
const oversikt = document.querySelector("#oversikt");
const overlay = document.querySelector("#overlay");


// Funksjon for å booke en hytte
function book(navn, ferie) {

    // Finner hytte som er valgt
    const hytte = hytter.find(hytte => hytte.navn === navn);    

    // Setter denne hytta til "ikke ledig" for valgt ferie
    if(ferie === "jul") {
        hytte.ledig_jul = false;
    }
    else if(ferie === "vinter") {
        hytte.ledig_vinter = false;
    }
    else if(ferie === "paaske") {
        hytte.ledig_paaske = false;
    }

    // Slenger på en bekreftelse på at en hytte er booket:
    overlay.style.display = "flex";

    // Tar den bare bort etter et par sekunder
    setTimeout( () => {
        overlay.style.display = "none";
    }, 2000 );

    // Oppdatere oversikten
    visLedigeHytter();

}

// Funksjon som viser ledige hytter for valgt ferie
// Legger resultatet i section oversikt
function visLedigeHytter() {

    // Nuller ut oversikten
    oversikt.innerHTML = "";

    if(velgFerie.value === "") {
        return;
    }
 

    // Finner ledige hytter
    let ledige_hytter;

    // Filtrerer etter ledige hytter for valgt sesong
    if(velgFerie.value === "jul") {
        ledige_hytter = hytter.filter(hytte => hytte.ledig_jul);
    }
    else if(velgFerie.value === "vinter") {
        ledige_hytter = hytter.filter(hytte => hytte.ledig_vinter);
    }
    else if(velgFerie.value === "paaske") {
        ledige_hytter = hytter.filter(hytte => hytte.ledig_paaske);
    }  
    
    // Hvis det ikke er noen ledige hytter opplyser vi om dette
    if(ledige_hytter.length === 0) {
        oversikt.innerHTML = `<p style="grid-column: span 2">Det er ingen ledige hytter for denne ferien</p>`;
    }

    // Legger inn oversikt over ledige hytter
    for(const hytte of ledige_hytter) {
        oversikt.innerHTML += `
            <article>       
                <img src="./bilder/${hytte.bilde}">
                <h2>${hytte.navn}</h2>
                <p>Sengeplasser: ${hytte.sengeplasser}</p>
                <p>Standard: ${hytte.standard}</p>
                <p>Badstue: ${hytte.badstue}</p>
                <p>Ukepris: ${hytte.ukepris}</p>
                <button onclick="book('${hytte.navn}', '${velgFerie.value}')" class="button expanded">Book denne hytta</button>
            </article>
        `;
    }


}


// Event Listener
velgFerie.onchange = visLedigeHytter;