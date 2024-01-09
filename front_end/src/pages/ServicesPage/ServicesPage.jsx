import { H2Primary } from "../../components/Titres";
import FormulaireInscription from "../../components/formulaires/FormulaireInscription";


export default function ServicesPage() {

    return (<>
        {/* formulaire création de compte */}
        <div className={` d-flex flex-column align-center`}>
            <H2Primary textContent={`Créer un compte`} />
            <FormulaireInscription />
        </div>
    </>)
}