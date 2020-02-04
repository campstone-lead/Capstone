import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar,IonSearchbar,IonItem,IonInput,IonLabel,IonButton, IonCard,IonImg, IonItemGroup } from '@ionic/react';
import './Tab1.css';
import {connect} from 'react-redux'

interface IMyComponentProps{
  user:object
}
 class Profile extends React.Component<IMyComponentProps,{}> {


  render() {
  return (

    <IonPage>
      <IonHeader >
        <IonToolbar id="bar" >
          <IonTitle>Profile</IonTitle>
          {/* <IonSearchbar className="search" placeholder="Search for venue..."  color="red"/> */}
        </IonToolbar>
      </IonHeader>


    <IonContent>
  <IonTitle>Welcome Back {this.props.user['firstName']} {this.props.user['lastName']}!</IonTitle>
  <IonCard className="profile">
    <img src={this.props.user['imageUrl']} alt={this.props.user['firstName']}  className="profileImage" width="200px" height="200px"/>
    <IonItemGroup>
      <IonTitle>{this.props.user['firstName']}</IonTitle>
      <IonTitle>{this.props.user['lastName']}</IonTitle>
    </IonItemGroup>
  </IonCard>
      </IonContent>
    </IonPage>
  )
  }
};
const mapStateToProps=(state)=>({
  user:state.user
})
export default connect(mapStateToProps)(Profile);
