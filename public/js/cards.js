/* ==========================================================
   THE NEWS
   CARDS.JS
========================================================== */

"use strict";

/* ==========================================================
   ELEMENTOS
========================================================== */

const cards = document.querySelectorAll(".news-card");

/* ==========================================================
   STORAGE
========================================================== */

const CardStorage = {

    favoritesKey:"the-news-favorites",

    likesKey:"the-news-likes",

    viewsKey:"the-news-views",

    get(key){

        return JSON.parse(localStorage.getItem(key)) || {};

    },

    set(key,value){

        localStorage.setItem(key,JSON.stringify(value));

    }

};

/* ==========================================================
   FAVORITOS
========================================================== */

const Favorites = {

    data:CardStorage.get(CardStorage.favoritesKey),

    init(){

        cards.forEach(card=>{

            const id=this.getId(card);

            const btn=card.querySelector(".btn-favorite");

            this.applyState(card,id);

            btn?.addEventListener("click",()=>{

                this.toggle(card,id);

            });

        });

    },

    getId(card){

        return card.dataset.id || card.querySelector(".news-title")?.textContent;

    },

    toggle(card,id){

        this.data[id] = !this.data[id];

        CardStorage.set(CardStorage.favoritesKey,this.data);

        this.applyState(card,id);

    },

    applyState(card,id){

        const btn=card.querySelector(".btn-favorite");

        if(this.data[id]){

            card.classList.add("favorite");

            btn?.classList.add("active");

        }else{

            card.classList.remove("favorite");

            btn?.classList.remove("active");

        }

    }

};

/* ==========================================================
   CURTIDAS
========================================================== */

const Likes = {

    data:CardStorage.get(CardStorage.likesKey),

    init(){

        cards.forEach(card=>{

            const id=Favorites.getId(card);

            const btn=card.querySelector(".btn-like");

            const counter=card.querySelector(".like-count");

            if(!this.data[id]){

                this.data[id]=0;

            }

            this.update(counter,id);

            btn?.addEventListener("click",()=>{

                this.toggle(counter,id);

            });

        });

    },

    toggle(counter,id){

        this.data[id]++;

        CardStorage.set(CardStorage.likesKey,this.data);

        this.update(counter,id);

    },

    update(counter,id){

        if(counter){

            counter.textContent=this.data[id];

        }

    }

};

/* ==========================================================
   VISUALIZAÇÕES
========================================================== */

const Views = {

    data:CardStorage.get(CardStorage.viewsKey),

    init(){

        cards.forEach(card=>{

            const id=Favorites.getId(card);

            if(!this.data[id]){

                this.data[id]=0;

            }

            this.data[id]++;

            this.update(card,id);

        });

        CardStorage.set(CardStorage.viewsKey,this.data);

    },

    update(card,id){

        const counter=card.querySelector(".view-count");

        if(counter){

            counter.textContent=this.data[id];

        }

    }

};

/* ==========================================================
   EXPANDIR / RECOLHER
========================================================== */

const ExpandCard = {

    init(){

        cards.forEach(card=>{

            const btn=card.querySelector(".btn-expand");

            btn?.addEventListener("click",()=>{

                card.classList.toggle("expanded");

            });

        });

    }

};

/* ==========================================================
   COMPARTILHAR
========================================================== */

const ShareCard = {

    init(){

        cards.forEach(card=>{

            const btn=card.querySelector(".btn-share");

            btn?.addEventListener("click",()=>{

                this.share(card);

            });

        });

    },

    share(card){

        const title=
            card.querySelector(".news-title")?.textContent;

        if(navigator.share){

            navigator.share({

                title:title,

                text:"Confira esta notícia",

                url:window.location.href

            });

        }else{

            alert("Compartilhamento não suportado.");

        }

    }

};

/* ==========================================================
   SALVAR LEITURA
========================================================== */

const SaveRead = {

    init(){

        cards.forEach(card=>{

            card.addEventListener("click",(e)=>{

                if(e.target.closest("button")) return;

                card.classList.add("read");

            });

        });

    }

};

/* ==========================================================
   ANIMAÇÃO HOVER
========================================================== */

const CardHover = {

    init(){

        cards.forEach(card=>{

            card.addEventListener("mouseenter",()=>{

                card.style.transform="translateY(-6px)";

            });

            card.addEventListener("mouseleave",()=>{

                card.style.transform="translateY(0)";

            });

        });

    }

};

/* ==========================================================
   LAZY LOAD IMAGENS
========================================================== */

const CardImages = {

    init(){

        const images=document.querySelectorAll(".news-card img");

        const observer=new IntersectionObserver(entries=>{

            entries.forEach(entry=>{

                if(entry.isIntersecting){

                    const img=entry.target;

                    const src=img.dataset.src;

                    if(src){

                        img.src=src;

                        img.removeAttribute("data-src");

                    }

                    observer.unobserve(img);

                }

            });

        });

        images.forEach(img=>observer.observe(img));

    }

};

/* ==========================================================
   INICIALIZAÇÃO
========================================================== */

document.addEventListener("DOMContentLoaded",()=>{

    Favorites.init();

    Likes.init();

    Views.init();

    ExpandCard.init();

    ShareCard.init();

    SaveRead.init();

    CardHover.init();

    CardImages.init();

});