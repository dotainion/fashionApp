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
import './theme/custom.css';
import './theme/responsive.css';

/* Other variables */
import { routes } from './global/routes';

/* Pages variables */
import { Home } from './sales/Home';
import { ContextProvider } from './context/Context';
import { VenderStore } from './sales/VenderStore';
import { AddProducts } from './dashboard/AddProducts';
import { Analytics } from './dashboard/Analytics';
import { Products } from './dashboard/Products';
import { Orders } from './dashboard/Orders';
import { Inventory } from './dashboard/Inventory';
import AuthRouter from './authRoute';
import { SignIn } from './auth/SignIn';
import { Cart } from './sales/Cart';
import { Settings } from './dashboard/Settings';
import { ViewProduct } from './sales/ViewProduct';
import { Checkout } from './checkout/Checkout';
import { SignUp } from './auth/SignUp';



const App: React.FC = () => (
  <IonApp>
    <ContextProvider>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path={routes.home} component={Home} exact={true} />
          <Route path={routes.default} component={Home} exact={true} />
          <Route path={routes.cart} component={Cart} exact={true} />
          <Route path={routes.store+routes.param} component={VenderStore} exact={true} />
          <Route path={routes.viewProduct+routes.param} component={ViewProduct} exact={true} />
          <Route path={routes.addProducts} component={()=><AuthRouter Components={AddProducts}/>} exact={true} />
          <Route path={routes.analystics} component={()=><AuthRouter Components={Analytics}/>} exact={true} />
          <Route path={routes.orders} component={()=><AuthRouter Components={Orders}/>} exact={true} />
          <Route path={routes.products} component={()=><AuthRouter Components={Products}/>} exact={true} />
          <Route path={routes.inventory} component={()=><AuthRouter Components={Inventory}/>} exact={true} />
          <Route path={routes.settings} component={()=><AuthRouter Components={Settings}/>} exact={true} />
          <Route path={routes.signIn} component={SignIn} exact={true} />
          <Route path={routes.signUp} component={SignUp} exact={true} />
        </IonRouterOutlet>
      </IonReactRouter>
    </ContextProvider>
  </IonApp>
);

export default App;
