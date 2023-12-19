import HomePageH1Container from "../HomePageH1Container";
import { Section_1_type_1, Section_1_type_2 } from "../Section_1";
import { H1Primary, H2Primary, H3Primary } from "../../../components/Titres";
import "./HomePage.module.scss";

export default function HomePage() {

    return (<>



        <HomePageH1Container />

        <H1Primary textContent="H1Primary" />

        <H2Primary textContent="H2Primary" />

        <H3Primary textContent="H3Primary" />

        <div className={`d-flex flex-column jusitify-center align-center`}>

            <Section_1_type_1
                titre="Personnalisation Avancée et Performance"

                contenu="Chez Programming Pulse Studio, chaque site est une création unique, façonnée précisément selon vos désirs. 
                En tant que développeur full-stack, je maîtrise l'ensemble de la chaîne de production web - du front-end au back-end, 
                en passant par la gestion de serveur, l'optimisation SEO, la base de données jusqu'à l'intégration d'APIs. Contrairement 
                aux sites basés sur des CMS, je vous garantie des solutions personnalisées et performantes, adaptées à vos exigences 
                spécifiques."

                imagePath="/images/kisspng-car-auto-mechanic-clip-art-worker-5abafe5e79bd58.0445926915222042544987.png" />

            <Section_1_type_2
                titre="Un Développement sur-mesure de A à Z"

                contenu="Mon approche est celle d'un artisan du web : vous avez une vision, je la matérialise. Dès la réception de votre 
                maquette et de vos spécifications, je me penche sur votre projet avec attention pour le concrétiser. Tout commence par 
                l'élaboration d'un cahier des charges exhaustif et un devis transparent. Une fois ces documents approuvés et signés 
                par vous, mon travail de développement commence. Chaque fonctionnalité listée est développée, testée et approuvée par 
                mes soins, puis par vous, pour un résultat qui répond parfaitement à vos attentes."

                imagePath="/images/kisspng-construction-worker-architectural-engineering-cart-construction-worker-5ab8dd07578a65.6772059815220646473586.png" />

            <Section_1_type_1
                titre="Assurance Qualité et Paiement Sécurisé"

                contenu="Je travaille selon une méthodologie rigoureuse pour assurer la qualité. Le processus est itératif : après chaque phase de développement, 
                je vous présente les avancées pour validation. Ce n'est qu'après votre entière satisfaction et la validation finale des points du cahier des 
                charges que le projet est considéré comme terminé, et que le paiement est effectué. Cette méthode garantit une transparence totale et une 
                satisfaction mutuelle."

                imagePath="/images/garantie.webp" />

            <Section_1_type_2
                titre="Sécurité et Meilleures Pratiques"

                contenu="La sécurité n'est pas une option, c'est une priorité. En suivant les meilleures pratiques de l'industrie, je m'engage à livrer 
                un site sécurisé pour vous et vos utilisateurs, en veillant à appliquer les stratégies de sécurité les plus robustes et à jour."

                imagePath="/images/kisspng-clip-art-clothing-accessories-cartoon-product-desi-script-materi-edukasi-untuk-pebisnis-online-kaly-5c635672c8e170.4320553915500140668228.png" />
        </div>

        <p className={`mrl-auto text-center`}>
            Le choix de préciser que je suis une micro-entreprise et le seul développeur reflète mon engagement à
            fournir un service personnalisé et dédié. Cette proximité avec mes clients favorise une meilleure compréhension
            de vos besoins et une réactivité sans égale. Je suis votre interlocuteur unique, garantissant ainsi une
            communication fluide et des décisions rapides, essentielles pour un projet web réussi.
        </p>
    </>)
}
