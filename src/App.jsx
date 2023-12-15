import Header from "./layouts/header/Header";
import HomePage from "./pages/HomePage/layout/HomePage";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import styles from "./App.module.scss";



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
            <Route path="/AProposPage" Component={() => <h1>aPropos</h1>} />

            {/* ESPACE CLIENT */}
            <Route path="/EspaceClientPage" Component={() => <h1>espaceClient</h1>} />

            {/* CONTACT */}
            <Route path="/ContactPage" Component={() => <h1>contact</h1>} />

          </Routes>
        </div>

      </Router>
    </>
  )
}

export default App
