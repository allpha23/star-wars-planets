import React, { useContext } from 'react';
import MyContext from '../context/MyContext';

export default function FilterBar() {
  const { filterName, setFilterName } = useContext(MyContext);

  return (
    <div className="row justify-content-center">
      <div className="col col-auto">
        <input
          className="form-control mb-3"
          data-testid="name-filter"
          type="text"
          placeholder="Filtra por nome"
          value={ filterName }
          onChange={ (e) => setFilterName(e.target.value) }
        />
      </div>
    </div>
  );
}
