import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar,IonSearchbar,IonItem,IonInput,IonLabel,IonButton, IonCard,IonList, IonItemGroup, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonTabBar, IonTabButton, IonIcon, IonButtons, IonText } from '@ionic/react';
import {logoInstagram,logoFacebook,logoPinterest,call,mailOpen}from 'ionicons/icons'
import './Tab1.css';
import {connect} from 'react-redux'

interface IMyComponentProps{
  user:object,
  genres:Array<string>
}
 class Profile extends React.Component<IMyComponentProps,{}> {


  render() {

  return (

    <IonPage>
      <IonHeader >
        <IonToolbar id="bar" >
          <IonTitle>Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
{(this.props.user['status']==='artist')?


 ( <IonCard className="profile">
    <img src={this.props.user['imageUrl']} alt={this.props.user['firstName']}  className="profileImage"/>
    <IonCardHeader>
      <IonCardTitle>{this.props.user['artistName']}</IonCardTitle>
    </IonCardHeader>
    <IonCardContent>

<IonCardSubtitle style={{"color":"black","fontSize":"15.5px"}}>{this.props.user['bio']}</IonCardSubtitle>
<br></br>
<IonCardSubtitle style={{"fontSize":"20px","color":"black"}}>
  My genres are:
</IonCardSubtitle>
<IonList  lines="inset" >
{this.props.genres!==undefined&&(
  this.props.genres.map((el,index)=>
  <IonItem key={index}>
  <IonLabel>{el}</IonLabel>
</IonItem>
  ))
}
</IonList>

<IonTabBar slot="bottom">
<IonTabButton tab="tab2" href={this.props.user['instagramUrl']}>
    <IonIcon icon={logoInstagram}/>
    <IonLabel>Instagram</IonLabel>
  </IonTabButton>
  <IonTabButton tab="tab2"  href={this.props.user['spotifyUrl']}>
    <IonIcon icon={logoPinterest}/>
    <IonLabel>Spotify</IonLabel>
  </IonTabButton>
  <IonTabButton tab="tab2" href={this.props.user['facebookUrl']}>
    <IonIcon icon={logoFacebook}/>
    <IonLabel>Facebook</IonLabel>
  </IonTabButton>
</IonTabBar>
    </IonCardContent>
    <IonButton>Update profile</IonButton>

  </IonCard>)
  :
(  <IonCard className="profile">
      <img src={this.props.user['imageURL']} alt={this.props.user['firstName']}  className="profileImage"/>
    <IonCardHeader>
      <IonCardTitle>{this.props.user['firstName']} {this.props.user['lastName']}</IonCardTitle>
      <IonList>
      <IonItem>
      <IonIcon icon={mailOpen}/>
        <IonLabel>  {this.props.user['email']} </IonLabel>
      </IonItem>
      <IonItem>
      <IonIcon icon={call}/>
        <IonLabel>  {this.props.user['phone']} </IonLabel>
      </IonItem>
    </IonList>

    </IonCardHeader>
  </IonCard>)
}

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