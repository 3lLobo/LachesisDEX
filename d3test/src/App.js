import logo from './logo.svg';
import './App.css';
import D3Card from './components/D3chart/d3component';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div class="mt-3 bg-slate-300 rounded-full p-16 ">

          <D3Card />
        </div>
        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
      </header>
    </div>
  );
}

export default App;
