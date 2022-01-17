import React, { useState, useEffect, useContext } from 'react';
import MyContext from '../context/MyContext';
import planetsApi from './planetsApi';

export default function Table() {
  const { filterName, filters } = useContext(MyContext);
  const [results, setResults] = useState([]);
  const [headerKeys, setHeaderKeys] = useState([]);

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

  function renderPlanet() {
    let filteredResults = [];
    function compare(tag, operator, num) {
      if (operator === 'maior que') return parseInt(tag, 10) > num;
      if (operator === 'menor que') return parseInt(tag, 10) < num;
      if (operator === 'igual a') return tag === num;
    }

    if (filters.number >= 0) {
      filteredResults = results.filter((el) => el.name.includes(filterName))
        .filter((el) => compare(el[filters.tag], filters.operator, filters.number));
    } else {
      filteredResults = results.filter((el) => el.name.includes(filterName));
    }

    return (
      <table className="table table-dark table-striped table-hover">
        <thead>
          <tr>
            { headerKeys.map((planet) => (
              <th key={ planet }>{planet}</th>
            ))}
          </tr>
        </thead>
        { filteredResults.map((planet) => (
          <tbody key={ planet.name }>
            <tr>
              {headerKeys.map((element) => (
                <td key={ element }>{planet[element]}</td>
              ))}
            </tr>
          </tbody>
        ))}
      </table>
    );
  }

  useEffect(() => {
    tablePlanets();
  }, []);

  return (
    <div>
      {renderPlanet()}
    </div>
  );
}
