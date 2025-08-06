import React, { useState, useEffect } from 'react';
import { useCalculatorStore } from '../store/calculatorStore';

interface UnitOption {
  value: string;
  label: string;
}

interface UnitCategory {
  name: string;
  units: UnitOption[];
}

const UnitConverter: React.FC = () => {
  const { display, setDisplay, addToHistory, mode } = useCalculatorStore();
  
  const [inputValue, setInputValue] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('length');
  const [fromUnit, setFromUnit] = useState<string>('');
  const [toUnit, setToUnit] = useState<string>('');
  
  // Define unit categories and their options
  const unitCategories: UnitCategory[] = [
    {
      name: 'length',
      units: [
        { value: 'meter', label: 'Meter (m)' },
        { value: 'kilometer', label: 'Kilometer (km)' },
        { value: 'centimeter', label: 'Centimeter (cm)' },
        { value: 'millimeter', label: 'Millimeter (mm)' },
        { value: 'mile', label: 'Mile (mi)' },
        { value: 'yard', label: 'Yard (yd)' },
        { value: 'foot', label: 'Foot (ft)' },
        { value: 'inch', label: 'Inch (in)' },
      ],
    },
    {
      name: 'area',
      units: [
        { value: 'square meter', label: 'Square Meter (m²)' },
        { value: 'square kilometer', label: 'Square Kilometer (km²)' },
        { value: 'square centimeter', label: 'Square Centimeter (cm²)' },
        { value: 'square millimeter', label: 'Square Millimeter (mm²)' },
        { value: 'square mile', label: 'Square Mile (mi²)' },
        { value: 'square yard', label: 'Square Yard (yd²)' },
        { value: 'square foot', label: 'Square Foot (ft²)' },
        { value: 'square inch', label: 'Square Inch (in²)' },
        { value: 'hectare', label: 'Hectare (ha)' },
        { value: 'acre', label: 'Acre (ac)' },
      ],
    },
    {
      name: 'weight',
      units: [
        { value: 'kilogram', label: 'Kilogram (kg)' },
        { value: 'gram', label: 'Gram (g)' },
        { value: 'milligram', label: 'Milligram (mg)' },
        { value: 'ton', label: 'Metric Ton (t)' },
        { value: 'pound', label: 'Pound (lb)' },
        { value: 'ounce', label: 'Ounce (oz)' },
      ],
    },
    {
      name: 'volume',
      units: [
        { value: 'liter', label: 'Liter (L)' },
        { value: 'milliliter', label: 'Milliliter (mL)' },
        { value: 'cubic meter', label: 'Cubic Meter (m³)' },
        { value: 'cubic centimeter', label: 'Cubic Centimeter (cm³)' },
        { value: 'gallon', label: 'Gallon (gal)' },
        { value: 'quart', label: 'Quart (qt)' },
        { value: 'pint', label: 'Pint (pt)' },
        { value: 'fluid ounce', label: 'Fluid Ounce (fl oz)' },
      ],
    },
    {
      name: 'temperature',
      units: [
        { value: 'celsius', label: 'Celsius (°C)' },
        { value: 'fahrenheit', label: 'Fahrenheit (°F)' },
        { value: 'kelvin', label: 'Kelvin (K)' },
      ],
    },
    {
      name: 'currency',
      units: [
        { value: 'USD', label: 'US Dollar (USD)' },
        { value: 'EUR', label: 'Euro (EUR)' },
        { value: 'GBP', label: 'British Pound (GBP)' },
        { value: 'JPY', label: 'Japanese Yen (JPY)' },
        { value: 'CAD', label: 'Canadian Dollar (CAD)' },
        { value: 'AUD', label: 'Australian Dollar (AUD)' },
        { value: 'INR', label: 'Indian Rupee (INR)' },
        { value: 'CNY', label: 'Chinese Yuan (CNY)' },
      ],
    },
  ];
  
  // Set initial units when category changes
  useEffect(() => {
    const category = unitCategories.find(cat => cat.name === selectedCategory);
    if (category && category.units.length >= 2) {
      setFromUnit(category.units[0].value);
      setToUnit(category.units[1].value);
    }
  }, [selectedCategory]);
  
  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  
  // Handle category change
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };
  
  // Handle from unit change
  const handleFromUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFromUnit(e.target.value);
  };
  
  // Handle to unit change
  const handleToUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setToUnit(e.target.value);
  };
  
  // Handle conversion
  const handleConvert = () => {
    if (!inputValue || !fromUnit || !toUnit) return;
    
    const expression = `convert(${inputValue},${fromUnit},${toUnit},${selectedCategory})`;
    setDisplay(expression);
    
    // Find the current category and units for better labels
    const category = unitCategories.find(cat => cat.name === selectedCategory);
    const fromUnitLabel = category?.units.find(u => u.value === fromUnit)?.label || fromUnit;
    const toUnitLabel = category?.units.find(u => u.value === toUnit)?.label || toUnit;
    
    // Use the unitConverterEngine to calculate the result
    import('../engines/unitConverterEngine').then(({ unitConverterEngine }) => {
      const conversionResult = unitConverterEngine.calculate(expression);
      setResult(String(conversionResult));
      
      // Add to history
      addToHistory({
        id: Date.now().toString(),
        expression: `${inputValue} ${fromUnitLabel} to ${toUnitLabel}`,
        result: String(conversionResult),
        timestamp: new Date(),
        mode,
      });
    });
  };
  
  // Handle swap units
  const handleSwapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };
  
  return (
    <div className="bg-white dark:bg-dark-800 rounded-xl shadow-xl p-6 space-y-4">
      <h2 className="text-xl font-bold text-center mb-4">Unit Converter</h2>
      
      {/* Category Selection */}
      <div>
        <label className="block text-sm font-medium mb-1">Category</label>
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="w-full p-2 border rounded-md dark:bg-dark-700 dark:border-dark-600"
        >
          {unitCategories.map(category => (
            <option key={category.name} value={category.name}>
              {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
            </option>
          ))}
        </select>
      </div>
      
      {/* Input Value */}
      <div>
        <label className="block text-sm font-medium mb-1">Value</label>
        <input
          type="number"
          value={inputValue}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-md dark:bg-dark-700 dark:border-dark-600"
          placeholder="Enter value"
        />
      </div>
      
      {/* From Unit */}
      <div>
        <label className="block text-sm font-medium mb-1">From</label>
        <select
          value={fromUnit}
          onChange={handleFromUnitChange}
          className="w-full p-2 border rounded-md dark:bg-dark-700 dark:border-dark-600"
        >
          {unitCategories
            .find(cat => cat.name === selectedCategory)?.units
            .map(unit => (
              <option key={unit.value} value={unit.value}>
                {unit.label}
              </option>
            ))}
        </select>
      </div>
      
      {/* Swap Button */}
      <div className="flex justify-center">
        <button
          onClick={handleSwapUnits}
          className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v8a1 1 0 11-2 0V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      
      {/* To Unit */}
      <div>
        <label className="block text-sm font-medium mb-1">To</label>
        <select
          value={toUnit}
          onChange={handleToUnitChange}
          className="w-full p-2 border rounded-md dark:bg-dark-700 dark:border-dark-600"
        >
          {unitCategories
            .find(cat => cat.name === selectedCategory)?.units
            .map(unit => (
              <option key={unit.value} value={unit.value}>
                {unit.label}
              </option>
            ))}
        </select>
      </div>
      
      {/* Convert Button */}
      <button
        onClick={handleConvert}
        className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
      >
        Convert
      </button>
      
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

export default UnitConverter;