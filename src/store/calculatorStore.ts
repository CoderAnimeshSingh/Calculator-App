import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CalculatorState, CalculationHistory, CalculatorMode } from '../types/calculator';

interface User {
  id: string;
  email: string;
  plan: 'free' | 'pro' | 'team';
}

interface CalculatorStore extends CalculatorState {
  // User state
  user: User | null;
  isAuthModalOpen: boolean;
  isPricingModalOpen: boolean;
  isAIAssistantOpen: boolean;
  isNotepadOpen: boolean;
  isGraphVisible: boolean;
  currentEquation: string;
  
  // Actions
  setDisplay: (display: string) => void;
  setPreviousValue: (value: number | null) => void;
  setOperation: (operation: string | null) => void;
  setWaitingForOperand: (waiting: boolean) => void;
  addToHistory: (entry: CalculationHistory) => void;
  clearHistory: () => void;
  setMemory: (value: number) => void;
  addToMemory: (value: number) => void;
  subtractFromMemory: (value: number) => void;
  clearMemory: () => void;
  setMode: (mode: CalculatorMode) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  reset: () => void;
  
  // User actions
  setUser: (user: User | null) => void;
  setAuthModalOpen: (open: boolean) => void;
  setPricingModalOpen: (open: boolean) => void;
  setAIAssistantOpen: (open: boolean) => void;
  setNotepadOpen: (open: boolean) => void;
  setGraphVisible: (visible: boolean) => void;
  setCurrentEquation: (equation: string) => void;
}

const initialState: CalculatorState = {
  display: '0',
  previousValue: null,
  operation: null,
  waitingForOperand: false,
  history: [],
  memory: 0,
  mode: 'basic',
  theme: 'light',
};

export const useCalculatorStore = create<CalculatorStore>()(
  persist(
    (set, get) => ({
      ...initialState,
      user: null,
      isAuthModalOpen: false,
      isPricingModalOpen: false,
      isAIAssistantOpen: false,
      isNotepadOpen: false,
      isGraphVisible: false,
      currentEquation: '',
      
      setDisplay: (display) => set({ display }),
      
      setPreviousValue: (value) => set({ previousValue: value }),
      
      setOperation: (operation) => set({ operation }),
      
      setWaitingForOperand: (waiting) => set({ waitingForOperand: waiting }),
      
      addToHistory: (entry) => set((state) => ({
        history: [entry, ...state.history].slice(0, 100) // Keep last 100 entries
      })),
      
      clearHistory: () => set({ history: [] }),
      
      setMemory: (value) => set({ memory: value }),
      
      addToMemory: (value) => set((state) => ({ memory: state.memory + value })),
      
      subtractFromMemory: (value) => set((state) => ({ memory: state.memory - value })),
      
      clearMemory: () => set({ memory: 0 }),
      
      setMode: (mode) => {
        const state = get();
        // Check if user has access to this mode
        if (mode !== 'basic' && mode !== 'scientific' && (!state.user || state.user.plan === 'free')) {
          set({ isPricingModalOpen: true });
          return;
        }
        set({ mode });
      },
      
      setTheme: (theme) => {
        set({ theme });
        // Apply theme to document
        if (theme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      },
      
      reset: () => set(initialState),
      
      setUser: (user) => set({ user }),
      setAuthModalOpen: (open) => set({ isAuthModalOpen: open }),
      setPricingModalOpen: (open) => set({ isPricingModalOpen: open }),
      setAIAssistantOpen: (open) => {
        const state = get();
        if (open && (!state.user || state.user.plan === 'free')) {
          set({ isPricingModalOpen: true });
          return;
        }
        set({ isAIAssistantOpen: open });
      },
      setNotepadOpen: (open) => set({ isNotepadOpen: open }),
      setGraphVisible: (visible) => set({ isGraphVisible: visible }),
      setCurrentEquation: (equation) => set({ currentEquation: equation }),
    }),
    {
      name: 'super-calculator-storage',
      partialize: (state) => ({
        history: state.history,
        memory: state.memory,
        mode: state.mode,
        theme: state.theme,
        user: state.user,
      }),
    }
  )
);