import './App.css'
import SkipOptions from './components/SkipOptions';
import { ThemeColors } from './components/ThemeColors';
import { ThemeProvider } from './components/ThemeContext';

function App() {

  return (
    <ThemeProvider>
      <ThemeColors>
        <SkipOptions />
      </ThemeColors>
    </ThemeProvider>
  )
}

export default App
