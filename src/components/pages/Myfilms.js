import React, { useEffect, useState, useContext, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { auth, db } from '../../api/firebase';
import { ref, query, limitToLast, remove, get } from "firebase/database";
import AuthContext from '../../store/auth-context';
import Filmcard from '../ui/Filmcard';

function Myfilms() {
    const { isLoading, loadingHandler, modalHandler } = useContext(AuthContext);
    const [films, setFilms] = useState([]);
    let filmContent = <><h2>No films yet.</h2><Link to="/addnewfilm">Why not add one?</Link></>;

    const fetchData = useCallback(async () => {
        const lastRef = query(ref(db, `users/${auth.currentUser.uid}`), limitToLast(4));
        let fetchedFilms = [];
        loadingHandler(true);
        try {
            const snapshot = await get(lastRef);
            snapshot.forEach(childSnapshot => {
                const key = childSnapshot.key;
                const data = childSnapshot.val();
                fetchedFilms.push({ id: key, ...data });
            });
        } catch (error) {
            modalHandler({ isOn: true, variant: "red", title: "Error", message: error.message });
            filmContent = <h2>{error.message}</h2>;
        }
        loadingHandler(false);
        setFilms(fetchedFilms);
    }, [loadingHandler, modalHandler]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const removeFilmHandler = async (id) => {
        try {
            const snapshot = await get(ref(db, `users/${auth.currentUser.uid}/${id}`));
            if (snapshot.exists()) {
                await remove(ref(db, `users/${auth.currentUser.uid}/${id}`));
                modalHandler({ isOn: true, variant: "green", title: "Success", message: "Film successfully removed." });
                fetchData();
            } else {
                modalHandler({ isOn: true, variant: "red", title: "Error", message: "Film is not added." });
            }
        } catch (error) {
            modalHandler({ isOn: true, variant: "red", title: "Error", message: error.message });
        }
    }

    if (films.length) filmContent = films.map((film) => <Filmcard key={film.ImdbID} film={film} onDeleteFilm={removeFilmHandler}></Filmcard>);

    return (
        <div className="flex flex-col">
            {!isLoading && filmContent}
        </div>
    )
}

export default Myfilms;

    // useEffect(() => {
    //     const onAuthUnsubscribe = onAuthStateChanged(auth, (user) => {
    //         console.log("onAuthStateChanged running");
    //         if (user) {
    //             setUserSignedIn({ isSignedIn: true, user: user });
    //             // User is signed in, see docs for a list of available properties
    //             // https://firebase.google.com/docs/reference/js/firebase.User
    //             //const uid = user.uid;
    //             if (!user.emailVerified) setError({ status: true, message: "Your e-mail address is not verified." });
    //         } else {
    //             setUserSignedIn({ isSignedIn: false, user: {} });
    //         }
    //     }, () => console.error("oasc error"), () => console.log("oasc removed"));

    //     // setTimeout(() => { unsubscribe(); console.log("unsubscribed") }, 8000);
    //     return onAuthUnsubscribe;
    // }, []);

    // useEffect(() => {
    //     let onValueUnsubscribe = () => undefined;
    //     if (auth.currentUser) {
    //         onValueUnsubscribe = onValue(ref(db, `users/${auth.currentUser.uid}`), (data) => console.log(data.val()), (error) => console.error(error.message));
    //         // setTimeout(() => { off(ref(db, `users/${auth.currentUser.uid}`)); console.log("unsubscribed") }, 8000);
    //     }
    //     return onValueUnsubscribe;
    // }, [auth.currentUser]);

    // const getData = () => {
    //     const lastRef = query(ref(db, `users/${auth.currentUser.uid}`), limitToLast(4));

    //     onValue(lastRef, (snapshot) => {
    //         snapshot.forEach((childSnapshot) => {
    //             const childKey = childSnapshot.key;
    //             const childData = childSnapshot.val();
    //             console.log(childKey);
    //             console.log(childData);
    //         });
    //     }, {
    //         onlyOnce: true
    //     });
    // }