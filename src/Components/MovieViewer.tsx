import React from "react";

interface MovieType {
  id: number;
  title: string;
  medium_cover_image: string;
  description_full: string;
  genres: Array<string>;
}

export function MovieViewer() {
  const [loading, setLoading] = React.useState(true);
  const [movies, setMovies] = React.useState<MovieType[]>([]);
  const [selected, setSelected] = React.useState("Select option...");
  const [filtered, setFiltered] = React.useState<MovieType>();

  const selectedOptionChanged = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelected(event.target.value);
    setFiltered(movies.find((movie) => movie.title === event.target.value));
  };

  const getMovies = async () => {
    const response = await fetch(
      "https://yts.mx/api/v2/list_movies.json?minium_rating=8.5&&sort_by=year"
    );

    const json = await response.json();
    console.log(json);
    setMovies(json.data.movies);
    setLoading(false);
  };

  React.useEffect(() => {
    getMovies();
  }, []);

  return (
    <div>
      <h3>MoveViewer</h3>
      <h3>
        {loading ? (
          "Loading..."
        ) : (
          <select value={selected} onChange={selectedOptionChanged}>
            <option>Select option...</option>
            {movies.map((item) => (
              <option key={item.id}>{item.title}</option>
            ))}
          </select>
        )}
      </h3>

      <ul>
        {filtered !== undefined ? (
          <div>
            <h3>{filtered.title}</h3>
            <img src={filtered.medium_cover_image} alt={filtered.title} />
            <ul>
                {filtered.genres.map((item) => <li key={item}>{item}</li>)}
            </ul>
            <p>{filtered.description_full}</p>
          </div>
        ) : null}
      </ul>
    </div>
  );
}
