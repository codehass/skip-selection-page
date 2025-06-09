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
      className={`rounded-xl shadow-md overflow-hidden border transition-colors duration-300 cursor-pointer hover:shadow-md ${
        darkMode 
          ? `bg-gray-800 border-gray-600 hover:border-white ${isSelected ? 'border-white shadow-md' : 'border-transparent'}`
          : `bg-white border-gray-300 hover:border-black ${isSelected ? 'border-black shadow-md' : 'border-transparent'}`
      }`}
      onClick={onSelect}
    >
      <div className="relative h-48 flex items-center justify-center p-4 dark:bg-gray-700 bg-gray-50">
        <div className="absolute top-4 right-4 text-sm font-semibold px-3 py-1 rounded-full shadow dark:bg-white dark:text-black bg-black text-white">
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
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-4 dark:text-white text-gray-900">
          {skip.size}-Yard Skip
        </h3>
        
        <div className="space-y-3 mb-6">
          <div className="flex items-center dark:text-white text-gray-900">
            <Clock className="w-5 h-5 mr-2 dark:text-white text-black" />
            <span>{skip.hire_period_days}-day hire period</span>
          </div>
          <div className="flex items-center dark:text-white text-gray-900">
            <Zap className="w-5 h-5 mr-2 dark:text-white text-black"/>
            <span>Available in {skip.postcode}</span>
          </div>
        </div>
        
        <div className="mt-auto">
          <p className="text-2xl font-bold mb-4 dark:text-white text-black">
            {skip.transport_cost ? (
              <>
                £{skip.transport_cost.toFixed(2)}
                <span className="text-sm font-normal ml-1 dark:text-gray-400 text-gray-500">+ VAT</span>
              </>
            ) : skip.price_before_vat ? (
              <>
                £{skip.price_before_vat.toFixed(2)}
                <span className="text-sm font-normal ml-1 dark:text-gray-400 text-gray-500">+ £{(skip.price_before_vat * skip.vat/100).toFixed(2)} VAT</span>
              </>
            ) : 'Price on request'}
          </p>
          
          <button
            className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
              isSelected
                ? darkMode
                  ? 'bg-gray-800 text-white border-2 border-white flex items-center justify-center gap-2'
                  : 'bg-white text-black border-2 border-black flex items-center justify-center gap-2'
                : darkMode
                  ? 'bg-white text-black hover:bg-gray-200'
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