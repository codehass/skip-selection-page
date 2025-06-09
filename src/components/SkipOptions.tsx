import { useEffect, useState } from 'react';
import ProgressBar from './ProgressBar';
import Skeleton from './Skeleton';
import SkipCard from './SkipCard';
import SkipDetails from './SkipDetails';
import type { Skip } from '../types/skip';
import { useTheme } from './ThemeContext';
import { ThemeToggle } from './ThemeToggle';

const SkipOptions = () => {
  const [skips, setSkips] = useState<Skip[]>([]);
  const [selectedId, setSelectedId] = useState<string | number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { darkMode } = useTheme();

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

  const selectedSkip = skips.find(skip => skip.id === selectedId);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 dark:bg-gray-900">
      <div>
        <ThemeToggle />
        <ProgressBar />

        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2 dark:text-white text-gray-900">
            Choose Your Skip Size
          </h2>
          <p className="dark:text-gray-300 text-gray-500">
            Select a skip to view full details
          </p>
        </div>
        
        {isLoading ? (
          <Skeleton />
        ) : (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {skips.map(skip => (
                <SkipCard
                  key={skip.id}
                  skip={skip}
                  isSelected={selectedId === skip.id}
                  onSelect={() => setSelectedId(selectedId === skip.id ? null : skip.id)}
                  darkMode={darkMode}
                />
              ))}
            </div>

            {selectedSkip && (
              <SkipDetails 
                skip={selectedSkip} 
                onClose={() => setSelectedId(null)}
                darkMode={darkMode}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SkipOptions;