import logo from './logo.svg';
import './App.css';
import D3Card from './components/D3chart/d3component';
import { ApolloProvider, ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'


const uniswapClient = new ApolloClient({
  ssrMode: typeof window === 'undefined',
  link: new HttpLink({
    uri: "https://api.thegraph.com/subgraphs/name/ianlapham/uniswap-v3-subgraph",
    credentials: 'same-origin',
    headers: {
    },
  }),
  cache: new InMemoryCache(),
})

function App() {
  return (
    <div className="App">
      <ApolloProvider client={uniswapClient}>
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
      </ApolloProvider>
    </div>
  );
}

export default App;
