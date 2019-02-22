   let madretter = [];


   document.addEventListener("DOMContentLoaded", start);

   function start() {
       let hej = document.querySelector(".liste");
       let overskrift = document.querySelector("#overskrift");
       let filter = "alle";
       console.log(madretter);

       document.querySelector("#burgermenu").addEventListener("click", toggleMenu);

       async function getJson() {
           let hentJson = await fetch("elfuerte.json");
           madretter = await hentJson.json();

           visRetter();
       }

       function visRetter() {
           hej.innerHTML = ""; //slet eksisterende indhold fra .Liste
           madretter.forEach(enkelteRetter => {
               if (filter == "alle" || filter == enkelteRetter.kategori) {
                   let template =
                       `<div class="alleRetter">

                            <img class="billede" src="billeder/${enkelteRetter.billede}.jpg.png" alt="${enkelteRetter.navn}">
                            <h2>${enkelteRetter.id}. ${enkelteRetter.navn}</h2>
                            <p>Pris: ${enkelteRetter.lang},-</p>
                        `;
                   hej.insertAdjacentHTML("beforeend", template);
                   hej.lastElementChild.addEventListener("click", () => {
                       location.href = "singleview.html?id=" + enkelteRetter.id;
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

   document.querySelector("header").addEventListener("click", hjem);

   function hjem() {
       location.reload();
   }

   function toggleMenu() {
       console.log("toggleMenu");
       document.querySelector("#menu").classList.toggle("hidden");

       let erSkjult =
           document.querySelector("#menu").classList.contains("hidden");


       if (erSkjult == true) {
           document.querySelector("#burgermenu").textContent = "☰";
           //hvis menuen er skjult = ændre menuknapt til tre streger


       } else {
           //hvis menuen er vist = ændre menuknapt til X
           document.querySelector("#burgermenu").textContent = "☓";


       }

   }
