import React, { useEffect, useState, useContext, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { auth, db } from '../../api/firebase';
import { ref, query, limitToLast, get } from "firebase/database";
import AuthContext from '../../store/auth-context';
import MovieCard from '../ui/MovieCard';

function MyMovies() {
    const { isLoading, loadingHandler, modalHandler } = useContext(AuthContext);
    const [movies, setMovies] = useState([]);
    const [refresh, setRefresh] = useState(false);
    let movieContent = <><h2>No movies yet.</h2><Link to="/search">Why not add one?</Link></>;

    const fetchData = useCallback(async () => {
        const lastRef = query(ref(db, `users/${auth.currentUser.uid}`), limitToLast(50));
        let fetchedMovies = [];
        loadingHandler(true);
        try {
            const snapshot = await get(lastRef);
            snapshot.forEach(childSnapshot => {
                const key = childSnapshot.key;
                const data = childSnapshot.val();
                fetchedMovies.push({ id: key, ...data });
            });
        } catch (error) {
            modalHandler({ isOn: true, variant: "red", title: "Error", message: error.message });
            movieContent = <h2>{error.message}</h2>;
        }
        loadingHandler(false);
        setMovies(fetchedMovies);
    }, [loadingHandler, modalHandler]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    useEffect(() => {
        if (refresh) fetchData();
        setRefresh(false);
    }, [refresh]);

    const refreshOn = () => {
        setRefresh(true);
    }

    if (movies.length) movieContent = movies.map((movie) => <MovieCard key={movie.imdbID} movie={movie} action="delete" refreshOn={refreshOn}></MovieCard>);

    return (
        <div className="flex flex-row flex-wrap w-full justify-center">
            {!isLoading && movieContent}
        </div>
    )
}

export default MyMovies;

    // const removeFilmHandler = async (id) => {
    //     try {
    //         const snapshot = await get(ref(db, `users/${auth.currentUser.uid}/${id}`));
    //         if (snapshot.exists()) {
    //             await remove(ref(db, `users/${auth.currentUser.uid}/${id}`));
    //             modalHandler({ isOn: true, variant: "green", title: "Success", message: "Film successfully removed." });
    //             fetchData();
    //         } else {
    //             modalHandler({ isOn: true, variant: "red", title: "Error", message: "Film is not added." });
    //         }
    //     } catch (error) {
    //         modalHandler({ isOn: true, variant: "red", title: "Error", message: error.message });
    //     }
    // }


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