import React, { useContext } from 'react';
import MyContext from '../context/MyContext';

export default function Table() {
  const { headerKeys, filteredResults } = useContext(MyContext);

  function renderPlanet() {
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
              {headerKeys.map((element, index) => {
                if (index === 0) {
                  return (
                    <td data-testid="planet-name" key={ element }>{planet[element]}</td>
                  );
                }
                return (
                  <td key={ element }>{planet[element]}</td>
                );
              })}
            </tr>
          </tbody>
        ))}
      </table>
    );
  }

  return (
    <div>
      {renderPlanet()}
    </div>
  );
}
