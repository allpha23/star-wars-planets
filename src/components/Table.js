import React, { useState, useEffect, useContext } from 'react';
import MyContext from '../context/MyContext';
import planetsApi from './planetsApi';

export default function Table() {
  const { filterName } = useContext(MyContext);
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
    console.log(filterName);
  }

  function renderPlanet() {
    const filterResults = results.filter((el) => el.name.includes(filterName));

    return (
      <table className="table table-dark table-striped table-hover">
        <thead>
          <tr>
            { headerKeys.map((planet) => (
              <th key={ planet }>{planet}</th>
            ))}
          </tr>
        </thead>
        { filterResults.map((planet) => (
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
