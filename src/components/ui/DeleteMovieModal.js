import React, { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { auth, db } from '../../api/firebase';
import { ref, get, remove } from "firebase/database";
const modalElement = document.getElementById("modal");

function DeleteMovieModal({ movieID, onClose }) {
    const [status, setStatus] = useState("waiting");
    const [movie, setMovie] = useState({});

    const getMovieInfo = useCallback(async () => {
        setStatus("loading");
        try {
            const response = await fetch(`https://www.omdbapi.com/?i=${movieID}&apikey=${process.env.REACT_APP_OMDB_API_KEY}`);
            const fetchedMovie = await response.json();
            setMovie(fetchedMovie);
        } catch (error) {
            console.error(error.message);
        }
        setStatus("waiting");
    }, []);

    const deleteMovieHandler = async (id) => {
        try {
            const snapshot = await get(ref(db, `users/${auth.currentUser.uid}/${movieID}`));
            if (snapshot.exists()) {
                await remove(ref(db, `users/${auth.currentUser.uid}/${movieID}`));
                setStatus("success");
            } else {
                setStatus("notfound");
            }
        } catch (error) {
            console.error(error.message);
            setStatus("error");
        }
    }

    useEffect(() => {
        if (movieID) { getMovieInfo(); }
    }, [getMovieInfo]);

    let deleteContent = "";

    switch (status) {
        case "success":
            deleteContent = <div className="px-6 py-2.5 bg-green-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md">Movie deleted</div>;
            break;
        case "notfound":
            deleteContent = <div className="px-6 py-2.5 bg-red-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md">Movie not found</div>;
            break;
        case "error":
            deleteContent = <div className="px-6 py-2.5 bg-red-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md">Server error, please try again later.</div>;
            break;
        case "loading":
            deleteContent = <>Loading...</>;
            break;
        default:
            deleteContent = <button type="button" className="px-6 py-2.5 bg-red-500 hover:bg-red-700 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:shadow-lg focus:outline-none focus:shadow-outline transition duration-150 ease-in-out" data-bs-dismiss="modal" onClick={deleteMovieHandler}>Delete Movie</button>;
    }

    return (
        createPortal(
            <div className="flex justify-center items-center bg-gray-600 bg-opacity-50 modal fade fixed top-0 left-0 w-full h-full outline-none overflow-x-hidden overflow-y-auto z-10"
                id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog relative w-11/12 sm:w-96 pointer-events-none">
                    <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded outline-none text-current">
                        <div className="modal-header flex flex-row items-top justify-between p-4 border-b border-gray-200 rounded">
                            <div className="flex flex-row flex-wrap justify-start">
                                <h5 className="text-xl font-medium text-gray-800 mr-2" id="exampleModalLabel">{movie.Title}</h5>
                                <p className="border border-purple-600 text-sm p-1 rounded">
                                    IMDB Rating: {movie.imdbRating}
                                </p>
                            </div>
                            <div className="ml-2">
                                <svg className="h-6 w-6 text-purple-500 hover:cursor-pointer hover:text-purple-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" onClick={onClose}><circle cx="12" cy="12" r="10" />  <line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" /></svg>
                            </div>
                        </div>
                        <div className="flex flex-col flex-wrap justify-start px-4 mt-2">
                            <p className="text-gray-700 text-base">
                                {movie.Plot}
                            </p>
                        </div>
                        <div className="flex flex-wrap flex-row items-start justify-start px-4 py-2 mb-2">
                            <div className="flex flex-row flex-wrap justify-start items-start">
                                <p className="text-gray-700 text-sm bg-slate-200 p-1 mt-1 mr-1 rounded">
                                    {movie.Type}
                                </p>
                                <p className="text-gray-700 text-sm bg-slate-200 p-1 mt-1 mr-1 rounded">
                                    {movie.Year}
                                </p>
                                <p className="text-gray-700 text-sm bg-slate-200 p-1 mt-1 mr-1 rounded">
                                    {movie.Country}
                                </p>
                                <p className="text-gray-700 text-sm bg-slate-200 p-1 mt-1 mr-1 rounded">
                                    {movie.Genre}
                                </p>
                                <p className="text-gray-700 text-sm bg-slate-200 p-1 mt-1 mr-1 rounded">
                                    Directed by {movie.Director}
                                </p>
                            </div>
                        </div>
                        <div
                            className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">

                            {deleteContent}

                            <button type="button" className="ml-2 px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out" data-bs-dismiss="modal" onClick={onClose}>Close</button>

                        </div>
                    </div>
                </div>
            </div>, modalElement)
    )
}

export default DeleteMovieModal;