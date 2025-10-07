import React, { useState, useRef, useEffect, useCallback } from 'react';

interface CompassProps {
  azimuth: number;
  setAzimuth: (value: number) => void;
}

const Compass: React.FC<CompassProps> = ({ azimuth, setAzimuth }) => {
  const [isDragging, setIsDragging] = useState(false);
  const compassRef = useRef<HTMLDivElement>(null);
  const size = 350;
  const radius = size / 2 * 0.8;

  const handleInteraction = useCallback((clientX: number, clientY: number) => {
    if (!compassRef.current) return;

    const rect = compassRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = clientX - centerX;
    const deltaY = clientY - centerY;

    let angleRad = Math.atan2(deltaY, deltaX);
    let angleDeg = angleRad * (180 / Math.PI);

    // Convert angle to azimuth (0° at North, clockwise)
    let newAzimuth = (angleDeg + 90 + 360) % 360;

    setAzimuth(newAzimuth);
  }, [setAzimuth]);
  
  const handleMouseMove = useCallback((e: MouseEvent) => {
    handleInteraction(e.clientX, e.clientY);
  }, [handleInteraction]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    handleInteraction(e.touches[0].clientX, e.touches[0].clientY);
  }, [handleInteraction]);
  
  const stopDragging = useCallback(() => {
    setIsDragging(false);
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', stopDragging);
    window.removeEventListener('touchmove', handleTouchMove);
    window.removeEventListener('touchend', stopDragging);
  }, [handleMouseMove, handleTouchMove]);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', stopDragging);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', stopDragging);
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', stopDragging);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', stopDragging);
    };
  }, [isDragging, handleMouseMove, stopDragging, handleTouchMove]);

  const startDragging = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  // Convert azimuth back to radians for positioning the target
  const targetAngleRad = (azimuth - 90) * (Math.PI / 180);
  const targetX = (size / 2) + radius * Math.cos(targetAngleRad);
  const targetY = (size / 2) + radius * Math.sin(targetAngleRad);
  
  const renderMarkings = () => {
    const markings = [];
    for (let i = 0; i < 360; i += 10) {
      const isCardinal = i % 90 === 0;
      const isSubCardinal = i % 30 === 0;
      const length = isCardinal ? 15 : (isSubCardinal ? 10 : 5);
      const color = isCardinal ? 'white' : 'rgb(100 116 139)'; // slate-500
      markings.push(
        <div 
          key={i} 
          className="absolute top-1/2 left-1/2 origin-left"
          style={{
            transform: `rotate(${i}deg) translateX(${size/2 - 20}px)`,
            width: `${length}px`,
            height: '2px',
            backgroundColor: color
          }}
        />
      );
    }
    return markings;
  }

  return (
    <div
      id="compass-container"
      ref={compassRef}
      className="relative rounded-full bg-slate-800 border-4 border-slate-700 shadow-2xl flex items-center justify-center cursor-default"
      style={{ width: `${size}px`, height: `${size}px`, touchAction: 'none' }}
    >
      {/* Background markings */}
      <div className="absolute w-full h-full rounded-full bg-slate-900" style={{ transform: 'scale(0.95)' }}></div>
      {renderMarkings()}
      
      {/* Cardinal directions */}
      <span className="absolute top-4 text-2xl font-bold text-red-500">N</span>
      <span className="absolute bottom-4 text-xl font-semibold text-slate-300">S</span>
      <span className="absolute left-4 text-xl font-semibold text-slate-300">W</span>
      <span className="absolute right-4 text-xl font-semibold text-slate-300">E</span>
      
      {/* Center point */}
      <div className="w-4 h-4 bg-cyan-400 rounded-full border-2 border-slate-900 z-10"></div>

      {/* Line from center to target */}
      <div 
        className="absolute top-1/2 left-1/2 origin-left bg-red-500/50 z-20"
        style={{
          transform: `rotate(${azimuth - 90}deg)`,
          width: `${radius}px`,
          height: '3px',
          borderRadius: '2px',
        }}
      ></div>

      {/* Draggable target */}
      <div
        id="compass-target"
        className="absolute w-8 h-8 rounded-full bg-red-500 border-4 border-white shadow-lg flex items-center justify-center z-30 cursor-grab active:cursor-grabbing"
        style={{
          left: `${targetX}px`,
          top: `${targetY}px`,
          transform: 'translate(-50%, -50%)'
        }}
        onMouseDown={startDragging}
        onTouchStart={startDragging}
      >
      </div>
    </div>
  );
};

export default Compass;