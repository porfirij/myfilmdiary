import React from "react";

function Filmcard(props) {
    const { Title, Year, Poster, Type, ImdbID } = props.film;

    return (
        <div className="flex flex-col justify-between w-40 rounded shadow bg-white m-2">
            <img className="rounded-t" src={Poster} alt="" />
            <div className="p-4">
                <h5 className="text-gray-900 text-xl font-medium mb-2">{Title}</h5>
                <p className="text-gray-700 text-base mb-2">
                    {Year} / {Type}
                </p>
                {props.onAddNewFilm &&
                    <button onClick={(props.onAddNewFilm.bind(0, ImdbID))} type="button" className=" inline-block px-8 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Add to my diary</button>}

                {props.onDeleteFilm &&
                    <button onClick={(props.onDeleteFilm.bind(0, ImdbID))} type="button" className=" inline-block px-8 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out">Remove</button>}
            </div>
        </div>
    )
}

export default Filmcard;
