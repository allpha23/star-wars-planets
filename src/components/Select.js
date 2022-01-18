import React, { useContext } from 'react';
import MyContext from '../context/MyContext';

export default function Select() {
  const { filters, setFilters } = useContext(MyContext);

  function handleClick({ target }) {
    const filterSelected = filters.filter((select) => (
      !target.id.includes(select.name)
    ));

    setFilters(filterSelected);
  }

  function renderSelect() {
    return filters.map((select) => (
      <div className="d-flex" key={ select.name }>
        <div className="col-auto">
          <label
            htmlFor={ select.name }
            data-testid="filter"
            className="btn-sm btn-outline-success"
          >
            {select.name}
            <button
              className="btn-xs btn-danger"
              id={ select.name }
              type="button"
              onClick={ handleClick }
            >
              x
            </button>
          </label>
        </div>
      </div>
    ));
  }

  return (
    <div>
      { renderSelect() }
    </div>
  );
}
