import { AlertTriangle, Check, ChevronLeft, ChevronRight, Info, Route, Weight, X } from "lucide-react";
import type { Skip } from "../types/skip";

type SkipDetailsProps = {
  skip: Skip;
  onClose: () => void;
  darkMode?: boolean;
};

const SkipDetails = ({ skip, onClose }: SkipDetailsProps) => {
  return (
    <div className="fixed inset-0 z-10 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity">
      <div className="absolute inset-x-0 bottom-0 mx-auto max-w-4xl bg-white dark:bg-gray-900 shadow-2xl rounded-t-xl border-t border-gray-200 dark:border-gray-700 transition-all duration-300 max-h-[85vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-gray-900 p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center z-20">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            {skip.size}-Yard Skip Details
          </h3>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Close details"
          >
            <X className="w-6 h-6 text-gray-500 dark:text-gray-300" />
          </button>
        </div>

        {/* Note section */}
        <div className="px-6 py-3 bg-blue-50 dark:bg-blue-950 border-b border-blue-100 dark:border-blue-900 flex items-start">
          <Info className="w-4 h-4 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
          <p className="text-sm text-blue-700 dark:text-blue-300">
            <strong className="font-medium">Note:</strong> Imagery and information shown throughout this website may not reflect the exact shape or size specification, colours may vary, options and/or accessories may be featured at additional cost.
          </p>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {/* Specifications */}
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl">
              <h4 className="font-semibold text-lg text-gray-800 dark:text-white mb-4 flex items-center gap-3">
                <Info className="w-6 h-6 text-blue-600" />
                <span>Specifications</span>
              </h4>
              <div className="space-y-2">
                {[
                  ["Skip Size", `${skip.size} Yards`],
                  ["Hire Period", `${skip.hire_period_days} days`],
                  ["Price (ex VAT)", skip.price_before_vat ? `£${skip.price_before_vat.toFixed(2)}` : "N/A"],
                  ["VAT", skip.price_before_vat ? `£${(skip.price_before_vat * skip.vat / 100).toFixed(2)}` : "N/A"],
                ].map(([label, value], i) => (
                  <div key={i} className={`flex justify-between items-center py-3 ${i < 3 ? 'border-b border-gray-200 dark:border-gray-700' : ''}`}>
                    <span className="text-gray-600 dark:text-gray-300">{label}</span>
                    <span className="font-medium text-gray-900 dark:text-white">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Restrictions & Features */}
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl">
              <h4 className="font-semibold text-lg text-gray-800 dark:text-white mb-4 flex items-center gap-3">
                <Info className="w-6 h-6 text-blue-600" />
                <span>Restrictions & Features</span>
              </h4>
              <div className="space-y-2">
                {[
                  {
                    condition: skip.allowed_on_road,
                    trueIcon: <Route className="w-6 h-6 text-green-600 mt-0.5 flex-shrink-0" />,
                    falseIcon: <AlertTriangle className="w-6 h-6 text-yellow-600 mt-0.5 flex-shrink-0" />,
                    text: skip.allowed_on_road
                      ? "Can be placed on public road"
                      : "Cannot be placed on public road",
                  },
                  {
                    condition: skip.allows_heavy_waste,
                    trueIcon: <Weight className="w-6 h-6 text-green-600 mt-0.5 flex-shrink-0" />,
                    falseIcon: <AlertTriangle className="w-6 h-6 text-yellow-600 mt-0.5 flex-shrink-0" />,
                    text: skip.allows_heavy_waste
                      ? "Accepts heavy waste materials"
                      : "No heavy waste materials",
                  },
                  {
                    condition: !skip.forbidden,
                    trueIcon: <Check className="w-6 h-6 text-green-600 mt-0.5 flex-shrink-0" />,
                    falseIcon: <AlertTriangle className="w-6 h-6 text-red-600 mt-0.5 flex-shrink-0" />,
                    text: skip.forbidden
                      ? "Restrictions apply in this area"
                      : "No special restrictions",
                  },
                ].map(({ condition, trueIcon, falseIcon, text }, i) => (
                  <div key={i} className={`flex items-start gap-3 py-3 ${i < 2 ? 'border-b border-gray-200 dark:border-gray-700' : ''}`}>
                    {condition ? trueIcon : falseIcon}
                    <span className="text-gray-700 dark:text-gray-300">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Total Price */}
          {skip.price_before_vat && (
            <div className="bg-gray-50 dark:bg-gray-800 px-5 py-3 border border-blue-100 dark:border-blue-900 rounded-md">
              <div className="flex justify-between items-center">
                <h4 className="font-semibold text-lg text-black dark:text-white">Total Price</h4>
                <div className="text-right">
                  <p className="text-2xl font-bold text-black dark:text-white">
                    £{(skip.price_before_vat * (1 + skip.vat / 100)).toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    (incl. £{(skip.price_before_vat * skip.vat / 100).toFixed(2)} VAT)
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-between gap-4 pt-4">
            <button
              onClick={onClose}
              className="flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-medium border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
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