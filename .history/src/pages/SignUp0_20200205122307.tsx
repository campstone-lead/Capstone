import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar,IonItem,IonButton,IonCardHeader } from '@ionic/react';
import './BookerSignup2.css'


 class SignUpZero extends React.Component {


  render() {
  return (

    <IonPage>
      <IonHeader >
        <IonToolbar id="bar" >
          <IonTitle>Sign up</IonTitle>
          {/* <IonSearchbar className="search" placeholder="Search for venue..."  color="red"/> */}
        </IonToolbar>
      </IonHeader>


    <IonContent>

      <div className="welcome-card" >
      <IonCardHeader className="signUpTitle">I am a ...</IonCardHeader>
        <IonItem lines="none">
        <IonButton href="/signup/booker/1" className="signUpItems"
        color="tertiary">Booker</IonButton>
        <IonButton href="/infoform"className="signUpItems"
        color="tertiary">Artist</IonButton>
        </IonItem>

      </div>
      </IonContent>
    </IonPage>
  )
  }
};

export default SignUpZero;
