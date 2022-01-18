import React from 'react';
import AppProvider from './context/AppProvider';
import Table from './components/Table';
import './App.css';
import FilterBar from './components/FilterBar';
import Filters from './components/Filters';
import Select from './components/Select';

function App() {
  return (
    <AppProvider>
      <div>
        <div className="d-flex justify-content-center">
          <h1>Projeto Star Wars!</h1>
        </div>
        <FilterBar />
        <Filters />
        <Select />
        <Table />
      </div>
    </AppProvider>
  );
}

export default App;
