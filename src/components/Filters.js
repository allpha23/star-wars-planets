import React, { useContext, useState } from 'react';
import MyContext from '../context/MyContext';

export default function Filters() {
  const { setFilters } = useContext(MyContext);
  const [tag, setTag] = useState('population');
  const [operator, setOperator] = useState('maior que');
  const [number, setNumber] = useState(0);
  const [selected, setSelected] = useState([]);

  function handleClick() {
    const getFilter = {
      tag,
      operator,
      number,
    };
    setFilters(getFilter);
    setSelected([...selected, { value: tag }]);
  }

  function contain(option) {
    return selected.some((select) => select.value === option);
  }

  function renderOption() {
    const options = [
      { value: 'population', label: 'population' },
      { value: 'orbital_period', label: 'orbital_period' },
      { value: 'diameter', label: 'diameter' },
      { value: 'rotation_period', label: 'rotation_period' },
      { value: 'surface_water', label: 'surface_water' },
    ];

    const filteredOptions = options.filter((option) => !contain(option.value));

    return filteredOptions.map((o) => (
      <option key={ o.value } value={ o.value }>{o.label}</option>
    ));
  }

  return (
    <div className="row">
      <div className="col-auto">
        <select
          className="form-control"
          data-testid="column-filter"
          onChange={ ({ target }) => setTag(target.value) }
          value={ tag }
        >
          { renderOption() }
        </select>
      </div>
      <div className="col-auto">
        <select
          className="form-control"
          data-testid="comparison-filter"
          onChange={ ({ target }) => setOperator(target.value) }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </div>
      <div className="col-auto">
        <input
          className="form-control"
          data-testid="value-filter"
          type="number"
          value={ number }
          onChange={ ({ target }) => setNumber(target.value) }
        />
      </div>
      <div className="col-auto">
        <button
          className="btn btn-info"
          data-testid="button-filter"
          type="button"
          onClick={ handleClick }
        >
          Filtrar
        </button>
      </div>
    </div>
  );
}
