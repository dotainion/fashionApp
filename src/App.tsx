import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/profile';
import PasswordRecover from './pages/Recover';
import { routes } from './global/routes';
import AuthRouter from './authRoute';
import CheckOut from './pages/checkOut';


const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path={routes.recover} component={PasswordRecover} exact={true} />
        <Route path={routes.login} component={Login} exact={true} />
        <Route path={routes.register} component={Register} exact={true} />
        <Route path={routes.home} component={Home} exact={true} />
        <Route path={routes.checkout} render={() =><AuthRouter component={CheckOut}/>} exact={true} />
        <Route path={routes.profile} render={() =><AuthRouter component={Profile}/>} exact={true} />
        <Route render={()=><Redirect to={routes.home}/>}/>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
