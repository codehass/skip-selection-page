import { Check, MapPinned, Trash2, Truck, CalendarDays, Shield, CreditCard } from 'lucide-react';
import { useState } from "react";


function ProgressBar() {
  const [activeStep,] = useState(2); // 2 = "Select Skip" step

  return (
    <div className="w-full mb-8">
  {/* Mobile Progress Bar (shows only on small screens) */}
  <div className="block sm:hidden w-full bg-gray-200 h-1.5 mb-4 rounded-full">
    <div 
      className="bg-black h-1.5 rounded-full transition-all duration-300" 
      style={{ width: `${(activeStep / 5) * 100}%` }}
    ></div>
  </div>

  <div className="flex justify-between items-start relative">
    {/* Desktop Progress Line (hidden on mobile) */}
    <div className="hidden sm:block absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 -z-10">
      <div 
        className="h-full bg-black transition-all duration-300" 
        style={{ width: `${(activeStep / 5) * 100}%` }}
      ></div>
    </div>

     {/* I make the labels shorter for better fit and user experience */}
    {[
      { icon: MapPinned, label: 'Postcode', step: 0 },
      { icon: Trash2, label: 'Waste', step: 1 },
      { icon: Truck, label: 'Skip', step: 2 }, 
      { icon: Shield, label: 'Permit', step: 3 }, 
      { icon: CalendarDays, label: 'Date', step: 4 }, 
      { icon: CreditCard, label: 'Pay', step: 5 },   
    ].map(({ icon: Icon, label, step }) => (
      <div 
        key={label}
        className="flex flex-col items-center w-12 sm:w-auto"
      >
        {/* Icon Container */}
        <div className={`
          relative rounded-full p-2 flex items-center justify-center
          transition-all duration-200 mb-1 sm:mb-2
          ${step <= activeStep ? 'bg-black' : 'bg-gray-200'}
          ${step === activeStep ? 'ring-2 ring-offset-2 ring-black scale-110' : ''}
          w-10 h-10 sm:w-12 sm:h-12
        `}>
          <Icon 
            className={`
              ${step <= activeStep ? 'text-white' : 'text-gray-400'}
              w-5 h-5 sm:w-6 sm:h-6
            `} 
          />
          {/* Completed checkmark */}
          {step < activeStep && (
            <Check className="absolute -right-1 -bottom-1 w-4 h-4 text-white bg-green-500 rounded-full p-0.5 border-2 border-white" />
          )}
        </div>
        
        {/* Label */}
        <span className={`
          text-center text-[10px] sm:text-xs font-medium
          ${step <= activeStep ? 'text-black' : 'text-gray-400'}
          px-0.5 leading-tight
        `}>
          {label}
        </span>
      </div>
    ))}
  </div>
</div>
  )
}

export default ProgressBar