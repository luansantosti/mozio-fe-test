import CssBaseline from '@mui/material/CssBaseline';

import Template from "./components/template"
import Routes from './routes'

function App() {
  return (
    <>
      <CssBaseline />

      <Template>
        <Routes />
      </Template>
    </>
  )
}

export default App
