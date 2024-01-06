import Header from "./layouts/header/Header";
import HomePage from "./pages/HomePage/layout/HomePage";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import styles from "./App.module.scss";
import AProposPage from "./pages/AProposPage/layout/AProposPage";
import ContactPage from "./pages/ContactPage/layout/ContactPage";
import { DataProvider } from "./contexts/FetchContext";
import EspaceClientPage from "./pages/EspaceClientPage/layout/EspaceClientPage";
import TarifsPage from "./pages/TarifsPage/TarifsPage";
import PortfolioTemoignagePage from "./pages/PortfolioTemoignagePage/layout/PortfolioTemoignagePage";
import { ModalEditNote } from "./components/Modals";



function App() {



  return (
    <>
      <DataProvider>
        <Router>



          <Header />

          <div className={`${styles.content}`}>
            <Routes>

              {/* Accueil */}
              <Route path="/" Component={HomePage} />

              {/* Services */}
              <Route path="/ServicesPage" Component={() => <h1>services</h1>} />

              {/* PORTFOLIO ET TEMOIGNAGES */}
              <Route path="/PortfolioTemoignagePage" Component={PortfolioTemoignagePage} />

              {/* TARIFS */}
              <Route path="/TarifsPage" Component={TarifsPage} />

              {/* A PROPOS */}
              <Route path="/AProposPage" Component={AProposPage} />

              {/* ESPACE CLIENT */}
              <Route path="/EspaceClientPage" Component={EspaceClientPage} />

              {/* CONTACT */}
              <Route path="/ContactPage" Component={ContactPage} />

            </Routes>
          </div>

        </Router>
      </DataProvider>
    </>
  )
}

export default App
