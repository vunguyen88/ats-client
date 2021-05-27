import './App.css';
import NavBar from './components/NavBar';
import TopBar from './components/TopBar';
import EmployeePage from './Pages/Employees'

function App() {
  return (
    <div className="App">
      
      <EmployeePage />
      
      {/* <div style={{backgroundColor: 'yellow', border: '20px solid blue', height: '100px', width: '500px'}}></div> */}
    </div>
  );
}

export default App;
