import React, { useContext, useState } from 'react';
import MyContext from '../context/MyContext';

export default function SortBar() {
  const { setOrder } = useContext(MyContext);
  const [tag, setTag] = useState('population');
  const [sort, setSort] = useState('');

  function handleClickBtn() {
    const sorteValue = {
      column: tag,
      sort,
    };

    setOrder(sorteValue);
  }

  return (
    <div className="row">
      <div className="col-auto">
        <select
          className="form-control"
          data-testid="column-sort"
          onChange={ ({ target }) => setTag(target.value) }
          value={ tag }
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
      </div>
      <div className="col-auto">
        <label htmlFor="ASC">
          Acendente
          <input
            data-testid="column-sort-input-asc"
            id="ASC"
            type="radio"
            value="ASC"
            name="sort"
            onChange={ ({ target }) => setSort(target.value) }
          />
        </label>
      </div>
      <div className="col-auto">
        <label htmlFor="DESC">
          Decendente
          <input
            data-testid="column-sort-input-desc"
            id="DESC"
            type="radio"
            value="DESC"
            name="sort"
            onClick={ ({ target }) => setSort(target.value) }
          />
        </label>
      </div>
      <div className="col-auto">
        <button
          className="btn btn-info"
          data-testid="column-sort-button"
          type="button"
          onClick={ handleClickBtn }
        >
          Ordenar
        </button>
      </div>
    </div>
  );
}
