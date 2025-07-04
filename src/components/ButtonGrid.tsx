import React from 'react';
import { ButtonConfig } from '../types/calculator';

interface ButtonGridProps {
  buttons: ButtonConfig[];
  onButtonClick: (button: ButtonConfig) => void;
}

const ButtonGrid: React.FC<ButtonGridProps> = ({ buttons, onButtonClick }) => {
  // Calculate grid layout based on button count
  const getGridCols = () => {
    if (buttons.length <= 16) return 'grid-cols-4';
    if (buttons.length <= 25) return 'grid-cols-5';
    return 'grid-cols-6';
  };

  return (
    <div className={`grid ${getGridCols()} gap-2 p-4`}>
      {buttons.map((button) => (
        <button
          key={button.id}
          onClick={() => onButtonClick(button)}
          className={`
            ${button.className || 'calculator-button'}
            ${button.colspan ? `col-span-${button.colspan}` : ''}
            ${button.rowspan ? `row-span-${button.rowspan}` : ''}
            text-lg font-medium h-14 rounded-lg transition-all duration-200
            hover:shadow-md active:scale-95
            focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
          `}
          aria-label={button.label}
        >
          {button.label}
        </button>
      ))}
    </div>
  );
};

export default ButtonGrid;