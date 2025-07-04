import React, { useState } from 'react';
import { Brain, Send, Mic, MicOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AIAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [conversation, setConversation] = useState<Array<{ type: 'user' | 'ai'; message: string }>>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const userMessage = query;
    setQuery('');
    setConversation(prev => [...prev, { type: 'user', message: userMessage }]);
    setIsLoading(true);

    // Simulate AI response (in real implementation, this would call OpenAI API)
    setTimeout(() => {
      const aiResponse = generateAIResponse(userMessage);
      setConversation(prev => [...prev, { type: 'ai', message: aiResponse }]);
      setIsLoading(false);
    }, 1000);
  };

  const generateAIResponse = (query: string): string => {
    // Simple pattern matching for demo
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('emi') || lowerQuery.includes('loan')) {
      return "To calculate EMI, I need the principal amount, interest rate, and loan tenure. The formula is: EMI = P × r × (1+r)^n / ((1+r)^n - 1), where P is principal, r is monthly interest rate, and n is number of months.";
    }
    
    if (lowerQuery.includes('compound interest')) {
      return "Compound Interest = P(1 + r/100)^t - P, where P is principal, r is annual interest rate, and t is time in years. Would you like me to calculate this for specific values?";
    }
    
    if (lowerQuery.includes('derivative') || lowerQuery.includes('differentiate')) {
      return "I can help with derivatives! For example, d/dx(x²) = 2x, d/dx(sin x) = cos x. What function would you like me to differentiate?";
    }
    
    return "I understand you're asking about: " + query + ". Let me help you solve this step by step. Could you provide more specific values or clarify what calculation you need?";
  };

  const toggleVoiceInput = () => {
    if (!isListening) {
      // Start voice recognition
      if ('webkitSpeechRecognition' in window) {
        const recognition = new (window as any).webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onstart = () => setIsListening(true);
        recognition.onend = () => setIsListening(false);
        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setQuery(transcript);
        };

        recognition.start();
      }
    } else {
      setIsListening(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white dark:bg-dark-800 rounded-xl shadow-2xl w-full max-w-2xl h-[600px] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-dark-700">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-lg">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">AI Math Assistant</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">Ask me anything about math!</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              ×
            </button>
          </div>

          {/* Conversation */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {conversation.length === 0 && (
              <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                <Brain className="h-12 w-12 mx-auto mb-4 text-purple-400" />
                <p>Hi! I'm your AI Math Assistant. Ask me about calculations, formulas, or math concepts!</p>
                <div className="mt-4 text-sm">
                  <p>Try asking:</p>
                  <ul className="mt-2 space-y-1">
                    <li>"Calculate EMI for ₹500000 at 8% for 20 years"</li>
                    <li>"What's the derivative of x²?"</li>
                    <li>"Explain compound interest"</li>
                  </ul>
                </div>
              </div>
            )}

            {conversation.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    msg.type === 'user'
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 dark:bg-dark-700 text-gray-900 dark:text-white'
                  }`}
                >
                  {msg.message}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 dark:bg-dark-700 px-4 py-2 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-6 border-t border-gray-200 dark:border-dark-700">
            <div className="flex space-x-2">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask me about math..."
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-dark-700 dark:text-white"
              />
              <button
                type="button"
                onClick={toggleVoiceInput}
                className={`p-2 rounded-lg transition-colors ${
                  isListening
                    ? 'bg-red-500 hover:bg-red-600 text-white'
                    : 'bg-gray-100 dark:bg-dark-700 hover:bg-gray-200 dark:hover:bg-dark-600 text-gray-600 dark:text-gray-400'
                }`}
              >
                {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
              </button>
              <button
                type="submit"
                disabled={!query.trim() || isLoading}
                className="bg-primary-600 hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed text-white p-2 rounded-lg transition-colors"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AIAssistant;