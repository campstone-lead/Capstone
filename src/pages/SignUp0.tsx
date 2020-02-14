import React from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonButton,
  IonCardHeader,
} from '@ionic/react';
import './booker/Signup/BookerSignup2.css';

interface IMyComponentState {
  isGoogleOauth: boolean;
}

class SignUpZero extends React.Component<{}, IMyComponentState> {
  constructor(props) {
    super(props);
    this.state = {
      isGoogleOauth: false,
    };
  }
  componentDidMount() {
    let google = window.localStorage.getItem('google');
    this.setState({
      isGoogleOauth: google ? true : false,
    });
  }

  render() {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar id="bar">
            <IonTitle>Sign up</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent>
          <div className="welcome-card">
            <IonCardHeader className="signUpTitle">I am a ...</IonCardHeader>
            <IonItem lines="none">
              <IonButton
                href={
                  this.state.isGoogleOauth
                    ? '/signup/booker/2'
                    : '/signup/booker/1'
                }
                className="signUpItems"
                color="tertiary"
              >
                Booker
              </IonButton>
              <IonButton
                href={
                  this.state.isGoogleOauth ? '/artistnameform' : '/infoform'
                }
                className="signUpItems"
                color="tertiary"
              >
                Artist
              </IonButton>
            </IonItem>
          </div>
        </IonContent>
      </IonPage>
    );
  }
}

export default SignUpZero;
