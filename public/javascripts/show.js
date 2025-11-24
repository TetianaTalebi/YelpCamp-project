const showMapBtn = document.querySelector('#showMapBtn');

const showPriceBtn = document.querySelector('#showPriceBtn');

const readMoreBtns = document.querySelectorAll('.readMore');


const showCampDescription = document.querySelector('#showCampDescription');
let showCampDescrText = showCampDescription.innerText;
// console.log(showCampDescrText);

function clickOnShowMap() {
    const showHideMap = document.querySelector('#showHideMap');
    showHideMap.classList.remove('hidden');
    showMapBtn.classList.add('hidden');
}

function clickOnShowPrice(){
    const showHideCampPriceTaxes = document.querySelector('#hidePriceWrapper');
    showHideCampPriceTaxes.classList.remove('hidden');
    showPriceBtn.classList.add('hidden');
}

function displayCampDescription(){
    if (showCampDescription.classList.contains('showCampDescrShort')){
        showCampDescription.innerText = showCampDescrText.slice(0, 475) + '...';  
    }
    if (showCampDescription.classList.contains('showCampDescrLong')){
        showCampDescription.innerText = showCampDescrText;
    }
}

function clickOnReadMore(){
    this.classList.add('hidden');
    const textSpan=this.parentElement.querySelector('span');
    if(textSpan.classList.contains('showCampDescrShort')){
        textSpan.classList.remove('showCampDescrShort');
        textSpan.classList.add('showCampDescrLong');
    }
    displayCampDescription();   
}

window.addEventListener('load', displayCampDescription);

showMapBtn.addEventListener('click', clickOnShowMap);

showPriceBtn.addEventListener('click', clickOnShowPrice);

for (let readMoreBtn of readMoreBtns){
    if(readMoreBtn){
        readMoreBtn.addEventListener('click', clickOnReadMore);
    }
}
