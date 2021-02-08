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

/* Other variables */
import { routes } from './global/routes';

/* Pages variables */
import Home from './pages/Home';
import Login from './pages/authentication/Login';
import Register from './pages/authentication/Register';
import Profile from './pages/inventory';
import PasswordRecover from './pages/authentication/Recover';
import AuthRouter from './authRoute';
import CheckOut from './pages/checkOut';
import PendingOrder from './pages/pendingOrder';


const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path={routes.recover} component={PasswordRecover} exact={true} />
        <Route path={routes.login} component={Login} exact={true} />
        <Route path={routes.register} component={Register} exact={true} />
        <Route path={routes.home} component={Home} exact={true} />
        <Route path={routes.checkout} render={() =><AuthRouter component={CheckOut}/>} exact={true} />
        <Route path={routes.inventory} render={() =><AuthRouter component={Profile}/>} exact={true} />
        <Route path={routes.pendingorder} render={() =><AuthRouter component={PendingOrder}/>} exact={true} />
        <Route render={()=><Redirect to={routes.home}/>}/>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
