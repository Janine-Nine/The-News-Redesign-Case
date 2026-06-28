/* ==========================================================
   THE NEWS
   MAIN.JS
   Arquivo Principal
========================================================== */

"use strict";

/* ==========================================================
   CONFIGURAÇÕES GLOBAIS
========================================================== */

const TheNews = {

    version: "1.0.0",

    author: "Nine",

    initialized: false

};

/* ==========================================================
   UTILIDADES
========================================================== */

const Utils = {

    $(selector){

        return document.querySelector(selector);

    },

    $$(selector){

        return document.querySelectorAll(selector);

    },

    create(tag){

        return document.createElement(tag);

    },

    random(min,max){

        return Math.floor(Math.random()*(max-min+1))+min;

    },

    formatDate(){

        return new Date().toLocaleDateString("pt-BR");

    },

    scrollTop(){

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    }

};

/* ==========================================================
   LOADER
========================================================== */

const Loader = {

    element:null,

    init(){

        this.element = Utils.$("#loader");

        if(!this.element) return;

        window.addEventListener("load",()=>{

            setTimeout(()=>{

                this.hide();

            },700);

        });

    },

    hide(){

        this.element.classList.add("hide");

    }

};

/* ==========================================================
   DATA
========================================================== */

const CurrentDate={

    init(){

        const date=Utils.$("#currentDate");

        if(date){

            date.textContent=Utils.formatDate();

        }

    }

};

/* ==========================================================
   ANO DO FOOTER
========================================================== */

const Footer={

    init(){

        const year=Utils.$("#year");

        if(year){

            year.textContent=new Date().getFullYear();

        }

    }

};

/* ==========================================================
   BOTÕES
========================================================== */

const Buttons={

    init(){

        this.effects();

    },

    effects(){

        const buttons=Utils.$$("button,.btn");

        buttons.forEach(button=>{

            button.addEventListener("mouseenter",()=>{

                button.style.transform="translateY(-3px)";

            });

            button.addEventListener("mouseleave",()=>{

                button.style.transform="";

            });

        });

    }

};

/* ==========================================================
   IMAGENS
========================================================== */

const Images={

    init(){

        const images=Utils.$$("img");

        images.forEach(img=>{

            img.loading="lazy";

        });

    }

};

/* ==========================================================
   LINKS EXTERNOS
========================================================== */

const Links={

    init(){

        const links=Utils.$$("a[target='_blank']");

        links.forEach(link=>{

            link.rel="noopener noreferrer";

        });

    }

};

/* ==========================================================
   TOOLTIPS
========================================================== */

const Tooltip={

    init(){

        const tips=Utils.$$("[data-tooltip]");

        tips.forEach(item=>{

            item.addEventListener("mouseenter",()=>{

                item.setAttribute("title",item.dataset.tooltip);

            });

        });

    }

};

/* ==========================================================
   CONTADORES
========================================================== */

const Counter={

    init(){

        const counters=Utils.$$(".counter");

        counters.forEach(counter=>{

            let current=0;

            const target=parseInt(counter.dataset.target);

            const speed=target/100;

            const update=()=>{

                current+=speed;

                if(current<target){

                    counter.textContent=Math.floor(current);

                    requestAnimationFrame(update);

                }else{

                    counter.textContent=target;

                }

            };

            update();

        });

    }

};

/* ==========================================================
   NEWSLETTER POPUP
========================================================== */

const NewsletterPopup={

    init(){

        const popup=Utils.$("#newsletterPopup");

        if(!popup) return;

        setTimeout(()=>{

            popup.classList.add("show");

        },5000);

        const close=Utils.$("#closeNewsletter");

        if(close){

            close.onclick=()=>{

                popup.classList.remove("show");

            }

        }

    }

};

/* ==========================================================
   ATALHOS DO TECLADO
========================================================== */

const Keyboard={

    init(){

        document.addEventListener("keydown",(e)=>{

            if(e.key==="Home"){

                Utils.scrollTop();

            }

        });

    }

};

/* ==========================================================
   LOG
========================================================== */

const Console={

    init(){

        console.clear();

        console.log("%cTHE NEWS",

        "color:#2563EB;font-size:22px;font-weight:bold;");

        console.log("Projeto iniciado.");

        console.log("Versão:",TheNews.version);

    }

};

/* ==========================================================
   APP
========================================================== */

const App={

    init(){

        if(TheNews.initialized) return;

        Loader.init();

        CurrentDate.init();

        Footer.init();

        Buttons.init();

        Images.init();

        Links.init();

        Tooltip.init();

        Counter.init();

        NewsletterPopup.init();

        Keyboard.init();

        Console.init();

        TheNews.initialized=true;

    }

};

/* ==========================================================
   DOM READY
========================================================== */

document.addEventListener("DOMContentLoaded",()=>{

    App.init();

});

/* ==========================================================
   EVENTOS GLOBAIS
========================================================== */

window.addEventListener("resize",()=>{

    console.log("Largura:",window.innerWidth);

});

window.addEventListener("online",()=>{

    console.log("Conectado à internet.");

});

window.addEventListener("offline",()=>{

    console.log("Sem conexão.");

});

/* ==========================================================
   EXPORTAÇÃO GLOBAL
========================================================== */

window.TheNews=TheNews;
window.Utils=Utils;