import React from 'react';
import { useCalculatorStore } from '../store/calculatorStore';

const Display: React.FC = () => {
  const { display, mode, memory } = useCalculatorStore();

  return (
    <div className="bg-dark-900 text-white p-6 rounded-t-xl">
      {/* Mode and Memory Indicator */}
      <div className="flex justify-between items-center mb-2">
        <div className="text-sm text-gray-400 uppercase tracking-wide">
          {mode} Mode
        </div>
        {memory !== 0 && (
          <div className="text-sm text-blue-400 bg-blue-900/30 px-2 py-1 rounded">
            M: {memory}
          </div>
        )}
      </div>
      
      {/* Main Display */}
      <div className="text-right">
        <div className="text-4xl font-mono font-light leading-tight min-h-[3rem] flex items-center justify-end">
          {display}
        </div>
      </div>
      
      {/* Secondary Display for Expression */}
      <div className="text-right mt-2">
        <div className="text-sm text-gray-400 font-mono min-h-[1.25rem]">
          {/* This will show the full expression in future updates */}
        </div>
      </div>
    </div>
  );
};

export default Display;