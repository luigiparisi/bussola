import React, { useState, useLayoutEffect, useRef } from 'react';

interface TutorialProps {
  onFinish: () => void;
}

interface Step {
  targetId?: string;
  title: string;
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

const steps: Step[] = [
  {
    title: 'Benvenuto/a!',
    content: "Questa guida ti mostrerà come usare la Bussola Interattiva. Premi 'Avanti' per iniziare.",
  },
  {
    targetId: 'compass-container',
    title: 'La Bussola',
    content: 'Questa è la bussola. Il Nord (N), contrassegnato in rosso, è il punto di riferimento a 0°. Tutti gli angoli sono misurati da qui.',
    position: 'right',
  },
  {
    targetId: 'compass-target',
    title: 'Il Bersaglio',
    content: 'Questo punto rosso è il tuo bersaglio. Puoi cliccare e trascinarlo attorno al centro della bussola.',
    position: 'right',
  },
  {
    targetId: 'explanation-panel',
    title: "Lettura dell'Azimuth",
    content: "Questo pannello mostra l'azimuth corrente in gradi e la direzione cardinale corrispondente. Osserva come si aggiorna quando muovi il bersaglio.",
    position: 'left',
  },
  {
    title: 'Tutto Pronto!',
    content: 'Ora sei pronto/a per esplorare. Trascina il bersaglio e scopri il concetto di azimuth. Buona navigazione!',
  }
];

const Tutorial: React.FC<TutorialProps> = ({ onFinish }) => {
  const [stepIndex, setStepIndex] = useState(0);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const currentStep = steps[stepIndex];
  const isLastStep = stepIndex === steps.length - 1;
  const isFirstStep = stepIndex === 0;

  useLayoutEffect(() => {
    if (currentStep.targetId) {
      const element = document.getElementById(currentStep.targetId);
      if (element) {
        setTargetRect(element.getBoundingClientRect());
      }
    } else {
      setTargetRect(null);
    }
  }, [stepIndex, currentStep.targetId]);

  const handleNext = () => {
    if (isLastStep) {
      onFinish();
    } else {
      setStepIndex(stepIndex + 1);
    }
  };

  const handlePrev = () => {
    if (!isFirstStep) {
      setStepIndex(stepIndex - 1);
    }
  };
  
  const getTooltipPosition = () => {
    if (!targetRect || !tooltipRef.current) return { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };

    const tooltipHeight = tooltipRef.current.offsetHeight;
    const tooltipWidth = tooltipRef.current.offsetWidth;
    const spacing = 20;

    switch(currentStep.position) {
      case 'top':
        return { top: targetRect.top - tooltipHeight - spacing, left: targetRect.left + targetRect.width / 2 - tooltipWidth / 2 };
      case 'bottom':
        return { top: targetRect.bottom + spacing, left: targetRect.left + targetRect.width / 2 - tooltipWidth / 2 };
      case 'left':
        return { top: targetRect.top + targetRect.height / 2 - tooltipHeight / 2, left: targetRect.left - tooltipWidth - spacing };
      case 'right':
        return { top: targetRect.top + targetRect.height / 2 - tooltipHeight / 2, left: targetRect.right + spacing };
      default:
         // Center if no target or position
        return { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };
    }
  };

  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/70 transition-opacity duration-300"
        style={{
          clipPath: targetRect 
            ? `path('M0 0 H${window.innerWidth} V${window.innerHeight} H0Z M${targetRect.x - 8} ${targetRect.y - 8} H${targetRect.x + targetRect.width + 8} V${targetRect.y + targetRect.height + 8} H${targetRect.x - 8}Z')` 
            : 'none',
          fillRule: 'evenodd'
        }}
        onClick={(e) => e.stopPropagation()}
      ></div>

      {/* Tooltip */}
      <div
        ref={tooltipRef}
        className="absolute bg-slate-800 text-white p-6 rounded-lg shadow-2xl border border-slate-700 w-80 max-w-[90vw] transition-all duration-300"
        style={getTooltipPosition()}
      >
        <h3 className="text-xl font-bold text-cyan-400 mb-2">{currentStep.title}</h3>
        <p className="text-slate-300 mb-4">{currentStep.content}</p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-slate-400">{stepIndex + 1} / {steps.length}</span>
          <div className="flex gap-2">
            {!isFirstStep && (
              <button
                onClick={handlePrev}
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-md text-sm font-semibold transition-colors"
              >
                Indietro
              </button>
            )}
            <button
              onClick={handleNext}
              className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-900 rounded-md text-sm font-semibold transition-colors"
            >
              {isLastStep ? 'Fine' : 'Avanti'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tutorial;
