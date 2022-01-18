import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';
import planetsApi from '../components/planetsApi';

export default function AppProvider({ children }) {
  const [filterName, setFilterName] = useState('');
  const [filters, setFilters] = useState([]);
  const [selected, setSelected] = useState([]);
  const [results, setResults] = useState([]);
  const [headerKeys, setHeaderKeys] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);

  const value = {
    filterName,
    setFilterName,
    filters,
    setFilters,
    selected,
    setSelected,
    results,
    setResults,
    headerKeys,
    filteredResults,
  };

  async function tablePlanets() {
    const getPlanets = await planetsApi();
    const data = getPlanets.results[0];
    const keys = Object.keys(data);
    const number = {
      nine: 9,
      one: 1,
    };

    keys.splice(number.nine, number.one);
    const planetInformations = getPlanets.results;

    setHeaderKeys(keys);
    setResults(planetInformations);
  }

  function compare(tag, operator, num) {
    if (operator === 'maior que') return parseInt(tag, 10) > num;
    if (operator === 'menor que') return parseInt(tag, 10) < num;
    if (operator === 'igual a') return tag === num;
  }

  useEffect(() => {
    tablePlanets();
  }, []);

  useEffect(() => {
    const filter = results.filter((el) => el.name.includes(filterName));
    setFilteredResults(filter);
  }, [filterName, results]);

  useEffect(() => {
    let filter = results;
    filters.forEach((object) => {
      filter = results.filter((e) => (
        compare(e[object.name], object.toComp, object.quant)
      ));
    });
    setFilteredResults(filter);
  }, [filters, results]);

  return (
    <div>
      <main>
        <MyContext.Provider value={ value }>
          { children }
        </MyContext.Provider>
      </main>
    </div>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
