import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar,IonSearchbar,IonItem,IonInput,IonLabel,IonButton } from '@ionic/react';
import './BookerSignup2.css';
import {Plugins} from '@capacitor/core'
import {connect} from 'react-redux'
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
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

  }
  render() {
  return (

    <IonPage>
      <IonHeader >
        <IonToolbar id="bar" >
          <IonTitle>Signup</IonTitle>
        </IonToolbar>
      </IonHeader>


    <IonContent id="container" fullscreen >

    <IonSearchbar className="search" placeholder="Search for venue..."  spellCheck/>
      </IonContent>
    </IonPage>
  )
  }
};
const mapStateToProps=(state)=>({
  user:state.user
})
export default connect(mapStateToProps)(Login);
