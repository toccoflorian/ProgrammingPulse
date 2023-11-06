

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
                                        <a href="">Accueil</a>
                                        <a href="">Les services</a>
                                        <a href="">Les projets</a>
                                        <a href="">En savoir plus</a>
                                        <a href="">contact</a>
                                    </nav>
                                </div>`;

        document.getElementById("header").appendChild(divElement);

    }
}

customElements.define("top-bar", TopBar);