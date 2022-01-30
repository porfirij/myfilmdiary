import React, { useContext } from 'react';
import { Route, Routes } from "react-router-dom";
import AuthContext from "./store/auth-context";
import Layout from './components/ui/Layout';
import Home from './components/pages/Home';
import MyMovies from './components/pages/MyMovies';
import Login from './components/pages/Login/Login';
import Sendpasswordreset from './components/pages/Login/Sendpasswordreset';
import Resetpassword from './components/pages/Login/Resetpassword';
import Signup from './components/pages/Signup/Signup';
import NotFound from './components/pages/NotFound';
import Modal from "./components/ui/Modal";
import Protected from './components/ui/Protected';
import Loading from './components/ui/Loading';
import Sendemailverification from './components/pages/Signup/Sendemailverification';
import SearchMovie from './components/pages/Addmovie/SearchMovie';

function App() {
  const { isLoading, isInit } = useContext(AuthContext);

  // if (modal.isOn) {
  //   modalContent = <Modal onClose={modalHandler.bind(null, { isOn: false })} variant={modal.variant} title={modal.title}>{modal.message}</Modal>;
  // }

  if (isInit) return <Loading />;

  return (
    <>
      {/* {modalContent} */}
      <Modal />
      {isLoading && <Loading />}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="mymovies" element={<Protected><MyMovies /></Protected>} />
          <Route path="search" element={<Protected><SearchMovie /></Protected>} />
          <Route path="login" element={<Login />} />
          <Route path="sendpasswordreset" element={<Sendpasswordreset />} />
          <Route path="resetpassword" element={<Resetpassword />} />
          <Route path="signup" element={<Signup />} />
          <Route path="sendemailverification" element={<Protected><Sendemailverification /></Protected>} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  )
}

export default App;