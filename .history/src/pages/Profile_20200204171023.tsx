import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar,IonSearchbar,IonItem,IonInput,IonLabel,IonButton, IonCard,IonImg, IonItemGroup, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle } from '@ionic/react';
import './Tab1.css';
import {connect} from 'react-redux'

interface IMyComponentProps{
  user:object,
  genres:Array<string>
}
 class Profile extends React.Component<IMyComponentProps,{}> {


  render() {
  console.log(this.props)

  return (

    <IonPage>
      <IonHeader >
        <IonToolbar id="bar" >
          <IonTitle>Profile</IonTitle>
          {/* <IonSearchbar className="search" placeholder="Search for venue..."  color="red"/> */}
        </IonToolbar>
      </IonHeader>


    <IonContent>

  <IonCard className="profile">
    <img src={this.props.user['imageUrl']} alt={this.props.user['firstName']}  className="profileImage"/>
    <IonCardHeader>
      <IonCardTitle>{this.props.user['artistName']}</IonCardTitle>
    </IonCardHeader>
    <IonCardContent>

<IonCardSubtitle>{this.props.user['bio']}</IonCardSubtitle>
<IonTitle>
  My genres are:
  <IonCardSubtitle>

  </IonCardSubtitle>
</IonTitle>
    </IonCardContent>
  </IonCard>
      </IonContent>
    </IonPage>
  )
  }
};
const mapStateToProps=(state)=>({
  user:state.user,
  genres: state.user.genres
})
export default connect(mapStateToProps)(Profile);
