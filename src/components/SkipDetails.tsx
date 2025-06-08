import { AlertTriangle, Check, ChevronLeft, ChevronRight, Info, Route, Weight, X } from "lucide-react";
import type { Skip } from "../types/skip";

type SkipDetailsProps = {
  skip: Skip;
  onClose: () => void;
};

const SkipDetails = ({ skip, onClose }: SkipDetailsProps) => {

  return (
    <div className="fixed inset-0 z-10 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity">
      <div className="absolute inset-x-0 bottom-0 mx-auto max-w-4xl bg-white shadow-2xl rounded-t-xl border-t border-gray-200 transition-all duration-300 max-h-[85vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white p-4 border-b border-gray-200 flex justify-between items-center z-20">
          <h3 className="text-2xl font-bold text-gray-900">
            {skip.size}-Yard Skip Details
          </h3>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Close details"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>
        <div className="px-6 py-3 bg-blue-50 border-b border-blue-100 flex items-start">
          <Info className="w-4 h-4 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
          <p className="text-sm text-blue-700">
            <strong className="font-medium">Note:</strong> Imagery and information shown throughout this website may not reflect the exact shape or size specification, colours may vary, options and/or accessories may be featured at additional cost.
          </p>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {/* Main details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {/* Specifications */}
            <div className="bg-gray-50 p-4 rounded-xl">
              <h4 className="font-semibold text-lg text-gray-800 mb-4 flex items-center gap-3">
                <Info className="w-6 h-6 text-blue-600" />
                <span>Specifications</span>
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="text-gray-600">Skip Size</span>
                  <span className="font-medium text-gray-900">{skip.size} Yards</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="text-gray-600">Hire Period</span>
                  <span className="font-medium text-gray-900">{skip.hire_period_days} days</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="text-gray-600">Price (ex VAT)</span>
                  <span className="font-medium text-gray-900">
                    {skip.price_before_vat ? `£${skip.price_before_vat.toFixed(2)}` : "N/A"}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-600">VAT ({skip.vat}%)</span>
                  <span className="font-medium text-gray-900">
                    {skip.price_before_vat 
                      ? `£${(skip.price_before_vat * skip.vat/100).toFixed(2)}` 
                      : "N/A"}
                  </span>
                </div>
              </div>
            </div>

            {/* Restrictions & Features */}
            <div className="bg-gray-50 p-4 rounded-xl">
              <h4 className="font-semibold text-lg text-gray-800 mb-4 flex items-center gap-3">
                <Info className="w-6 h-6 text-blue-600" />
                <span>Restrictions & Features</span>
              </h4>
              <div className="space-y-2">
                <div className="flex items-start gap-3 py-3 border-b border-gray-200">
                  {skip.allowed_on_road ? (
                    <Route className="w-6 h-6 text-green-600 mt-0.5 flex-shrink-0" />
                  ) : (
                    <AlertTriangle className="w-6 h-6 text-yellow-600 mt-0.5 flex-shrink-0" />
                  )}
                  <span className="text-gray-700">
                    {skip.allowed_on_road 
                      ? "Can be placed on public road" 
                      : "Cannot be placed on public road"}
                  </span>
                </div>
                <div className="flex items-start gap-3 py-3 border-b border-gray-200">
                  {skip.allows_heavy_waste ? (
                    <Weight className="w-6 h-6 text-green-600 mt-0.5 flex-shrink-0" />
                  ) : (
                    <AlertTriangle className="w-6 h-6 text-yellow-600 mt-0.5 flex-shrink-0" />
                  )}
                  <span className="text-gray-700">
                    {skip.allows_heavy_waste 
                      ? "Accepts heavy waste materials" 
                      : "No heavy waste materials"}
                  </span>
                </div>
                <div className="flex items-start gap-3 py-3">
                  {skip.forbidden ? (
                    <AlertTriangle className="w-6 h-6 text-red-600 mt-0.5 flex-shrink-0" />
                  ) : (
                    <Check className="w-6 h-6 text-green-600 mt-0.5 flex-shrink-0" />
                  )}
                  <span className="text-gray-700">
                    {skip.forbidden 
                      ? "Restrictions apply in this area" 
                      : "No special restrictions"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Total Price */}
          {skip.price_before_vat && (
            <div className="bg-gray-50 px-5 py-3 border border-blue-100 rounded-md">
              <div className="flex justify-between items-center">
                <h4 className="font-semibold text-lg text-black">Total Price</h4>
                <div className="text-right">
                  <p className="text-2xl font-bold text-black">
                    £{(skip.price_before_vat * (1 + skip.vat/100)).toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-600">
                    (incl. £{(skip.price_before_vat * skip.vat/100).toFixed(2)} VAT)
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons Back to options or Next to the next step */}
          <div className="flex flex-col sm:flex-row justify-between gap-4 pt-4">
            <button 
              onClick={onClose}
              className="flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-medium border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              Back 
            </button>
            <button 
              className="flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-medium bg-black text-white hover:bg-gray-600 transition-colors"
            >
              Next
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkipDetails;