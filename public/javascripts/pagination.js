// The total number of campgrounds at one 'All Campgrounds' page
let campsPerPage = 10;

// The total qu-ty of campgrounds that app has
// totalCamps was defined in campgrounds/index.ejs template
let totalQtyCamps = totalCamps;

// The total qu-ty of pages
let totalPages = Math.ceil(totalQtyCamps/campsPerPage);

// Find our which page is active and show campgrounds that relate to the active page (i.e. toggle .hidden class)

function findActivePageNumber(){
    const curPageLiActive = document.querySelector('.page.active');
    return Number(curPageLiActive.children[0].innerText);
}
