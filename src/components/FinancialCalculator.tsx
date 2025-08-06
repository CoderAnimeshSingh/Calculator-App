import React, { useState } from 'react';
import { useCalculatorStore } from '../store/calculatorStore';

interface FinancialFormProps {
  type: 'emi' | 'sip' | 'roi' | 'gst' | 'ci' | 'si';
}

const FinancialCalculator: React.FC = () => {
  const { display, setDisplay, addToHistory, mode } = useCalculatorStore();
  
  const [calculatorType, setCalculatorType] = useState<'emi' | 'sip' | 'roi' | 'gst' | 'ci' | 'si'>('emi');
  const [result, setResult] = useState<string>('');
  
  // Form states for different calculators
  const [emiForm, setEmiForm] = useState({
    principal: '',
    rate: '',
    time: ''
  });
  
  const [sipForm, setSipForm] = useState({
    monthly: '',
    rate: '',
    years: ''
  });
  
  const [roiForm, setRoiForm] = useState({
    initialInvestment: '',
    finalValue: '',
    years: ''
  });
  
  const [gstForm, setGstForm] = useState({
    amount: '',
    rate: ''
  });
  
  const [ciForm, setCiForm] = useState({
    principal: '',
    rate: '',
    time: '',
    frequency: '1'
  });
  
  const [siForm, setSiForm] = useState({
    principal: '',
    rate: '',
    time: ''
  });
  
  // Handle form changes
  const handleEmiChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmiForm({
      ...emiForm,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSipForm({
      ...sipForm,
      [e.target.name]: e.target.value
    });
  };
  
  const handleRoiChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoiForm({
      ...roiForm,
      [e.target.name]: e.target.value
    });
  };
  
  const handleGstChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGstForm({
      ...gstForm,
      [e.target.name]: e.target.value
    });
  };
  
  const handleCiChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setCiForm({
      ...ciForm,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSiChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSiForm({
      ...siForm,
      [e.target.name]: e.target.value
    });
  };
  
  // Handle calculations
  const calculateEmi = () => {
    if (!emiForm.principal || !emiForm.rate || !emiForm.time) return;
    
    const expression = `EMI(${emiForm.principal},${emiForm.rate},${emiForm.time})`;
    setDisplay(expression);
    
    // Use the financialEngine to calculate the result
    import('../engines/financialEngine').then(({ financialEngine }) => {
      const calculationResult = financialEngine.calculate(expression);
      setResult(String(calculationResult));
      
      // Add to history
      addToHistory({
        id: Date.now().toString(),
        expression: `EMI Calculation: P=${emiForm.principal}, R=${emiForm.rate}%, T=${emiForm.time} years`,
        result: String(calculationResult),
        timestamp: new Date(),
        mode,
      });
    });
  };
  
  const calculateSip = () => {
    if (!sipForm.monthly || !sipForm.rate || !sipForm.years) return;
    
    const expression = `SIP(${sipForm.monthly},${sipForm.rate},${sipForm.years})`;
    setDisplay(expression);
    
    import('../engines/financialEngine').then(({ financialEngine }) => {
      const calculationResult = financialEngine.calculate(expression);
      setResult(String(calculationResult));
      
      addToHistory({
        id: Date.now().toString(),
        expression: `SIP Calculation: Monthly=${sipForm.monthly}, R=${sipForm.rate}%, T=${sipForm.years} years`,
        result: String(calculationResult),
        timestamp: new Date(),
        mode,
      });
    });
  };
  
  const calculateRoi = () => {
    if (!roiForm.initialInvestment || !roiForm.finalValue || !roiForm.years) return;
    
    const expression = `ROI(${roiForm.initialInvestment},${roiForm.finalValue},${roiForm.years})`;
    setDisplay(expression);
    
    import('../engines/financialEngine').then(({ financialEngine }) => {
      const calculationResult = financialEngine.calculate(expression);
      setResult(String(calculationResult));
      
      addToHistory({
        id: Date.now().toString(),
        expression: `ROI Calculation: Initial=${roiForm.initialInvestment}, Final=${roiForm.finalValue}, T=${roiForm.years} years`,
        result: String(calculationResult),
        timestamp: new Date(),
        mode,
      });
    });
  };
  
  const calculateGst = () => {
    if (!gstForm.amount || !gstForm.rate) return;
    
    const expression = `GST(${gstForm.amount},${gstForm.rate})`;
    setDisplay(expression);
    
    import('../engines/financialEngine').then(({ financialEngine }) => {
      const calculationResult = financialEngine.calculate(expression);
      
      // GST returns an object with gstAmount and totalAmount
      if (typeof calculationResult === 'object' && calculationResult !== null) {
        const { gstAmount, totalAmount } = calculationResult as { gstAmount: number, totalAmount: number };
        setResult(`GST: ${gstAmount}, Total: ${totalAmount}`);
        
        addToHistory({
          id: Date.now().toString(),
          expression: `GST Calculation: Amount=${gstForm.amount}, Rate=${gstForm.rate}%`,
          result: `GST: ${gstAmount}, Total: ${totalAmount}`,
          timestamp: new Date(),
          mode,
        });
      } else {
        setResult(String(calculationResult));
      }
    });
  };
  
  const calculateCi = () => {
    if (!ciForm.principal || !ciForm.rate || !ciForm.time) return;
    
    const expression = `CI(${ciForm.principal},${ciForm.rate},${ciForm.time},${ciForm.frequency})`;
    setDisplay(expression);
    
    import('../engines/financialEngine').then(({ financialEngine }) => {
      const calculationResult = financialEngine.calculate(expression);
      setResult(String(calculationResult));
      
      addToHistory({
        id: Date.now().toString(),
        expression: `CI Calculation: P=${ciForm.principal}, R=${ciForm.rate}%, T=${ciForm.time} years, N=${ciForm.frequency}`,
        result: String(calculationResult),
        timestamp: new Date(),
        mode,
      });
    });
  };
  
  const calculateSi = () => {
    if (!siForm.principal || !siForm.rate || !siForm.time) return;
    
    const expression = `SI(${siForm.principal},${siForm.rate},${siForm.time})`;
    setDisplay(expression);
    
    import('../engines/financialEngine').then(({ financialEngine }) => {
      const calculationResult = financialEngine.calculate(expression);
      setResult(String(calculationResult));
      
      addToHistory({
        id: Date.now().toString(),
        expression: `SI Calculation: P=${siForm.principal}, R=${siForm.rate}%, T=${siForm.time} years`,
        result: String(calculationResult),
        timestamp: new Date(),
        mode,
      });
    });
  };
  
  // Render the appropriate form based on calculator type
  const renderForm = () => {
    switch (calculatorType) {
      case 'emi':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Loan Amount (Principal)</label>
              <input
                type="number"
                name="principal"
                value={emiForm.principal}
                onChange={handleEmiChange}
                className="w-full p-2 border rounded-md dark:bg-dark-700 dark:border-dark-600"
                placeholder="Enter loan amount"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Interest Rate (% per annum)</label>
              <input
                type="number"
                name="rate"
                value={emiForm.rate}
                onChange={handleEmiChange}
                className="w-full p-2 border rounded-md dark:bg-dark-700 dark:border-dark-600"
                placeholder="Enter interest rate"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Loan Term (years)</label>
              <input
                type="number"
                name="time"
                value={emiForm.time}
                onChange={handleEmiChange}
                className="w-full p-2 border rounded-md dark:bg-dark-700 dark:border-dark-600"
                placeholder="Enter loan term"
              />
            </div>
            <button
              onClick={calculateEmi}
              className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Calculate EMI
            </button>
          </div>
        );
        
      case 'sip':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Monthly Investment</label>
              <input
                type="number"
                name="monthly"
                value={sipForm.monthly}
                onChange={handleSipChange}
                className="w-full p-2 border rounded-md dark:bg-dark-700 dark:border-dark-600"
                placeholder="Enter monthly investment"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Expected Return Rate (% per annum)</label>
              <input
                type="number"
                name="rate"
                value={sipForm.rate}
                onChange={handleSipChange}
                className="w-full p-2 border rounded-md dark:bg-dark-700 dark:border-dark-600"
                placeholder="Enter expected return rate"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Investment Period (years)</label>
              <input
                type="number"
                name="years"
                value={sipForm.years}
                onChange={handleSipChange}
                className="w-full p-2 border rounded-md dark:bg-dark-700 dark:border-dark-600"
                placeholder="Enter investment period"
              />
            </div>
            <button
              onClick={calculateSip}
              className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Calculate SIP Returns
            </button>
          </div>
        );
        
      case 'roi':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Initial Investment</label>
              <input
                type="number"
                name="initialInvestment"
                value={roiForm.initialInvestment}
                onChange={handleRoiChange}
                className="w-full p-2 border rounded-md dark:bg-dark-700 dark:border-dark-600"
                placeholder="Enter initial investment"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Final Value</label>
              <input
                type="number"
                name="finalValue"
                value={roiForm.finalValue}
                onChange={handleRoiChange}
                className="w-full p-2 border rounded-md dark:bg-dark-700 dark:border-dark-600"
                placeholder="Enter final value"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Investment Period (years)</label>
              <input
                type="number"
                name="years"
                value={roiForm.years}
                onChange={handleRoiChange}
                className="w-full p-2 border rounded-md dark:bg-dark-700 dark:border-dark-600"
                placeholder="Enter investment period"
              />
            </div>
            <button
              onClick={calculateRoi}
              className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Calculate ROI
            </button>
          </div>
        );
        
      case 'gst':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Amount (before GST)</label>
              <input
                type="number"
                name="amount"
                value={gstForm.amount}
                onChange={handleGstChange}
                className="w-full p-2 border rounded-md dark:bg-dark-700 dark:border-dark-600"
                placeholder="Enter amount"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">GST Rate (%)</label>
              <input
                type="number"
                name="rate"
                value={gstForm.rate}
                onChange={handleGstChange}
                className="w-full p-2 border rounded-md dark:bg-dark-700 dark:border-dark-600"
                placeholder="Enter GST rate"
              />
            </div>
            <button
              onClick={calculateGst}
              className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Calculate GST
            </button>
          </div>
        );
        
      case 'ci':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Principal Amount</label>
              <input
                type="number"
                name="principal"
                value={ciForm.principal}
                onChange={handleCiChange}
                className="w-full p-2 border rounded-md dark:bg-dark-700 dark:border-dark-600"
                placeholder="Enter principal amount"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Interest Rate (% per annum)</label>
              <input
                type="number"
                name="rate"
                value={ciForm.rate}
                onChange={handleCiChange}
                className="w-full p-2 border rounded-md dark:bg-dark-700 dark:border-dark-600"
                placeholder="Enter interest rate"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Time Period (years)</label>
              <input
                type="number"
                name="time"
                value={ciForm.time}
                onChange={handleCiChange}
                className="w-full p-2 border rounded-md dark:bg-dark-700 dark:border-dark-600"
                placeholder="Enter time period"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Compounding Frequency</label>
              <select
                name="frequency"
                value={ciForm.frequency}
                onChange={handleCiChange}
                className="w-full p-2 border rounded-md dark:bg-dark-700 dark:border-dark-600"
              >
                <option value="1">Annually (1/year)</option>
                <option value="2">Semi-Annually (2/year)</option>
                <option value="4">Quarterly (4/year)</option>
                <option value="12">Monthly (12/year)</option>
              </select>
            </div>
            <button
              onClick={calculateCi}
              className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Calculate Compound Interest
            </button>
          </div>
        );
        
      case 'si':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Principal Amount</label>
              <input
                type="number"
                name="principal"
                value={siForm.principal}
                onChange={handleSiChange}
                className="w-full p-2 border rounded-md dark:bg-dark-700 dark:border-dark-600"
                placeholder="Enter principal amount"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Interest Rate (% per annum)</label>
              <input
                type="number"
                name="rate"
                value={siForm.rate}
                onChange={handleSiChange}
                className="w-full p-2 border rounded-md dark:bg-dark-700 dark:border-dark-600"
                placeholder="Enter interest rate"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Time Period (years)</label>
              <input
                type="number"
                name="time"
                value={siForm.time}
                onChange={handleSiChange}
                className="w-full p-2 border rounded-md dark:bg-dark-700 dark:border-dark-600"
                placeholder="Enter time period"
              />
            </div>
            <button
              onClick={calculateSi}
              className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Calculate Simple Interest
            </button>
          </div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <div className="bg-white dark:bg-dark-800 rounded-xl shadow-xl p-6 space-y-4">
      <h2 className="text-xl font-bold text-center mb-4">Financial Calculator</h2>
      
      {/* Calculator Type Selection */}
      <div>
        <label className="block text-sm font-medium mb-1">Calculator Type</label>
        <select
          value={calculatorType}
          onChange={(e) => setCalculatorType(e.target.value as any)}
          className="w-full p-2 border rounded-md dark:bg-dark-700 dark:border-dark-600"
        >
          <option value="emi">EMI Calculator</option>
          <option value="sip">SIP Calculator</option>
          <option value="roi">ROI Calculator</option>
          <option value="gst">GST Calculator</option>
          <option value="ci">Compound Interest</option>
          <option value="si">Simple Interest</option>
        </select>
      </div>
      
      {/* Render the appropriate form */}
      {renderForm()}
      
      {/* Result */}
      {result && (
        <div className="mt-4 p-4 bg-gray-100 dark:bg-dark-700 rounded-md">
          <div className="text-sm text-gray-500 dark:text-gray-400">Result:</div>
          <div className="text-xl font-bold">{result}</div>
        </div>
      )}
    </div>
  );
};

export default FinancialCalculator;