import { useEffect } from 'react';
import './App.css';
import MainController from './controller/main.controller';

function App() {
  useEffect(()=>{
    console.log(process.env.REACT_APP_BE_LINK)
  },[])
  return (
    <div className="App" style={{minHeight:'100vh',minWidth:'100vW',backgroundColor: '#DADADA',position:'relative'}}>
      <nav style={{position:'absolute',top:0,height:'30px',width:'100vW',backgroundColor: '#4600a7ff'}}></nav>
      <main style={{paddingTop:'30px' , paddingBottom:'30px'}}>
        <MainController />
      </main>
      <footer style={{position:'absolute',bottom:0,height: '30px',width:'100vW',backgroundColor: '#d10000ff'}}></footer>
    </div>
  );
}

export default App;
