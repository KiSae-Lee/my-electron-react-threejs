// import React from 'react';
// import { Link, useParams } from 'react-router-dom';

// interface MovieType {
//     id: number;
//     title: string;
//     medium_cover_image: string;
//     description_full: string;
//     genres: Array<string>;
// }

// export function MovieViewer() {
//     const [loading, setLoading] = React.useState(true);
//     const [movies, setMovies] = React.useState<MovieType[]>([]);

//     const getMovies = async () => {
//         const response = await fetch('https://yts.mx/api/v2/list_movies.json?minium_rating=8.5&&sort_by=year');
//         const json = await response.json();
//         console.log(json);
//         setMovies(json.data.movies);
//         setLoading(false);
//     };

//     React.useEffect(() => {
//         getMovies();
//     }, []);

//     return (
//         <div>
//             <h3>MoveViewer</h3>
//             <h3>
//                 {loading ? (
//                     'Loading...'
//                 ) : (
//                     <ul>
//                         {movies.map((movie) => (
//                             <li key={movie.id}>
//                                 <Link to={`/movie-viewer/${movie.id}`}>{movie.title}</Link>
//                             </li>
//                         ))}
//                     </ul>
//                 )}
//             </h3>
//         </div>
//     );
// }

// export function MovieDetail() {
//     const { id } = useParams();
//     const [loading, setLoading] = React.useState(true);
//     const [movie, setMovie] = React.useState<MovieType | null>(null);

//     console.log(id);

//     const getMovie = async () => {
//         const response = await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`);
//         const json = await response.json();
//         console.log(json);
//         setMovie(json.data.movie);
//         setLoading(false);
//     };

//     React.useEffect(() => {
//         getMovie();
//     }, []);

//     return (
//         <div>
//             {loading ? (
//                 <h3>Loading...</h3>
//             ) : (
//                 <div>
//                     <h3>{movie?.title}</h3>
//                     <img src={movie?.medium_cover_image} alt={movie?.title} />
//                     <ul>
//                         {movie?.genres.map((item) => (
//                             <li key={item}>{item}</li>
//                         ))}
//                     </ul>
//                     <p>{movie?.description_full}</p>
//                     <h3>
//                         <Link to="/movie-viewer">Back</Link>
//                     </h3>
//                 </div>
//             )}
//         </div>
//     );
// }
