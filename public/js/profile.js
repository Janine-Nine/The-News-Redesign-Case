/* ==========================================================
   THE NEWS
   PROFILE.JS
========================================================== */

"use strict";

/* ==========================================================
   ELEMENTOS
========================================================== */

const profileName = document.querySelector("#profileName");

const profileEmail = document.querySelector("#profileEmail");

const profileAvatar = document.querySelector("#profileAvatar");

const avatarInput = document.querySelector("#avatarInput");

const saveProfileBtn = document.querySelector("#saveProfile");

const logoutBtn = document.querySelector("#logout");

const favoritesList = document.querySelector("#favoritesList");

const historyList = document.querySelector("#historyList");

/* ==========================================================
   STORAGE
========================================================== */

const ProfileStorage = {

    key: "the-news-profile",

    get(){

        return JSON.parse(localStorage.getItem(this.key)) || {

            name: "Usuário",

            email: "",

            avatar: "",

            favorites: [],

            history: []

        };

    },

    save(data){

        localStorage.setItem(this.key, JSON.stringify(data));

    }

};

/* ==========================================================
   PERFIL
========================================================== */

const Profile = {

    data: ProfileStorage.get(),

    init(){

        this.loadProfile();

        this.events();

        this.renderLists();

    },

/* ==========================================================
   CARREGAR
========================================================== */

    loadProfile(){

        if(profileName){

            profileName.value = this.data.name;

        }

        if(profileEmail){

            profileEmail.value = this.data.email;

        }

        if(profileAvatar && this.data.avatar){

            profileAvatar.src = this.data.avatar;

        }

    },

/* ==========================================================
   EVENTOS
========================================================== */

    events(){

        saveProfileBtn?.addEventListener("click",()=>{

            this.saveProfile();

        });

        logoutBtn?.addEventListener("click",()=>{

            this.logout();

        });

        avatarInput?.addEventListener("change",(e)=>{

            this.uploadAvatar(e);

        });

    },

/* ==========================================================
   SALVAR PERFIL
========================================================== */

    saveProfile(){

        this.data.name = profileName.value;

        this.data.email = profileEmail.value;

        ProfileStorage.save(this.data);

        alert("Perfil atualizado com sucesso!");

    },

/* ==========================================================
   UPLOAD AVATAR
========================================================== */

    uploadAvatar(event){

        const file = event.target.files[0];

        if(!file) return;

        const reader = new FileReader();

        reader.onload = (e)=>{

            this.data.avatar = e.target.result;

            profileAvatar.src = this.data.avatar;

            ProfileStorage.save(this.data);

        };

        reader.readAsDataURL(file);

    },

/* ==========================================================
   FAVORITOS
========================================================== */

    renderFavorites(){

        if(!favoritesList) return;

        favoritesList.innerHTML = "";

        this.data.favorites.forEach(item=>{

            const li = document.createElement("li");

            li.textContent = item;

            favoritesList.appendChild(li);

        });

    },

/* ==========================================================
   HISTÓRICO
========================================================== */

    renderHistory(){

        if(!historyList) return;

        historyList.innerHTML = "";

        this.data.history.forEach(item=>{

            const li = document.createElement("li");

            li.textContent = item;

            historyList.appendChild(li);

        });

    },

/* ==========================================================
   RENDER LISTAS
========================================================== */

    renderLists(){

        this.renderFavorites();

        this.renderHistory();

    },

/* ==========================================================
   LOGOUT SIMULADO
========================================================== */

    logout(){

        const confirmLogout = confirm(

            "Deseja sair da conta?"

        );

        if(confirmLogout){

            localStorage.removeItem(

                ProfileStorage.key

            );

            location.reload();

        }

    }

};

/* ==========================================================
   ATUALIZAR HISTÓRICO GLOBAL
========================================================== */

const ProfileSync = {

    addToHistory(item){

        const data = ProfileStorage.get();

        data.history.unshift(item);

        data.history = data.history.slice(0,10);

        ProfileStorage.save(data);

    },

    addToFavorites(item){

        const data = ProfileStorage.get();

        if(!data.favorites.includes(item)){

            data.favorites.push(item);

        }

        ProfileStorage.save(data);

    }

};

/* ==========================================================
   INICIALIZAÇÃO
========================================================== */

document.addEventListener("DOMContentLoaded",()=>{

    Profile.init();

});