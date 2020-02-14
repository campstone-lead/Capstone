import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonInput,
  IonButton,
  IonIcon,
} from '@ionic/react';
import React from 'react';
import '../../Tab1.css';
import { connect } from 'react-redux';
import { auth, authWithGoogle } from '../../../store/user';
import { updatedArtist, signUpArtistWithGoogle } from '../../../store/artist';
import { lock, call } from 'ionicons/icons';

interface IMyComponentState {
  isGoogleOauth: boolean;
  password: string;
  phone: string;
}

interface IMyComponentProps {
  // putType: (artistType: any) => void,
  updateArtist: any;
  auth: any;
  signUpArtistWithGoogle: any;
  authWithGoogle: any;
}

class ArtistPassword extends React.Component<
  IMyComponentProps,
  IMyComponentState
> {
  constructor(props) {
    super(props);
    this.state = {
      isGoogleOauth: false,
      phone: '',
      password: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    let artistGoogle = window.localStorage.getItem('google');
    if (artistGoogle !== null) {
      this.setState({
        isGoogleOauth: true,
      });
    }
  }
  async handleSubmit(event) {
    event.preventDefault();
    if (this.state.isGoogleOauth) {
      await this.props.signUpArtistWithGoogle({ phone: this.state.phone });
      await this.props.authWithGoogle(
        JSON.parse(window.localStorage.getItem('googleId') || '')
      );
    } else {
      await this.props.updateArtist({ password: this.state.password });
      await this.props.auth(
        JSON.parse(window.localStorage.getItem('email') || ''),
        this.state.password
      );
    }
    window.localStorage.clear();
  }
  render() {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar id="bar">
            <IonTitle>Personal information</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent>
          {this.state.isGoogleOauth ? (
            <div className="welcome-card">
              <form onSubmit={this.handleSubmit}>
                <IonTitle>Add a phone number</IonTitle>

                <IonItem lines="inset">
                  <IonIcon slot="start" color="medium" icon={call} />
                  <IonInput
                    type="number"
                    placeholder="Phone"
                    required
                    value={this.state.phone}
                    onIonChange={e =>
                      this.setState({
                        phone: (e.target as HTMLInputElement).value,
                      })
                    }
                  />
                </IonItem>

                <div style={{ margin: '10px' }}>
                  <IonItem lines="none">
                    <br></br>

                    <IonButton
                      type="submit"
                      disabled={
                        this.state.password.length === 0 &&
                        this.state.phone.length === 0
                          ? true
                          : false
                      }
                      routerLink="/home"
                      size="default"
                    >
                      Done
                    </IonButton>
                  </IonItem>
                </div>
              </form>
            </div>
          ) : (
            <div className="welcome-card">
              <form onSubmit={this.handleSubmit}>
                <IonTitle>Let's add a password...</IonTitle>

                <IonItem lines="inset">
                  <IonIcon slot="start" color="medium" icon={lock} />
                  <IonInput
                    type="password"
                    placeholder="Password"
                    required
                    value={this.state.password}
                    onIonChange={e =>
                      this.setState({
                        password: (e.target as HTMLInputElement).value,
                      })
                    }
                  />
                </IonItem>

                <div style={{ margin: '10px' }}>
                  <IonItem lines="none">
                    <br></br>

                    <IonButton
                      type="submit"
                      disabled={
                        this.state.password.length === 0 &&
                        this.state.phone.length === 0
                          ? true
                          : false
                      }
                      routerLink="/home"
                      size="default"
                    >
                      Done
                    </IonButton>
                  </IonItem>
                </div>
              </form>
            </div>
          )}
        </IonContent>
      </IonPage>
    );
  }
}

// const mapStateToProps = (state) => ({
//   email: state.artist.email
// })

const mapDispatchToProps = dispatch => ({
  updateArtist: artistInfo => dispatch(updatedArtist(artistInfo)),

  signUpArtistWithGoogle: artistInfo =>
    dispatch(signUpArtistWithGoogle(artistInfo)),
  auth: (email, password) => dispatch(auth(email, password)),
  authWithGoogle: email => dispatch(authWithGoogle(email)),
});

export default connect(null, mapDispatchToProps)(ArtistPassword);
