import React from 'react';
import { Calculator, Moon, Sun, User, Settings, Brain, StickyNote, CreditCard } from 'lucide-react';
import { useCalculatorStore } from '../store/calculatorStore';
import { CalculatorMode } from '../types/calculator';

const Header: React.FC = () => {
  const { 
    mode, 
    theme, 
    user,
    setMode, 
    setTheme, 
    setAuthModalOpen,
    setPricingModalOpen,
    setAIAssistantOpen,
    setNotepadOpen,
  } = useCalculatorStore();

  const modes: { value: CalculatorMode; label: string }[] = [
    { value: 'basic', label: 'Basic' },
    { value: 'scientific', label: 'Scientific' },
    { value: 'programmer', label: 'Programmer' },
    { value: 'financial', label: 'Financial' },
    { value: 'matrix', label: 'Matrix' },
    { value: 'graphing', label: 'Graphing' },
  ];

  const handleModeChange = (newMode: CalculatorMode) => {
    setMode(newMode);
  };

  return (
    <header className="bg-white dark:bg-dark-800 border-b border-gray-200 dark:border-dark-700 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-r from-primary-600 to-purple-600 p-2 rounded-lg">
            <Calculator className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              Super Calculator
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Professional Math Suite
            </p>
          </div>
        </div>

        {/* Mode Switcher */}
        <div className="flex items-center space-x-4">
          <select
            value={mode}
            onChange={(e) => handleModeChange(e.target.value as CalculatorMode)}
            className="bg-gray-50 dark:bg-dark-700 border border-gray-300 dark:border-dark-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 px-3 py-2"
          >
            {modes.map((modeOption) => (
              <option key={modeOption.value} value={modeOption.value}>
                {modeOption.label}
                {modeOption.value !== 'basic' && modeOption.value !== 'scientific' && (!user || user.plan === 'free') && ' (Pro)'}
              </option>
            ))}
          </select>

          {/* AI Assistant */}
          <button
            onClick={() => setAIAssistantOpen(true)}
            className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900 hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors"
            title="AI Math Assistant"
          >
            <Brain className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          </button>

          {/* Notes */}
          <button
            onClick={() => setNotepadOpen(true)}
            className="p-2 rounded-lg bg-yellow-100 dark:bg-yellow-900 hover:bg-yellow-200 dark:hover:bg-yellow-800 transition-colors"
            title="Notes"
          >
            <StickyNote className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
          </button>

          {/* Pricing */}
          {(!user || user.plan === 'free') && (
            <button
              onClick={() => setPricingModalOpen(true)}
              className="p-2 rounded-lg bg-green-100 dark:bg-green-900 hover:bg-green-200 dark:hover:bg-green-800 transition-colors"
              title="Upgrade to Pro"
            >
              <CreditCard className="h-5 w-5 text-green-600 dark:text-green-400" />
            </button>
          )}

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="p-2 rounded-lg bg-gray-100 dark:bg-dark-700 hover:bg-gray-200 dark:hover:bg-dark-600 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <Moon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            ) : (
              <Sun className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            )}
          </button>

          {/* Settings */}
          <button className="p-2 rounded-lg bg-gray-100 dark:bg-dark-700 hover:bg-gray-200 dark:hover:bg-dark-600 transition-colors">
            <Settings className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </button>

          {/* User Account */}
          <button 
            onClick={() => setAuthModalOpen(true)}
            className="p-2 rounded-lg bg-primary-100 dark:bg-primary-900 hover:bg-primary-200 dark:hover:bg-primary-800 transition-colors"
          >
            <User className="h-5 w-5 text-primary-600 dark:text-primary-400" />
          </button>
          
          {user && (
            <div className="text-sm">
              <div className="text-gray-900 dark:text-white font-medium">{user.email}</div>
              <div className="text-gray-500 dark:text-gray-400 capitalize">{user.plan} Plan</div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;