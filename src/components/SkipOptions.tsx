import { useEffect, useState } from 'react';
import { Check, Clock, Zap } from 'lucide-react';

type Skip = {
  id: string | number;
  size: number;
  hire_period_days: number;
  price_before_vat: number | null;
  per_tonne_cost: number | null;
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
        <p className="text-gray-500">Select the skip size that best suits your needs</p>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {skips.map(skip => (
            <div 
              key={skip.id} 
              className={`bg-gray-50 rounded-xl shadow-md overflow-hidden border-2 transition-all duration-200 cursor-pointer hover:border-indigo-500 hover:shadow-md ${
                selectedId === skip.id ? 'border-indigo-600 shadow-md' : 'border-transparent'
              }`}
              onClick={() => setSelectedId(skip.id)}
            >
              <div className="relative h-48 bg-gray-50 flex items-center justify-center p-4">
                <div className="absolute top-4 right-4 bg-indigo-600 text-white text-sm font-semibold px-3 py-1 rounded-full shadow">
                  {skip.size} Yard{skip.size !== 1 ? 's' : ''}
                </div>
                <img 
                  src={`/skip-placeholder.jpeg`} 
                  alt={`${skip.size} yard skip`} 
                  className="h-full w-full object-contain object-bottom"
                />
              </div>
              <div className="p-6 flex flex-col">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{skip.size}-Yard Skip</h3>
                
                <div className="space-y-3 mb-6 flex-grow">
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-5 h-5 text-indigo-600 mr-2" />
                    <span>{skip.hire_period_days}-day hire period</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Zap className="w-5 h-5 text-indigo-600 mr-2" />
                    <span>Available now</span>
                  </div>
                </div>
                
                <div className="mt-auto">
                  <p className="text-2xl font-bold text-indigo-600 mb-4">
                    {skip.price_before_vat ? (
                      <>
                        £{skip.price_before_vat.toFixed(2)}
                        <span className="text-sm font-normal text-gray-500 ml-1">+ VAT</span>
                      </>
                    ) : 'Price on request'}
                  </p>
                  
                  <button
                    className={`w-full py-3 px-4 rounded-lg font-medium transition-colors  ${
                      selectedId === skip.id
                        ? 'bg-white text-indigo-600 border-2 border-indigo-600 flex items-center justify-center gap-2'
                        : 'bg-indigo-600 text-white hover:bg-indigo-700'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedId(skip.id);
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
      )}
    </div>
  );
};

export default SkipOptions;