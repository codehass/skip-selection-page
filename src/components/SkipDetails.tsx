import { X, Check, AlertTriangle, Weight, Info, Route, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Skip } from '../types/skip';


type SkipDetailsProps = {
  skip: Skip;
  onClose: () => void;
};

const SkipDetails = ({ skip, onClose }: SkipDetailsProps) => {
  return (
    <div className="fixed inset-x-0 bottom-0 z-10 bg-white shadow-xl rounded-t-2xl border-t border-gray-200 transition-all duration-300 max-h-[70vh] overflow-y-auto">
      <div className="sticky top-0 bg-white p-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-xl font-bold text-gray-900">
          {skip.size}-Yard Skip Details
        </h3>
        <button 
          onClick={onClose}
          className="p-1 rounded-full hover:bg-gray-100"
        >
          <X className="w-6 h-6 text-gray-500" />
        </button>
      </div>
      
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Skip Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <Info className="w-5 h-5 text-black" />
              Specifications
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Skip Size</span>
                <span className="font-medium">{skip.size} Yards</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Hire Period</span>
                <span className="font-medium">{skip.hire_period_days} days</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Price (ex VAT)</span>
                <span className="font-medium">£{skip.price_before_vat?.toFixed(2) || 'N/A'}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">VAT ({skip.vat}%)</span>
                <span className="font-medium">
                  £{(skip.price_before_vat 
                    ? (skip.price_before_vat * skip.vat/100).toFixed(2) 
                    : 'N/A')}
                </span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <Info className="w-5 h-5 text-black" />
              Restrictions & Features
            </h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2 py-2 border-b border-gray-100">
                {skip.allowed_on_road ? (
                  <>
                    <Route className="w-5 h-5 text-green-600" />
                    <span>Can be placed on public road</span>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-5 h-5 text-yellow-600" />
                    <span>Cannot be placed on public road</span>
                  </>
                )}
              </div>
              <div className="flex items-center gap-2 py-2 border-b border-gray-100">
                {skip.allows_heavy_waste ? (
                  <>
                    <Weight className="w-5 h-5 text-green-600" />
                    <span>Accepts heavy waste materials</span>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-5 h-5 text-yellow-600" />
                    <span>No heavy waste materials</span>
                  </>
                )}
              </div>
              <div className="flex items-center gap-2 py-2 border-b border-gray-100">
                {skip.forbidden ? (
                  <>
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                    <span>Restrictions apply in this area</span>
                  </>
                ) : (
                  <>
                    <Check className="w-5 h-5 text-green-600" />
                    <span>No special restrictions</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-end gap-2">
          <button className="flex justify-center bg-black text-white py-2 px-3 rounded-lg font-medium hover:bg-black">
            <ChevronLeft />
            Back
          </button>
          <button className="flex justify-center items-center bg-black text-white py-2 px-3 rounded-lg font-medium hover:bg-black">
            Next
            <ChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SkipDetails;