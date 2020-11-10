import { useEffect } from 'react';
import './App.css';

function App() {
  // test expresss call
  useEffect(() => {
    const testApi = async() => {
      const res = await fetch("/api/news/")
      const data = await res.json()
      console.log(data)
    }
    testApi()
  }, [])

  return (
    <div className="App">
      <h1>Hello From React</h1>
    </div>
  );
}

export default App;
