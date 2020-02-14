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
import { Redirect } from 'react-router-dom';
import { auth, me, signUpWithGoogle } from '../store/user';
import { connect } from 'react-redux';
import { logoFacebook, logoGoogleplus } from 'ionicons/icons';
import googleClientId from '../store/secrets';
import GoogleLogin, { GoogleLogout } from 'react-google-login';
import SignUpZero from './SignUp0';
import FacebookLogin from 'react-facebook-login';

interface IMyComponentState {
  email: string;
  password: string;
  isActive: boolean;
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
    this.state = {
      email: '',
      password: '',
      isActive: true,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSuccess = this.handleSuccess.bind(this);
  }

  async componentDidMount() {
    window.localStorage.clear();
    window.sessionStorage.clear();
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
    console.log('isActive', this.state.isActive);
  }
  async handleSuccess(response) {
    await this.props.signUpWithGoogle(response);
    if (window.localStorage.getItem('loginSuccess')) {
      await this.setState({
        isActive: true,
      });
    }
    console.log('isActive', this.state.isActive);
  }
  render() {
    const responseFacebook = response => {
      console.log(response);
    };
    const { error } = this.props;

    return (
      <IonPage>
        <IonHeader>
          <IonToolbar id="bar">
            <IonTitle>Log in</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent>
          <IonCard className="welcome-card">
            <form
              onSubmit={async event => {
                await this.handleSubmit(event);
              }}
            >
              <IonItem lines="inset">
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

              <IonItem lines="inset">
                <IonLabel>Password</IonLabel>
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

              <br></br>
              <IonItem
                lines="none"
                routerLink={this.state.isActive ? '/profile' : undefined}
              >
                <IonCardHeader>
                  <IonButton
                    type="submit"
                    style={{ width: '270px', height: '38px' }}
                    disabled={
                      this.state.email.length === 0 ||
                      this.state.password.length === 0
                    }
                    color="tertiary"
                  >
                    Login
                  </IonButton>
                </IonCardHeader>
              </IonItem>
            </form>
            <div className="profile">
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <IonTitle>Not a member yet?</IonTitle>
              <br></br>

              <IonButton
                href="/signup0"
                style={{ width: '270px', margin: '10px' }}
                color="tertiary"
              >
                Sign up
              </IonButton>
              <GoogleLogin
                clientId={googleClientId}
                buttonText="LOGIN WITH GOOGLE"
                uxMode="popup"
                onSuccess={this.handleSuccess}
                // // onRequest={this.props.signUpWithGoogle}

                redirectUri="http://localhost:8100/signup0"
                render={renderProps => (
                  // <GoogleLogin
                  //   clientId={googleClientId}
                  //   buttonText="LOGIN WITH GOOGLE"
                  //   uxMode="redirect"
                  //   onSuccess={() => this.props.signUpWithGoogle}
                  //   isSignedIn
                  //   onFailure={() => {
                  //     console.log('not logged in');
                  //   }}
                  //   redirectUri="http://localhost:8100/signup0"
                  // />

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
                  console.log('not logged in');
                }}
              />
              {/* <GoogleLogout
                clientId={googleClientId}
                buttonText="Logout"
                onLogoutSuccess={() => {
                  console.log('not logged in');
                }}
              ></GoogleLogout> */}
              <IonButton style={{ width: '270px', margin: '10px' }}>
                <IonIcon icon={logoFacebook} />
                Sign up with Facebook
              </IonButton>
              {/* <IonButton
                onClick={() => (
                  <FacebookLogin
                    appId="184531429467701"
                    autoLoad={true}
                    fields="name,email,picture"
                    // onClick={responseFacebook}
                    callback={responseFacebook}
                    redirectUri="http://localhost:8100/signup0"
                    render={renderProps => (
                      <IonButton
                        style={{ width: '270px', margin: '10px' }}
                        onClick={renderProps.onClick}
                      >
                        <IonIcon icon={logoFacebook} />
                        Sign up with Facebook
                      </IonButton>
                    )}
                  />
                )}
              ></IonButton> */}
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
