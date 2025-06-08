import { useEffect, useState } from 'react';
import { Check, Clock, Zap, Route, AlertTriangle, Weight, Info, X, ChevronLast, ArrowLeftToLine, ChevronFirst, ChevronLeft, ChevronRight } from 'lucide-react';

type Skip = {
  id: string | number;
  size: number;
  hire_period_days: number;
  transport_cost: number | null;
  per_tonne_cost: number | null;
  price_before_vat: number;
  vat: number;
  postcode: string;
  area: string;
  forbidden: boolean;
  allowed_on_road: boolean;
  allows_heavy_waste: boolean;
  created_at: string;
  updated_at: string;
};

const SkipOptions = () => {
  const [skips, setSkips] = useState<Skip[]>([]);
  const [selectedId, setSelectedId] = useState<string | number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSkips = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft");
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data: Skip[] = await res.json();
        setSkips(data);
      } catch (err) {
        console.error('Failed to fetch skips:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSkips();
  }, []);

  return (
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
  <div className="text-center mb-10">
    <h2 className="text-3xl font-bold text-gray-900 mb-2">Choose Your Skip Size</h2>
    <p className="text-gray-500">Select a skip to view full details</p>
  </div>
  
  {isLoading ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 animate-pulse">
          <div className="h-48 bg-gray-100"></div>
          <div className="p-6 space-y-4">
            <div className="h-6 bg-gray-100 rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-100 rounded w-full"></div>
              <div className="h-4 bg-gray-100 rounded w-2/3"></div>
            </div>
            <div className="h-8 bg-gray-100 rounded w-1/2"></div>
            <div className="h-10 bg-gray-100 rounded-lg"></div>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {skips.map(skip => (
          <div 
            key={skip.id} 
            className={`bg-white rounded-xl shadow-sm overflow-hidden border-2 transition-all duration-200 cursor-pointer hover:border-black hover:shadow-md ${
              selectedId === skip.id ? 'border-black shadow-md' : 'border-transparent'
            }`}
            onClick={() => setSelectedId(selectedId === skip.id ? null : skip.id)}
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
                    selectedId === skip.id
                      ? 'bg-white text-black border-2 border-black flex items-center justify-center gap-2'
                      : 'bg-black text-white hover:bg-black'
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedId(selectedId === skip.id ? null : skip.id);
                  }}
                >
                  {selectedId === skip.id ? (
                    <>
                      <Check className="w-5 h-5" />
                      Selected
                    </>
                  ) : 'Select'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedId && (
        <div className="fixed inset-x-0 bottom-0 z-10 bg-white shadow-xl rounded-t-2xl border-t border-gray-200 transition-all duration-300 max-h-[70vh] overflow-y-auto">
          <div className="sticky top-0 bg-white p-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-xl font-bold text-gray-900">
              {skips.find(s => s.id === selectedId)?.size}-Yard Skip Details
            </h3>
            <button 
              onClick={() => setSelectedId(null)}
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
                    <span className="font-medium">{skips.find(s => s.id === selectedId)?.size} Yards</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Hire Period</span>
                    <span className="font-medium">{skips.find(s => s.id === selectedId)?.hire_period_days} days</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Price (ex VAT)</span>
                    <span className="font-medium">£{skips.find(s => s.id === selectedId)?.price_before_vat?.toFixed(2) || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">VAT ({skips.find(s => s.id === selectedId)?.vat}%)</span>
                    <span className="font-medium">
                      £{(skips.find(s => s.id === selectedId)?.price_before_vat 
                        ? ((skips.find(s => s.id === selectedId)?.price_before_vat || 0) * 
                           (skips.find(s => s.id === selectedId)?.vat || 0)/100).toFixed(2) 
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
                    {skips.find(s => s.id === selectedId)?.allowed_on_road ? (
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
                    {skips.find(s => s.id === selectedId)?.allows_heavy_waste ? (
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
                    {skips.find(s => s.id === selectedId)?.forbidden ? (
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
      )}
    </div>
  )}
</div>
  );
};

export default SkipOptions; 