import React, { useRef, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface GraphPlotterProps {
  equation: string;
  isVisible: boolean;
}

const GraphPlotter: React.FC<GraphPlotterProps> = ({ equation, isVisible }) => {
  const generateDataPoints = (equation: string) => {
    const points = [];
    const xValues = [];
    
    for (let x = -10; x <= 10; x += 0.1) {
      try {
        // Simple equation parser for demo
        let y;
        if (equation.includes('x^2')) {
          y = x * x;
        } else if (equation.includes('sin')) {
          y = Math.sin(x);
        } else if (equation.includes('cos')) {
          y = Math.cos(x);
        } else if (equation.includes('x')) {
          y = x; // Linear function
        } else {
          y = 0;
        }
        
        xValues.push(x.toFixed(1));
        points.push(y);
      } catch (error) {
        points.push(null);
      }
    }
    
    return { xValues, points };
  };

  const { xValues, points } = generateDataPoints(equation);

  const data = {
    labels: xValues,
    datasets: [
      {
        label: equation || 'y = f(x)',
        data: points,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Function Graph',
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'x',
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'y',
        },
      },
    },
  };

  if (!isVisible) return null;

  return (
    <div className="bg-white dark:bg-dark-800 rounded-xl shadow-lg p-6 mt-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Graph Plotter</h3>
      <div className="h-96">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default GraphPlotter;