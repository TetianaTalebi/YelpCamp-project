// The total number of campgrounds at one 'All Campgrounds' page
// This value will depend from the window.innerWidth
let campsPerPage;

// This variable keeps the value of previousCampsPerPage (the initial value is -1)
// (i.e. how many camps per page were before the last window.innerWidth change happened)
let previousCampsPerPage = -1;

// The total qu-ty of campgrounds that app has
// totalCamps was defined in campgrounds/index.ejs template
let totalQtyCamps = totalCamps;

// The total qu-ty of pages (it depends from the total qu-ty of campgrounds and qu-ty of campgrounds per 1 page)
let totalPages;

//  This function defines window width and value of campsPerPage (campsPerPage is global variable)
function defineWindowWidthAndCampsPerPage(){
    let windowWidth = window.innerWidth;

    switch (true){
        case (windowWidth > 1200): 
            campsPerPage = 16;
        break;
        case (windowWidth > 800): 
            campsPerPage = 3;
        break;
        default:
            campsPerPage = 1;
    }
    // totalPages is global variable
    totalPages = Math.ceil(totalQtyCamps/campsPerPage);
}


// Find out which page is active and show campgrounds that relate to the active page (i.e. toggle .hidden class)
// When the pages is loaded very first time the active page is 1

function findActivePageNumber(){
    // Grab the li element with classes .page.active
    // Find innerText value of this element's [0] child

    const curPageLiActive = document.querySelector('.page.active');
    return Number(curPageLiActive.children[0].innerText);
}

// toggleHiddenClass function accepts the number of the page that is currently active and toggle .hidden class of the campground cards (to show only that cards that relate to the currently active page)
// Before toggleHiddenClass runs, all campground cards has class .hidden

function toggleHiddenClass(activePageNum, qtyCampsPerPage){
    // The first element in the collection of elements (i.e. campground cards) has index 0
    // Define index of the first visible element (campground card) at the current page
    let firstElOfCurPageIndex = (activePageNum-1)*qtyCampsPerPage;

    // Grab all el-s from paginated container
    const allPaginatedEls = document.querySelectorAll('#paginated > .campground-card-wrapper');


    for (let i = 0; i<qtyCampsPerPage; i++) {
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
        // else activePageNum != 1, remove class .disabled from '#previousPage' button if it has this class
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
        // else pageNum != totalPages, remove class .disabled from '#nextPage' button if it has this class
        if(nextPageEl.classList.contains('disabled')){
            nextPageEl.classList.remove('disabled');
        }
    }
}

function hideElsPrevPage(qtyCampsPerPage){
    // Find previous active page (i.e. the page that has class .active before that class was removed and another page becomes active)
    let previousActivePageNumber = findActivePageNumber();

    // Hide previous page elements (i.e. toggle .hidden class)
    // After running toggleHiddenClass all campground cards become hidden
    toggleHiddenClass(previousActivePageNumber, qtyCampsPerPage);

    // Remove active class from previous page
    document.querySelector('.page.active').classList.remove('active');

    return previousActivePageNumber;
}

// Before showElsCurrPage runs, all elements (i.e. all campground cards) are hidden (i.e. all campground cards have class .hidden)
function showElsCurrPage(qtyCampsPerPage) {
    
    let curPageNumber = findActivePageNumber();

    nextPreviousBtns(curPageNumber);

    // At this moment all campground cards have class .hidden
    toggleHiddenClass(curPageNumber, qtyCampsPerPage);

    // Save the quantity of campground cards per page in global variable previousCampsPerPage
    previousCampsPerPage = qtyCampsPerPage;  
}

function showElsCurrPage2(){
    // Run this code only if the quantity of campground cards per page have been changed
    if (previousCampsPerPage != campsPerPage){
        // Find active page
        let activePageNumber = findActivePageNumber();

        // Hide campground cards that relate to activePageNumber and PREVIOUS VALUE OF camps per page
        // After running toggleHiddenClass all campground cards become hidden
        toggleHiddenClass(activePageNumber, previousCampsPerPage);

        // Now when all campground cards are hidden, show only that camp cards that correspond to the active page number and CURRENT VALUE OF camps per page
       showElsCurrPage(campsPerPage);
    } 
}

function addActiveClassToPage(activePageNum){
    // Add class .active to li.page element that has as a firstChild "a" element with innerText that is equal to 'activePageNum'
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

function changePageBtnsInnerText(activePageNum){
   
    // The total number of page btn-s
    const allPageBtns = document.querySelectorAll('.page');
    let totalNumPageBtns = allPageBtns.length;

    let centerPageBtnIndex = Math.floor(totalNumPageBtns/2);

    switch (true){
        case (activePageNum<=centerPageBtnIndex):
            for(let i=0; i<totalNumPageBtns; i++){
                if(allPageBtns[i]){
                    allPageBtns[i].children[0].innerText=i+1;
                }  
            }
            break;
        case (totalPages-activePageNum<centerPageBtnIndex):
            // Create tempTotalPages in order to not change the value of global variable totalPages
            let tempTotalPages = totalPages;
            for(let i=totalNumPageBtns-1; i>=0; i--){
                if(allPageBtns[i]){
                    allPageBtns[i].children[0].innerText=tempTotalPages--;
                }
            }
            break;
        default:
            let tempCurPage1 = activePageNum;
            
            let i = centerPageBtnIndex;
            while (i>=0){
                if(allPageBtns[i]){
                    allPageBtns[i].children[0].innerText=tempCurPage1--;  
                }
                i--;
            }
            let tempCurPage2 = activePageNum;
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
        
        hideElsPrevPage(campsPerPage);

        // Add active class to clicked page button
        this.classList.add('active');

        // Find the number of the page that was clicked
        let clickedPageNum = findActivePageNumber();

        nextPreviousBtns(clickedPageNum);

        toggleHiddenClass(clickedPageNum, campsPerPage);
}

function clickOnNextPrevious(qtyOfPagesToMove){

    if (!this.classList.contains('disabled')){
            // hide elements previous page
            // find prev page number

            let previousPageNum = hideElsPrevPage(campsPerPage);

            let currentPageNum = previousPageNum + qtyOfPagesToMove;
            console.log(currentPageNum);

            // Move to the page currentPageNum
            // Remove class .hidden from the elements that belong to the current page
            toggleHiddenClass(currentPageNum, campsPerPage);

            // Deactivate previous button (i.e. "<<" button) if current page number == 1
            // Deactivate next button (i.e. ">>" button) if current page num == total pages
            nextPreviousBtns(currentPageNum);

            // Align page buttons in order the current active btn will be in the list
            changePageBtnsInnerText(currentPageNum);

            // Add class .active to currentPageNum
            addActiveClassToPage(currentPageNum);
        }
}

// handles click on '<<' button
// function clickOnPrevious(){
//         if (!this.classList.contains('disabled')){
//             // hide elements previous page
//             // find prev page number

//             let previousPageNum = hideElsPrevPage(campsPerPage);

//             let currentPageNum = previousPageNum-1;

//             // Move to the page currentPageNum
//             // Remove class .hidden from the elements that belong to the current page
//             toggleHiddenClass(currentPageNum, campsPerPage);

//             // Deactivate previous button (i.e. "<<" button) if current page number == 1
//             // Deactivate next button (i.e. ">>" button) if current page num == total pages
//             nextPreviousBtns(currentPageNum);

//             // Align page buttons in order the current active btn will be in the list
//             changePageBtnsInnerText(currentPageNum);

//             // Add class .active to currentPageNum
//             addActiveClassToPage(currentPageNum);
//         }
//     }

    // handles click on '>>' button
    // function clickOnNext(){
    //     if (!this.classList.contains('disabled')){

    //         // hide elements previous page
    //         // find prev page number
    //         let previousPageNum = hideElsPrevPage(campsPerPage);

    //         let curPageNum = previousPageNum+1;

    //         // Move to the page curPageNum
    //         // Remove class .hidden from the elements that belong to the current page number
    //         toggleHiddenClass(curPageNum, campsPerPage);

    //         // Deactivate previous button (i.e. "<<" button) if current page number == 1
    //         // Deactivate next button (i.e. ">>" button) if current page num == total pages
    //         nextPreviousBtns(curPageNum);
            
    //         // Align page buttons in order the current active btn will be in the list
    //         changePageBtnsInnerText(curPageNum);

    //         // Add class .active to currentPageNum
    //         addActiveClassToPage(curPageNum);
    //     }
    // }

// When we load the page first time, the event handler defines the value of campsPerPage (how many campground cards at one page) that depends from window.innerWidth
window.addEventListener('load', defineWindowWidthAndCampsPerPage);

window.addEventListener('load', function(){
    showElsCurrPage(campsPerPage);
});

// Each time when we resize the window, the event handler defines the new value of campsPerPage (how many campground cards at one page) that depends from window.innerWidth
window.addEventListener('resize', defineWindowWidthAndCampsPerPage);

window.addEventListener('resize', showElsCurrPage2);

// Grab all page buttons
const allPageButtons = document.querySelectorAll('.page');

// Add event listener to the each page button
for (let pageButton of allPageButtons){
    pageButton.addEventListener('click', clickOnPageBtn);
}

// Add event listener to previousPage button
const prevPage = document.querySelector('#previousPage');
// prevPage.addEventListener('click', clickOnPrevious);

prevPage.addEventListener('click', function(){
    clickOnNextPrevious.call(prevPage, -1);
});

// Add event listener to nextPage button
const nextPage = document.querySelector('#nextPage');
// nextPage.addEventListener('click', clickOnNext);

nextPage.addEventListener('click', function(){
    clickOnNextPrevious.call(nextPage, 1);
});

// #paginationStart, #paginationEnd

// #previous10Pages, #next10Pages



