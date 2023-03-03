let cardElementsRefArray = document.getElementsByClassName("front");
let gameContainer = document.querySelector(".game-container");
let restartButton = document.createElement("button");
restartButton.innerHTML='<button id = "btn" type = "button">Restart</button>';
restartButton.classList.add("restartBtn");
let successMessage = "Great!!! cards were Matched";
let matched = document.querySelector(".matched");
let faliureMessage = "Sorry!!! BetterLuck next time";
let unmatched = document.querySelector(".unmatched");
let missed = document.querySelector(".text");
let missedcount=0;

for(let i=0; i<cardElementsRefArray.length; i++){
    cardElementsRefArray[i].onclick = imageReveal;
}
let clickedCount = 0;
let clickedImages = [];

function imageReveal(eventObj){
    unmatched.innerHTML = "";
    let clickedImage = eventObj.target;
    if(clickedCount<=1) {
        clickedImage.classList.add('hide');
        // clickedImage.style.display = "none";
        clickedCount++;
        clickedImages.push(clickedImage);
    }
    console.log(clickedImages);
    if(clickedCount==2) {
        setTimeout(checkIfBothImagesAreMatching, 2000);  
    }
}
function checkIfBothImagesAreMatching(clickedImage) {
 
    if(clickedImages[0].nextElementSibling.src==clickedImages[1].nextElementSibling.src) {
        matched.innerHTML = successMessage;
        for(let i=0; i<cardElementsRefArray.length; i++){ //this loop for once the user match the cards game should be over//
            cardElementsRefArray[i].onclick = null;
        }
        gameContainer.appendChild(restartButton);
        // restartButton.style.display = "inline-block";
        restartButton.classList.remove('hide');
        restartButton.onclick = restart;
    }
    else{
        missedcount++;
        missed.innerHTML = missedcount;
        unmatched.innerHTML = faliureMessage;
        resetGame();
    }
}

function restart() { 
    
    for(let i=0; i<cardElementsRefArray.length; i++){
        cardElementsRefArray[i].onclick = imageReveal;
    }
    resetGame();
    restartButton.classList.add('hide');
    // restartButton.style.display = "none";
    matched.innerHTML="";
    missedcount = 0;
}

function resetGame() {
    clickedImages.forEach(imgRef => imgRef.classList.remove('hide'));
    clickedCount = 0;
    clickedImages = [];
    
}

// function shuffleImages() {
//     let array = [1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8];
//     array.sort(()=>Math.random()>0.5?1:-1);
//     for(let i=0; i<cardElementsRefArray.length; i++){
//         cardElementsRefArray[i].onclick = imageReveal;
//         let imgTag = cardElementsRefArray[i].nextElementSibling;
//         imgTag.src=`../../../images for apps/images/${array[index]}.jpeg`;
//     }

let clientId = "frLrUyOk0srtvEwr3DbfpKx5SU5S3vqapKVZaWl45H0";
let endPoint = `https://api.unsplash.com/photos/random?client_id=${clientId}&count=8`;
let imageElemnts = document.querySelectorAll(".back");


fetch(endPoint)
.then(function(response) {
    return response.json();
})
.then(function(finalResponse) {
    console.log(finalResponse);
    // console.log(finalResponse.map(responseimgObject => responseimgObject.urls.thumb));
    let generateRandomPlaces = [...finalResponse,...finalResponse]; //spread operator//
    let randomNumbers = [];
    for(let i=0; i<imageElemnts.length; i++) {
        let randomLoc1 = Math.floor(Math.random()*16);
        for(let j=0; j<randomNumbers.length; j++) {
            if(randomNumbers[j]==randomLoc1){
                randomLoc1 = Math.floor(Math.random()*16);
                j=-1;
            }
        }
        randomNumbers.push(randomLoc1);
        imageElemnts[i].src = generateRandomPlaces[randomNumbers[i]].urls.thumb;
        // imageElemnts[i].src = finalResponse[randomNumbers[i]].urls.thumb;
        // imageElemnts[i].src = finalResponse[randomNumbers[i]].urls.thumb;

    }
    console.log(randomNumbers);
});
 

