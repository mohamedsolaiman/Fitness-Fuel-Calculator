
import React, { useState, useEffect, useCallback } from 'react';
import type { FormData, Results, Language, Theme } from './types';
import { calculateCalories } from './services/calculatorService';
import { translations } from './constants/localization';
import Header from './components/Header';
import CalculatorForm from './components/CalculatorForm';
import ResultsDisplay from './components/ResultsDisplay';

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('en');
  const [theme, setTheme] = useState<Theme>('light');
  const [formData, setFormData] = useState<FormData>({
    age: '',
    gender: 'male',
    weight: '',
    height: '',
    activityLevel: 'sedentary',
  });
  const [results, setResults] = useState<Results | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    root.lang = language;
    root.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.body.className = `${theme === 'dark' ? 'dark:bg-slate-900' : 'bg-gray-50'} ${language === 'ar' ? 'font-arabic' : 'font-sans'}`;
  }, [theme, language]);

  const handleCalculate = useCallback(() => {
    const { age, weight, height, gender, activityLevel } = formData;
    if (!age || !weight || !height) {
      setError(translations[language].error_incomplete);
      setResults(null);
      return;
    }

    const ageNum = parseInt(age);
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);

    if (isNaN(ageNum) || isNaN(weightNum) || isNaN(heightNum) || ageNum <= 0 || weightNum <= 0 || heightNum <= 0) {
      setError(translations[language].error_invalid);
      setResults(null);
      return;
    }

    setError(null);
    const calculatedResults = calculateCalories({
      age: ageNum,
      weight: weightNum,
      height: heightNum,
      gender,
      activityLevel,
    });
    setResults(calculatedResults);
  }, [formData, language]);

  const t = translations[language];

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark bg-slate-900 text-gray-200' : 'bg-gray-50 text-gray-800'} ${language === 'ar' ? 'font-arabic' : 'font-sans'} transition-colors duration-300`}>
      <Header
        language={language}
        setLanguage={setLanguage}
        theme={theme}
        setTheme={setTheme}
        translations={t}
      />
      <main className="container mx-auto p-4 md:p-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <div className="w-full">
            <h2 className="text-3xl font-bold mb-2 text-primary">{t.form_title}</h2>
            <p className="mb-6 text-gray-600 dark:text-gray-400">{t.form_subtitle}</p>
            <CalculatorForm
              formData={formData}
              setFormData={setFormData}
              handleCalculate={handleCalculate}
              error={error}
              translations={t}
              language={language}
            />
          </div>
          <div className="w-full mt-8 lg:mt-0">
            <ResultsDisplay results={results} translations={t} language={language} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
