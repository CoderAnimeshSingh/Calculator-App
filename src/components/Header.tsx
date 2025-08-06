import React from 'react';
import { Calculator, Moon, Sun, User, Settings, Brain, StickyNote, CreditCard, Palette } from 'lucide-react';
import { useCalculatorStore } from '../store/calculatorStore';
import { CalculatorMode, Theme } from '../types/calculator';

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
    { value: 'unit-converter', label: 'Unit Converter' },
    { value: 'matrix', label: 'Matrix' },
    { value: 'graphing', label: 'Graphing' },
  ];

  const themes: { value: Theme; label: string }[] = [
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
    { value: 'classic', label: 'Classic' },
    { value: 'neon', label: 'Neon' },
    { value: 'system', label: 'System' },
  ];

  const handleModeChange = (newMode: CalculatorMode) => {
    setMode(newMode);
  };

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  return (
    <header className="bg-white dark:bg-dark-800 classic:bg-amber-50 neon:bg-purple-900 border-b border-gray-200 dark:border-dark-700 classic:border-amber-200 neon:border-pink-700 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-r from-primary-600 to-purple-600 classic:from-amber-600 classic:to-orange-600 neon:from-cyan-500 neon:to-pink-500 p-2 rounded-lg">
            <Calculator className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white classic:text-amber-900 neon:text-cyan-300">
              Super Calculator
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 classic:text-amber-700 neon:text-pink-300">
              Professional Math Suite
            </p>
          </div>
        </div>

        {/* Mode Switcher */}
        <div className="flex items-center space-x-4">
          <select
            value={mode}
            onChange={(e) => handleModeChange(e.target.value as CalculatorMode)}
            className="bg-gray-50 dark:bg-dark-700 classic:bg-amber-100 neon:bg-purple-800 border border-gray-300 dark:border-dark-600 classic:border-amber-300 neon:border-pink-600 text-gray-900 dark:text-white classic:text-amber-900 neon:text-cyan-300 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 px-3 py-2"
          >
            {modes.map((modeOption) => (
              <option key={modeOption.value} value={modeOption.value}>
                {modeOption.label}
                {modeOption.value !== 'basic' && modeOption.value !== 'scientific' && (!user || user.plan === 'free') && ' (Pro)'}
              </option>
            ))}
          </select>

          {/* Theme Selector */}
          <div className="relative">
            <button
              onClick={() => document.getElementById('theme-dropdown')?.classList.toggle('hidden')}
              className="p-2 rounded-lg bg-gray-100 dark:bg-dark-700 classic:bg-amber-100 neon:bg-purple-800 hover:bg-gray-200 dark:hover:bg-dark-600 classic:hover:bg-amber-200 neon:hover:bg-purple-700 transition-colors"
              aria-label="Select theme"
            >
              <Palette className="h-5 w-5 text-gray-600 dark:text-gray-400 classic:text-amber-700 neon:text-pink-400" />
            </button>
            <div id="theme-dropdown" className="hidden absolute right-0 mt-2 w-48 bg-white dark:bg-dark-800 classic:bg-amber-50 neon:bg-purple-900 rounded-md shadow-lg z-10 border border-gray-200 dark:border-dark-700 classic:border-amber-200 neon:border-pink-700">
              {themes.map((themeOption) => (
                <button
                  key={themeOption.value}
                  onClick={() => {
                    handleThemeChange(themeOption.value);
                    document.getElementById('theme-dropdown')?.classList.add('hidden');
                  }}
                  className={`block w-full text-left px-4 py-2 text-sm ${theme === themeOption.value ? 'bg-primary-100 dark:bg-primary-900 classic:bg-amber-200 neon:bg-purple-700' : ''} hover:bg-gray-100 dark:hover:bg-dark-700 classic:hover:bg-amber-100 neon:hover:bg-purple-800 text-gray-900 dark:text-white classic:text-amber-900 neon:text-cyan-300`}
                >
                  {themeOption.label}
                </button>
              ))}
            </div>
          </div>

          {/* AI Assistant */}
          <button
            onClick={() => setAIAssistantOpen(true)}
            className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900 classic:bg-orange-100 neon:bg-cyan-900 hover:bg-purple-200 dark:hover:bg-purple-800 classic:hover:bg-orange-200 neon:hover:bg-cyan-800 transition-colors"
            title="AI Math Assistant"
          >
            <Brain className="h-5 w-5 text-purple-600 dark:text-purple-400 classic:text-orange-600 neon:text-cyan-400" />
          </button>

          {/* Notes */}
          <button
            onClick={() => setNotepadOpen(true)}
            className="p-2 rounded-lg bg-yellow-100 dark:bg-yellow-900 classic:bg-amber-100 neon:bg-pink-900 hover:bg-yellow-200 dark:hover:bg-yellow-800 classic:hover:bg-amber-200 neon:hover:bg-pink-800 transition-colors"
            title="Notes"
          >
            <StickyNote className="h-5 w-5 text-yellow-600 dark:text-yellow-400 classic:text-amber-600 neon:text-pink-400" />
          </button>

          {/* Pricing */}
          {(!user || user.plan === 'free') && (
            <button
              onClick={() => setPricingModalOpen(true)}
              className="p-2 rounded-lg bg-green-100 dark:bg-green-900 classic:bg-emerald-100 neon:bg-green-900 hover:bg-green-200 dark:hover:bg-green-800 classic:hover:bg-emerald-200 neon:hover:bg-green-800 transition-colors"
              title="Upgrade to Pro"
            >
              <CreditCard className="h-5 w-5 text-green-600 dark:text-green-400 classic:text-emerald-600 neon:text-green-400" />
            </button>
          )}

          {/* Settings */}
          <button className="p-2 rounded-lg bg-gray-100 dark:bg-dark-700 classic:bg-amber-100 neon:bg-purple-800 hover:bg-gray-200 dark:hover:bg-dark-600 classic:hover:bg-amber-200 neon:hover:bg-purple-700 transition-colors">
            <Settings className="h-5 w-5 text-gray-600 dark:text-gray-400 classic:text-amber-700 neon:text-pink-400" />
          </button>

          {/* User Account */}
          <button 
            onClick={() => setAuthModalOpen(true)}
            className="p-2 rounded-lg bg-primary-100 dark:bg-primary-900 classic:bg-orange-100 neon:bg-blue-900 hover:bg-primary-200 dark:hover:bg-primary-800 classic:hover:bg-orange-200 neon:hover:bg-blue-800 transition-colors"
          >
            <User className="h-5 w-5 text-primary-600 dark:text-primary-400 classic:text-orange-600 neon:text-blue-400" />
          </button>
          
          {user && (
            <div className="text-sm">
              <div className="text-gray-900 dark:text-white classic:text-amber-900 neon:text-cyan-300 font-medium">{user.email}</div>
              <div className="text-gray-500 dark:text-gray-400 classic:text-amber-700 neon:text-pink-300 capitalize">{user.plan} Plan</div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;