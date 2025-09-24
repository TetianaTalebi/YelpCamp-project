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

// toggleHiddenClass function accepts the number of the currently active page and toggle .hidden class of the campground cards (to show only that cards that relate to the currently active page)

function toggleHiddenClass(ActivePageNum){
    // The first element in the collection of elements (i.e. campground cards) has index 0
    // Define index of the first visible element (campground card) at the current page
    let firstElOfCurPageIndex = (ActivePageNum-1)*campsPerPage;

    // Grab all el-s from paginated container
    const allPaginatedEls = document.querySelectorAll('#paginated > .campground-card');

    for (let i = 0; i<campsPerPage; i++) {
        // if an element exists (i.e. is not undefined) toggle its class .hidden
        if(allPaginatedEls[firstElOfCurPageIndex + i]){
        allPaginatedEls[firstElOfCurPageIndex + i].classList.toggle('hidden');
        }
    }
}

// nextPreviousBtns() function deactivates '#previsousPage' button (<<) when the current active page is 1
// and this function also deactivates '#nextPage' button (>>) if the current active page is equal to totalPages

function nextPreviousBtns(activePageNum){
    // if activePageNum == 1, disable '#previousPage' button
    const previousPageEl = document.querySelector('#previousPage');
    if (activePageNum==1){
        if(!previousPageEl.classList.contains('disabled')){
            previousPageEl.classList.add('disabled');
        }
    } else {
        if(previousPageEl.classList.contains('disabled')){
            previousPageEl.classList.remove('disabled');
        }
    }

    // if pageNum == totalPages, disable '#nextPage' button
    const nextPageEl = document.querySelector('#nextPage');
    if(activePageNum==totalPages){
        if(!nextPageEl.classList.contains('disabled')){
            nextPageEl.classList.add('disabled');
        }
    } else {
        if(nextPageEl.classList.contains('disabled')){
            nextPageEl.classList.remove('disabled');
        }
    }
}

function hideElsPrevPage(){
    // Find previous active page 
    let previousActivePageNumber = findActivePageNumber();

    // Hide previous page elements (i.e. toggle .hidden class)
    toggleHiddenClass(previousActivePageNumber);

    // Remove active class from previous page
    document.querySelector('.page.active').classList.remove('active');

    return previousActivePageNumber;
}

function showElsCurrPage(){
    // Grab the li element with classes .page.active
    // Find value of this element span child
    
    let curPageNumber = findActivePageNumber();

    nextPreviousBtns(curPageNumber);

    toggleHiddenClass(curPageNumber);
    
}


