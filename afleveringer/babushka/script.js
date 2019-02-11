   let madretter = [];


   document.addEventListener("DOMContentLoaded", start);

   function start() {
       let hej = document.querySelector("#liste");
       console.log(madretter);

       async function getJson() {
           let hentJson = await fetch("script.json");
           madretter = await hentJson.json();
           visRetter();
       }

       function visRetter() {
           madretter.forEach(enkelteRetter => {
               hej.innerHTML +=
                   `<div class="alleRetter">

                            <img class="billede" src="imgs/small/${enkelteRetter.billede}-sm.jpg" alt="${enkelteRetter.navn}">
                            <h2>${enkelteRetter.navn}</h2>
                            <p>${enkelteRetter.kort}</p>
                            <p>Pris: ${enkelteRetter.pris},-</p>
                        `;
           });
       }

       getJson()

   }
