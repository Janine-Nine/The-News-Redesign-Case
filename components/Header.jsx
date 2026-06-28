import "./Header.css";

function Header() {
  return (
    <header className="header">
      <div className="header-masthead">
        <div className="header-logo">
          <h1 className="masthead-title">THE NEWS</h1>
          <p className="masthead-tagline">Your Daily News App</p>
        </div>

        <div className="header-date">
          <span className="date-text">
            {new Date().toLocaleDateString('pt-BR', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </span>
        </div>
      </div>

      <div className="header-user">
        <div className="user-info">
          <h4>Olá, Janine 👋</h4>
          <span>Bom dia!</span>
        </div>
        <div className="user-avatar">
          <img
            src="/img/avatar.png"
            alt="Avatar"
          />
        </div>
      </div>
    </header>
  );
}

export default Header;