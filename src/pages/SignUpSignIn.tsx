import React from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonItem,
  IonInput,
  IonLabel,
  IonButton,
  IonCard,
  IonCardHeader,
} from '@ionic/react';
import './Tab1.css';
import { auth, me, signUpWithGoogle } from '../store/user';
import { connect } from 'react-redux';
import { logoGoogleplus } from 'ionicons/icons';
import GoogleLogin from 'react-google-login';


const prodRedirectURL = (process.env.NODE_ENV === 'production' ? 'https://harmonious-capstone.herokuapp.com/signup0/' : 'http://localhost:8100/signup0/')

interface IMyComponentState {
  email: string;
  password: string;
  isActive: boolean;
  googleClientId: string;
}
interface IMyComponentProps {
  auth: any;
  error: any;
  user: object;
  me: any;
  signUpWithGoogle: any;
}
class SignUpSignIn extends React.Component<
  IMyComponentProps,
  IMyComponentState
  > {
  constructor(props) {
    super(props);
    // getImport()
    this.state = {
      email: '',
      password: '',
      isActive: true,
      googleClientId: '306818867974-6ea8pgimounfq83vidnlafnmb1trj1ug.apps.googleusercontent.com'
      // googleClientId: (process.env.NODE_ENV === 'production' ? process.env.GOOGLE_CLIENT_ID : googleClientId) || ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSuccess = this.handleSuccess.bind(this);
  }

  async componentDidMount() {

    window.localStorage.clear();
    window.sessionStorage.clear();
    // this.setState({
    //   googleClientId: (process.env.NODE_ENV === 'production' ? process.env.GOOGLE_CLIENT_ID : googleClientId) || ''
    // })
    await this.props.me();
  }
  async handleSubmit(event) {
    event.preventDefault();
    await this.props.auth(this.state.email, this.state.password);
    if (window.localStorage.getItem('loginSuccess')) {
      await this.setState({
        isActive: true,
      });
    }
    window.localStorage.clear();
    await this.setState({
      email: '',
      password: '',
    });
  }
  async handleSuccess(response) {
    await this.props.signUpWithGoogle(response);
    if (window.localStorage.getItem('loginSuccess')) {
      await this.setState({
        isActive: true,
      });
    }
  }
  render() {

    const { error } = this.props;

    return (
      <IonPage>
        <IonHeader>
          <IonToolbar mode="ios" style={{ '--background': "#fcbcdb" }}>
            <div className="tabHeader" >
              <img
                src="https://www.freepnglogos.com/uploads/music-logo-black-and-white-png-21.png"
                alt="logo.png"
                className="logo"
              />
              <h3 style={{ textAlign: "center" }}>
                Log In
              </h3>
            </div>
          </IonToolbar>
        </IonHeader>

        <IonContent
          style={{
            '--background': 'linear-gradient(to right, #000000, #434343)',
            color: 'white',
          }}
        >
          <IonCard
            style={{
              '--background': 'none',
            }}
            className="welcome-card"
          >
            <form
              onSubmit={async event => {
                await this.handleSubmit(event);
              }}
            >
              <IonItem
                color="warning"
                lines="inset"
                style={{
                  '--background': 'none',
                  color: 'white',
                }}
              >
                <IonLabel>Email</IonLabel>
                <IonInput
                  type="email"
                  placeholder="       user@email.com"
                  required
                  value={this.state.email}
                  onIonChange={e =>
                    this.setState({
                      email: (e.target as HTMLInputElement).value,
                    })
                  }
                />
              </IonItem>

              <IonItem
                lines="inset"
                style={{
                  '--background': 'none',
                  color: 'white',
                }}
                color="warning"
              >
                <IonLabel
                  style={{
                    '--background': 'none',
                    color: 'white',
                  }}
                >
                  Password
                </IonLabel>
                <IonInput
                  type="password"
                  placeholder=" *******"
                  required
                  value={this.state.password}
                  onIonChange={e =>
                    this.setState({
                      password: (e.target as HTMLInputElement).value,
                    })
                  }
                />
              </IonItem>

              {error && error.response && (
                <IonCardHeader> {error.response.data} </IonCardHeader>
              )}

              <IonCardHeader className="profile">
                <IonButton
                  type="submit"
                  style={{ width: '270px', height: '38px' }}
                  disabled={
                    this.state.email.length === 0 ||
                    this.state.password.length === 0
                  }
                  routerLink={this.state.isActive ? '/profile' : undefined}
                  color="tertiary"
                >
                  Login
                </IonButton>

                <GoogleLogin
                  clientId={this.state.googleClientId}
                  buttonText="LOGIN WITH GOOGLE"
                  uxMode="popup"
                  onSuccess={this.handleSuccess}
                  redirectUri={prodRedirectURL}
                  render={renderProps => (
                    <IonButton
                      routerLink="/signup0"
                      style={{ width: '270px', margin: '10px' }}
                      color="danger"
                      onClick={renderProps.onClick}
                    >
                      <IonIcon icon={logoGoogleplus} />
                      Continue with Google
                  </IonButton>
                  )}
                  onFailure={() => {

                  }}
                />

              </IonCardHeader>
            </form>
            <div className="profile">
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <IonTitle
                style={{
                  '--background': 'none',
                  color: 'white',
                }}
              >
                Not a member yet?
              </IonTitle>
              <br></br>

              <IonButton
                href="/signup0"
                style={{ width: '270px', margin: '10px' }}
                color="tertiary"
              >
                Sign up
              </IonButton>
              <GoogleLogin
                clientId={this.state.googleClientId}
                buttonText="LOGIN WITH GOOGLE"
                uxMode="popup"
                onSuccess={this.handleSuccess}
                redirectUri={prodRedirectURL}
                render={renderProps => (
                  <IonButton
                    routerLink="/signup0"
                    style={{ width: '270px', margin: '10px' }}
                    color="danger"
                    onClick={renderProps.onClick}
                  >
                    <IonIcon icon={logoGoogleplus} />
                    Sign up with Google
                  </IonButton>
                )}
                onFailure={() => {

                }}
              />
            </div>
          </IonCard>
        </IonContent>
      </IonPage>
    );
  }
}
const mapStateToProps = state => ({
  error: state.user.error,
  user: state.user,
});
const mapDispatchToProps = dispatch => ({
  auth: (email, password) => dispatch(auth(email, password)),
  me: () => dispatch(me()),
  signUpWithGoogle: response => dispatch(signUpWithGoogle(response)),
});
export default connect(mapStateToProps, mapDispatchToProps)(SignUpSignIn);
