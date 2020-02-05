import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { home, contact, logOut, logIn } from 'ionicons/icons';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import PersonalInfo from './pages/Artist/Signup/PersonalInfo';
import ZipCodeForm from './pages/Artist/Signup/ZipCodeForm';
import ArtistNameForm from './pages/Artist/Signup/ArtistNameForm';
import ArtistBioForm from './pages/Artist/Signup/ArtistBioForm';
import Genres from './pages/Artist/Signup/Genres';
import ArtistType from './pages/Artist/Signup/ArtistType';
import UploadPicture from './pages/Artist/Signup/UploadPicture';
import SignUpSignIn from './pages/SignUpSignIn';
import SignUpZero from './pages/SignUp0';
import BookerSignup2 from './pages/BookerSignup2'
import BookerSignup1 from './pages/BookerSignup1'
import BookerSignup4 from './pages/BookerSignup4'
import BookerSignup3 from './pages/BookerSignup3';
import BookerSignup5 from './pages/BookerSignup5';
import BookerSignup7 from './pages/BookerSignup7';
import BookerSignup6 from './pages/BookerSignup6';
import VenueForm from './pages/booker/venue/add-venue-form'
import Profile from './pages/Profile';
import { connect } from 'react-redux'
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';
import { me, logout } from './store/user'
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
import history from './history'
/* Theme variables */
import './theme/variables.css';
import { render } from '@testing-library/react';
import Tab3 from './pages/Tab3'
interface IMyComponentProps {
  user: object,
  userId: Number,
  me: any,
  history: any,
  logout: any
}
interface IMyComponentState {
  loaded: boolean
}
class App extends React.Component<IMyComponentProps, IMyComponentState>{

  constructor(props) {
    super(props)
    this.state = {
      loaded: false
    }
  }

  async componentDidMount() {
    await this.props.me();

    this.setState({ loaded: true })

  }

  render() {
    return (
      <IonApp>
        <IonReactRouter>
          <IonTabs>
            <IonRouterOutlet>

              <Route path="/home" component={Tab1} exact={true} />
              <Route path="/tab2" component={Tab2} />
              <Route path="/tab3" component={Tab3} />
              <Route path='/profile' component={Profile} />
              <Route path="/login" component={SignUpSignIn} />
              <Route path="/signup0" component={SignUpZero} />
              <Route path="/signup/booker/2" component={BookerSignup2} />
              <Route path="/signup/booker/1" component={BookerSignup1} />
              <Route path="/signup/booker/4" component={BookerSignup4} />
              <Route path="/signup/booker/3" component={BookerSignup3} />
              <Route path="/signup/booker/5" component={BookerSignup5} />
              <Route path="/signup/booker/6" component={BookerSignup6} />
              <Route path="/signup/booker/7" component={BookerSignup7} />
              <Route path="/infoform" component={PersonalInfo} />
              <Route path="/artistnameform" component={ArtistNameForm} />
              <Route path="/artistbioform" component={ArtistBioForm} />
              <Route path="/zipcodeform" component={ZipCodeForm} />
              <Route path="/genres" component={Genres} />
              <Route path="/artisttype" component={ArtistType} />
              <Route path="/addvenue" component={VenueForm} />
              <Route path="/uploadpicture" component={UploadPicture} />
              <Route path="/" render={() => <Redirect to="/home" />} exact={true} />
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
              <IonTabButton tab="tab1" href="/home">
                <IonIcon icon={home} />
                <IonLabel>Home</IonLabel>
              </IonTabButton>




              <IonTabButton tab="tab3" href='/profile'
                disabled={(this.props.userId !== undefined) ? false : true}
              >
                {(this.props.userId !== undefined) ? <IonIcon icon={contact} /> : null}
                <IonLabel>{(this.props.userId !== undefined) ? 'Profile' : ''}</IonLabel>
              </IonTabButton>



              {(this.props.userId !== undefined) ? <IonTabButton tab="tab2" onClick={this.props.logout}>
                <IonIcon icon={logOut} />
                <IonLabel>Logout</IonLabel>
              </IonTabButton> : null}


              {(this.props.userId === undefined) ? <IonTabButton tab="tab2" href='/login'>
                {(this.props.userId === undefined) ? <IonIcon icon={logIn} /> : null}
                <IonLabel>{(this.props.userId === undefined) ? 'Log In' : ''}</IonLabel>
              </IonTabButton> : null
              }





            </IonTabBar>
          </IonTabs>
        </IonReactRouter>
      </IonApp>)
  }
}
const mapStateToProps = (state) => ({
  user: state.user,
  userId: state.user.id
})
const mapDispatchToProps = (dispatch) => ({
  me: () => dispatch(me()),
  logout: () => dispatch(logout())
})
export default connect(mapStateToProps, mapDispatchToProps)(App);
