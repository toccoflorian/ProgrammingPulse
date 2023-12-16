import Header from "./layouts/header/Header";
import HomePage from "./pages/HomePage/page/HomePage";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import styles from "./App.module.scss";
import AProposPage from "./pages/AProposPage/AProposPage";
import ContactPage from "./pages/ContactPage/page/ContactPage";



function App() {

  return (
    <>
      <Router>
        <Header />

        <div className={`${styles.content}`}>
          <Routes>

            {/* Accueil */}
            <Route path="/" Component={HomePage} />

            {/* Services */}
            <Route path="/ServicesPage" Component={() => <h1>services</h1>} />

            {/* PORTFOLIO ET TEMOIGNAGES */}
            <Route path="/PortfolioTemoignagePage" Component={() => <h1>portfolioTemoignage</h1>} />

            {/* TARIFS */}
            <Route path="/TarifsPage" Component={() => <h1>tarifs</h1>} />

            {/* A PROPOS */}
            <Route path="/AProposPage" Component={AProposPage} />

            {/* ESPACE CLIENT */}
            <Route path="/EspaceClientPage" Component={() => <h1>espaceClient</h1>} />

            {/* CONTACT */}
            <Route path="/ContactPage" Component={ContactPage} />

          </Routes>
        </div>

      </Router>
    </>
  )
}

export default App
