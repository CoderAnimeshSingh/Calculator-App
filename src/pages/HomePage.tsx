import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calculator, ArrowRight } from 'lucide-react';
import { useCalculatorStore } from '../store/calculatorStore';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useCalculatorStore();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-slate-100 dark:from-background dark:to-slate-900">
      <div className="container mx-auto px-4 py-16">
        <header className="flex justify-between items-center mb-16">
          <div className="flex items-center">
            <Calculator className="h-8 w-8 text-blue-600 dark:text-blue-400 mr-2" />
            <h1 className="text-2xl font-bold">Super Calculator</h1>
          </div>
          <div>
            {user ? (
              <button 
                onClick={() => navigate('/dashboard')} 
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Go to Dashboard
              </button>
            ) : (
              <button 
                onClick={() => useCalculatorStore.getState().setAuthModalOpen(true)} 
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Sign In
              </button>
            )}
          </div>
        </header>

        <main className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="md:w-1/2">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Professional Math Suite for Everyone</h2>
            <p className="text-lg mb-8 text-slate-700 dark:text-slate-300">
              From basic calculations to advanced scientific, programming, financial, matrix, and graphing operations - all in one powerful calculator.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => navigate('/dashboard')} 
                className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center"
              >
                Try Now <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button 
                onClick={() => useCalculatorStore.getState().setPricingModalOpen(true)}
                className="px-6 py-3 border border-blue-600 text-blue-600 dark:text-blue-400 rounded-md hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors"
              >
                View Pricing
              </button>
            </div>
          </div>
          <div className="md:w-1/2 bg-white dark:bg-slate-800 p-6 rounded-xl shadow-xl">
            <img 
              src="/calculator-preview.png" 
              alt="Super Calculator Preview" 
              className="w-full h-auto rounded-lg"
              onError={(e) => {
                // Fallback if image doesn't exist
                e.currentTarget.style.display = 'none';
              }}
            />
            {/* Fallback content if image doesn't load */}
            <div className="text-center p-8 text-slate-500 dark:text-slate-400">
              <Calculator className="h-16 w-16 mx-auto mb-4" />
              <p>Calculator Preview</p>
            </div>
          </div>
        </main>

        <section className="mt-24 text-center">
          <h2 className="text-3xl font-bold mb-12">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Multiple Calculation Modes', description: 'Basic, Scientific, Programmer, Financial, Matrix, and Graphing calculators in one app.' },
              { title: 'AI Assistant', description: 'Get help with complex calculations and mathematical concepts.' },
              { title: 'Cloud Sync', description: 'Save your calculation history and access it from any device.' },
            ].map((feature, index) => (
              <div key={index} className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;