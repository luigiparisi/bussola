
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center">
      <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
        <span className="text-cyan-400">Bussola Interattiva</span>: Impara l'Azimuth
      </h1>
      <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-400">
        Scopri cos'è l'azimuth e come viene calcolato. Trascina il bersaglio sulla bussola per vedere come cambia l'angolo dal Nord.
      </p>
    </header>
  );
};

export default Header;
