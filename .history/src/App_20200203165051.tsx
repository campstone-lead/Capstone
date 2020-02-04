import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { apps,home,contact } from 'ionicons/icons';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Login from './pages/LoginTemplate';
import PersonalInfo from './pages/Artist/Signup/PersonalInfo';
import ZipCodeForm from './pages/Artist/Signup/ZipCodeForm';
import ArtistNameForm from './pages/Artist/Signup/ArtistNameForm';
import Genres from './pages/Artist/Signup/Genres';
import ArtistType from './pages/Artist/Signup/ArtistType'
import Details from './pages/Details';
import SignUpSignIn from './pages/SignUpSignIn';
import SignUpZero from './pages/SignUp0';
import BookerSignup2 from './pages/BookerSignup2'
import BookerSignup1 from './pages/BookerSignup1'
import BookerSignup4 from './pages/BookerSignup4'
import BookerSignup3 from './pages/BookerSignup3';
import BookerSignup5 from './pages/BookerSignup5';
import Profile from './pages/Profile';

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

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route path="/home" component={Tab1} exact={true} />
          <Route path="/tab2" component={Tab2} exact={true} />
          <Route path="/tab2/details" component={Details} />
          {/* <Route path="/profile" component={Login} /> */}
          <Route path="/login" component={SignUpSignIn} />
          <Route path="/signup0" component={SignUpZero} />
          <Route path="/signup/booker/2" component={BookerSignup2} />
          <Route path="/signup/booker/1" component={BookerSignup1} />
          <Route path="/signup/booker/4" component={BookerSignup4} />
          <Route path="/signup/booker/3" component={BookerSignup3} />
          <Route path="/signup/booker/5" component={BookerSignup5} />
          <Route path="/infoform" component={PersonalInfo} />
          <Route path="/artistnameform" component={ArtistNameForm} />
          <Route path='/profile' component={Profile}/>
          <Route path="/zipcodeform" component={ZipCodeForm}/>
          <Route path="/genres" component={Genres}/>
          <Route path="/artisttype" component={ArtistType}/>
          <Route path="/" render={() => <Redirect to="/home" />} exact={true} />
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="tab1" href="/home">
            <IonIcon icon={home} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab2" href="/tab2">
            <IonIcon icon={apps} />
            <IonLabel>Tab Two</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab3" href={(window.sessionStorage.getItem('session')===null)?'/login':'/profile'}>
            <IonIcon icon={contact} />
            <IonLabel>{(window.sessionStorage.getItem('session')===null)?'  Log In':'Profile'}</IonLabel>
          </IonTabButton>
          {(window.sessionStorage.getItem('session')!==null)? <IonTabButton tab="tab2" href="/tab2">
            <IonIcon icon={apps} />
            <IonLabel>Logout</IonLabel>
          </IonTabButton>:null}
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
