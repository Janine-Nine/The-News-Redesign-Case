/* ==========================================================
   THE NEWS
   SLIDER.JS
   PARTE 1
========================================================== */

"use strict";

/* ==========================================================
   ELEMENTOS
========================================================== */

const slider = document.querySelector(".slider");

const slides = document.querySelectorAll(".slide");

const prevButton = document.querySelector(".slider-prev");

const nextButton = document.querySelector(".slider-next");

const dotsContainer = document.querySelector(".slider-dots");

/* ==========================================================
   CONFIGURAÇÕES
========================================================== */

const Slider = {

    current: 0,

    total: slides.length,

    interval: null,

    autoplay: true,

    speed: 5000,

    init(){

        if(this.total === 0) return;

        this.createDots();

        this.show(this.current);

        this.events();

        if(this.autoplay){

            this.start();

        }

    },

    show(index){

        slides.forEach(slide=>{

            slide.classList.remove("active");

        });

        slides[index].classList.add("active");

        this.updateDots();

    },

    next(){

        this.current++;

        if(this.current >= this.total){

            this.current = 0;

        }

        this.show(this.current);

    },

    previous(){

        this.current--;

        if(this.current < 0){

            this.current = this.total - 1;

        }

        this.show(this.current);

    },

    start(){

        this.stop();

        this.interval = setInterval(()=>{

            this.next();

        },this.speed);

    },

    stop(){

        clearInterval(this.interval);

    },

    events(){

        nextButton?.addEventListener("click",()=>{

            this.next();

            this.start();

        });

        prevButton?.addEventListener("click",()=>{

            this.previous();

            this.start();

        });

    },

/* ==========================================================
   INDICADORES
========================================================== */

    createDots(){

        if(!dotsContainer) return;

        dotsContainer.innerHTML = "";

        slides.forEach((slide,index)=>{

            const dot = document.createElement("button");

            dot.className = "slider-dot";

            dot.setAttribute("aria-label",`Slide ${index+1}`);

            dot.addEventListener("click",()=>{

                this.current = index;

                this.show(index);

                this.start();

            });

            dotsContainer.appendChild(dot);

        });

        this.updateDots();

    },

    updateDots(){

        const dots = document.querySelectorAll(".slider-dot");

        dots.forEach(dot=>{

            dot.classList.remove("active");

        });

        dots[this.current]?.classList.add("active");

    }

};

/* ==========================================================
   LOOP INFINITO
========================================================== */

const InfiniteLoop = {

    init(){

        if(slides.length <= 1) return;

        console.log("Loop infinito ativado.");

    }

};

/* ==========================================================
   CONTADOR
========================================================== */

const Counter = {

    currentElement: document.querySelector(".slider-current"),

    totalElement: document.querySelector(".slider-total"),

    update(){

        this.currentElement &&
        (this.currentElement.textContent = Slider.current + 1);

        this.totalElement &&
        (this.totalElement.textContent = Slider.total);

    }

};

/* ==========================================================
   ATUALIZAÇÃO AUTOMÁTICA
========================================================== */

setInterval(()=>{

    Counter.update();

},100);

/* ==========================================================
   DOM READY
========================================================== */

document.addEventListener("DOMContentLoaded",()=>{

    Slider.init();

    InfiniteLoop.init();

});

/* ==========================================================
   THE NEWS
   SLIDER.JS
   PARTE 2
========================================================== */

"use strict";

/* ==========================================================
   PAUSAR AUTOPLAY
========================================================== */

const PauseSlider = {

    init(){

        if(!slider) return;

        slider.addEventListener("mouseenter",()=>{

            Slider.stop();

        });

        slider.addEventListener("mouseleave",()=>{

            if(Slider.autoplay){

                Slider.start();

            }

        });

    }

};

/* ==========================================================
   TECLADO
========================================================== */

const KeyboardSlider = {

    init(){

        document.addEventListener("keydown",(event)=>{

            switch(event.key){

                case "ArrowLeft":

                    Slider.previous();
                    Slider.start();
                    break;

                case "ArrowRight":

                    Slider.next();
                    Slider.start();
                    break;

            }

        });

    }

};

/* ==========================================================
   TOUCH / SWIPE
========================================================== */

const SwipeSlider = {

    startX:0,

    endX:0,

    init(){

        if(!slider) return;

        slider.addEventListener("touchstart",(event)=>{

            this.startX = event.changedTouches[0].clientX;

        });

        slider.addEventListener("touchend",(event)=>{

            this.endX = event.changedTouches[0].clientX;

            this.detect();

        });

    },

    detect(){

        const distance = this.startX - this.endX;

        if(distance > 50){

            Slider.next();
            Slider.start();

        }else if(distance < -50){

            Slider.previous();
            Slider.start();

        }

    }

};

/* ==========================================================
   BARRA DE PROGRESSO
========================================================== */

const ProgressBar = {

    element:document.querySelector(".slider-progress"),

    progress:0,

    interval:null,

    init(){

        if(!this.element) return;

        this.start();

    },

    start(){

        this.stop();

        this.progress = 0;

        this.interval = setInterval(()=>{

            this.progress += 1;

            this.element.style.width = this.progress + "%";

            if(this.progress >= 100){

                this.progress = 0;

            }

        }, Slider.speed / 100);

    },

    stop(){

        clearInterval(this.interval);

    }

};

/* ==========================================================
   LAZY LOADING
========================================================== */

const LazyImages = {

    init(){

        const images = document.querySelectorAll(".slide img");

        const observer = new IntersectionObserver(entries=>{

            entries.forEach(entry=>{

                if(entry.isIntersecting){

                    const image = entry.target;

                    const src = image.dataset.src;

                    if(src){

                        image.src = src;

                        image.removeAttribute("data-src");

                    }

                    observer.unobserve(image);

                }

            });

        });

        images.forEach(image=>{

            observer.observe(image);

        });

    }

};

/* ==========================================================
   CONTADOR
========================================================== */

Counter.update = function(){

    if(this.currentElement){

        this.currentElement.textContent = Slider.current + 1;

    }

    if(this.totalElement){

        this.totalElement.textContent = Slider.total;

    }

};

/* ==========================================================
   INTEGRAÇÃO COM O SHOW()
========================================================== */

const originalShow = Slider.show.bind(Slider);

Slider.show = function(index){

    originalShow(index);

    Counter.update();

    ProgressBar.start();

};

/* ==========================================================
   INICIALIZAÇÃO
========================================================== */

document.addEventListener("DOMContentLoaded",()=>{

    PauseSlider.init();

    KeyboardSlider.init();

    SwipeSlider.init();

    ProgressBar.init();

    LazyImages.init();

});

/* ==========================================================
   THE NEWS
   SLIDER.JS
   PARTE 3
========================================================== */

"use strict";

/* ==========================================================
   ANIMAÇÕES
========================================================== */

const SliderAnimation = {

    init(){

        slides.forEach(slide=>{

            slide.style.transition =
                "opacity .6s ease, transform .6s ease";

        });

    },

    fade(index){

        slides.forEach(slide=>{

            slide.style.opacity = "0";

            slide.style.transform = "scale(.98)";

        });

        slides[index].style.opacity = "1";

        slides[index].style.transform = "scale(1)";

    }

};

/* ==========================================================
   RESPONSIVIDADE
========================================================== */

const ResponsiveSlider = {

    init(){

        window.addEventListener("resize",()=>{

            this.update();

        });

        this.update();

    },

    update(){

        if(window.innerWidth <= 768){

            slider?.classList.add("slider-mobile");

        }else{

            slider?.classList.remove("slider-mobile");

        }

    }

};

/* ==========================================================
   MÚLTIPLOS SLIDERS
========================================================== */

const MultipleSliders = {

    init(){

        const sliders =
            document.querySelectorAll(".slider");

        sliders.forEach((item,index)=>{

            item.dataset.slider = index + 1;

        });

    }

};

/* ==========================================================
   EVENTOS PERSONALIZADOS
========================================================== */

const SliderEvents = {

    init(){

        document.addEventListener(

            "slider:next",

            ()=>{

                Slider.next();

            }

        );

        document.addEventListener(

            "slider:previous",

            ()=>{

                Slider.previous();

            }

        );

    }

};

/* ==========================================================
   BOTÕES EXTERNOS
========================================================== */

const ExternalButtons = {

    init(){

        document.querySelectorAll("[data-slide-next]")

        .forEach(button=>{

            button.addEventListener("click",()=>{

                Slider.next();

            });

        });

        document.querySelectorAll("[data-slide-prev]")

        .forEach(button=>{

            button.addEventListener("click",()=>{

                Slider.previous();

            });

        });

    }

};

/* ==========================================================
   AUTO AJUSTE DA ALTURA
========================================================== */

const AutoHeight = {

    init(){

        window.addEventListener("load",()=>{

            this.update();

        });

        window.addEventListener("resize",()=>{

            this.update();

        });

    },

    update(){

        const active =
            document.querySelector(".slide.active");

        if(!active || !slider) return;

        slider.style.height =
            active.offsetHeight + "px";

    }

};

/* ==========================================================
   PRELOAD DAS IMAGENS
========================================================== */

const PreloadImages = {

    init(){

        slides.forEach(slide=>{

            const image = slide.querySelector("img");

            if(!image) return;

            const preload = new Image();

            preload.src = image.src;

        });

    }

};

/* ==========================================================
   INDICADOR NUMÉRICO
========================================================== */

const SlideNumber = {

    element:
        document.querySelector(".slider-number"),

    update(){

        if(!this.element) return;

        this.element.innerHTML =

        `${Slider.current + 1} / ${Slider.total}`;

    }

};

/* ==========================================================
   SOBRESCREVE O SHOW()
========================================================== */

const originalShowPart3 = Slider.show.bind(Slider);

Slider.show = function(index){

    originalShowPart3(index);

    SliderAnimation.fade(index);

    SlideNumber.update();

    AutoHeight.update();

};

/* ==========================================================
   DOM READY
========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        SliderAnimation.init();

        ResponsiveSlider.init();

        MultipleSliders.init();

        SliderEvents.init();

        ExternalButtons.init();

        AutoHeight.init();

        PreloadImages.init();

        SlideNumber.update();

    }

);

/* ==========================================================
   THE NEWS
   SLIDER.JS
   PARTE 4 - FINAL
========================================================== */

"use strict";

/* ==========================================================
   LOCAL STORAGE
========================================================== */

const SliderStorage = {

    key: "the-news-slider",

    save(index){

        localStorage.setItem(this.key, index);

    },

    load(){

        return parseInt(localStorage.getItem(this.key)) || 0;

    }

};

/* ==========================================================
   ACESSIBILIDADE
========================================================== */

const SliderAccessibility = {

    init(){

        slider?.setAttribute("role","region");

        slider?.setAttribute("aria-label","Carrossel de Notícias");

        slides.forEach((slide,index)=>{

            slide.setAttribute("role","group");

            slide.setAttribute(
                "aria-label",
                `Slide ${index+1} de ${Slider.total}`
            );

        });

    }

};

/* ==========================================================
   PAUSAR QUANDO NÃO ESTIVER VISÍVEL
========================================================== */

const VisibilityControl = {

    init(){

        if(!slider) return;

        const observer = new IntersectionObserver(entries=>{

            entries.forEach(entry=>{

                if(entry.isIntersecting){

                    Slider.start();

                }else{

                    Slider.stop();

                }

            });

        },{

            threshold:0.3

        });

        observer.observe(slider);

    }

};

/* ==========================================================
   SALVAR SLIDE ATUAL
========================================================== */

const SaveCurrentSlide = {

    init(){

        Slider.current = SliderStorage.load();

        Slider.show(Slider.current);

    }

};

/* ==========================================================
   PERFORMANCE
========================================================== */

const SliderPerformance = {

    init(){

        window.addEventListener("load",()=>{

            console.log(

                "Slider carregado em",

                Math.round(performance.now()),

                "ms"

            );

        });

    }

};

/* ==========================================================
   DEBUG
========================================================== */

const SliderDebug = {

    enabled:false,

    log(message){

        if(this.enabled){

            console.log("[Slider]",message);

        }

    }

};

/* ==========================================================
   SOBRESCREVE SHOW()
========================================================== */

const originalShowFinal = Slider.show.bind(Slider);

Slider.show = function(index){

    originalShowFinal(index);

    SliderStorage.save(index);

    SliderDebug.log(

        `Slide ${index+1} exibido.`

    );

};

/* ==========================================================
   REINICIAR AUTOPLAY AO MUDAR DE ABA
========================================================== */

document.addEventListener(

    "visibilitychange",

    ()=>{

        if(document.hidden){

            Slider.stop();

        }else{

            if(Slider.autoplay){

                Slider.start();

            }

        }

    }

);

/* ==========================================================
   INICIALIZAÇÃO
========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        SliderAccessibility.init();

        VisibilityControl.init();

        SaveCurrentSlide.init();

        SliderPerformance.init();

    }

);

/* ==========================================================
   FIM DO SLIDER
========================================================== */

console.log("The News Slider carregado com sucesso.");