const showMapBtn = document.querySelector('#showMapBtn');

const showPriceBtn = document.querySelector('#showPriceBtn');

const showCampDescription = document.querySelector('#showCampDescription');
let showCampDescrText = showCampDescription.innerText;
// console.log(showCampDescrText);

function clickOnShowMap() {
    const showHideMap = document.querySelector('#showHideMap');
    showHideMap.classList.remove('hidden');
    showMapBtn.classList.add('hidden');
}

function clickOnShowPrice(){
    const showHideCampPriceTaxes = document.querySelector('#showHideCampPriceTaxes');
    showHideCampPriceTaxes.classList.remove('hidden');
    showPriceBtn.classList.add('hidden');
}

function displayCampDescription(){
    if (showCampDescription.classList.contains('showCampDescrShort')){
        showCampDescription.innerText = showCampDescrText.slice(0, 475) + '...';  
    }
}

window.addEventListener('load', displayCampDescription);

showMapBtn.addEventListener('click', clickOnShowMap);

showPriceBtn.addEventListener('click', clickOnShowPrice);