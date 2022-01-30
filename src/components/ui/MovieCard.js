import React, { useState } from "react";
import AddMovieModal from "./AddMovieModal";
import DeleteMovieModal from "./DeleteMovieModal";

function MovieCard({ movie, action, refreshOn = null }) {
    const { Title, Year, Poster, Type, imdbID, WatchedDate } = movie;
    const [movieModal, setMovieModal] = useState({ add: false, delete: false });

    const addMovieModal = () => {
        setMovieModal({ add: true, delete: false });
    }

    const deleteMovieModal = () => {
        setMovieModal({ add: false, delete: true });
    }

    const closeMovieModal = () => {
        setMovieModal({ add: false, delete: false });
        if (refreshOn) refreshOn();
    }

    let actionContent = "";

    switch (action) {
        case "add":
            actionContent = <svg className="h-6 w-6 text-green-500 hover:cursor-pointer hover:text-green-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" onClick={addMovieModal}><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" /></svg>;
            break;
        case "delete":
            actionContent = <svg className="h-6 w-6 text-red-500 hover:cursor-pointer hover:text-red-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" onClick={deleteMovieModal}><circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" /></svg>;
            break;
        default:
            actionContent = "";
    }

    return (
        <>
            {movieModal.add && <AddMovieModal movieID={imdbID} onClose={closeMovieModal} />}
            {movieModal.delete && <DeleteMovieModal movieID={imdbID} onClose={closeMovieModal} />}
            <div className="flex flex-row flex-start rounded w-11/12 sm:w-72 shadow bg-white my-2 mx-2">
                <div className="flex flex-row w-full items-start">
                    <img className="rounded object-scale-down w-20 m-2" src={Poster} alt="" />
                    <div className="pt-2 pl-2 pr-4 pb-4">
                        <h5 className="text-gray-900 text-xl font-medium mb-2 leading-tight">{Title}</h5>
                        <div className="flex flex-row flex-wrap justify-start items-start">
                            <p className="text-gray-700 text-sm bg-slate-200 p-1 mt-1 mr-1 rounded">
                                {Type}
                            </p>
                            <p className="text-gray-700 text-sm bg-slate-200 p-1 mt-1 mr-1 rounded">
                                {Year}
                            </p>
                            {WatchedDate && <p className="text-gray-700 text-sm bg-blue-200 p-1 mt-1 mr-1 rounded">
                                Watched: {WatchedDate}
                            </p>}
                        </div>
                    </div>
                </div>
                <div className="flex flex-row mt-2 mr-2 justify-end h-fit">
                    {actionContent}
                </div>
            </div>
        </>
    )
}

export default MovieCard;
