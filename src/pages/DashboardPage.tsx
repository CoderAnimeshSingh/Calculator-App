import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCalculatorStore } from '../store/calculatorStore';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import CalculatorPanel from '../components/CalculatorPanel';
import AIAssistant from '../components/AIAssistant';
import Notepad from '../components/Notepad';
import AuthModal from '../components/AuthModal';
import PricingModal from '../components/PricingModal';

const DashboardPage: React.FC = () => {
  const { 
    user, 
    isAuthModalOpen, 
    isPricingModalOpen,
    isAIAssistantOpen,
    isNotepadOpen,
    theme
  } = useCalculatorStore();
  const navigate = useNavigate();

  // Optional: Redirect to home if not logged in
  // Uncomment if you want to enforce authentication
  /*
  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);
  */

  // Get theme-specific classes
  const getThemeClasses = () => {
    switch(theme) {
      case 'dark':
        return 'bg-dark-900 text-white';
      case 'classic':
        return 'bg-amber-50 text-amber-900';
      case 'neon':
        return 'bg-purple-900 text-cyan-300';
      default:
        return 'bg-background text-foreground';
    }
  };

  return (
    <div className={`flex h-screen overflow-hidden ${getThemeClasses()}`}>
      {/* Sidebar */}
      <div className="w-64 border-r border-border hidden md:block">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-auto p-4">
          <div className="container mx-auto">
            <CalculatorPanel />
          </div>
        </main>
      </div>

      {/* Responsive sidebar for mobile */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white dark:bg-dark-800 classic:bg-amber-50 neon:bg-purple-900 border-t border-border z-10">
        <div className="flex justify-around p-2">
          <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-700 classic:hover:bg-amber-100 neon:hover:bg-purple-800">
            <span className="sr-only">Menu</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          {/* Add more mobile navigation buttons as needed */}
        </div>
      </div>

      {/* Modals and floating components */}
      {isAuthModalOpen && (
        <AuthModal 
          isOpen={isAuthModalOpen}
          onClose={() => useCalculatorStore.setState({ isAuthModalOpen: false })}
          onSuccess={() => {
            useCalculatorStore.setState({ isAuthModalOpen: false });
            // Handle successful authentication
          }}
        />
      )}
      {isPricingModalOpen && (
        <PricingModal
          isOpen={isPricingModalOpen}
          onClose={() => useCalculatorStore.setState({ isPricingModalOpen: false })}
          onSelectPlan={(plan) => {
            // Handle plan selection
            useCalculatorStore.setState({ isPricingModalOpen: false });
          }}
        />
      )}
      {isAIAssistantOpen && (
        <AIAssistant 
          isOpen={isAIAssistantOpen}
          onClose={() => useCalculatorStore.setState({ isAIAssistantOpen: false })}
        />
      )}
      {isNotepadOpen && (
        <Notepad
          isOpen={isNotepadOpen}
          onClose={() => useCalculatorStore.setState({ isNotepadOpen: false })}
        />
      )}
    </div>
  );
};

export default DashboardPage;