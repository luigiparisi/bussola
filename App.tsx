import React, { useState } from 'react';
import Header from './components/Header';
import Compass from './components/Compass';
import Explanation from './components/Explanation';
import Tutorial from './components/Tutorial';

const App: React.FC = () => {
  const [azimuth, setAzimuth] = useState<number>(45);
  const [showTutorial, setShowTutorial] = useState(true);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center p-4 sm:p-6 lg:p-8 relative">
      {showTutorial && <Tutorial onFinish={() => setShowTutorial(false)} />}
      <Header />
      <main className="w-full max-w-7xl flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 mt-8">
        <div className="w-full lg:w-1/2 flex justify-center">
          <Compass azimuth={azimuth} setAzimuth={setAzimuth} />
        </div>
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start">
          <div id="explanation-panel" className="bg-slate-800 p-8 rounded-2xl shadow-2xl border border-slate-700 w-full max-w-md">
            <h2 className="text-3xl font-bold text-cyan-400 mb-4 text-center lg:text-left">
              Azimuth Corrente
            </h2>
            <div className="text-center bg-slate-900 rounded-lg p-6 mb-6">
              <span className="text-6xl font-mono font-bold text-white tracking-wider">
                {azimuth.toFixed(0)}°
              </span>
            </div>
            <Explanation azimuth={azimuth} />
          </div>
        </div>
      </main>
      <footer className="mt-12 text-center text-slate-500">
        <p>Creato per scopi didattici. Trascina il punto rosso per interagire.</p>
      </footer>
    </div>
  );
};

export default App;