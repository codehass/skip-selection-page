import { Check, Clock, Zap } from 'lucide-react';
import type { Skip } from '../types/skip';

type SkipCardProps = {
  skip: Skip;
  isSelected: boolean;
  onSelect: () => void;
};

const SkipCard = ({ skip, isSelected, onSelect }: SkipCardProps) => {
  return (
    <div 
      className={`bg-white rounded-xl shadow-sm overflow-hidden border-2 transition-all duration-200 cursor-pointer hover:border-black hover:shadow-md ${
        isSelected ? 'border-black shadow-md' : 'border-transparent'
      }`}
      onClick={onSelect}
    >
      <div className="relative h-48 bg-gray-50 flex items-center justify-center p-4">
        <div className="absolute top-4 right-4 bg-black text-white text-sm font-semibold px-3 py-1 rounded-full shadow">
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
        <h3 className="text-xl font-semibold text-gray-900 mb-4">{skip.size}-Yard Skip</h3>
        
        <div className="space-y-3 mb-6">
          <div className="flex items-center text-gray-600">
            <Clock className="w-5 h-5 text-black mr-2" />
            <span>{skip.hire_period_days}-day hire period</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Zap className="w-5 h-5 text-black mr-2" />
            <span>Available in {skip.postcode}</span>
          </div>
        </div>
        
        <div className="mt-auto">
          <p className="text-2xl font-bold text-black mb-4">
            {skip.transport_cost ? (
              <>
                £{skip.transport_cost.toFixed(2)}
                <span className="text-sm font-normal text-gray-500 ml-1">+ VAT</span>
              </>
            ) : skip.price_before_vat ? (
              <>
                £{skip.price_before_vat.toFixed(2)}
                <span className="text-sm font-normal text-gray-500 ml-1">+ £{(skip.price_before_vat * skip.vat/100).toFixed(2)} VAT</span>
              </>
            ) : 'Price on request'}
          </p>
          
          <button
            className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
              isSelected
                ? 'bg-white text-black border-2 border-black flex items-center justify-center gap-2'
                : 'bg-black text-white hover:bg-black'
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