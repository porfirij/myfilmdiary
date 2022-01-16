import React, { useContext } from 'react';
import { Route, Routes } from "react-router-dom";
import AuthContext from "./store/auth-context";
import Layout from './components/ui/Layout';
import Home from './components/pages/Home';
import AddNewFilm from './components/pages/AddNewFilm';
import Myfilms from './components/pages/Myfilms';
import Login from './components/pages/Login/Login';
import Sendpasswordreset from './components/pages/Login/Sendpasswordreset';
import Resetpassword from './components/pages/Login/Resetpassword';
import Signup from './components/pages/Signup/Signup';
import NotFound from './components/pages/NotFound';
import Centered from './components/ui/Centered';
import Alert from "./components/ui/Alert";
// import Modal from "./components/ui/Modal";
import Protected from './components/ui/Protected';
import Loading from './components/ui/Loading';

function App() {
  const { isLoading, alerts, removeAlert } = useContext(AuthContext);

  const closeAlertHandler = (alertMessage) => {
    removeAlert(alertMessage);
  }

  let alertsContent = "";

  if (alerts.length > 0) {
    alertsContent = alerts.map((element, index) => <Alert key={index} onClose={closeAlertHandler.bind(null, element.message)} variant={element.variant}>{element.message}</Alert>);
  }

  // if (alerts.length > 0) {
  //   alertsContent = alerts.map((element, index) => <Modal key={index} onClose={closeAlertHandler.bind(null, element.message)} variant={element.variant}>{element.message}</Modal>);
  // }


  return (
    <>
      {isLoading && <Centered><Loading /></Centered>}
      {alertsContent}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="myfilms" element={<Protected><Myfilms /></Protected>} />
          <Route path="addnewfilm" element={<Protected><AddNewFilm /></Protected>} />
          <Route path="login" element={<Login />} />
          <Route path="sendpasswordreset" element={<Sendpasswordreset />} />
          <Route path="resetpassword" element={<Resetpassword />} />
          <Route path="signup" element={<Signup />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;