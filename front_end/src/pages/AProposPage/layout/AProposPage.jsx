import { H2Primary } from "../../../components/Titres";
import H1Container from "../H1Container";
import styles from "./AProposPage.module.scss";


export default function AProposPage() {

    return (<>

        <H1Container />


        <div>
            <div className={`${styles.temporary}`}>
                <H2Primary textContent={`À Propos de Programming Pulse Studio`} />
                <p>
                    Chez Programming Pulse Studio, la personnalisation n&#39;est pas seulement un mot à la mode, c&#39;est la pierre angulaire
                    de
                    notre façon de travailler. En tant que développeur full-stack indépendant, je me consacre entièrement à la
                    transformation de vos idées en solutions web réelles et performantes. Maîtrisant chaque aspect de la chaîne de
                    production web, de la conception front-end à la programmation back-end, en passant par la gestion de serveurs,
                    je garantis des créations qui ne ressemblent à aucune autre.
                </p>
            </div>


            <div>
                <H2Primary textContent={`Votre Vision, Ma Mission`} />
                <p>
                    Votre projet mérite plus qu&#39;une approche standardisée. C&#39;est pourquoi, dès le début, je m&#39;immerge dans votre
                    univers.
                    Vos besoins, vos attentes et vos objectifs sont le cœur de mon processus créatif. Je commence par établir un cahier
                    des
                    charges détaillé et un devis transparent, garantissant que chaque aspect de votre vision est compris et intégré. De
                    la
                    première ligne de code à la dernière touche de design, je façonne chaque projet avec une précision d&#39;artisan, pour
                    que
                    le résultat final soit exactement ce que vous avez imaginé, voire plus.
                </p>
            </div>


            <div>
                <H2Primary textContent={`Une Qualité Sans Compromis`} />
                <p>
                    La qualité n&#39;est pas un luxe, c&#39;est une nécessité. C&#39;est pourquoi je vous implique activement dans le processus, en
                    vous présentant les
                    avancées
                    et en sollicitant votre validation à chaque étape. Cette méthode itérative assure que le produit final correspond
                    parfaitement à vos attentes, avec la flexibilité de s&#39;adapter à vos retours tout au long du projet.
                </p>
            </div>

            <div>
                <H2Primary textContent={`Sécurité et Confiance`} />
                <p>
                    La sécurité de votre site web est ma priorité absolue. En adhérant aux meilleures pratiques de l&#39;industrie, je
                    m&#39;assure
                    que votre site est non seulement esthétiquement agréable et fonctionnel, mais aussi sécurisé contre les menaces
                    numériques. En veillant à appliquer des techniques de sécurité avancées, je m&#39;engage à vous offrir un
                    espace en
                    ligne sûr et fiable.
                </p>
            </div>

            <div>
                <H2Primary textContent={`Proximité et Réactivité : Les Avantages d'une Micro-Entreprise`} />
                <p>
                    En tant que micro-entreprise, Programming Pulse Studio offre un avantage unique : une proximité inégalée avec ses
                    clients. Être votre unique contact signifie que vos questions, vos idées et vos préoccupations sont
                    toujours
                    traitées rapidement et avec le plus grand soin. Cette structure légère et agile permet une réactivité et une
                    adaptabilité exceptionnelles, essentielles dans le monde dynamique du développement web.
                </p>
            </div>

            <div>
                <H2Primary textContent={`Collaboration Sécurisée via Malt et Avantages Tarifaires Exclusifs`} />
                <p>
                    Pour garantir une sécurité et une confiance maximales dans chaque projet, Programming Pulse Studio collabore avec
                    <strong> Malt</strong>, une plateforme reconnue pour la gestion et la sécurisation des missions freelance. En
                    réalisant les devis et missions via Malt, nous assurons une protection optimale tant pour vous, le client, que pour
                    moi en tant que prestataire. Cette collaboration avec Malt vous offre une tranquillité d&#39;esprit, sachant que chaque
                    aspect du projet est géré avec professionnalisme et sécurité. De plus, j&#39;offre des tarifs préférentiels pour les clients qui me contactent directement via mon site web. N&#39;hésitez
                    pas à me contacter directement pour bénéficier de ces tarifs
                    exclusifs et commencer une collaboration fructueuse.
                </p>
            </div>

            <div>
                <H2Primary textContent={`En Conclusion`} />
                <p>
                    Votre projet est unique, et il mérite une attention tout aussi unique. Chez Programming Pulse Studio, vous trouverez
                    un
                    partenaire dédié et passionné, prêt à transformer votre vision en réalité numérique.
                </p>
            </div>

        </div>


    </>)
}