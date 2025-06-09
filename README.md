# Skip Hire Booking Interface

A modern, responsive React application for selecting and booking skips, with focus on clean code, maintainability, and excellent UI/UX.

<div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: flex-start;">
  <img src="./src/assets/images/desktop-1.png" alt="Desktop Screenshot 1" style="max-width: 100%; width: 48%;">
  <img src="./src/assets/images/desktop-2.png" alt="Phone Screenshot 1" style="max-width: 100%; width: 48%;">
</div>

<br/>

<div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: flex-start;">
  <img src="./src/assets/images/phone-1.png" alt="Desktop Screenshot 2" style="max-width: 100%; width: 48%;">
  <img src="./src/assets/images/phone-2.png" alt="Phone Screenshot 2" style="max-width: 100%; width: 48%;">
</div>

<br/>

<div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: flex-start;">
  <img src="./src/assets/images/ipad-1.png" alt="iPad Screenshot 1" style="max-width: 100%; width: 48%;">
  <img src="./src/assets/images/ipad-2.png" alt="iPad Screenshot 2" style="max-width: 100%; width: 48%;">
</div>


## Features

- **Responsive Design**: Fully optimized for mobile, tablet, and desktop
- **Dark/Light Mode**: Smooth theme switching with system preference detection
- **Interactive UI**: Animated progress bar and skip selection cards
- **Data-Driven**: Real-time skip data from API endpoint
- **Accessible**: WCAG compliant with proper contrast ratios
- **Type Safe**: Built with TypeScript for better developer experience

## Tech Stack

- React 18 with Hooks
- TypeScript
- Tailwind CSS
- Lucide Icons
- Context API (State Management)
- Vite (Build Tool)

## Installation

1. Clone the repository:
   ```bash
   git git@github.com:codehass/skip-selection-page-.git
   cd skip-selection-page
   ```

2. Install dependencies::
   ```bash 
   pnpm install
   ```

3. Run the development server::
   ```bash
   pnpm run dev
   ```
## Code Structure
<pre><code> /src 
├── components 
│ ├── ProgressBar.tsx # Step progress indicator 
│ ├── SkipCard.tsx # Individual skip display card 
│ ├── SkipDetails.tsx # Detailed skip information panel 
│ ├── ThemeToggle.tsx # Dark/light mode switch 
│ └── Skeleton.tsx # Loading state component 
├── context 
│ └── ThemeContext.tsx # Dark/light mode state management 
├── types 
│ └── skip.ts # Type definitions 
├── App.tsx # Main application component 
└── main.tsx # Application entry point 
</code></pre>

