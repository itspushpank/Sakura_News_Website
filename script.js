const API = "jJvdy-Tw_vtvxkU8BJyKJvAa43n_aRaX2BnJHFkfDhOuomHM";
const url = "https://api.currentsapi.services/v1/search?keywords=";
// "https://api.currentsapi.services/v1/search?keywords=technology&language=en&page_number=1&page_size=5&apiKey=YOUR_API_KEY"


fetchnews("science");


async function fetchnews(query) {
    const res = await fetch(`${url}${query}&language=en&page_number=1&apiKey=${API}`);
    const data = await res.json();
    console.log(data.news)
    fillingCard(data.news);

}

function fillingCard(news) {

    const cardcontainer = document.querySelector(".card-container");

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
                <p class="discription">${element.description}</p>
                <p class="author">${element.author}-${date}</p>
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



