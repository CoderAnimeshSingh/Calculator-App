import React, { useEffect } from 'react';
import { useCalculatorStore } from './store/calculatorStore';
import { getCurrentUser } from './lib/supabase';
import { createCheckoutSession } from './lib/stripe';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import CalculatorPanel from './components/CalculatorPanel';
import AIAssistant from './components/AIAssistant';
import Notepad from './components/Notepad';
import PricingModal from './components/PricingModal';
import AuthModal from './components/AuthModal';

function App() {
  const { 
    theme, 
    user,
    isAuthModalOpen,
    isPricingModalOpen,
    isAIAssistantOpen,
    isNotepadOpen,
    setUser,
    setAuthModalOpen,
    setPricingModalOpen,
    setAIAssistantOpen,
    setNotepadOpen,
  } = useCalculatorStore();

  // Apply theme on mount
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Check for existing user session
  useEffect(() => {
    const checkUser = async () => {
      const currentUser = await getCurrentUser();
      if (currentUser) {
        setUser({
          id: currentUser.id,
          email: currentUser.email || '',
          plan: 'free', // This would come from your user metadata
        });
      }
    };
    checkUser();
  }, [setUser]);

  const handlePlanSelect = async (planId: string) => {
    if (planId === 'free') {
      setPricingModalOpen(false);
      return;
    }

    try {
      // In a real implementation, you would call your backend to create a Stripe checkout session
      console.log('Upgrading to plan:', planId);
      setPricingModalOpen(false);
      // await createCheckoutSession(planId);
    } catch (error) {
      console.error('Error upgrading plan:', error);
    }
  };

  const handleAuthSuccess = () => {
    // Refresh user data after successful auth
    getCurrentUser().then(currentUser => {
      if (currentUser) {
        setUser({
          id: currentUser.id,
          email: currentUser.email || '',
          plan: 'free',
        });
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900 flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="max-w-2xl mx-auto">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Professional Calculator Suite
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Advanced mathematical calculations with AI assistance and multiple specialized modes.
              </p>
              {(!user || user.plan === 'free') && (
                <div className="mt-4 p-4 bg-gradient-to-r from-primary-50 to-purple-50 dark:from-primary-900/20 dark:to-purple-900/20 rounded-lg border border-primary-200 dark:border-primary-800">
                  <p className="text-sm text-primary-700 dark:text-primary-300">
                    🚀 Unlock AI Assistant, Voice Input, Advanced Modes, and more with Pro!
                    <button 
                      onClick={() => setPricingModalOpen(true)}
                      className="ml-2 text-primary-600 dark:text-primary-400 font-medium hover:underline"
                    >
                      Upgrade Now
                    </button>
                  </p>
                </div>
              )}
            </div>
            <CalculatorPanel />
          </div>
        </main>
      </div>

      {/* Modals */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
      />
      <PricingModal 
        isOpen={isPricingModalOpen} 
        onClose={() => setPricingModalOpen(false)}
        onSelectPlan={handlePlanSelect}
      />
      <AIAssistant 
        isOpen={isAIAssistantOpen} 
        onClose={() => setAIAssistantOpen(false)}
      />
      <Notepad 
        isOpen={isNotepadOpen} 
        onClose={() => setNotepadOpen(false)}
      />
    </div>
  );
}

export default App;