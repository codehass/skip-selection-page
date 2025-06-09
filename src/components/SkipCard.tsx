import { Check, Clock, Zap } from 'lucide-react';
import type { Skip } from '../types/skip';

type SkipCardProps = {
  skip: Skip;
  isSelected: boolean;
  onSelect: () => void;
  darkMode: boolean;
};

const SkipCard = ({ skip, isSelected, onSelect, darkMode }: SkipCardProps) => {
  return (
    <div
      className={`rounded-2xl overflow-hidden border cursor-pointer transition-all duration-300 hover:shadow-lg
        ${darkMode
          ? `bg-gray-900 border-gray-700 hover:border-white ${isSelected ? 'border-white shadow-lg' : ''}`
          : `bg-white border-gray-300 hover:border-black ${isSelected ? 'border-black shadow-lg' : ''}`
        }`}
      onClick={onSelect}
    >
      <div className="relative h-48 flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-800">
        <div className="absolute top-4 right-4 text-sm font-semibold px-3 py-1 rounded-full shadow bg-black text-white dark:bg-white dark:text-black">
          {skip.size} Yard{skip.size !== 1 ? 's' : ''}
        </div>
        <img
          src={`skip-placeholder.jpeg`}
          alt={`${skip.size} yard skip`}
          className="h-full w-full object-contain object-bottom"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/skip-default.webp';
          }}
        />
      </div>

      <div className="p-6 space-y-4">
        <h3 className="text-xl font-semibold dark:text-white text-gray-900">
          {skip.size}-Yard Skip
        </h3>

        <div className="space-y-3 mb-6">
          <div className="flex items-center dark:text-gray-300 text-gray-600">
            <Clock className="w-5 h-5 mr-2 dark:text-indigo-400 text-black" />
            <span>{skip.hire_period_days}-day hire period</span>
          </div>
          <div className="flex items-center dark:text-gray-300 text-gray-600" >
            <Zap className="w-5 h-5 mr-2 dark:text-indigo-400 text-black" />
            <span>Available in {skip.postcode}</span>
          </div>
        </div>

        <div className="pt-4 border-t dark:border-gray-700">
          <p className="text-2xl font-bold text-black dark:text-white mb-3">
            {skip.transport_cost ? (
              <>
                £{skip.transport_cost.toFixed(2)}
                <span className="text-sm font-normal ml-1 text-gray-500 dark:text-gray-400">+ VAT</span>
              </>
            ) : skip.price_before_vat ? (
              <>
                £{skip.price_before_vat.toFixed(2)}
                <span className="text-sm font-normal ml-1 text-gray-500 dark:text-gray-400">
                  + £{(skip.price_before_vat * skip.vat / 100).toFixed(2)} VAT
                </span>
              </>
            ) : 'Price on request'}
          </p>

          <button
            className={`w-full py-3 px-4 rounded-lg font-medium transition-all
              ${isSelected
                ? 'flex items-center justify-center gap-2 border-2'
                : ''
              }
              ${darkMode
                ? isSelected
                  ? 'bg-gray-900 text-white border-white hover:bg-gray-800'
                  : 'bg-white text-black hover:bg-gray-200'
                : isSelected
                  ? 'bg-white text-black border-black hover:bg-gray-100'
                  : 'bg-black text-white hover:bg-gray-800'
              }`}
            onClick={(e) => {
              e.stopPropagation();
              onSelect();
            }}
          >
            {isSelected ? (
              <>
                <Check className="w-5 h-5" />
                Selected
              </>
            ) : 'Select'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SkipCard;
