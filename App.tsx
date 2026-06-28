import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import BottomNavigation from "./components/BottomNavigation";

import Home from "./pages/Home";
import Money from "./pages/Money";
import Travel from "./pages/Travel";

import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />

        <main className="container-page">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/money" element={<Money />} />
            <Route path="/travel" element={<Travel />} />
          </Routes>
        </main>

        <BottomNavigation />
      </div>
    </BrowserRouter>
  );
}

export default App;
