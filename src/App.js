import MainPage from './pages/MainPage';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Header from './components/Header'

const theme = createTheme({
  palette: {
    primary: {
      light: '#4f5b62',
      main: '#263238',
      dark: '#000a12',
      contrastText: '#ffffff'
    },
    secondary: {
      light: '#62efff',
      main: '#00bcd4',
      dark: '#008ba3',
      contrastText: '#000000'
    }
  }
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Header/>
      <MainPage/>
    </ThemeProvider>
  );
}

export default App;
