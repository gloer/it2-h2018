
// HTML-elementer
const skjemaHeiskort = document.querySelector("#skjemaHeiskort");
const velgAlder = document.querySelector("#velgAlder");
const velgAntallDager = document.querySelector("#velgAntallDager");
const info = document.querySelector("#info");

// Konstanter
const PRIS_BARN = 100;
const PRIS_VOKSEN = 200;
const MAKS_PRIS_BARN = 500;
const MAKS_PRIS_VOKSEN = 1000;


// Funksjoner
function beregnPris(evt) {
    evt.preventDefault();

    const aldersgruppe = velgAlder.value;
    const antallDager = Number(velgAntallDager.value);
    
    if(aldersgruppe === "Barn")  {
        let prisUtenRabatt = PRIS_BARN * antallDager;
        let pris = prisUtenRabatt;
        let rabatt = prisUtenRabatt - MAKS_PRIS_BARN;
        if(rabatt > 0) {
            pris = MAKS_PRIS_BARN;
        } else {
            rabatt = 0;
        }

        info.innerHTML = `
            <h2>Pris for ditt heiskort</h2>
            <p><strong>Type heiskort:</strong> ${aldersgruppe} </p>
            <p><strong>Antall dager:</strong> ${antallDager} </p> 
            <p><strong>Pris: kr. </strong> ${pris} </p>
            <p>Det er gitt kr. <strong>${rabatt}</strong> i rabatt. </p>
        `;
    } else {
        let prisUtenRabatt = PRIS_VOKSEN * antallDager;
        let pris = prisUtenRabatt;
        let rabatt = prisUtenRabatt - MAKS_PRIS_VOKSEN;
        if(rabatt > 0) {
            pris = MAKS_PRIS_VOKSEN;
        } else {
            rabatt = 0;
        }

        info.innerHTML = `
            <h2>Pris for ditt heiskort</h2>
            <p><strong>Type heiskort:</strong> ${aldersgruppe} </p>
            <p><strong>Antall dager:</strong> ${antallDager} </p> 
            <p><strong>Pris: kr. </strong> ${pris} </p>
            <p>Det er gitt kr. <strong>${rabatt}</strong> i rabatt. </p>
        `;


    }


}


// Event Listener
skjemaHeiskort.addEventListener("submit", beregnPris);