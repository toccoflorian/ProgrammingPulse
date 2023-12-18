import styles from "./HomePageH1Container.module.scss";


export default function HomePageH1Container() {



    return (<>
        <div className={`${styles.h1Container} 
        d-flex mrl-auto br-medium`}>

            {/* particules JS */}
            <div className={`${styles.imageContainer} 
                f1 m25 br-medium
                `} />


            <div className={`${styles.textContainer} f1`}>
                <h1 className={`text-center theme-h1`}>Programming Pulse Studio</h1>

                <p className={`mrl-auto text-center`}>
                    Création, configuration, optimisation et mise en production de sites internet,
                    votre solution clé en main pour votre image en ligne depuis Montpellier.
                </p>
            </div>

        </div>
    </>)
}