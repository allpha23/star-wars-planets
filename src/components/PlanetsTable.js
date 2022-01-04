import React, { Component } from 'react';
import planetsApi from './planetsApi';
import './PlanetsTable.css';

export default class planetsTable extends Component {
  constructor() {
    super();
    this.state = {
      headerKeys: [],
      results: [],
    };

    this.tablePlanets = this.tablePlanets.bind(this);
  }

  componentDidMount() {
    this.tablePlanets();
  }

  async tablePlanets() {
    const getPlanets = await planetsApi();
    const data = getPlanets.results[0];
    const keys = Object.keys(data);
    const number = {
      nine: 9,
      one: 1,
    };
    keys.splice(number.nine, number.one);
    const planetInformations = getPlanets.results;

    this.setState({
      headerKeys: keys,
      results: planetInformations,
    });
  }

  render() {
    const { headerKeys, results } = this.state;
    return (
      <table>
        <thead>
          <tr>
            { headerKeys.map((planet) => (
              <th key={ planet }>{planet}</th>
            ))}
          </tr>
        </thead>
        { results.map((planet) => (
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
}
