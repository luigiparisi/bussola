
import React from 'react';

interface ExplanationProps {
  azimuth: number;
}

const Explanation: React.FC<ExplanationProps> = ({ azimuth }) => {
  const getCardinalDirection = (angle: number): string => {
    if (angle > 337.5 || angle <= 22.5) return "Nord";
    if (angle > 22.5 && angle <= 67.5) return "Nord-Est";
    if (angle > 67.5 && angle <= 112.5) return "Est";
    if (angle > 112.5 && angle <= 157.5) return "Sud-Est";
    if (angle > 157.5 && angle <= 202.5) return "Sud";
    if (angle > 202.5 && angle <= 247.5) return "Sud-Ovest";
    if (angle > 247.5 && angle <= 292.5) return "Ovest";
    if (angle > 292.5 && angle <= 337.5) return "Nord-Ovest";
    return "";
  };

  const cardinalDirection = getCardinalDirection(azimuth);
  
  return (
    <div className="space-y-4 text-slate-300">
      <div>
        <h3 className="font-semibold text-lg text-white">Cos'è l'Azimuth?</h3>
        <p className="mt-1">
          L'azimuth è un angolo di direzione orizzontale misurato in gradi, in senso orario, a partire da un punto di riferimento fisso. In navigazione, questo riferimento è quasi sempre il <strong className="text-red-400">Nord geografico (0°)</strong>.
        </p>
      </div>
       <div>
        <h3 className="font-semibold text-lg text-white">Interpretazione</h3>
        <p className="mt-1">
          Il tuo bersaglio si trova a <strong className="text-cyan-400">{azimuth.toFixed(0)}°</strong>.
          Questo significa che la sua direzione è verso <strong className="text-cyan-400">{cardinalDirection}</strong>.
        </p>
        <ul className="list-disc list-inside mt-2 space-y-1 text-slate-400">
          <li>Un azimuth di <strong className="text-white">90°</strong> corrisponde a <strong className="text-white">Est</strong>.</li>
          <li>Un azimuth di <strong className="text-white">180°</strong> corrisponde a <strong className="text-white">Sud</strong>.</li>
          <li>Un azimuth di <strong className="text-white">270°</strong> corrisponde a <strong className="text-white">Ovest</strong>.</li>
          <li>Un azimuth di <strong className="text-white">360°</strong> o <strong className="text-white">0°</strong> corrisponde a <strong className="text-white">Nord</strong>.</li>
        </ul>
      </div>
    </div>
  );
};

export default Explanation;
