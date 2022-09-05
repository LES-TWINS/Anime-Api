let userInp = document.querySelector("#inp");
let btn = document.querySelector("#btn");
let cardsArea = document.querySelector(".cards_area");

class HtmlWorker {
    static getCardHtml (animeItem){
        return `
               <div class="card" style="width: 15rem;">
               <img src="${animeItem.images.jpg.image_url}" class="card-img-top" alt="...">
               <div class="card-body">
                 <h5 class="card-title">${animeItem.title}</h5>
               </div>
             </div>
               `
    }
    static generateAnimeCards(animeList){
        cardsArea.innerHTML = "";
        animeList.forEach(animeElement =>{
            cardsArea.innerHTML += HtmlWorker.getCardHtml(animeElement)
        })
    }
}


class HttpService {
    static getAnimeDataFromApi(animeName,func){
        let apiUrl = `https://api.jikan.moe/v4/anime?q=${animeName}`;
        fetch(apiUrl)
        .then(response => response.json())
        .then(response => func(response.data));
    }
}

btn.addEventListener("click",function(){
    if(userInp.value != undefined || userInp.value.length > 0){
      HttpService.getAnimeDataFromApi(userInp.value,function(data){
        HtmlWorker.generateAnimeCards(data);
      });
    }
})