
import React from 'react';
import type { FormData, Language } from '../types';

interface CalculatorFormProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  handleCalculate: () => void;
  error: string | null;
  translations: any;
  language: Language;
}

const formGroupClass = "mb-4";
const labelClass = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1";
const inputBaseClass = "w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition";
const lightInputClass = "bg-white border-gray-300 text-gray-900";
const darkInputClass = "dark:bg-slate-700 dark:border-slate-600 dark:text-gray-200 dark:placeholder-gray-400";
const inputClass = `${inputBaseClass} ${lightInputClass} ${darkInputClass}`;
const radioLabelClass = "flex items-center px-4 py-2 border rounded-md cursor-pointer transition";

const CalculatorForm: React.FC<CalculatorFormProps> = ({
  formData,
  setFormData,
  handleCalculate,
  error,
  translations,
  language,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg transition-colors duration-300">
      <form onSubmit={(e) => { e.preventDefault(); handleCalculate(); }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className={formGroupClass}>
            <label htmlFor="age" className={labelClass}>{translations.age}</label>
            <input type="number" id="age" name="age" value={formData.age} onChange={handleChange} placeholder={translations.age_placeholder} className={inputClass} />
          </div>
          <div className={formGroupClass}>
            <label className={labelClass}>{translations.gender}</label>
            <div className="flex space-x-2 rtl:space-x-reverse">
              {['male', 'female'].map(gender => (
                <div key={gender} className="flex-1">
                  <input type="radio" id={gender} name="gender" value={gender} checked={formData.gender === gender} onChange={handleChange} className="sr-only" />
                  <label htmlFor={gender} className={`${radioLabelClass} ${formData.gender === gender ? 'bg-primary/10 border-primary text-primary dark:bg-primary/20' : 'bg-gray-50 border-gray-300 text-gray-600 dark:bg-slate-700 dark:border-slate-600 dark:text-gray-300'}`}>
                    {translations[gender]}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className={formGroupClass}>
            <label htmlFor="weight" className={labelClass}>{translations.weight}</label>
            <input type="number" id="weight" name="weight" value={formData.weight} onChange={handleChange} placeholder={translations.weight_placeholder} className={inputClass} />
          </div>
          <div className={formGroupClass}>
            <label htmlFor="height" className={labelClass}>{translations.height}</label>
            <input type="number" id="height" name="height" value={formData.height} onChange={handleChange} placeholder={translations.height_placeholder} className={inputClass} />
          </div>
        </div>
        <div className={formGroupClass}>
          <label htmlFor="activityLevel" className={labelClass}>{translations.activity}</label>
          <select id="activityLevel" name="activityLevel" value={formData.activityLevel} onChange={handleChange} className={inputClass}>
            <option value="sedentary">{translations.sedentary}</option>
            <option value="light">{translations.light}</option>
            <option value="moderate">{translations.moderate}</option>
            <option value="very">{translations.very}</option>
            <option value="extra">{translations.extra}</option>
          </select>
        </div>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <button type="submit" className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 px-4 rounded-md shadow-md transition-transform transform hover:scale-105 duration-300">
          {translations.calculate}
        </button>
      </form>
    </div>
  );
};

export default CalculatorForm;
