//banner

const imgs = document.querySelectorAll('.img-select a');

const imgBtns = [...imgs];

let imgid = 1;


const images =[
  {'id': '1', 'url': './assets/IMG/imgbanner/img1.jpg'},
  {'id': '2', 'url': './assets/IMG/imgbanner/img8.jpg'},
  {'id': '3', 'url': './assets/IMG/imgbanner/img10.png'},
  {'id': '4', 'url': './assets/IMG/imgbanner/img9.webp'},
  {'id': '5', 'url': './assets/IMG/imgbanner/img5.avif'},


];

const conteineritems = document.querySelector("#conteiner-items");

const loadImages = (images) =>{
  images.forEach(image =>{
    conteineritems.innerHTML += `
    <div class='items'>
    <img src='${image.url}'>
    </div>
    `;
  });
};

loadImages(images, conteineritems);
let items = document.querySelectorAll(".items");
const previous = () =>{
  const lastItem = items[items.length - 1];
  conteineritems.insertBefore(lastItem, items[0]);
  items = document.querySelectorAll(".items");
};

const next = () =>{
  conteineritems.appendChild(items[0]);
  items = document.querySelectorAll(".items");
};

document.querySelector("#previous").addEventListener("click", previous);

document.querySelector("#next").addEventListener("click", next);



let autoPlayInterval;

const startAutoPlay = () =>{
  autoPlayInterval = setInterval(() =>{
    next();
  }, 3000);
};

const stopAutoPlay = () =>{
  clearInterval(autoPlayInterval);
};

startAutoPlay();

const interactiveElements = [conteineritems, ...
  document.querySelectorAll('.conteiner-shadow, .items, .items img')];
  interactiveElements.forEach(element =>{
    element.addEventListener("mouseenter",
     stopAutoPlay
    );
    element.addEventListener("mouseleave",
      startAutoPlay
    );
  });

conteineritems.addEventListener("mouseover", stopAutoPlay);
conteineritems.addEventListener("mouseout", startAutoPlay);




//lojas


const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel");
const fristcardWidth = carousel.querySelector(".card").offsetWidth;
const arrowBtns = document.querySelectorAll(".wrapper i");


const carouselChildreans = [...carousel.children];

let isDragging = false,
    isAutoplay = true,
    startX,
    startScrollLeft,
    timeoutId;


  let cardPreView = Math.round(carousel.offsetWidth / fristcardWidth);
  
  carouselChildreans.slice(-cardPreView).reverse().forEach( card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
  });



  carouselChildreans.slice(0, cardPreView).forEach( card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
  });

  carousel.classList.add("no-transition");
  carousel.scrollLeft = carousel.offsetWidth;
  carousel.classList.remove("no-transition");

  arrowBtns.forEach(btn =>{
    btn.addEventListener("click", () =>{
      carousel.scrollLeft += btn.id == "left" ? -fristcardWidth : fristcardWidth; 
    });
  });

  const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging")
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
  };

  const dragging = (e) => {
    if (!isDragging) return;
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX)
  };

  const dragStop = () =>{
    isDragging =  false;
    carousel.classList.remove("dragging");
  };

  const infiniteScroll = () =>{
    if ( carousel.scrollLeft === 0){
      carousel.classList.add("no-transition");
      carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
      carousel.classList.remove("no-transition");
    }

    else if (Math.ceil(carousel.scrollLeft) ===
    carousel.scrollWidth - carousel.offsetWidth){
      carousel.classList.add("no-transition");
      carousel.scrollLeft = carousel.offsetWidth;
      carousel.classList.remove("no-transition");
    }

    clearTimeout(timeoutId);
    if (!wrapper.matches(":hover")) autoPlay();
  };

  const autoPlay =()=>{

    if (window.innerWidth <800 || !isAutoplay ) return;
    timeoutId = setTimeout(() => carousel.scrollLeft += fristcardWidth, 2500);

  };

  autoPlay();

  carousel.addEventListener("mousedown", dragStart);
  carousel.addEventListener("mousemove", dragging);
  carousel.addEventListener("mouseup", dragStop);
  carousel.addEventListener("scroll", infiniteScroll);

  wrapper.addEventListener("mouseenter", () => clearTimeout (timeoutId));

  wrapper.addEventListener("mouseleave", autoPlay);



