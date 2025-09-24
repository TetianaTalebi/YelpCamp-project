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

function addActiveClassToPage(activePageNum){
    // Add class .active to li.page element that has as a firstChild a span element with innerText that is equal to 'activePageNum'
    // Grab all li el-s with class .page
    // Iterate over them and to check whether their first child inner text equal to currentPageNum
    // if yes, give this li element class .active
            const myLis = document.querySelectorAll('.page');
            for (let myLi of myLis){
                if(myLi.children[0].innerText==activePageNum){
                    myLi.classList.add('active');
                }
            }
}

function changePageBtnsInnerText(curPageN){
    // The total number of page btn-s
    const allPageBtns = document.querySelectorAll('.page');
    let totalNumPageBtns = allPageBtns.length;

    let centerPageBtnIndex = Math.floor(totalNumPageBtns/2);

    switch (true){
        case (curPageN<=centerPageBtnIndex):
            for(let i=0; i<totalNumPageBtns; i++){
                if(allPageBtns[i]){
                    allPageBtns[i].children[0].innerText=i+1;
                }  
            }
            break;
        case (totalPages-curPageN<centerPageBtnIndex):
            // Create tempTotalPages in order to not change the value of global variable totalPages
            let tempTotalPages = totalPages;
            for(let i=totalNumPageBtns-1; i>=0; i--){
                if(allPageBtns[i]){
                    allPageBtns[i].children[0].innerText=tempTotalPages--;
                }
            }
            break;
        default:
            let tempCurPage1 = curPageN;
            
            let i = centerPageBtnIndex;
            while (i>=0){
                if(allPageBtns[i]){
                    allPageBtns[i].children[0].innerText=tempCurPage1--;  
                }
                i--;
            }
            let tempCurPage2 = curPageN;
            let j= centerPageBtnIndex+1;
            while (j<totalNumPageBtns){
                if(allPageBtns[j]){
                    allPageBtns[j].children[0].innerText=++tempCurPage2;
                }
                j++;
            }
    }
    
}

function clickOnPageBtn(){
        
        hideElsPrevPage();

        // Add active class to clicked page button
        this.classList.add('active');

        // Find the number of the page that was clicked
        let clickedPageNum = findActivePageNumber();

        nextPreviousBtns(clickedPageNum);

        toggleHiddenClass(clickedPageNum);
}

function clickOnPrevious(){
        if (!this.classList.contains('disabled')){
            // hide elements previous page
            // find prev page number

            let previousPageNum = hideElsPrevPage();

            let currentPageNum = previousPageNum-1;

            // Move to the page currentPageNum
            toggleHiddenClass(currentPageNum);

            // Deactivate previous if current page number == 1
            // Deactivate next if current page num == total pages
            nextPreviousBtns(currentPageNum);

            // Align page buttons in order the current active btn will be in the list
            changePageBtnsInnerText(currentPageNum);

            // Add class active to currentPageNum
            addActiveClassToPage(currentPageNum);
        }
    }

    function clickOnNext(){
        if (!this.classList.contains('disabled')){

            // hide elements previous page
            // find prev page number
            let previousPageNum = hideElsPrevPage();

            let curPageNum = previousPageNum+1;

            // Move to the page curPageNum
            toggleHiddenClass(curPageNum);

            // Deactivate previous if current page number == 1
            // Deactivate next if current page num == total pages
            nextPreviousBtns(curPageNum);
            
            // Align page buttons in order the current active btn will be in the list
            changePageBtnsInnerText(curPageNum);

            // Add class active to currentPageNum
            addActiveClassToPage(curPageNum);
        }
    }

 window.addEventListener('load', showElsCurrPage());

// Grab all page buttons
const allPageButtons = document.querySelectorAll('.page');

// Add event listener to the each page button
for (let pageButton of allPageButtons){
    pageButton.addEventListener('click', clickOnPageBtn);
}

// Add event listener to previousPage button
const prevPage = document.querySelector('#previousPage');
prevPage.addEventListener('click', clickOnPrevious);

// Add event listener to nextPage button
const nextPage = document.querySelector('#nextPage');
nextPage.addEventListener('click', clickOnNext);



