import React, { useState, useContext } from "react";
import AuthContext from "./../../store/auth-context";

function Filmcard(props) {
    const { Title, Year, Poster, Type, ImdbID } = props.film;
    const [film, setFilm] = useState("");
    const { loadingHandler, modalHandler } = useContext(AuthContext);

    const getFilmInfo = async () => {
        if (film) { setFilm(""); return }
        // loadingHandler(true);
        try {
            const response = await fetch(`https://www.omdbapi.com/?i=${ImdbID}&apikey=832f4c1e`);
            const film = await response.json();
            setFilm(film);
        } catch (error) {
            modalHandler({ isOn: true, title: "Error", message: error.message });
        }
        // loadingHandler(false);
    }

    let style = "h-2 mt-0 mb-0 mx-2 flex flex-row flex-start rounded-b shadow bg-white transition-all duration-300 ease-in-out invisible";
    if (film) { style = "h-fit mt-0 mb-2 mx-2 flex flex-row flex-start rounded-b shadow bg-white transition-all duration-300 ease-in-out" }

    return (
        <div className="flex flex-col w-full">
            <div className="flex flex-row flex-start rounded-t shadow bg-white my-0 mx-2 transition duration-300 ease-in-out">
                <img className="rounded object-scale-down w-20 m-2" src={Poster} alt="" />
                <div className="p-4">
                    <h5 className="text-gray-900 text-xl font-medium mb-2">{Title}</h5>
                    <p className="text-gray-700 text-base mb-2">
                        {Year} / {Type}
                    </p>
                    <button onClick={getFilmInfo} type="button" className="inline-block px-8 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out mr-2">More info</button>
                    {props.onAddNewFilm &&
                        <button onClick={(props.onAddNewFilm.bind(0, ImdbID))} type="button" className=" inline-block px-8 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Add to my diary</button>}

                    {props.onDeleteFilm &&
                        <button onClick={(props.onDeleteFilm.bind(0, ImdbID))} type="button" className=" inline-block px-8 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out">Remove</button>}
                </div>
            </div>
            <div className={style}>
                <div className="p-4">
                    {film.Plot}
                </div>
            </div>
        </div>
    )
}

export default Filmcard;
