// The logic of this code is to highlight the tag in top navbar that relates to the current window path

// Grab all links from top-navbar exept homepage link

const allTopNavLinks = document.querySelectorAll(".nav-top-link");

// Loop over all links from top navbar (exept the link for homepage)
// Compare pathname properties of these links with window current pathname, if they are equal, add class .active-top-link to the top-navbar link

const highlightTopLink = function(){
    const currentPagePath = window.location.pathname;
    console.log(currentPagePath);
    for (let link of allTopNavLinks){
        const linkText = link.pathname;
        if(linkText == currentPagePath){
            link.classList.add('active-top-link');
        }
    }
}

window.addEventListener('load', highlightTopLink);