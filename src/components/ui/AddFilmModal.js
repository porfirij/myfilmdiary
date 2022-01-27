import React, { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { auth, db } from '../../api/firebase';
import { ref, get, set } from "firebase/database";
import useInput from "../../hooks/use-input";
const modalElement = document.getElementById("modal");

function AddFilmModal({ filmID, onClose }) {
    const [status, setStatus] = useState("waiting");
    const [film, setFilm] = useState({});
    const { value: dateValue, hasError: dateError, isValid: dateIsValid, valueHandler: dateValueHandler, blurHandler: dateBlurHandler } = useInput("date");

    const getFilmInfo = useCallback(async () => {
        setStatus("loading");
        try {
            const response = await fetch(`https://www.omdbapi.com/?i=${filmID}&apikey=832f4c1e`);
            const film = await response.json();
            setFilm(film);
        } catch (error) {
            console.error(error.message);
        }
        setStatus("waiting");
    }, []);

    const addNewFilmHandler = async () => {
        if (dateError) return;
        setStatus("loading");
        try {
            const snapshot = await get(ref(db, `users/${auth.currentUser.uid}/${filmID}`));
            if (snapshot.exists()) {
                setStatus("alreadyadded");
            } else {
                await set(ref(db, `users/${auth.currentUser.uid}/${filmID}`), { Title: film.Title, ImdbID: film.imdbID, WatchedDate: dateValue, Poster: film.Poster, Type: film.Type, Year: film.Year });
                setStatus("success");
            }
        } catch (error) {
            console.error(error.message);
            setStatus("error");
        }
    }

    useEffect(() => {
        if (filmID) { getFilmInfo(); }
    }, [getFilmInfo]);

    let addContent = "";

    switch (status) {
        case "success":
            addContent = <>Film succcessfully added to your watchlist.</>;
            break;
        case "alreadyadded":
            addContent = <>Film already added.</>;
            break;
        case "error":
            addContent = <>Server error, please try again later.</>;
            break;
        case "loading":
            addContent = <>Adding...</>;
            break;
        default:
            addContent = <button type="button" className="px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out" data-bs-dismiss="modal" onClick={addNewFilmHandler} disabled={!dateIsValid}>Add Film</button>;
    }

    return (
        createPortal(
            <div className="flex justify-center items-center bg-gray-600 bg-opacity-50 modal fade fixed top-0 left-0 w-full h-full outline-none overflow-x-hidden overflow-y-auto"
                id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog relative w-96 pointer-events-none">
                    <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
                        <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                            <h5 className="text-xl font-medium leading-normal text-gray-800" id="exampleModalLabel">{film.Title}</h5>
                            <button type="button" className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                                data-bs-dismiss="modal" aria-label="Close" onClick={onClose}>X</button>
                        </div>
                        <div className="modal-body relative p-4">
                            {film.Plot}
                        </div>
                        <div className="flex items-center justify-center">
                            <div className="datepicker relative form-floating mb-3 xl:w-96">
                                <input type="text"
                                    name="date"
                                    onChange={dateValueHandler} onBlur={dateBlurHandler}
                                    className={"form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" + (dateError ? ' bg-red-200' : '')}
                                    placeholder="Select a date" />
                                <label htmlFor="floatingInput" className="text-gray-700">Select a date</label>
                            </div>
                        </div>
                        <div
                            className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">

                            {addContent}

                            <button type="button" className="ml-2 px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out" data-bs-dismiss="modal" onClick={onClose}>Close</button>

                        </div>
                    </div>
                </div>
            </div>, modalElement)
    )
}

export default AddFilmModal;