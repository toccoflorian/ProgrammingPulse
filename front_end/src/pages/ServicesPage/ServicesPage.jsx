import FormulaireInscription from "../../components/formulaires/FormulaireInscription";


export default function ServicesPage() {

    return (<>
        {/* formulaire création de compte */}
        <div className={` d-flex flex-column align-center`}>
            <h2 className={`H2Primary`}>Créer un compte</h2>
            <FormulaireInscription />
        </div>
    </>)
}