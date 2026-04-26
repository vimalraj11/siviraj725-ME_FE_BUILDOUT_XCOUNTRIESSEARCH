import { useEffect, useState } from "react";
import "./App.css";

type Country = {
  common: string;
  png: string;
};

function App() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(
      "https://countries-search-data-prod-812920491762.asia-south1.run.app/countries"
    )
      .then((res) => res.json())
      .then((data) => setCountries(data))
      .catch((err) => console.error(err));
  }, []);

  const filtered = countries.filter((c) =>
    c.common.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app">
      <input
        type="text"
        placeholder="Search for countries..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="countriesContainer">
        {filtered.map((c, i) => (
          <div className="countryCard" key={i}>
            <img src={c.png} alt={c.common} />
            <p>{c.common}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;