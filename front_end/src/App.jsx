import Header from "./components/Header";
import HomePage from "./pages/HomePage/layout/HomePage";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import styles from "./App.module.scss";
import AProposPage from "./pages/AProposPage/layout/AProposPage";
import ContactPage from "./pages/ContactPage/layout/ContactPage";
import { DataProvider } from "./contexts/FetchContext";
import EspaceClientPage from "./pages/EspaceClientPage/layout/EspaceClientPage";
import TarifsPage from "./pages/TarifsPage/TarifsPage";
import PortfolioTemoignagePage from "./pages/PortfolioTemoignagePage/layout/PortfolioTemoignagePage";
import ServicesPage from "./pages/ServicesPage/ServicesPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";



function App() {



  return (
    <>
      <DataProvider>
        <Router>



          <Header />

          <div className={`${styles.content}`}>
            <Routes>

              {/* Accueil */}
              <Route path="/" element={<HomePage />} />

              {/* Services */}
              <Route path="/ServicesPage" element={<ServicesPage />} />

              {/* PORTFOLIO ET TEMOIGNAGES */}
              <Route path="/PortfolioTemoignagePage" element={<PortfolioTemoignagePage />} />

              {/* TARIFS */}
              <Route path="/TarifsPage" element={<TarifsPage />} />

              {/* A PROPOS */}
              <Route path="/AProposPage" element={<AProposPage />} />

              {/* ESPACE CLIENT */}
              <Route path="/EspaceClientPage" element={<EspaceClientPage />} />

              {/* CONTACT */}
              <Route path="/ContactPage" element={<ContactPage />} />

              {/* 404 not found */}
              <Route path="*" element={<NotFoundPage />} />


            </Routes>
          </div>

        </Router>
      </DataProvider>
    </>
  )
}

export default App
