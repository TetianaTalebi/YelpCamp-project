const showMapBtn = document.querySelector('#showMapBtn');

const showPriceBtn = document.querySelector('#showPriceBtn');

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

showMapBtn.addEventListener('click', clickOnShowMap);

showPriceBtn.addEventListener('click', clickOnShowPrice);