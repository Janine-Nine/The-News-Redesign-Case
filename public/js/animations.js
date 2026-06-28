/* ==========================================================
   THE NEWS
   ANIMATIONS.JS
========================================================== */

"use strict";

/* ==========================================================
   ELEMENTOS
========================================================== */

const animatedElements = document.querySelectorAll(
    ".animate, .news-card, .section-title, .fade-in, .slide-up"
);

/* ==========================================================
   SCROLL ANIMATIONS (REVEAL)
========================================================== */

const ScrollReveal = {

    observer:null,

    init(){

        this.observer = new IntersectionObserver(

            this.reveal,

            {
                threshold:0.15
            }

        );

        animatedElements.forEach(el=>{

            el.classList.add("hidden");

            this.observer.observe(el);

        });

    },

    reveal(entries,observer){

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                entry.target.classList.add("show");

                entry.target.classList.remove("hidden");

                observer.unobserve(entry.target);

            }

        });

    }

};

/* ==========================================================
   FADE IN SIMPLES
========================================================== */

const FadeIn = {

    init(){

        const elements =
            document.querySelectorAll(".fade-in");

        elements.forEach(el=>{

            el.style.opacity = 0;

            el.style.transform = "translateY(20px)";

            el.style.transition = "all .6s ease";

        });

        const observer = new IntersectionObserver(entries=>{

            entries.forEach(entry=>{

                if(entry.isIntersecting){

                    entry.target.style.opacity = 1;

                    entry.target.style.transform = "translateY(0)";

                }

            });

        });

        elements.forEach(el=>observer.observe(el));

    }

};

/* ==========================================================
   SLIDE UP ANIMATION
========================================================== */

const SlideUp = {

    init(){

        const elements =
            document.querySelectorAll(".slide-up");

        elements.forEach(el=>{

            el.style.opacity = 0;

            el.style.transform = "translateY(40px)";

            el.style.transition = "all .7s ease";

        });

        const observer = new IntersectionObserver(entries=>{

            entries.forEach(entry=>{

                if(entry.isIntersecting){

                    entry.target.style.opacity = 1;

                    entry.target.style.transform = "translateY(0)";

                }

            });

        });

        elements.forEach(el=>observer.observe(el));

    }

};

/* ==========================================================
   PARALLAX SIMPLES
========================================================== */

const Parallax = {

    init(){

        const elements =
            document.querySelectorAll("[data-parallax]");

        window.addEventListener("scroll",()=>{

            let scrollY = window.scrollY;

            elements.forEach(el=>{

                let speed =
                    el.dataset.parallax || 0.3;

                el.style.transform =
                    `translateY(${scrollY * speed}px)`;

            });

        });

    }

};

/* ==========================================================
   COUNTER ANIMATION
========================================================== */

const CounterAnimation = {

    init(){

        const counters =
            document.querySelectorAll(".counter");

        counters.forEach(counter=>{

            counter.innerText = "0";

            const update = ()=>{

                const target =
                    +counter.dataset.target;

                const current =
                    +counter.innerText;

                const increment =
                    target / 100;

                if(current < target){

                    counter.innerText =
                        Math.ceil(current + increment);

                    setTimeout(update,20);

                }else{

                    counter.innerText = target;

                }

            };

            update();

        });

    }

};

/* ==========================================================
   HOVER GLOW EFFECT
========================================================== */

const HoverEffect = {

    init(){

        const cards =
            document.querySelectorAll(".news-card");

        cards.forEach(card=>{

            card.addEventListener("mousemove",(e)=>{

                const rect =
                    card.getBoundingClientRect();

                const x =
                    e.clientX - rect.left;

                const y =
                    e.clientY - rect.top;

                card.style.setProperty("--x",x + "px");

                card.style.setProperty("--y",y + "px");

            });

        });

    }

};

/* ==========================================================
   ANIMAÇÃO DE ENTRADA INICIAL
========================================================== */

const PageLoadAnimation = {

    init(){

        window.addEventListener("load",()=>{

            document.body.classList.add("loaded");

        });

    }

};

/* ==========================================================
   PERFORMANCE
========================================================== */

const AnimationPerformance = {

    init(){

        console.log("Animations.js carregado com sucesso.");

    }

};

/* ==========================================================
   INICIALIZAÇÃO
========================================================== */

document.addEventListener("DOMContentLoaded",()=>{

    ScrollReveal.init();

    FadeIn.init();

    SlideUp.init();

    Parallax.init();

    CounterAnimation.init();

    HoverEffect.init();

    PageLoadAnimation.init();

    AnimationPerformance.init();

});