

const loadBook = function(filename, displayname){
    let currentBook = "";
    let url = "books/" + filename;

    document.getElementById("fileName").innerHTML = displayname;
    document.getElementById("searchstat").value = "";
    document.getElementById("keyword").value = "";

    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true );
    xhr.send();

    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
            currentBook = xhr.responseText;
            
            getDocStats(currentBook);

            currentBook = currentBook.replace(/(?:\r\n|\r|\n)/g, '<br>');            
            
            //console.log(currentBook);
            document.getElementById("fileContent").innerHTML = currentBook;

            let el = document.getElementById("fileContent");
            el.scrollTop = 0;

        }
    }
}

const sortProperties = function(obj){
    let rtnArray = Object.entries(obj)
    
    rtnArray.sort(function(first, second){
        return second[1] - first[1];
    });
    return rtnArray;
}





const ULTemplate = function(items, element){
    let rowTemplate = document.getElementById('template-ul-items');
    let templateHTML = rowTemplate.innerHTML;
    let resultsHTML = "";

    for (i = 0; i < items.length - 1; i++) {
        resultsHTML += templateHTML.replace('{{val}}', items[i][0] + ": " + items[i][1] + " time(s)");

    }
    element.innerHTML = resultsHTML;
    //console.log(element);

}


const getDocStats = function(fileContent){
    let docLength = document.getElementById("docLength");
    let wordCount = document.getElementById("wordCount");
    let charCount = document.getElementById("charCount");

    let text = fileContent.toLowerCase();
 

    let wordArray = text.match(/\b\S+\b/g);
    let wordDictionary = {};

    let uncommonWords = [];
    uncommonWords = filterStopWords(wordArray);



    for(let i in uncommonWords){
        let wordValue = uncommonWords[i];
    
        if(wordDictionary[wordValue] > 0){
            // The first time - the value is 0 so it goes to the else statement. When it is 1, it goes to the if block.
            wordDictionary[wordValue] += 1;
        }
        else{
            wordDictionary[wordValue] = 1;
        }
        
    }
    let wordList = sortProperties(wordDictionary);
    //console.log(wordList);
    let top5words = wordList.slice(0, 6);
  //  console.log(top5words);
    let least5words = wordList.slice(-6, wordList.length);
    let mostUsed = document.getElementById('mostUsed');
    let leastUsed = document.getElementById('leastUsed');
    ULTemplate(top5words, document.getElementById('mostUsed'));
    ULTemplate(least5words, document.getElementById('leastUsed'));

    docLength.innerText = "Document Length: " + text.length;
    wordCount.innerText = "Word Count: " + wordArray.length;
}

const filterStopWords = function(wordArray){
    let commonWords = getStopWords();
    let commonObj = {};
    let uncommonArr = [];

    for (i = 0; i < commonWords.length; i++) {
        commonObj[commonWords[i].trim()] = true;
        //commonWords.map(i => { commonObj[commonWords[i].trim()] = true; })

    }

    for (i = 0; i < wordArray.length; i++){
        word = wordArray[i].trim().toLowerCase();
        if(!commonObj[word]){
            uncommonArr.push(word);
        }
    }
    return uncommonArr;
}

function getStopWords() {
    return ["a", "able", "about", "across", "after", "all", "almost", "also", "am", "among", "an", "and", "any", "are", "as", "at", "be", "because", "been", "but", "by", "can", "cannot", "could", "dear", "did", "do", "does", "either", "else", "ever", "every", "for", "from", "get", "got", "had", "has", "have", "he", "her", "hers", "him", "his", "how", "however", "i", "if", "in", "into", "is", "it", "its", "just", "least", "let", "like", "likely", "may", "me", "might", "most", "must", "my", "neither", "no", "nor", "not", "of", "off", "often", "on", "only", "or", "other", "our", "own", "rather", "said", "say", "says", "she", "should", "since", "so", "some", "than", "that", "the", "their", "them", "then", "there", "these", "they", "this", "tis", "to", "too", "twas", "us", "wants", "was", "we", "were", "what", "when", "where", "which", "while", "who", "whom", "why", "will", "with", "would", "yet", "you", "your", "ain't", "aren't", "can't", "could've", "couldn't", "didn't", "doesn't", "don't", "hasn't", "he'd", "he'll", "he's", "how'd", "how'll", "how's", "i'd", "i'll", "i'm", "i've", "isn't", "it's", "might've", "mightn't", "must've", "mustn't", "shan't", "she'd", "she'll", "she's", "should've", "shouldn't", "that'll", "that's", "there's", "they'd", "they'll", "they're", "they've", "wasn't", "we'd", "we'll", "we're", "weren't", "what'd", "what's", "when'd", "when'll", "when's", "where'd", "where'll", "where's", "who'd", "who'll", "who's", "why'd", "why'll", "why's", "won't", "would've", "wouldn't", "you'd", "you'll", "you're", "you've"];
}

const performMark = function(){
    let keyword = document.getElementById('keyword').value;
    let display = document.getElementById('fileContent');

    let newContent = "";

    let spans = document.querySelectorAll('mark');

    for (i = 0; i < spans.length; i++){
        spans[i].outerHTML = spans[i].innerHTML
    }

    let re = new RegExp(keyword, "gi");
    //console.log(re);
    let replaceText = "<mark id = 'markme'>$&</mark>";
    let bookContent = display.innerHTML;

    newContent = bookContent.replace(re, replaceText);

    display.innerHTML = newContent; 
    let count = document.querySelectorAll('mark').length;
    document.getElementById('searchstat').innerHTML = "Found " + count + " matches.";

    if(count > 0){
        let element = document.getElementById('markme');
        element.scrollIntoView();

    }
}





