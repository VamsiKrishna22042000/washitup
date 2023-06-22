
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import LaundryBody from './components/LaundryBody/index'

import LaundryNav from './components/LaundryMain/index';

function App() {
  return (
    <>
      <LaundryNav/>
      <LaundryBody/>
    </>
  )
}

export default App;
