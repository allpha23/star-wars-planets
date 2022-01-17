import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';

export default function AppProvider({ children }) {
  const [filterName, setFilterName] = useState('');
  const [filters, setFilters] = useState({});

  const value = {
    filterName,
    setFilterName,
    filters,
    setFilters,
  };

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
