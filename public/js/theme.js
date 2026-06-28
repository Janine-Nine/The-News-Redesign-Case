/* ==========================================================
   THE NEWS
   THEME.JS
========================================================== */

"use strict";

/* ==========================================================
   ELEMENTOS
========================================================== */

const themeToggle = document.querySelector("#themeToggle");

/* ==========================================================
   STORAGE
========================================================== */

const ThemeStorage = {

    key: "the-news-theme",

    save(theme){

        localStorage.setItem(this.key, theme);

    },

    get(){

        return localStorage.getItem(this.key);

    }

};

/* ==========================================================
   THEME
========================================================== */

const Theme = {

    current: "light",

    init(){

        this.loadTheme();

        this.events();

        this.detectSystemTheme();

    },

/* ==========================================================
   CARREGAR TEMA
========================================================== */

    loadTheme(){

        const saved = ThemeStorage.get();

        if(saved){

            this.apply(saved);

        }else{

            this.apply("light");

        }

    },

/* ==========================================================
   APLICAR TEMA
========================================================== */

    apply(theme){

        this.current = theme;

        document.body.setAttribute("data-theme", theme);

        ThemeStorage.save(theme);

        this.updateButton();

    },

/* ==========================================================
   TOGGLE
========================================================== */

    toggle(){

        if(this.current === "dark"){

            this.apply("light");

        }else{

            this.apply("dark");

        }

    },

/* ==========================================================
   DETECTAR SISTEMA
========================================================== */

    detectSystemTheme(){

        const prefersDark =
            window.matchMedia &&
            window.matchMedia("(prefers-color-scheme: dark)").matches;

        if(!ThemeStorage.get()){

            this.apply(prefersDark ? "dark" : "light");

        }

    },

/* ==========================================================
   BOTÃO
========================================================== */

    events(){

        themeToggle?.addEventListener("click",()=>{

            this.toggle();

        });

    },

/* ==========================================================
   UPDATE UI
========================================================== */

    updateButton(){

        if(!themeToggle) return;

        themeToggle.textContent =
            this.current === "dark"
            ? "☀️"
            : "🌙";

    }

};

/* ==========================================================
   TRANSIÇÃO SUAVE
========================================================== */

const ThemeTransition = {

    init(){

        document.documentElement.style.transition =
            "background 0.4s ease, color 0.4s ease";

    }

};

/* ==========================================================
   ACESSIBILIDADE
========================================================== */

const ThemeA11y = {

    init(){

        themeToggle?.setAttribute(
            "aria-label",
            "Alternar tema"
        );

    }

};

/* ==========================================================
   LOG
========================================================== */

const ThemeLog = {

    init(){

        console.log("Theme.js carregado com sucesso.");

    }

};

/* ==========================================================
   INICIALIZAÇÃO
========================================================== */

document.addEventListener("DOMContentLoaded",()=>{

    Theme.init();

    ThemeTransition.init();

    ThemeA11y.init();

    ThemeLog.init();

});