
import React from 'react';
import type { Results, Language } from '../types';

interface ResultsDisplayProps {
  results: Results | null;
  translations: any;
  language: Language;
}

const ResultCard: React.FC<{ title: string, subtitle?: string, value: number, unit: string, isFeatured?: boolean }> = ({ title, subtitle, value, unit, isFeatured }) => (
  <div className={`p-4 rounded-lg flex justify-between items-center transition ${isFeatured ? 'bg-primary/10 dark:bg-primary/20 border-l-4 border-primary' : 'bg-gray-100 dark:bg-slate-700'}`}>
    <div>
      <h4 className={`font-semibold ${isFeatured ? 'text-primary' : 'text-gray-800 dark:text-gray-200'}`}>{title}</h4>
      {subtitle && <p className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>}
    </div>
    <div className="text-right rtl:text-left">
      <p className={`text-2xl font-bold ${isFeatured ? 'text-primary' : 'text-gray-900 dark:text-white'}`}>{value.toLocaleString( 'en' )}</p>
      <p className="text-sm text-gray-500 dark:text-gray-400">{unit}</p>
    </div>
  </div>
);

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results, translations }) => {
  if (!results) {
    return (
      <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg h-full flex flex-col justify-center items-center text-center transition-colors duration-300">
         <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300 dark:text-slate-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">{translations.results_title}</h3>
        <p className="mt-2 text-gray-500 dark:text-gray-400 max-w-sm">{translations.initial_results_message}</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg transition-colors duration-300">
      <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{translations.results_title}</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-6">{translations.results_subtitle}</p>

      <div className="space-y-4">
        <ResultCard title={translations.maintain} value={results.maintain} unit={translations.calories_day} isFeatured />
        <ResultCard title={translations.mild_loss} subtitle={translations.mild_loss_desc} value={results.mildLoss} unit={translations.calories_day} />
        <ResultCard title={translations.normal_loss} subtitle={translations.normal_loss_desc} value={results.normalLoss} unit={translations.calories_day} />
        <ResultCard title={translations.extreme_loss} subtitle={translations.extreme_loss_desc} value={results.extremeLoss} unit={translations.calories_day} />
      </div>

      <div className="mt-8 pt-4 border-t border-gray-200 dark:border-slate-700">
        <h4 className="font-semibold text-gray-700 dark:text-gray-300">{translations.disclaimer_title}</h4>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{translations.disclaimer_text}</p>
      </div>
    </div>
  );
};

export default ResultsDisplay;
