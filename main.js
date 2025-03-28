const menu = document.querySelectorAll('.navbar a');
const toogleMenu = document.querySelector('#btn_menu');
const main = document.querySelector('.main');
toogleMenu.addEventListener('click', toogle);
const slideItems = document.querySelectorAll('.bannerBoxTextSlide');
const scrollUp =  document.querySelector('#scrollUp');
const titles =  document.querySelectorAll('.titles');
const sections = document.querySelectorAll('main section[id]');
document.getElementById('year').innerText = new Date().getFullYear();

function toogle(){
    const header = document.querySelector('#header');
    header.classList.toggle('active');
    if (toogleMenu.classList.contains('fa-bars')) {
        toogleMenu.classList.remove('fa-bars');
        toogleMenu.classList.add('fa-close');
    }else{
        toogleMenu.classList.remove('fa-close');
        toogleMenu.classList.add('fa-bars');
    }
}

const bannerTitle = document.getElementById('bannerTitle');
function typeWriter(element){
    const textArray = element.innerHTML.split('');
    element.innerHTML = '';
    textArray.forEach((letter, index) => {
        setTimeout(() => {
            element.innerHTML += letter;
        }, 300 * index);
    });
}
let current = -1;
function slideText(){
    current++
    for (let index = 0; index < slideItems.length; index++) {
        current === index ? slideItems[index].classList.add('active') : slideItems[index].classList.remove('active'); 
    }
    if(current === slideItems.length-1){
        current = -1;
    }
}

menu.forEach(item => {
    item.addEventListener('click',scrollTo)
});

function scrollTo (event){
    event.preventDefault();
    const element = event.target;
    const id = element.getAttribute('href');
    const to = document.querySelector(id).offsetTop - 117;
    menu.forEach(item => {
        const link = item.getAttribute('href');
        id === link ? item.classList.add('active') : item.classList.remove('active');
    });
    window.scroll({
        top: to,
        behavior:  "smooth",
    });    
    toogle();
}

const sectionAnime = document.querySelectorAll('[data-anime]');
const animationClass = 'animate';

function animeScroll(){
    const windowTop = window.pageYOffset + 120 + ((window.innerHeight * 3)/4);
    sectionAnime.forEach(element => {
        windowTop > element.offsetTop ? element.classList.add(animationClass) : element.classList.remove(animationClass);
    });
    //const headerTop = window.pageYOffset + (window.innerHeight / 8) * 4;
    sections.forEach(item => {
        const titleId = item.getAttribute('id');
        
        if (titleId !== 'home' && (window.pageYOffset + 120 > item.offsetTop)) {
            const title = document.getElementById(titleId);
            document.getElementById('header-title').textContent = title.dataset.title;
        }

        if(titleId === 'home'){
            document.getElementById('header-title').textContent = '';
        }

    });
}

function changeToActive(){
    const windowTop = window.pageYOffset + (window.innerHeight / 8) * 4;
    for (const section of sections) {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        const checkpointStart = windowTop >= sectionTop;
        const checkpointEnd = windowTop <= sectionTop + sectionHeight;
        
        if(checkpointStart && checkpointEnd){
            sectionId === 'contact' ? scrollUp.classList.add('active') : scrollUp.classList.remove('active');
            document.querySelector('nav a[href*='+sectionId+']').classList.add('active');
        }else{
            document.querySelector('nav a[href*='+sectionId+']').classList.remove('active');
        }
    }
}

window.addEventListener('scroll',function(){
    animeScroll();
    changeToActive();
});

window.onload = function() {
    typeWriter(bannerTitle);
    animeScroll();
    setInterval(slideText, 6000);
}


scrollUp.addEventListener('click', function() {
    window.scroll({
        top: 0,
        behavior:  "smooth",
    });
})