

// balise personnalisé de la top-bar
class TopBar extends HTMLElement {

    constructor() {
        super();

        const divElement = document.createElement("div");
        divElement.classList.add("container");
        divElement.innerHTML = `<div>
                                    <span class="span-image">
                                        <!-- image -->
                                    </span>
                                </div>

                                <div class="menu-container">
                                    <nav>
                                        <a href="index.html">Accueil</a>
                                        <a href="">Services</a>
                                        <a href="">Porftfolio et Témoignages</a>
                                        <a href="">Tarifs</>
                                        <a href="">A propos</a>
                                        <a href="./contactez-nous.html">Contact</a>
                                    </nav>
                                </div>`;

        document.getElementById("header").appendChild(divElement);

    }
}

customElements.define("top-bar", TopBar);