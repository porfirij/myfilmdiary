import React, { useState, useEffect, useCallback, useMemo } from 'react';
import MovieCard from '../../ui/MovieCard';
import debounce from 'lodash.debounce';

function SearchMovie() {
    const [searchedMovies, setSearchedMovies] = useState([]);
    const [search, setSearch] = useState("");

    let movieListContent = "";

    const fetchMovies = useCallback(async () => {
        try {
            const resp = await fetch(`https://www.omdbapi.com/?s=${search}&apikey=${process.env.REACT_APP_OMDB_API_KEY}`);
            const fetchedMovies = await resp.json();
            // if (fetchedMovies.Error) throw new Error(fetchedMovies.Error);
            setSearchedMovies(fetchedMovies.Search);
            // console.log(fetchedMovies);
        } catch (error) {
            console.error(error.message);
        }
    }, [search]);

    const searchHandler = useCallback(
        (event) => {
            if (!event) return;
            setSearch(event.target.value);
            if (search.length > 2) fetchMovies();
        }, [fetchMovies]);

    const debouncedSearchHandler = useMemo(() => debounce(searchHandler, 700), [searchHandler]);

    if (searchedMovies) {
        movieListContent = searchedMovies.map((movie) => <MovieCard key={movie.imdbID} movie={movie} action="add"></MovieCard>);
    } else if (search && !searchedMovies) {
        movieListContent = <div>No results.</div>
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            searchHandler(event);
        }
    }

    useEffect(() => {
        fetchMovies();
    }, [search, fetchMovies]);

    return (
        <div className="w-full flex flex-col items-center justify-center">
            <div className="w-full flex flex-col items-center justify-center p-2">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="search">
                    Search Movie By Title
                </label>
                <input type="text" className="w-11/12 md:w-96 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={debouncedSearchHandler} onKeyDown={handleKeyDown} />
            </div>
            <div className="flex flex-row flex-wrap w-full overflow-hidden justify-center">{movieListContent}</div>
        </div>
    );
}

export default SearchMovie;


    // const addNewMovieHandler = async (id) => {
    //     const selectedMovie = searchedMovies.filter((movie) => movie.imdbID === id);
    //     loadingHandler({ isOn: false });
    //     try {
    //         const snapshot = await get(ref(db, `users/${auth.currentUser.uid}/${id}`));
    //         if (snapshot.exists()) {
    //             modalHandler({ isOn: true, variant: "red", title: "Already added", message: "Movie already added." });
    //         } else {
    //             await set(ref(db, `users/${auth.currentUser.uid}/${id}`), selectedMovie[0]);
    //             modalHandler({ isOn: true, variant: "green", title: "Success", message: "Movie added to your watch list." });
    //         }
    //     } catch (error) {
    //         modalHandler({ isOn: true, variant: "red", title: "Error", message: error.message });
    //     }
    //     loadingHandler(false);
    // }
