//const text = "L'Ateniese Milziade, figlio di Cimone, spiccava fra tutti sia per l'antichità della stirpe, sia per la gloria degli antenati, sia per la propria saggezza ed aveva un'età tale che i suoi concittadini potevano non più solo concepire buone speranze su di lui, ma anche confidare che sarebbe stato quale ebbero poi modo, alla prova, di riscontrare, quando gli Ateniesi decisero di inviare dei coloni nel Chersoneso. Ce n'era un grande numero e molti chiedevano di partecipare alla spedizione, tra loro ne furono scelti alcuni e inviati a Delfi per consultare l'oracolo di Apollo su chi dovessero preferire come comandante. Quelle regioni infatti le occupavano allora i Traci e con loro bisognava combattere. La Pizia in risposta a chi la interrogava, ordinò espressamente che si prendessero come capo Milziade: se lo avessero fatto, l'impresa avrebbe avuto buon esito. In seguito al responso dell'oracolo, Milziade con truppe scelte parti con la flotta per il Chersoneso e, approdato a Lemno voleva ridurre gli abitanti dell'isola sotto il dominio degli Ateniesi e chiese ai Lemnii di arrendersi spontaneamente; quelli, schernendolo, risposero che lo avrebbero fatto quando lui, salpato con la flotta da casa sua, avesse raggiunto Lemno con il vento di tramontana. Questo vento infatti sorgendo da settentrione tiene la direzione contraria per chi parte da Atene. Milziade, non avendo tempo di trattenersi, indirizzò la rotta verso la sua meta e arrivò nel Chersoneso."

// const p1 = document.getElementById("stats-paragraph");
// p1.innerHTML += "<strong><h2>Dati:</h2></strong>";

//generateStats(text, p1);

function startClean() {
    const p1 = document.getElementById("stats-paragraph");
    const p3 = document.getElementById("search-result");
    const t1 = document.getElementById("insert-test");
    const b1 = document.getElementById("clear-button");

    p1.innerHTML = "";
    t1.value = "";

    b1.style.visibility = "hidden";
}

function startExame() {
    const userText = document.getElementById("insert-test");
    const p1 = document.getElementById("stats-paragraph");
    const b1 = document.getElementById("clear-button");
    b1.style.visibility = "visible";
    p1.innerHTML = "";
    p1.innerHTML += "<strong><h2>Dati:</h2></strong>";
    generateStats(userText.value, p1);
}

function generateStats(textToExamine, tag) {
    const charNumber = textToExamine.length; // 1) Lunghezza testo in esame.
    const arrayFromClearedString = cleanStringFromPunctuationAndConvertInArray(textToExamine); // Leva tutta la punteggiatura, lascia gli spazie e divide la stringa in array di parole (con lo spazio come separatore)
    const wordsNumber = arrayFromClearedString.length; // Conto le parole totali nel testo, dopo averlo pulito.
    const wordOccurrency = generateOccurrencyCount(arrayFromClearedString); // Conta le occorrenze di ogni parola presente nel testo, dopo averlo pulito dalla punteggiatura.
    const charOccurrency = generateOccurrencyCount([...textToExamine]); // Conto le occorrenze di ogni carattere nel testo, nella sua versione originale, quella con spazi e punteggiatura.
    
    tag.innerHTML += "<br><strong>- Lunghezza: </strong>" + charNumber + (charNumber === 1 ? " carattere.<br>" : " caratteri<br>");
    tag.innerHTML += "<br><strong>- Parole (spazi inclusi e senza punteggiatura): </strong>" + wordsNumber + "<br>";

    tag.innerHTML += "<br><strong>- Occorrenze caratteri: </strong><br>";
    tag.innerHTML += "<ul>";
    for (const key in charOccurrency) {
        if (Object.hasOwnProperty.call(charOccurrency, key)) {
            const count = charOccurrency[key];
            tag.innerHTML += "<li><strong>" + (key === ' ' ? 'spazio' : key) + "</strong> si ripete <strong>" + count + "</strong>" + (count === 1 ? " volta." : " volte.");
        }
    }
    tag.innerHTML += "</ul>";

    tag.innerHTML += "<br><strong>- Occorrenze parole: </strong><br>";
    tag.innerHTML += "<ul>";
    for (const key in wordOccurrency) {
        if (Object.hasOwnProperty.call(wordOccurrency, key)) {
            const count = wordOccurrency[key];
            tag.innerHTML += "<li><strong>" + key + "</strong> si ripete <strong>" + count + "</strong>" + (count === 1 ? " volta." : " volte.");
        }
    }
    tag.innerHTML += "</ul>";
}

function cleanStringFromPunctuationAndConvertInArray(string) {
    // Versione semplice, con i caratteri speciali del testo predefinito
    //let replacedString = string.replace(/[,;\.:]/g , '');

    // Versione più raffinata, con più caratteri speciali di quelli del testo predefinito
    let replacedString = string.replace(/[&\/\\#,+()$~%.'":*?<>{};]/g , '');    
    let replacedString2 = replacedString.replace(/'/g, " ");
    const stringArray = replacedString2.split(" ");
    return stringArray;
}

function generateOccurrencyCount(words) {
    let report = {};
    for (let i = 0; i < words.length; i++) {
        if (report[words[i]] === undefined) {
            report[words[i]] = 1;
        } else {
            report[words[i]]++;
        }
    }
    return report;
}

function findAllIndexes(string, word) {
    let result = [];
    let index = 0;
    let textToSearch = string;
    while (true) {
        index = textToSearch.toLowerCase().indexOf(word.toLowerCase());
        if (index === -1) {
            break;
        }
        else {
            result.push(index);
            textToSearch = textToSearch.substring(index + word.length);
        }
    }
    return result;
}

function startSearch() {
    const wordToSearch = prompt("inserisci la parola da cercare:");
    const arrayOfIndex = findAllIndexes(text, wordToSearch);
    const p2 = document.getElementById("search-divider");
    const p3 = document.getElementById("search-result");

    p2.style.display = "block";
    p3.style.display = "block";

    p3.innerHTML = "";

    p3.innerHTML += "<strong><h2>Risultati ricerca:</h2></strong><br>";

    if (arrayOfIndex.length === 0) {
        p3.innerHTML += "Non è stato trovato niente per <strong>" + wordToSearch + "<strong>.";
    } else {
        p3.innerHTML += "<strong>" + wordToSearch + "</strong> si ripete <strong>" + arrayOfIndex.length + "</strong> " + (arrayOfIndex.length === 1 ? " volta." : " volte.");
    }
}