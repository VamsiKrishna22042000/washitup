
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import LaundryBody from './components/LaundryBody/index'

import LaundryNav from './components/LaundryMain/index';

function App() {
  return (
    <div className='total-background'>
      <LaundryNav/>
      <LaundryBody/>
    </div>
  )
}

export default App;
