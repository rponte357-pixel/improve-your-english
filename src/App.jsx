import { HashRouter, Routes, Route, Outlet } from "react-router-dom";

import Hub from "./pages/Hub";
import GrammarHub from "./pages/GrammarHub";
import Cleft from "./pages/Cleft";
import CleftFamily from "./pages/CleftFamily";
import Inversion from "./pages/Inversion";
import InversionUnit from "./pages/InversionUnit";
import Passive from "./pages/Passive";
import Connectors from "./pages/Connectors";
import ConnectorFamily from "./pages/ConnectorFamily";
import Conditionals from "./pages/Conditionals";
import ConditionalType from "./pages/ConditionalType";
import Modals from "./pages/Modals";
import ModalFamily from "./pages/ModalFamily";
import Clauses from "./pages/Clauses";
import ClauseFamily from "./pages/ClauseFamily";
import Formal from "./pages/Formal";
import FormalFamily from "./pages/FormalFamily";
import Verbs from "./pages/Verbs";
import VerbFamily from "./pages/VerbFamily";
import Cohesion from "./pages/Cohesion";
import CohesionFamily from "./pages/CohesionFamily";
import Pronunciation from "./pages/Pronunciation";

import "./App.css";

function Shell() {
  return (
    <div className="main-container">
      <Outlet />
    </div>
  );
}

export default function App() {
  // HashRouter avoids 404s on GitHub Pages without a server-side rewrite.
  return (
    <HashRouter>
      <Routes>
        <Route element={<Shell />}>
          <Route path="/" element={<Hub />} />
          <Route path="/grammar" element={<GrammarHub />} />

          {/* Core C1 */}
          <Route path="/grammar/inversion" element={<Inversion />} />
          <Route path="/grammar/inversion/:unitId" element={<InversionUnit />} />
          <Route path="/grammar/passive" element={<Passive />} />
          <Route path="/grammar/connectors" element={<Connectors />} />
          <Route path="/grammar/connectors/:familyId" element={<ConnectorFamily />} />
          <Route path="/grammar/conditionals" element={<Conditionals />} />
          <Route path="/grammar/conditionals/:typeId" element={<ConditionalType />} />
          <Route path="/grammar/modals" element={<Modals />} />
          <Route path="/grammar/modals/:familyId" element={<ModalFamily />} />
          <Route path="/grammar/cleft-sentences" element={<Cleft />} />
          <Route path="/grammar/cleft-sentences/:familyId" element={<CleftFamily />} />

          {/* Advanced topics */}
          <Route path="/grammar/clauses" element={<Clauses />} />
          <Route path="/grammar/clauses/:familyId" element={<ClauseFamily />} />
          <Route path="/grammar/verbs" element={<Verbs />} />
          <Route path="/grammar/verbs/:familyId" element={<VerbFamily />} />
          <Route path="/grammar/formal" element={<Formal />} />
          <Route path="/grammar/formal/:familyId" element={<FormalFamily />} />
          <Route path="/grammar/cohesion" element={<Cohesion />} />
          <Route path="/grammar/cohesion/:familyId" element={<CohesionFamily />} />

          <Route path="/pronunciation" element={<Pronunciation />} />

          {/* Catch-all: send unknown paths back to the main hub. */}
          <Route path="*" element={<Hub />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
