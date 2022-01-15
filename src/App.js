import React from 'react';
import AppProvider from './context/AppProvider';
import Table from './components/Table';
import './App.css';
import FilterBar from './components/FilterBar';

function App() {
  return (
    <AppProvider>
      <div>
        <span>Projeto Star Wars!</span>
        <FilterBar />
        <Table />
      </div>
    </AppProvider>
  );
}

export default App;
