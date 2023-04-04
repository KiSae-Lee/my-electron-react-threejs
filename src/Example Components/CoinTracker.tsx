import React from "react";

interface CoinType {
  id: number;
  name: string;
  quotes: {
    USD: {
      price: number;
    };
  };
}

export function CoinTracker() {
  const [loading, setLoading] = React.useState(true);
  const [coins, setCoins] = React.useState<CoinType[]>([]);
  const [selected, setSelected] = React.useState("Select option...");
  const [filtered, setFiltered] = React.useState<CoinType>();

  const selectedOptionChanged = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelected(event.target.value);
    setFiltered(coins.find((coin) => coin.name === event.target.value));
  };

  React.useEffect(() => {
    // Load Coin Paprika API.
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setCoins(json);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h3>Coin Tracker {loading ? "" : `(${coins.length})`}</h3>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <select value={selected} onChange={selectedOptionChanged}>
          <option>Select option...</option>
          {coins.map((item) => (
            <option key={item.id}>{item.name}</option>
          ))}
        </select>
      )}

      <ul>
        {filtered !== undefined ? (
          <li>
            {filtered.name}: {filtered.quotes.USD.price}
          </li>
        ) : null}
      </ul>
    </div>
  );
}
