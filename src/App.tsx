import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  Redirect,
  Route,
  React,
  IonReactRouter,
  home,
  contact,
  logOut,
  logIn,
  Tab1,
  Tab2,
  me,
  logout,
  PersonalInfo,
  ZipCodeForm,
  ArtistNameForm,
  ArtistBioForm,
  Genres,
  ArtistType,
  UploadPicture,
  ArtistPassword,
  SignUpSignIn,
  SignUpZero,
  BookerSignup1,
  BookerSignup2,
  BookerSignup3,
  BookerSignup4,
  BookerSignup5,
  BookerSignup6,
  BookerSignup7,
  AllArtistView,
  ArtistSinglePage,
  VenueForm,
  EventForm,
  EventSinglePage,
  Profile,
  Filter,
  SearchBar,
  connect,
  Tab3,
  Tab4,
  AllVenuesView,
  NotificationWall
} from './AppImports';
import VenueSinglePage from './pages/VenueSinglePage';
import { notifications } from 'ionicons/icons';
interface IMyComponentProps {
  user: object;
  userId: Number;
  me: any;
  history: any;
  logout: any;
}
interface IMyComponentState {
  loaded: boolean;
}
class App extends React.Component<IMyComponentProps, IMyComponentState> {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    };
  }

  async componentDidMount() {
    await this.props.me();

    this.setState({ loaded: true });
  }

  render() {
    return (
      <IonApp>
        <IonReactRouter>
          <IonTabs>
            <IonRouterOutlet>
              <Route path="/home" component={Tab1} exact={true} />
              <Route path="/tab2" component={Tab2} exact={true} />
              <Route path="/tab3" component={Tab3} exact={true} />
              <Route path="/tab4" component={Tab4} exact={true} />
              <Route path="/notifications" component={NotificationWall} />

              <Route path="/profile" component={Profile} />
              <Route path="/login" component={SignUpSignIn} />
              <Route path="/signup0" component={SignUpZero} />
              <Route path="/signup/booker/1" component={BookerSignup1} />
              <Route path="/signup/booker/2" component={BookerSignup2} />
              <Route path="/signup/booker/3" component={BookerSignup3} />
              <Route path="/signup/booker/4" component={BookerSignup4} />
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
              <Route path="/addevent" component={EventForm} />
              <Route path="/uploadpicture" component={UploadPicture} />
              <Route path="/filter" component={Filter} />
              <Route path="/searchbar" component={SearchBar} />
              <Route path="/artists" component={AllArtistView} />
              <Route path="/artistpassword" component={ArtistPassword} />
              <Route path="/artists" component={AllArtistView} />
              <Route path="/venues" component={AllVenuesView} />

              <Route
                path="/allArtists/:artistId"
                component={ArtistSinglePage}
              />
              <Route path="/allVenues/:id" component={VenueSinglePage} />
              <Route path="/events/:id" component={EventSinglePage} />
              <Route
                path="/"
                render={() => <Redirect to="/home" />}
                exact={true}
              />
            </IonRouterOutlet>
            <IonTabBar
              slot="bottom"
            >
              <IonTabButton tab="tab1" href="/home">
                <IonIcon icon={home} />
                <IonLabel>Home</IonLabel>
              </IonTabButton>

              <IonTabButton
                tab="tab2"
                href="/profile"
                disabled={this.props.userId !== undefined ? false : true}
              >
                {this.props.userId !== undefined ? (
                  <IonIcon icon={contact} />
                ) : null}
                <IonLabel>
                  {this.props.userId !== undefined ? 'Profile' : ''}
                </IonLabel>
              </IonTabButton>

              <IonTabButton tab="tab4" href="/notifications"
                disabled={this.props.userId !== undefined ? false : true}
              >
                {this.props.userId !== undefined ? (
                  <IonIcon icon={notifications} />
                ) : null}
                <IonLabel> {this.props.userId === undefined ? '' : 'Notifications'}</IonLabel>
              </IonTabButton>

              {this.props.userId !== undefined ? (
                <IonTabButton tab="tab3" onClick={this.props.logout}>
                  <IonIcon icon={logOut} />
                  <IonLabel>Logout</IonLabel>
                </IonTabButton>
              ) : null}

              {this.props.userId === undefined ? (
                <IonTabButton tab="tab3" href="/login">
                  {this.props.userId === undefined ? (
                    <IonIcon icon={logIn} />
                  ) : null}
                  <IonLabel>
                    {this.props.userId === undefined ? 'Log In' : ''}
                  </IonLabel>
                </IonTabButton>
              ) : null}




            </IonTabBar>
          </IonTabs>
        </IonReactRouter>
      </IonApp>
    );
  }
}
const mapStateToProps = state => ({
  user: state.user,
  userId: state.user.id,
});
const mapDispatchToProps = dispatch => ({
  me: () => dispatch(me()),
  logout: () => dispatch(logout()),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
