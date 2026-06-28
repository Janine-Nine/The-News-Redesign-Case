/* ==========================================================
   THE NEWS
   MENU.JS
========================================================== */

"use strict";

/* ==========================================================
   ELEMENTOS
========================================================== */

const header = document.querySelector(".header");

const nav = document.querySelector(".navbar");

const menuToggle = document.querySelector(".menu-toggle");

const navMenu = document.querySelector(".nav-menu");

const overlay = document.querySelector(".menu-overlay");

const menuLinks = document.querySelectorAll(".nav-menu a");

/* ==========================================================
   MENU
========================================================== */

const Menu = {

    opened: false,

    init(){

        this.events();

        this.closeOnResize();

        this.activeLink();

    },

    open(){

        if(!navMenu) return;

        navMenu.classList.add("active");

        menuToggle?.classList.add("active");

        overlay?.classList.add("active");

        document.body.classList.add("menu-open");

        menuToggle?.setAttribute("aria-expanded","true");

        this.opened = true;

    },

    close(){

        if(!navMenu) return;

        navMenu.classList.remove("active");

        menuToggle?.classList.remove("active");

        overlay?.classList.remove("active");

        document.body.classList.remove("menu-open");

        menuToggle?.setAttribute("aria-expanded","false");

        this.opened = false;

    },

    toggle(){

        this.opened ? this.close() : this.open();

    },

    events(){

        menuToggle?.addEventListener("click",()=>{

            this.toggle();

        });

        overlay?.addEventListener("click",()=>{

            this.close();

        });

        menuLinks.forEach(link=>{

            link.addEventListener("click",()=>{

                this.close();

            });

        });

        document.addEventListener("keydown",(event)=>{

            if(event.key === "Escape"){

                this.close();

            }

        });

    },

    closeOnResize(){

        window.addEventListener("resize",()=>{

            if(window.innerWidth > 992){

                this.close();

            }

        });

    },

    activeLink(){

        const current = window.location.pathname.split("/").pop();

        menuLinks.forEach(link=>{

            const href = link.getAttribute("href");

            if(href === current){

                link.classList.add("active");

            }

        });

    }

};

/* ==========================================================
   HEADER FIXO
========================================================== */

const StickyHeader = {

    init(){

        window.addEventListener("scroll",()=>{

            if(!header) return;

            if(window.scrollY > 60){

                header.classList.add("sticky");

            }else{

                header.classList.remove("sticky");

            }

        });

    }

};

/* ==========================================================
   SCROLL SUAVE
========================================================== */

const SmoothScroll = {

    init(){

        document.querySelectorAll("a[href^='#']").forEach(anchor=>{

            anchor.addEventListener("click",(e)=>{

                const target = document.querySelector(anchor.getAttribute("href"));

                if(!target) return;

                e.preventDefault();

                target.scrollIntoView({

                    behavior:"smooth",

                    block:"start"

                });

            });

        });

    }

};

/* ==========================================================
   ACESSIBILIDADE
========================================================== */

const Accessibility = {

    init(){

        menuToggle?.setAttribute("aria-label","Abrir Menu");

        menuToggle?.setAttribute("aria-expanded","false");

    }

};

/* ==========================================================
   INICIALIZAÇÃO
========================================================== */

document.addEventListener("DOMContentLoaded",()=>{

    Menu.init();

    StickyHeader.init();

    SmoothScroll.init();

    Accessibility.init();

});

/* ==========================================================
   DROPDOWN MENUS
========================================================== */

const Dropdown = {

    dropdowns: document.querySelectorAll(".dropdown"),

    init(){

        if(!this.dropdowns.length) return;

        this.events();

    },

    events(){

        this.dropdowns.forEach(dropdown=>{

            const toggle = dropdown.querySelector(".dropdown-toggle");

            const menu = dropdown.querySelector(".dropdown-menu");

            if(!toggle || !menu) return;

            // Desktop
            dropdown.addEventListener("mouseenter",()=>{

                if(window.innerWidth > 992){

                    menu.classList.add("show");

                }

            });

            dropdown.addEventListener("mouseleave",()=>{

                if(window.innerWidth > 992){

                    menu.classList.remove("show");

                }

            });

            // Mobile
            toggle.addEventListener("click",(e)=>{

                if(window.innerWidth <= 992){

                    e.preventDefault();

                    menu.classList.toggle("show");

                    dropdown.classList.toggle("active");

                }

            });

        });

    }

};

/* ==========================================================
   FECHAR DROPDOWNS AO CLICAR FORA
========================================================== */

const CloseDropdowns = {

    init(){

        document.addEventListener("click",(event)=>{

            document.querySelectorAll(".dropdown").forEach(dropdown=>{

                if(!dropdown.contains(event.target)){

                    dropdown.classList.remove("active");

                    dropdown.querySelector(".dropdown-menu")
                        ?.classList.remove("show");

                }

            });

        });

    }

};

/* ==========================================================
   MEGA MENU
========================================================== */

const MegaMenu = {

    init(){

        document.querySelectorAll(".mega-menu").forEach(menu=>{

            menu.addEventListener("mouseenter",()=>{

                if(window.innerWidth > 992){

                    menu.classList.add("open");

                }

            });

            menu.addEventListener("mouseleave",()=>{

                if(window.innerWidth > 992){

                    menu.classList.remove("open");

                }

            });

        });

    }

};

/* ==========================================================
   HEADER TRANSPARENTE
========================================================== */

const TransparentHeader = {

    init(){

        if(!header) return;

        window.addEventListener("scroll",()=>{

            if(window.scrollY > 100){

                header.classList.add("header-solid");

            }else{

                header.classList.remove("header-solid");

            }

        });

    }

};

/* ==========================================================
   INDICADOR DE MENU ATIVO DURANTE O SCROLL
========================================================== */

const ScrollSpy = {

    sections: document.querySelectorAll("section[id]"),

    init(){

        if(!this.sections.length) return;

        window.addEventListener("scroll",()=>{

            let current = "";

            this.sections.forEach(section=>{

                const top = section.offsetTop - 120;

                const height = section.offsetHeight;

                if(window.scrollY >= top &&
                   window.scrollY < top + height){

                    current = section.id;

                }

            });

            menuLinks.forEach(link=>{

                link.classList.remove("active");

                if(link.getAttribute("href") === "#" + current){

                    link.classList.add("active");

                }

            });

        });

    }

};

/* ==========================================================
   EFEITO RIPPLE NOS LINKS
========================================================== */

const Ripple = {

    init(){

        menuLinks.forEach(link=>{

            link.addEventListener("click",(e)=>{

                const ripple = document.createElement("span");

                ripple.className = "ripple";

                ripple.style.left = e.offsetX + "px";

                ripple.style.top = e.offsetY + "px";

                link.appendChild(ripple);

                setTimeout(()=>{

                    ripple.remove();

                },600);

            });

        });

    }

};

/* ==========================================================
   INICIALIZAÇÃO DOS NOVOS MÓDULOS
========================================================== */

document.addEventListener("DOMContentLoaded",()=>{

    Dropdown.init();

    CloseDropdowns.init();

    MegaMenu.init();

    TransparentHeader.init();

    ScrollSpy.init();

    Ripple.init();

});
/* ==========================================================
   THE NEWS
   MENU.JS
   PARTE 3
========================================================== */

"use strict";

/* ==========================================================
   NAVEGAÇÃO POR TECLADO
========================================================== */

const KeyboardNavigation = {

    links: [],

    init(){

        this.links = Array.from(document.querySelectorAll(".nav-menu a"));

        if(this.links.length === 0) return;

        this.events();

    },

    events(){

        this.links.forEach((link,index)=>{

            link.addEventListener("keydown",(event)=>{

                switch(event.key){

                    case "ArrowRight":

                        event.preventDefault();
                        this.next(index);
                        break;

                    case "ArrowLeft":

                        event.preventDefault();
                        this.previous(index);
                        break;

                    case "Home":

                        event.preventDefault();
                        this.first();
                        break;

                    case "End":

                        event.preventDefault();
                        this.last();
                        break;

                }

            });

        });

    },

    next(index){

        const next =
            (index + 1) % this.links.length;

        this.links[next].focus();

    },

    previous(index){

        const previous =
            (index - 1 + this.links.length) % this.links.length;

        this.links[previous].focus();

    },

    first(){

        this.links[0].focus();

    },

    last(){

        this.links[this.links.length-1].focus();

    }

};

/* ==========================================================
   CONTROLE DE FOCO
========================================================== */

const FocusControl = {

    init(){

        const toggle =
            document.querySelector(".menu-toggle");

        if(!toggle) return;

        toggle.addEventListener("click",()=>{

            setTimeout(()=>{

                const first =
                    document.querySelector(".nav-menu a");

                first?.focus();

            },250);

        });

    }

};

/* ==========================================================
   ANIMAÇÃO DO MENU
========================================================== */

const MenuAnimation = {

    init(){

        const items =
            document.querySelectorAll(".nav-menu li");

        items.forEach((item,index)=>{

            item.style.transitionDelay =
                `${index*0.08}s`;

        });

    }

};

/* ==========================================================
   MENU OFF CANVAS
========================================================== */

const OffCanvas = {

    init(){

        const menu =
            document.querySelector(".nav-menu");

        if(!menu) return;

        menu.classList.add("offcanvas");

    }

};

/* ==========================================================
   TOUCH EVENTS
========================================================== */

const TouchMenu = {

    startX:0,

    endX:0,

    init(){

        document.addEventListener("touchstart",(event)=>{

            this.startX =
                event.changedTouches[0].screenX;

        });

        document.addEventListener("touchend",(event)=>{

            this.endX =
                event.changedTouches[0].screenX;

            this.detect();

        });

    },

    detect(){

        if(this.startX-this.endX>120){

            document
                .querySelector(".nav-menu")
                ?.classList.remove("active");

        }

    }

};

/* ==========================================================
   DEBOUNCE
========================================================== */

function debounce(callback,delay){

    let timer;

    return (...args)=>{

        clearTimeout(timer);

        timer=setTimeout(()=>{

            callback(...args);

        },delay);

    }

}

/* ==========================================================
   THROTTLE
========================================================== */

function throttle(callback,limit){

    let waiting=false;

    return (...args)=>{

        if(!waiting){

            callback(...args);

            waiting=true;

            setTimeout(()=>{

                waiting=false;

            },limit);

        }

    }

}

/* ==========================================================
   RESIZE OTIMIZADO
========================================================== */

window.addEventListener(

    "resize",

    debounce(()=>{

        console.log("Layout atualizado.");

    },250)

);

/* ==========================================================
   SCROLL OTIMIZADO
========================================================== */

window.addEventListener(

    "scroll",

    throttle(()=>{

        const header =
            document.querySelector(".header");

        if(window.scrollY>80){

            header?.classList.add("compact");

        }else{

            header?.classList.remove("compact");

        }

    },30)

);

/* ==========================================================
   INICIALIZAÇÃO
========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        KeyboardNavigation.init();

        FocusControl.init();

        MenuAnimation.init();

        OffCanvas.init();

        TouchMenu.init();

    }

);

/* ==========================================================
   THE NEWS
   MENU.JS
   PARTE 4 - FINAL
========================================================== */

"use strict";

/* ==========================================================
   LOCAL STORAGE
========================================================== */

const MenuStorage = {

    key: "the-news-menu",

    save(state){

        localStorage.setItem(this.key, state);

    },

    load(){

        return localStorage.getItem(this.key);

    },

    init(){

        const state = this.load();

        const menu = document.querySelector(".nav-menu");

        if(state === "open"){

            menu?.classList.add("active");

        }

    }

};

/* ==========================================================
   SALVAR ESTADO
========================================================== */

document.querySelector(".menu-toggle")?.addEventListener("click",()=>{

    const menu = document.querySelector(".nav-menu");

    if(menu?.classList.contains("active")){

        MenuStorage.save("closed");

    }else{

        MenuStorage.save("open");

    }

});

/* ==========================================================
   INDICADOR ANIMADO
========================================================== */

const ActiveIndicator={

    indicator:null,

    init(){

        this.indicator=document.querySelector(".menu-indicator");

        if(!this.indicator) return;

        this.update();

        window.addEventListener("resize",()=>{

            this.update();

        });

    },

    update(){

        const active=document.querySelector(".nav-menu a.active");

        if(!active) return;

        this.indicator.style.width=active.offsetWidth+"px";

        this.indicator.style.left=active.offsetLeft+"px";

    }

};

/* ==========================================================
   BREADCRUMB
========================================================== */

const Breadcrumb={

    init(){

        const container=document.querySelector("#breadcrumb");

        if(!container) return;

        const page=document.title;

        container.innerHTML=

        `
        <a href="index.html">Home</a>
        /
        <span>${page}</span>
        `;

    }

};

/* ==========================================================
   MENU SEARCH
========================================================== */

const MenuSearch={

    init(){

        const input=document.querySelector("#menuSearch");

        if(!input) return;

        input.addEventListener("keyup",()=>{

            const value=input.value.toLowerCase();

            document.querySelectorAll(".nav-menu li").forEach(item=>{

                const text=item.innerText.toLowerCase();

                item.style.display=

                text.includes(value)

                ?"block"

                :"none";

            });

        });

    }

};

/* ==========================================================
   FAVORITOS
========================================================== */

const Favorites={

    init(){

        document.querySelectorAll("[data-favorite]").forEach(item=>{

            item.addEventListener("click",()=>{

                item.classList.toggle("favorite");

            });

        });

    }

};

/* ==========================================================
   CONTADOR MENU
========================================================== */

const MenuCounter={

    init(){

        const total=document.querySelectorAll(".nav-menu li").length;

        console.log("Itens do Menu:",total);

    }

};

/* ==========================================================
   PERFORMANCE
========================================================== */

const PerformanceMonitor={

    init(){

        window.addEventListener("load",()=>{

            const time=performance.now();

            console.log("Tempo:",Math.round(time),"ms");

        });

    }

};

/* ==========================================================
   OBSERVER
========================================================== */

const Observer={

    init(){

        const observer=new IntersectionObserver(entries=>{

            entries.forEach(entry=>{

                if(entry.isIntersecting){

                    entry.target.classList.add("visible");

                }

            });

        });

        document.querySelectorAll(".nav-menu li").forEach(item=>{

            observer.observe(item);

        });

    }

};

/* ==========================================================
   ACESSIBILIDADE
========================================================== */

const Aria={

    init(){

        const menu=document.querySelector(".nav-menu");

        menu?.setAttribute("role","navigation");

        menu?.setAttribute("aria-label","Menu Principal");

        document.querySelectorAll(".nav-menu a").forEach(link=>{

            link.setAttribute("tabindex","0");

        });

    }

};

/* ==========================================================
   LOG
========================================================== */

console.log("Menu.js carregado com sucesso.");

/* ==========================================================
   INIT
========================================================== */

document.addEventListener("DOMContentLoaded",()=>{

    MenuStorage.init();

    ActiveIndicator.init();

    Breadcrumb.init();

    MenuSearch.init();

    Favorites.init();

    MenuCounter.init();

    PerformanceMonitor.init();

    Observer.init();

    Aria.init();

});