const Header = () => {
  return (
    <header className="main-header">
      <div className="header-flex-container">
        {/* Logos moved to bottom banner */}
      </div>

      <style>{`
        .main-header {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100vh;
          z-index: 100;
          padding: 1.5rem 0rem 1.5rem 2%;
          background: transparent;
          pointer-events: none;
        }
        .header-flex-container {
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          height: 100%;
          width: 100%;
        }
        
        @media (max-width: 900px) {
          .main-header {
            display: none; /* Hide on mobile to avoid overlap */
          }
        }
      `}</style>
    </header>
  );
};

export default Header;
