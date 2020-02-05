import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar,IonSearchbar,IonItem,IonInput,IonLabel,IonButton, IonCard } from '@ionic/react';
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


    <div className="signUp">
    <IonTitle>I am a ...</IonTitle>
      <div className="signUpItems">

        <IonButton href="/signup/booker/1">Booker</IonButton>
        <IonButton href="/infoform">Artist</IonButton>
      </div>
      </div>
    </IonPage>
  )
  }
};

export default SignUpZero;
