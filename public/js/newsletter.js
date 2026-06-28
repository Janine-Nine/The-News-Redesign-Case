/* ==========================================================
   THE NEWS
   NEWSLETTER.JS
========================================================== */

"use strict";

/* ==========================================================
   ELEMENTOS
========================================================== */

const newsletterForm = document.querySelector("#newsletterForm");
const newsletterInput = document.querySelector("#newsletterEmail");
const newsletterButton = document.querySelector("#newsletterButton");
const newsletterMessage = document.querySelector("#newsletterMessage");

/* ==========================================================
   STORAGE
========================================================== */

const NewsletterStorage = {

    key:"the-news-newsletter",

    get(){

        return JSON.parse(localStorage.getItem(this.key)) || [];

    },

    save(list){

        localStorage.setItem(this.key,JSON.stringify(list));

    }

};

/* ==========================================================
   VALIDAÇÃO
========================================================== */

const Validator = {

    email(email){

        const regex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return regex.test(email);

    }

};

/* ==========================================================
   NEWSLETTER
========================================================== */

const Newsletter = {

    list:NewsletterStorage.get(),

    init(){

        if(!newsletterForm) return;

        this.events();

    },

/* ==========================================================
   EVENTOS
========================================================== */

    events(){

        newsletterForm.addEventListener("submit",(e)=>{

            e.preventDefault();

            this.subscribe();

        });

        newsletterInput?.addEventListener("input",()=>{

            this.clearMessage();

        });

    },

/* ==========================================================
   INSCREVER
========================================================== */

    subscribe(){

        const email =
            newsletterInput.value.trim();

        if(!Validator.email(email)){

            this.showMessage(
                "E-mail inválido!",
                "error"
            );

            return;

        }

        if(this.list.includes(email)){

            this.showMessage(
                "E-mail já cadastrado!",
                "warning"
            );

            return;

        }

        this.list.push(email);

        NewsletterStorage.save(this.list);

        this.showMessage(
            "Inscrição realizada com sucesso!",
            "success"
        );

        this.clearInput();

        this.loadingEffect();

    },

/* ==========================================================
   MENSAGEM
========================================================== */

    showMessage(text,type){

        if(!newsletterMessage) return;

        newsletterMessage.textContent=text;

        newsletterMessage.className=`message ${type} show`;

    },

    clearMessage(){

        if(newsletterMessage){

            newsletterMessage.classList.remove("show");

        }

    },

/* ==========================================================
   INPUT
========================================================== */

    clearInput(){

        newsletterInput.value="";

    },

/* ==========================================================
   LOADING
========================================================== */

    loadingEffect(){

        newsletterButton?.classList.add("loading");

        newsletterButton.textContent="Enviando...";

        setTimeout(()=>{

            newsletterButton.classList.remove("loading");

            newsletterButton.textContent="Inscrever";

        },1200);

    }

};

/* ==========================================================
   ESTATÍSTICAS
========================================================== */

const NewsletterStats = {

    init(){

        const counter =
            document.querySelector("#newsletterCount");

        if(!counter) return;

        setInterval(()=>{

            const total =
                NewsletterStorage.get().length;

            counter.textContent =
                `${total} inscritos`;

        },1000);

    }

};

/* ==========================================================
   AUTO FOCUS
========================================================== */

const NewsletterFocus = {

    init(){

        newsletterInput?.setAttribute(
            "autocomplete",
            "email"
        );

    }

};

/* ==========================================================
   INICIALIZAÇÃO
========================================================== */

document.addEventListener("DOMContentLoaded",()=>{

    Newsletter.init();

    NewsletterStats.init();

    NewsletterFocus.init();

});