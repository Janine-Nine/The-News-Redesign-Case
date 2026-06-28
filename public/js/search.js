/* ==========================================================
   THE NEWS
   SEARCH.JS
   PARTE 1
========================================================== */

"use strict";

/* ==========================================================
   ELEMENTOS
========================================================== */

const searchInput = document.querySelector("#searchInput");
const searchButton = document.querySelector("#searchButton");
const clearButton = document.querySelector("#clearSearch");

const newsCards = document.querySelectorAll(".news-card");

const resultCounter = document.querySelector("#resultCounter");

const emptyMessage = document.querySelector("#emptySearch");

/* ==========================================================
   SEARCH
========================================================== */

const Search = {

    value: "",

    totalResults: 0,

    init(){

        if(!searchInput) return;

        this.events();

        this.updateCounter(newsCards.length);

    },

/* ==========================================================
   EVENTOS
========================================================== */

    events(){

        searchInput.addEventListener("keyup",(event)=>{

            this.value = event.target.value.toLowerCase().trim();

            this.filter();

        });

        searchButton?.addEventListener("click",()=>{

            this.filter();

        });

        clearButton?.addEventListener("click",()=>{

            this.clear();

        });

        searchInput.addEventListener("keydown",(event)=>{

            if(event.key === "Enter"){

                event.preventDefault();

                this.filter();

            }

        });

    },

/* ==========================================================
   FILTRO
========================================================== */

    filter(){

        this.totalResults = 0;

        newsCards.forEach(card=>{

            const title =
                card.querySelector(".news-title")
                ?.textContent
                .toLowerCase() || "";

            const category =
                card.dataset.category?.toLowerCase() || "";

            const author =
                card.dataset.author?.toLowerCase() || "";

            const description =
                card.querySelector(".news-description")
                ?.textContent
                .toLowerCase() || "";

            const found =

                title.includes(this.value) ||

                category.includes(this.value) ||

                author.includes(this.value) ||

                description.includes(this.value);

            if(found){

                card.style.display = "";

                this.totalResults++;

            }else{

                card.style.display = "none";

            }

        });

        this.updateCounter(this.totalResults);

        this.empty();

    },

/* ==========================================================
   LIMPAR
========================================================== */

    clear(){

        searchInput.value = "";

        this.value = "";

        newsCards.forEach(card=>{

            card.style.display = "";

        });

        this.updateCounter(newsCards.length);

        this.empty();

    },

/* ==========================================================
   CONTADOR
========================================================== */

    updateCounter(total){

        if(resultCounter){

            resultCounter.textContent =

                `${total} resultado(s)`;

        }

    },

/* ==========================================================
   MENSAGEM
========================================================== */

    empty(){

        if(!emptyMessage) return;

        if(this.totalResults === 0 && this.value !== ""){

            emptyMessage.classList.add("show");

        }else{

            emptyMessage.classList.remove("show");

        }

    }

};

/* ==========================================================
   FILTRO POR BOTÕES
========================================================== */

const CategoryFilter = {

    buttons:
        document.querySelectorAll("[data-filter]"),

    init(){

        if(this.buttons.length===0) return;

        this.buttons.forEach(button=>{

            button.addEventListener("click",()=>{

                const category =
                    button.dataset.filter;

                this.filter(category);

            });

        });

    },

    filter(category){

        let total = 0;

        newsCards.forEach(card=>{

            if(category==="all"){

                card.style.display="";

                total++;

                return;

            }

            if(card.dataset.category===category){

                card.style.display="";

                total++;

            }else{

                card.style.display="none";

            }

        });

        Search.updateCounter(total);

    }

};

/* ==========================================================
   AUTOFOCUS
========================================================== */

const AutoFocus={

    init(){

        if(searchInput){

            searchInput.focus();

        }

    }

};

/* ==========================================================
   DOM READY
========================================================== */

document.addEventListener("DOMContentLoaded",()=>{

    Search.init();

    CategoryFilter.init();

    AutoFocus.init();

});
/* ==========================================================
   THE NEWS
   SEARCH.JS
   PARTE 2
========================================================== */

"use strict";

/* ==========================================================
   HISTÓRICO
========================================================== */

const SearchHistory = {

    key:"the-news-search-history",

    list:[],

    init(){

        this.load();

    },

    save(value){

        if(!value) return;

        this.list=this.list.filter(item=>item!==value);

        this.list.unshift(value);

        this.list=this.list.slice(0,8);

        localStorage.setItem(

            this.key,

            JSON.stringify(this.list)

        );

    },

    load(){

        const data=localStorage.getItem(this.key);

        this.list=data?JSON.parse(data):[];

    }

};

/* ==========================================================
   REMOVER ACENTOS
========================================================== */

function normalizeText(text){

    return text
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g,"")
        .toLowerCase();

}

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

    };

}

/* ==========================================================
   SUGESTÕES
========================================================== */

const Suggestions={

    box:document.querySelector("#searchSuggestions"),

    init(){

        if(!this.box||!searchInput) return;

        searchInput.addEventListener(

            "input",

            debounce(()=>{

                this.render(searchInput.value);

            },200)

        );

    },

    render(value){

        this.box.innerHTML="";

        if(value.trim()==="") return;

        const results=SearchHistory.list.filter(item=>

            normalizeText(item)

            .includes(normalizeText(value))

        );

        results.forEach(item=>{

            const option=document.createElement("div");

            option.className="suggestion-item";

            option.textContent=item;

            option.addEventListener("click",()=>{

                searchInput.value=item;

                Search.value=item.toLowerCase();

                Search.filter();

                this.box.innerHTML="";

            });

            this.box.appendChild(option);

        });

    }

};

/* ==========================================================
   DESTAQUE DO TEXTO
========================================================== */

const Highlight={

    apply(){

        if(Search.value==="") return;

        newsCards.forEach(card=>{

            const title=card.querySelector(".news-title");

            if(!title) return;

            const original=title.dataset.original ||
                title.textContent;

            title.dataset.original=original;

            const regex=new RegExp(

                `(${Search.value})`,

                "gi"

            );

            title.innerHTML=original.replace(

                regex,

                "<mark>$1</mark>"

            );

        });

    },

    clear(){

        newsCards.forEach(card=>{

            const title=card.querySelector(".news-title");

            if(title && title.dataset.original){

                title.innerHTML=title.dataset.original;

            }

        });

    }

};

/* ==========================================================
   ESTENDER O MÉTODO FILTER
========================================================== */

const originalFilter=Search.filter.bind(Search);

Search.filter=function(){

    Highlight.clear();

    originalFilter();

    Highlight.apply();

    SearchHistory.save(this.value);

};

/* ==========================================================
   PESQUISA POR MÚLTIPLAS PALAVRAS
========================================================== */

Search.matchWords=function(text){

    const words=this.value.split(" ");

    return words.every(word=>

        normalizeText(text)

        .includes(normalizeText(word))

    );

};

/* ==========================================================
   INICIALIZAÇÃO
========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        SearchHistory.init();

        Suggestions.init();

    }

);
/* ==========================================================
   THE NEWS
   SEARCH.JS
   PARTE 3 - FINAL
========================================================== */

"use strict";

/* ==========================================================
   PESQUISA POR VOZ
========================================================== */

const VoiceSearch = {

    recognition:null,

    init(){

        const Speech =
            window.SpeechRecognition ||
            window.webkitSpeechRecognition;

        if(!Speech) return;

        this.recognition = new Speech();

        this.recognition.lang = "pt-BR";

        this.recognition.continuous = false;

        this.recognition.interimResults = false;

        const voiceButton =
            document.querySelector("#voiceSearch");

        voiceButton?.addEventListener("click",()=>{

            this.recognition.start();

        });

        this.recognition.onresult = (event)=>{

            const transcript =
                event.results[0][0].transcript;

            searchInput.value = transcript;

            Search.value = transcript.toLowerCase();

            Search.filter();

        };

    }

};

/* ==========================================================
   ATALHOS DE TECLADO
========================================================== */

const KeyboardSearch = {

    init(){

        document.addEventListener("keydown",(event)=>{

            if(event.ctrlKey && event.key === "k"){

                event.preventDefault();

                searchInput?.focus();

            }

            if(event.key === "Escape"){

                searchInput.value = "";

                Search.clear();

                Highlight.clear();

            }

        });

    }

};

/* ==========================================================
   LIMPAR HISTÓRICO
========================================================== */

const ClearHistory = {

    init(){

        const btn =
            document.querySelector("#clearHistory");

        btn?.addEventListener("click",()=>{

            localStorage.removeItem(

                SearchHistory.key

            );

            SearchHistory.list = [];

            alert("Histórico limpo!");

        });

    }

};

/* ==========================================================
   ESTATÍSTICAS DE PESQUISA
========================================================== */

const SearchStats = {

    init(){

        const stats =
            document.querySelector("#searchStats");

        if(!stats) return;

        setInterval(()=>{

            stats.textContent =

                `Buscas recentes: ${SearchHistory.list.length}`;

        },1000);

    }

};

/* ==========================================================
   MELHORIAS DE ACESSIBILIDADE
========================================================== */

const SearchA11y = {

    init(){

        searchInput?.setAttribute(

            "aria-label",

            "Campo de pesquisa de notícias"

        );

        searchInput?.setAttribute(

            "autocomplete",

            "off"

        );

    }

};

/* ==========================================================
   PERFORMANCE FINAL
========================================================== */

const SearchPerformance = {

    init(){

        console.log(

            "Search.js carregado com sucesso."

        );

    }

};

/* ==========================================================
   INICIALIZAÇÃO FINAL
========================================================== */

document.addEventListener("DOMContentLoaded",()=>{

    VoiceSearch.init();

    KeyboardSearch.init();

    ClearHistory.init();

    SearchStats.init();

    SearchA11y.init();

    SearchPerformance.init();

});