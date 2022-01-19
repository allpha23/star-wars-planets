import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';
import planetsApi from '../components/planetsApi';

export default function AppProvider({ children }) {
  const ONE = 1;
  const MINUS_ONE = -1;
  const [filterName, setFilterName] = useState('');
  const [filters, setFilters] = useState([]);
  const [selected, setSelected] = useState([]);
  const [results, setResults] = useState([]);
  const [headerKeys, setHeaderKeys] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [order, setOrder] = useState({});

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
    setOrder,
  };

  function compare(tag, operator, num) {
    if (operator === 'maior que') return parseInt(tag, 10) > num;
    if (operator === 'menor que') return parseInt(tag, 10) < num;
    if (operator === 'igual a') return tag === num;
  }

  useEffect(() => {
    async function tablePlanets() {
      const getPlanets = await planetsApi();
      const data = getPlanets.results[0];
      const keys = Object.keys(data);

      const number = {
        nine: 9,
        one: 1,
      };

      keys.splice(number.nine, number.one);
      const planetSortByName = [...getPlanets.results];
      planetSortByName.sort((a, b) => {
        if (a.name < b.name) return MINUS_ONE;
        if (a.name > b.name) return ONE;
        return 0;
      });

      setHeaderKeys(keys);
      setResults(planetSortByName);
    }

    tablePlanets();
  }, [MINUS_ONE]);

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

  useEffect(() => {
    let filter = [...results];
    if (order.sort === 'ASC') {
      filter = results.sort((a, b) => {
        if (parseInt(a[order.column], 10) < parseInt(b[order.column], 10)) {
          return MINUS_ONE;
        }
        if (parseInt(a[order.column], 10) > parseInt(b[order.column], 10)) {
          return ONE;
        }
        return 0;
      });
    }
    if (order.sort === 'DESC') {
      filter = results.sort((a, b) => {
        if (parseInt(a[order.column], 10) > parseInt(b[order.column], 10)) {
          return MINUS_ONE;
        }
        if (parseInt(a[order.column], 10) < parseInt(b[order.column], 10)) {
          return ONE;
        }
        return 0;
      });
    }
    setFilteredResults(filter);
  }, [MINUS_ONE, order.column, order.sort, results]);

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
