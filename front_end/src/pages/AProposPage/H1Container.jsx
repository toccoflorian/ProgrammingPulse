import styles from "./H1Container.module.scss";



export default function H1Container() {
    return (<>
        <div className={`${styles.container} d-flex flex-column justify-center align-center`}>
            <h1 className={`H1Primary`}>À Propos de<br />Programming Pulse Studio</h1>

            <h2>Un Engagement Personnalisé pour des Solutions Web Uniques </h2>

            <p className={`textPrimary text-center`}>

                Chez Programming Pulse Studio, la personnalisation n&#39;est pas seulement un mot à la mode, c&#39;est la pierre angulaire
                de
                notre façon de travailler. En tant que développeur full-stack indépendant, je me consacre entièrement à la
                transformation de vos idées en solutions web réelles et performantes. Maîtrisant chaque aspect de la chaîne de
                production web, de la conception front-end à la programmation back-end, en passant par la gestion de serveurs,
                je garantis des créations qui ne ressemblent à aucune autre.
            </p>

        </div>
    </>)
}