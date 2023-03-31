import React from "react";

interface CoinType {
    id: number,
    name: string,
    quotes: {
        USD: {
            price: number
        }
    }
}

export function CoinTracker() {
  const [loading, setLoading] = React.useState(true);
  const [coins, setCoins] = React.useState<CoinType[]>([]);

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
      <h3>Coin Tracker</h3>
      {loading ? <strong>Loading...</strong> : null}
      <ul>
        {coins.map((item) => (
          <li key={item.id}>{item.name}: {item.quotes.USD.price}</li>
        ))}
      </ul>
    </div>
  );
}
