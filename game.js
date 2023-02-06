let cardElementsRefArray = document.getElementsByClassName("front");
let cardOne;
let cardTwo;
for(let i=0; i<cardElementsRefArray.length; i++){
    cardElementsRefArray[i].onclick = imageReveal;
}
let clickedCount = 0;
let clickedImages = [];
function imageReveal(eventObj){
    let clickedImage = eventObj.target;
    clickedImage.style.display = "none";
    clickedCount++;
    clickedImages.push(clickedImage);
    if(clickedCount==2) {
        setTimeout(checkIfBothImagesAreMatching, 3000);
    }
}
function checkIfBothImagesAreMatching(clickedImage) {
    if(clickedImages[0].nextElementSibling.src==clickedImages[1].nextElementSibling.src){
        console.log("cards were Matched");
    }
    else{
        clickedImages[0].style.display = "inline-block";
        clickedImages[1].style.display = "inline-block";  
    }
    clickedCount=0;
    clickedImages = [];   
}
