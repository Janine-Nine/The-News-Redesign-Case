import "./BottomNavigation.css";
import { useNavigate, useLocation } from "react-router-dom";
import {
  House,
  MagnifyingGlass,
  Bookmark,
  User
} from "phosphor-react";

function BottomNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="bottom-nav">

      <button
        className={location.pathname === "/" ? "active" : ""}
        onClick={() => navigate("/")}
      >
        <House size={24} />
        <span>Home</span>
      </button>

      <button
        onClick={() => navigate("/")}
      >
        <MagnifyingGlass size={24} />
        <span>Buscar</span>
      </button>

      <button
        onClick={() => navigate("/")}
      >
        <Bookmark size={24} />
        <span>Salvos</span>
      </button>

      <button
        onClick={() => navigate("/")}
      >
        <User size={24} />
        <span>Perfil</span>
      </button>

    </nav>
  );
}

export default BottomNavigation;
