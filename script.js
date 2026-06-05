const API = "jJvdy-Tw_vtvxkU8BJyKJvAa43n_aRaX2BnJHFkfDhOuomHM";
const url = "https://api.currentsapi.services/v1/search?keywords=";
// "https://api.currentsapi.services/v1/search?keywords=technology&language=en&page_number=1&page_size=5&apiKey=YOUR_API_KEY"
const loadMore= document.getElementById("loadMore");
const cardcontainer = document.querySelector(".card-container");
const content = document.querySelector(".ticker-content");
let query = null;

window.addEventListener("load", () => fetchnews("India"));

function reload() {
    window.location.reload();
}


async function fetchnews(query) {
    const res = await fetch(`${url}${query}&language=en&page_number=1&apiKey=${API}`);
    const data = await res.json();
    console.log(data.news)
    fillingCard(data.news);
    scroll(data.news);

}

function scroll(news){
    news.forEach(element => {
        const content = document.querySelector(".ticker-content");
        const newstitles = document.createElement("span");
        const space= document.createElement("span");

        newstitles.classList.add("title-scroll");
        space.classList.add("title-scroll")
        newstitles.innerHTML= ` ${element.title}`;
        space.innerHTML=`⬤`;

        newstitles.addEventListener("click", () => {window.open(element.url, "_blank");});

        content.append(newstitles);
        content.append(space);
    });
}

function fillingCard(news) {

    news.forEach(element => {

        const card = document.createElement("div");

        card.classList.add("card");

        const date = new Date(element.published).toLocaleString("en-US", {
            timeZone: "Asia/Jakarta",
        });

        card.innerHTML = `
            <div class="card-img">
                <img src="${element.image}" class="nimage" alt="Image">
            </div>
            <div class="card-content">
                <h2 class="title">${element.title}</h2>
                <p class="author">${element.author}-${date}</p>
                <p class="discription">${element.description}</p>
            </div>
        `;  

        const imgElement = card.querySelector(".card-img");
        const nimage = card.querySelector(".nimage");
        

        nimage.onerror = () => {
        console.warn(`Removing slide due to broken image: ${element.image}`);
        card.remove(); 
        };
        card.addEventListener("click", () => {window.open(element.url, "_blank");});
        cardcontainer.appendChild(card);
        
    });

}

let page = 1;
loadMore.onclick = () => {
    page++
    query ? fetchnewspages(query) :fetchnewspages("India");   
}

async function fetchnewspages(query) {
    const res = await fetch(`${url}${query}&language=en&page_number=${page}&apiKey=${API}`);
    const data = await res.json();
    fillingCard(data.news);

}

function latest(){
    query= "latest";
    cardcontainer.innerHTML = "";
    content.innerHTML="";
    fetchnews(query);
}

function trending(){
    query= "trending";
    cardcontainer.innerHTML = "";
    content.innerHTML="";
    fetchnews(query);
}

function sports(){
    query= "sports";
    cardcontainer.innerHTML = "";
    content.innerHTML="";
    fetchnews(query);
}

function technology(){
    query= "technology";
    cardcontainer.innerHTML = "";
    content.innerHTML="";
    fetchnews(query);
}

function food(){
    query= "food";
    cardcontainer.innerHTML = "";
    content.innerHTML="";

    fetchnews(query);
}

const seform = document.getElementById("seform");

seform.addEventListener("submit",(e) => {
    e.preventDefault();
    const serinp = document.getElementById("serinp");
    query = serinp.value;
    console.log(query)
    cardcontainer.innerHTML = "";
    content.innerHTML="";
    sercontainer.classList.toggle("show");
    mainspacing.classList.toggle("space");
    fetchnews(query);
});

const searchicon =  document.getElementById("searchicon");
const sercontainer = document.getElementById("sercontainer");
const mainspacing = document.querySelector(".container2");


searchicon.addEventListener("click", () => {
    sercontainer.classList.toggle("show");
    mainspacing.classList.toggle("space");
});

const themediv = document.querySelector(".themediv");
const sun = document.getElementById("sun");
const moon = document.getElementById("moon");

function setmode(theme){
    if (theme === "dark"){
        document.body.classList.add("darktheme");
        sun.classList.remove("dishidden");
        moon.classList.add("dishidden");
    }
    else{
        document.body.classList.remove("darktheme");
        sun.classList.add("dishidden");
        moon.classList.remove("dishidden");
    }

    localStorage.setItem("theme",theme);
}

setmode(localStorage.getItem("theme" || "light"));

themediv.addEventListener("click",() => {
    const isDark = document.body.classList.contains("darktheme");
    setmode(isDark? "light" : "dark");
});