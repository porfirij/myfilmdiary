import React, { useContext } from 'react';
import { createPortal } from 'react-dom';
import AuthContext from "./../../store/auth-context";
const modalElement = document.getElementById("modal");

function Modal({ onClose }) {
    const { modal, modalHandler } = useContext(AuthContext);

    // const color = variant || "red";
    // let style = `bg-${color}-100 border border-${color}-400 text-${color}-700 px-4 py-3 relative`;

    if (!modal.isOn) return "";

    return (
        createPortal(
            <div className="flex justify-center items-center bg-gray-600 bg-opacity-50 modal fade fixed top-0 left-0 w-full h-full outline-none overflow-x-hidden overflow-y-auto"
                id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" onClick={() => modalHandler({ isOn: false })}>
                <div className="modal-dialog relative w-80 pointer-events-none">
                    <div
                        className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded outline-none text-current">
                        <div
                            className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                            <h5 className="text-xl font-medium leading-normal text-gray-800" id="exampleModalLabel">{modal.title}</h5>
                            <button type="button"
                                className="btn-close box-content w-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                                data-bs-dismiss="modal" aria-label="Close" onClick={onClose}>X</button>
                        </div>
                        <div className="modal-body relative p-4">
                            {modal.message}
                        </div>
                        <div
                            className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
                            <button type="button" className="px-6
          py-2.5
          bg-purple-600
          text-white
          font-medium
          text-xs
          leading-tight
          uppercase
          rounded
          shadow-md
          hover:bg-purple-700 hover:shadow-lg
          focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0
          active:bg-purple-800 active:shadow-lg
          transition
          duration-150
          ease-in-out" data-bs-dismiss="modal" onClick={onClose}>Close</button>
                        </div>
                    </div>
                </div>
            </div>

            , modalElement)
    )
}

export default Modal;