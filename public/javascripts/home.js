const homePageNavToggler = document.querySelector('#homePageNavbarTogglerSvg');

const homePageNav = document.querySelector('#homePageNavbar');

const homePageBrand = document.querySelector('#homePageBrand');

function toggleHomePageNav(){
    if(homePageNav){
        homePageNav.classList.toggle('showNavbar');
    }
}

function darkenNavbar() {
    const screenWidth = window.innerWidth;
    const scrollPosition = window.scrollY;
    
    if (screenWidth >= 768){
        if (scrollPosition >= 48){
            if(!homePageNav.classList.contains('navbarDark')){
                homePageNav.classList.add('navbarDark');
            }
            if(!homePageBrand.classList.contains('navbarDark')){
                homePageBrand.classList.add('navbarDark');
            }
        } else {
            if(homePageNav.classList.contains('navbarDark')){
                homePageNav.classList.remove('navbarDark');
            }
            if(homePageBrand.classList.contains('navbarDark')){
                homePageBrand.classList.remove('navbarDark');
            }
        }
    }
}

window.addEventListener('scroll', darkenNavbar);

homePageNavToggler.addEventListener('click', toggleHomePageNav);