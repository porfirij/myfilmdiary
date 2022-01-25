import React, { useState, useContext } from 'react';
import { createPortal } from 'react-dom';
import { auth, db } from '../../api/firebase';
import { ref, get, set } from "firebase/database";
import AuthContext from '../../store/auth-context';
import Filmcard from '../ui/Filmcard';

function AddFilm() {
    const { loadingHandler, modalHandler } = useContext(AuthContext);
    const [addNewFilm, setAddNewFilm] = useState(false);

    const [searchedFilms, setSearchedFilms] = useState([
        {
            Title: "Oltári csajok",
            Year: "2017–",
            ImdbID: "tt7572986",
            Type: "series",
            Poster:
                "https://m.media-amazon.com/images/M/MV5BYmRmMzIyZTItNzQyMy00ODgyLWExMTUtMjBiODU2OWI3Y2Q5XkEyXkFqcGdeQXVyMjg2NzE4MTI@._V1_SX300.jpg"
        },
        {
            Title: "Csajok",
            Year: "1996",
            ImdbID: "tt0112751",
            Type: "movie",
            Poster:
                "https://m.media-amazon.com/images/M/MV5BYzIzOTg3NmMtNTE3MC00ZWZiLTk4MWEtNGUxNmQzOGE5MmQzL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMjMwMzkwMTk@._V1_SX300.jpg"
        },
        {
            Title: "Kemény csajok nem álmodnak",
            Year: "2010",
            ImdbID: "tt1804546",
            Type: "movie",
            Poster:
                "https://m.media-amazon.com/images/M/MV5BNWFhOGQ1YjYtNGQ3OC00NjJjLWFlYjQtNWIxMTVlOTc2N2ZlXkEyXkFqcGdeQXVyMTU1NTI2MA@@._V1_SX300.jpg"
        },
        {
            Title: "Balhés csajok",
            Year: "2020–",
            ImdbID: "tt13288710",
            Type: "series",
            Poster: "N/A"
        }
    ]);

    const addNewFilmHandler = () => {
        setOffCanvas(true);
    }

    const addNewFilmHandler = async (id) => {
        const selectedFilm = searchedFilms.filter((film) => film.ImdbID === id);
        loadingHandler({ isOn: false });
        try {
            const snapshot = await get(ref(db, `users/${auth.currentUser.uid}/${id}`));
            if (snapshot.exists()) {
                modalHandler({ isOn: true, variant: "red", title: "Already added", message: "Film already added." });
            } else {
                await set(ref(db, `users/${auth.currentUser.uid}/${id}`), selectedFilm[0]);
                modalHandler({ isOn: true, variant: "green", title: "Success", message: "Film added to your watch list." });
            }
        } catch (error) {
            modalHandler({ isOn: true, variant: "red", title: "Error", message: error.message });
        }
        loadingHandler(false);
    }

    const filmListContent = searchedFilms.map((film) => <Filmcard key={film.ImdbID} film={film} onAddNewFilm={addNewFilmHandler}></Filmcard>);

    if (addNewFilm) {
        return <div className="flex flex-column overflow-y-auto">{filmListContent}</div>;
    }
}

export default AddFilm;