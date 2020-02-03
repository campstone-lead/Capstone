import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar,IonSearchbar,IonItem,IonInput,IonLabel,IonButton } from '@ionic/react';
import './BookerSignup2.css';
import {Plugins} from '@capacitor/core'
import {connect} from 'react-redux'
import {GoogleMap} from'react-google-maps'
const {Geolocation} =Plugins;
interface IMyComponentState {
location:Object
}
interface IMyComponentProps{
  user:object
}
 class Login extends React.Component<IMyComponentProps,IMyComponentState> {
  constructor(props) {
    super(props);
    this.state = {
    location:{
      latitude:null,
      longitude:null
    }
    }
  }


  render() {
    console.log(this.state)
  return (

    <IonPage>
      <IonHeader >
        <IonToolbar id="bar" >
          <IonTitle>Signup</IonTitle>
        </IonToolbar>
      </IonHeader>


    <IonContent id="container" fullscreen >

    <IonSearchbar className="search" placeholder="Search for venue..."  spellCheck/>

    <IonButton>Next</IonButton>
      </IonContent>
    </IonPage>
  )
  }
};
const mapStateToProps=(state)=>({
  user:state.user
})
export default connect(mapStateToProps)(Login);
