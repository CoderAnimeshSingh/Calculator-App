import React from 'react';
import { 
  Calculator, 
  Atom, 
  Binary, 
  DollarSign, 
  Grid3X3, 
  TrendingUp,
  History,
  StickyNote,
  Mic,
  Brain,
  ArrowUpDown
} from 'lucide-react';
import { useCalculatorStore } from '../store/calculatorStore';
import { CalculatorMode } from '../types/calculator';

const Sidebar: React.FC = () => {
  const { mode, setMode, history } = useCalculatorStore();

  const modeIcons: Record<CalculatorMode, { icon: React.ReactNode; label: string; color: string }> = {
    basic: { 
      icon: <Calculator className="h-5 w-5" />, 
      label: 'Basic', 
      color: 'text-blue-600 dark:text-blue-400' 
    },
    scientific: { 
      icon: <Atom className="h-5 w-5" />, 
      label: 'Scientific', 
      color: 'text-purple-600 dark:text-purple-400' 
    },
    programmer: { 
      icon: <Binary className="h-5 w-5" />, 
      label: 'Programmer', 
      color: 'text-green-600 dark:text-green-400' 
    },
    financial: { 
      icon: <DollarSign className="h-5 w-5" />, 
      label: 'Financial', 
      color: 'text-yellow-600 dark:text-yellow-400' 
    },
    'unit-converter': { 
      icon: <ArrowUpDown className="h-5 w-5" />, 
      label: 'Unit Converter', 
      color: 'text-teal-600 dark:text-teal-400' 
    },
    matrix: { 
      icon: <Grid3X3 className="h-5 w-5" />, 
      label: 'Matrix', 
      color: 'text-red-600 dark:text-red-400' 
    },
    graphing: { 
      icon: <TrendingUp className="h-5 w-5" />, 
      label: 'Graphing', 
      color: 'text-indigo-600 dark:text-indigo-400' 
    },
  };

  return (
    <aside className="w-64 bg-white dark:bg-dark-800 border-r border-gray-200 dark:border-dark-700 flex flex-col">
      {/* Calculator Modes */}
      <div className="p-4">
        <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
          Calculator Modes
        </h3>
        <nav className="space-y-1">
          {Object.entries(modeIcons).map(([modeKey, { icon, label, color }]) => (
            <button
              key={modeKey}
              onClick={() => setMode(modeKey as CalculatorMode)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                mode === modeKey
                  ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700'
              }`}
            >
              <span className={mode === modeKey ? 'text-primary-600 dark:text-primary-400' : color}>
                {icon}
              </span>
              <span className="font-medium">{label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* AI Assistant */}
      <div className="px-4 pb-4">
        <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
          AI Assistant
        </h3>
        <div className="space-y-2">
          <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors">
            <Brain className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            <span className="font-medium">Math Assistant</span>
          </button>
          <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors">
            <Mic className="h-5 w-5 text-green-600 dark:text-green-400" />
            <span className="font-medium">Voice Input</span>
          </button>
        </div>
      </div>

      {/* History */}
      <div className="px-4 pb-4 flex-1">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
            History
          </h3>
          <History className="h-4 w-4 text-gray-400" />
        </div>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {history.slice(0, 10).map((entry) => (
            <div
              key={entry.id}
              className="p-2 bg-gray-50 dark:bg-dark-700 rounded text-xs"
            >
              <div className="font-mono text-gray-600 dark:text-gray-400">
                {entry.expression}
              </div>
              <div className="font-mono font-semibold text-gray-900 dark:text-white">
                = {entry.result}
              </div>
            </div>
          ))}
          {history.length === 0 && (
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
              No calculations yet
            </p>
          )}
        </div>
      </div>

      {/* Notes */}
      <div className="px-4 pb-4">
        <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors">
          <StickyNote className="h-5 w-5 text-orange-600 dark:text-orange-400" />
          <span className="font-medium">Notes</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;