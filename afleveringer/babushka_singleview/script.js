   let madretter = [];


   document.addEventListener("DOMContentLoaded", start);

   function start() {
       let hej = document.querySelector("#liste");
       let overskrift = document.querySelector("#overskrift");
       let filter = "alle";
       console.log(madretter);

       async function getJson() {
           let hentJson = await fetch("script.json");
           madretter = await hentJson.json();

           visRetter();
       }

       function visRetter() {
           hej.innerHTML = ""; //slet eksisterende indhold fra #Liste
           madretter.forEach(enkelteRetter => {
               if (filter == "alle" || filter == enkelteRetter.kategori) {
                   let template =
                       `<div class="alleRetter">

                            <img class="billede" src="imgs/small/${enkelteRetter.billede}-sm.jpg" alt="${enkelteRetter.navn}">
                            <h2>${enkelteRetter.navn}</h2>
                            <p>${enkelteRetter.kort}</p>
                            <p>Pris: ${enkelteRetter.pris},-</p>
                        `;
                   hej.insertAdjacentHTML("beforeend", template);
                   hej.lastElementChild.addEventListener("click", () => {
                       location.href = "singleview.html?navne=" + enkelteRetter.navn;
                   });

               }

           });

       }


       document.querySelectorAll(".filter").forEach(alleKnapper => {
           alleKnapper.addEventListener("click", filtrering);
       })


       function filtrering() {
           filter = this.getAttribute("data-hold");
           document.querySelector("h2").textContent = this.textContent;
           document.querySelectorAll(".filter").forEach(fjernfarve => {
               fjernfarve.classList.remove("valgt");
           });
           this.classList.add("valgt");

           visRetter();
       }


       getJson();

   }
