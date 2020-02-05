import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar,IonSearchbar,IonItem,IonInput,IonLabel,IonButton, IonCard,IonCardHeader } from '@ionic/react';
import './BookerSignup2.css'
import {connect} from 'react-redux'

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
