/* ==========================================================
   THE NEWS
   SCROLL.JS
========================================================== */

"use strict";

/* ==========================================================
   ELEMENTOS
========================================================== */

const scrollTopButton = document.querySelector("#scrollTop");

const progressBar = document.querySelector("#scrollProgress");

const header = document.querySelector(".header");

const sections = document.querySelectorAll("section[id]");

const navLinks = document.querySelectorAll(".nav-menu a");

/* ==========================================================
   SCROLL MANAGER
========================================================== */

const ScrollManager = {

    init(){

        this.events();

    },

/* ==========================================================
   EVENTOS
========================================================== */

    events(){

        window.addEventListener("scroll",()=>{

            this.handleProgress();

            this.handleHeader();

            this.handleButton();

            this.handleScrollSpy();

        });

    },

/* ==========================================================
   BARRA DE PROGRESSO
========================================================== */

    handleProgress(){

        if(!progressBar) return;

        const scrollTop =
            document.documentElement.scrollTop;

        const scrollHeight =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;

        const progress =
            (scrollTop / scrollHeight) * 100;

        progressBar.style.width =
            progress + "%";

    },

/* ==========================================================
   HEADER INTELIGENTE
========================================================== */

    handleHeader(){

        if(!header) return;

        if(window.scrollY > 80){

            header.classList.add("scrolled");

        }else{

            header.classList.remove("scrolled");

        }

    },

/* ==========================================================
   BOTÃO VOLTAR AO TOPO
========================================================== */

    handleButton(){

        if(!scrollTopButton) return;

        if(window.scrollY > 400){

            scrollTopButton.classList.add("show");

        }else{

            scrollTopButton.classList.remove("show");

        }

    },

/* ==========================================================
   SCROLL SPY (MENU ATIVO)
========================================================== */

    handleScrollSpy(){

        let current = "";

        sections.forEach(section=>{

            const sectionTop =
                section.offsetTop - 120;

            const sectionHeight =
                section.offsetHeight;

            if(window.scrollY >= sectionTop &&
               window.scrollY < sectionTop + sectionHeight){

                current = section.getAttribute("id");

            }

        });

        navLinks.forEach(link=>{

            link.classList.remove("active");

            if(link.getAttribute("href") === "#" + current){

                link.classList.add("active");

            }

        });

    }

};

/* ==========================================================
   BOTÃO SCROLL TOP
========================================================== */

const ScrollTop = {

    init(){

        if(!scrollTopButton) return;

        scrollTopButton.addEventListener("click",()=>{

            window.scrollTo({

                top:0,

                behavior:"smooth"

            });

        });

    }

};

/* ==========================================================
   SCROLL SUAVE GLOBAL
========================================================== */

const SmoothScroll = {

    init(){

        document.querySelectorAll("a[href^='#']")

        .forEach(anchor=>{

            anchor.addEventListener("click",(e)=>{

                const target =
                    document.querySelector(
                        anchor.getAttribute("href")
                    );

                if(target){

                    e.preventDefault();

                    target.scrollIntoView({

                        behavior:"smooth"

                    });

                }

            });

        });

    }

};

/* ==========================================================
   DETECTAR DIREÇÃO DO SCROLL
========================================================== */

const ScrollDirection = {

    lastScroll:0,

    init(){

        window.addEventListener("scroll",()=>{

            const current =
                window.scrollY;

            if(current > this.lastScroll){

                document.body.dataset.scroll =
                    "down";

            }else{

                document.body.dataset.scroll =
                    "up";

            }

            this.lastScroll = current;

        });

    }

};

/* ==========================================================
   PERFORMANCE
========================================================== */

const ScrollPerformance = {

    init(){

        console.log("Scroll.js carregado com sucesso.");

    }

};

/* ==========================================================
   INICIALIZAÇÃO
========================================================== */

document.addEventListener("DOMContentLoaded",()=>{

    ScrollManager.init();

    ScrollTop.init();

    SmoothScroll.init();

    ScrollDirection.init();

    ScrollPerformance.init();

});