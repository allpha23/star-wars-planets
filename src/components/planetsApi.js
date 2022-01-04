async function planetsApi() {
  const URL = 'https://swapi-trybe.herokuapp.com/api/planets/';
  const response = await fetch(URL);
  const planets = response.json();
  return planets;
}

export default planetsApi;
