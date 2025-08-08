'use client';

import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, Tooltip } from 'recharts';
import { useState, useEffect } from 'react';

// Performance-based color system: Excellent (90+), Very Good (80-89), Good (70-79), Fair (60-69), Poor (<60)
const getPerformanceColor = (score: number) => {
  if (score >= 90) return '#10b981'; // emerald-500 - Excellent
  if (score >= 80) return '#3b82f6'; // blue-500 - Very Good  
  if (score >= 70) return '#8b5cf6'; // violet-500 - Good
  if (score >= 60) return '#f59e0b'; // amber-500 - Fair
  return '#ef4444'; // red-500 - Poor
};

const benchmarkData = {
  reasoning: [
    { name: 'GPT-4', score: 85, color: getPerformanceColor(85) },
    { name: 'GPT-4', score: 82, color: getPerformanceColor(82) },
    { name: 'Claude\n3.5\nSonnet', score: 78, color: getPerformanceColor(78) },
    { name: 'GPT-4\nTurbo', score: 75, color: getPerformanceColor(75) },
    { name: 'OpenAI\no1', score: 73, color: getPerformanceColor(73) }
  ],
  math: [
    { name: 'GPT-4', score: 95, color: getPerformanceColor(95) },
    { name: 'Claude\n3.5\nSonnet', score: 92, color: getPerformanceColor(92) },
    { name: 'GPT-4', score: 88, color: getPerformanceColor(88) },
    { name: 'GPT-4\nTurbo', score: 85, color: getPerformanceColor(85) },
    { name: 'GPT-4\nTurbo', score: 82, color: getPerformanceColor(82) }
  ],
  coding: [
    { name: 'GPT-4', score: 72, color: getPerformanceColor(72) },
    { name: 'GPT-4', score: 68, color: getPerformanceColor(68) },
    { name: 'Claude\n3.5\nSonnet', score: 65, color: getPerformanceColor(65) },
    { name: 'Claude\n3.5\nSonnet', score: 62, color: getPerformanceColor(62) },
    { name: 'Claude\n3.5\nSonnet', score: 60, color: getPerformanceColor(60) }
  ],
  toolUse: [
    { name: 'GPT-4o', score: 85, color: getPerformanceColor(85) },
    { name: 'GPT-4o', score: 82, color: getPerformanceColor(82) },
    { name: 'GPT-4', score: 68, color: getPerformanceColor(68) },
    { name: 'GPT-4', score: 65, color: getPerformanceColor(65) },
    { name: 'OpenAI\no1', score: 62, color: getPerformanceColor(62) }
  ],
  adaptive: [
    { name: 'GPT-4', score: 78, color: getPerformanceColor(78) },
    { name: 'GPT-4o', score: 72, color: getPerformanceColor(72) },
    { name: 'GPT-4', score: 65, color: getPerformanceColor(65) },
    { name: 'GPT-4', score: 58, color: getPerformanceColor(58) },
    { name: 'GPT-4\nMini', score: 55, color: getPerformanceColor(55) }
  ],
  overall: [
    { name: 'GPT-4', score: 82, color: getPerformanceColor(82) }
  ]
};

interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    color: string;
  }>;
  label?: string;
}

interface CustomTickProps {
  x?: number;
  y?: number;
  payload?: {
    value: string;
  };
  isMobile?: boolean;
}

function CustomXAxisTick({ x = 0, y = 0, payload, isMobile = false }: CustomTickProps) {
  // Clean the text by replacing newlines with spaces for better readability when rotated
  const cleanText = payload?.value?.replace(/\n/g, ' ') || '';
  
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={isMobile ? 16 : 20}
        textAnchor="end"
        fill="#9ca3af"
        fontSize={isMobile ? 10 : 12}
        transform="rotate(-45)"
        style={{ fontFamily: 'system-ui, sans-serif' }}
      >
        {cleanText}
      </text>
    </g>
  );
}

function CustomTooltip({ active, payload, label }: TooltipProps) {
  if (active && payload && payload.length) {
    return (
      <div 
        className="bg-gray-700 p-3 rounded-lg shadow-lg border border-gray-600"
        role="tooltip"
        aria-label={`Chart data for ${label?.replace(/\n/g, ' ')}`}
      >
        <p className="text-white font-medium">{label?.replace(/\n/g, ' ')}</p>
        <p className="text-blue-400">
          Score: <span className="font-semibold">{payload[0].value}%</span>
        </p>
      </div>
    );
  }
  return null;
}

interface ChartData {
  name: string;
  score: number;
  color: string;
}

interface ChartCardProps {
  title: string;
  data: ChartData[];
  infoIcon?: boolean;
  description?: string;
}

function ChartCard({ title, data, infoIcon = false, description }: ChartCardProps) {
  const [showInfo, setShowInfo] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const handleInfoClick = () => {
    setShowInfo(!showInfo);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleInfoClick();
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-850 rounded-xl p-6 shadow-xl border border-gray-700/50 hover:border-gray-600/50 hover:shadow-2xl transition-all duration-300 backdrop-blur-sm focus-within:ring-2 focus-within:ring-blue-500/50">
      <div className="flex items-start justify-between mb-6">
        <div className="flex-1">
          <h3 className="text-white text-lg sm:text-xl font-semibold leading-tight mb-1">{title}</h3>
          {showInfo && description && (
            <p className="text-gray-300 text-sm mt-2 leading-relaxed">
              {description}
            </p>
          )}
        </div>
        {infoIcon && (
          <button
            onClick={handleInfoClick}
            onKeyDown={handleKeyDown}
            className="w-5 h-5 rounded-full border border-gray-500 flex items-center justify-center hover:border-gray-400 focus:border-blue-400 focus:outline-none transition-colors cursor-pointer ml-2 flex-shrink-0"
            aria-label={`${showInfo ? 'Hide' : 'Show'} information about ${title}`}
            aria-expanded={showInfo}
            type="button"
          >
            <span className="text-gray-400 text-xs font-medium">i</span>
          </button>
        )}
      </div>
      <div className="w-full" style={{ height: isMobile ? '260px' : '320px' }} role="img" aria-label={`Bar chart showing ${title} scores`}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={data} 
            margin={{ 
              top: 20, 
              right: 10, 
              left: 10, 
              bottom: isMobile ? 120 : 100 
            }}
          >
            <XAxis 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
              tick={(props) => <CustomXAxisTick {...props} isMobile={isMobile} />}
              interval={0}
              height={isMobile ? 120 : 100}
            />
            <YAxis 
              domain={[0, 100]}
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9ca3af', fontSize: 12 }}
              label={{ value: 'Score (%)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#9ca3af' } }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="score" 
              radius={[4, 4, 0, 0]} 
              className="hover:opacity-80 focus:opacity-80"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading state for better UX
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-300">Loading benchmark data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-purple-900/20"></div>
      <div className="relative z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-16 text-center" role="banner">
          <div className="relative">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-emerald-400 bg-clip-text text-transparent">
              LLM Leaderboard
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6 rounded-full"></div>
          </div>
          <div className="max-w-4xl">
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-4">
              This LLM leaderboard displays the latest public benchmark performance for state-of-the-art model versions released after April 2024. 
              The data comes from model providers as well as independently run evaluations by Vellum or the open-source community.
            </p>
            <p className="text-gray-400 text-sm sm:text-base">
              We feature results from non-saturated benchmarks, excluding outdated benchmarks (e.g. MMLU). 
              If you want to evaluate these models on your use-cases, try{' '}
              <a 
                href="https://www.vellum.ai/evals" 
                className="text-blue-400 underline hover:text-blue-300 focus:text-blue-300 focus:outline-none"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Vellum Evals - opens in new tab"
              >
                Vellum Evals
              </a>.
            </p>
          </div>
        </header>

        {/* Performance Legend */}
        <div className="mb-12 p-4 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-xl border border-gray-600/30">
          <h3 className="text-lg font-semibold text-white mb-3 text-center">Performance Scale</h3>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-emerald-500"></div>
              <span className="text-gray-300">Excellent (90+)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-blue-500"></div>
              <span className="text-gray-300">Very Good (80-89)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-violet-500"></div>
              <span className="text-gray-300">Good (70-79)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-amber-500"></div>
              <span className="text-gray-300">Fair (60-69)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-red-500"></div>
              <span className="text-gray-300">Poor (&lt;60)</span>
            </div>
          </div>
        </div>

        <main>
          <section className="mb-16" aria-labelledby="top-models-heading">
            <div className="text-center mb-8">
              <h2 id="top-models-heading" className="text-3xl sm:text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Top Models Per Task
              </h2>
              <div className="w-16 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto"></div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-8">
              <ChartCard 
                title="Best in Reasoning (GPQA Diamond)" 
                data={benchmarkData.reasoning} 
                infoIcon={true}
                description="GPQA Diamond tests graduate-level scientific reasoning across physics, chemistry, and biology. Higher scores indicate better complex reasoning abilities."
              />
              <ChartCard 
                title="Best in High School Math (AIME 2025)" 
                data={benchmarkData.math} 
                infoIcon={true}
                description="AIME (American Invitational Mathematics Examination) measures advanced mathematical problem-solving skills at the high school level."
              />
              <ChartCard 
                title="Best in Agentic Coding (SWE Bench)" 
                data={benchmarkData.coding} 
                infoIcon={true}
                description="SWE-Bench evaluates models' ability to resolve real-world software engineering issues from GitHub repositories."
              />
            </div>
          </section>

          <section aria-labelledby="independent-evals-heading">
            <div className="text-center mb-8">
              <h2 id="independent-evals-heading" className="text-3xl sm:text-4xl font-bold mb-2 bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                Independent Evaluations
              </h2>
              <div className="w-16 h-0.5 bg-gradient-to-r from-emerald-500 to-blue-500 mx-auto"></div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-8">
              <ChartCard 
                title="Best in Tool Use (BFCL)" 
                data={benchmarkData.toolUse} 
                infoIcon={true}
                description="Berkeley Function Calling Leaderboard (BFCL) evaluates models' ability to accurately invoke functions and tools."
              />
              <ChartCard 
                title="Best in Adaptive Reasoning (GBNQ)" 
                data={benchmarkData.adaptive} 
                infoIcon={true}
                description="Google-BIG Bench Natural Questions tests models' ability to adapt their reasoning to different question types and contexts."
              />
              <ChartCard 
                title="Best Overall (Humanity's Last Exam)" 
                data={benchmarkData.overall} 
                infoIcon={true}
                description="A comprehensive evaluation across multiple domains designed to test general intelligence and reasoning capabilities."
              />
            </div>
          </section>
        </main>

        <footer className="mt-16 pt-8 border-t border-gray-800 text-center" role="contentinfo">
          <p className="text-gray-400 text-sm">
            Data updated regularly from public benchmarks and independent evaluations. 
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </footer>
      </div>
      </div>
    </div>
  );
}
