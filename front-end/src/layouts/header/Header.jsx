import { Link } from 'react-router-dom';
import styles from "./Header.module.scss";


export default function Header() {

    return (<>
        <header className={`${styles.test} mb60`}>

            <div className={`${styles.logo}`}>
                {/* /logo */}
            </div>

            <div className={`${styles.menu}`}>

                <nav>
                    <ul>
                        <li><Link to="/">ACCEUIL</Link></li>
                        <li><Link to="/ServicesPage">SERVICES</Link></li>
                        <li><Link to="/PortfolioTemoignagePage">PORTFOLIO ET TEMOIGNAGES</Link></li>
                        <li><Link to="/TarifsPage">TARIFS</Link></li>
                        <li><Link to="/AProposPage">A PROPOS</Link></li>
                        <li><Link to="/EspaceClientPage">ESPACE CLIENT</Link></li>
                        <li><Link to="/ContactPage">CONTACT</Link></li>
                    </ul>
                </nav>

            </div>
        </header>
    </>)
}

