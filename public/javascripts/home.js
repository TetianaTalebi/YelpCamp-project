const homePageNavToggler = document.querySelector('#homePageNavbarTogglerSvg');

const homePageNav = document.querySelector('#homePageNavbar');

function toggleHomePageNav(){
    if(homePageNav){
        homePageNav.classList.toggle('showNavbar');
    }
}

homePageNavToggler.addEventListener('click', toggleHomePageNav);