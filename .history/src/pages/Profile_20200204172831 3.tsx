import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar,IonSearchbar,IonItem,IonInput,IonLabel,IonButton, IonCard,IonList, IonItemGroup, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonTabBar, IonTabButton, IonIcon } from '@ionic/react';
import {logoInstagram}from 'ionicons/icons'
import './Tab1.css';
import {connect} from 'react-redux'

interface IMyComponentProps{
  user:object,
  genres:Array<string>
}
 class Profile extends React.Component<IMyComponentProps,{}> {


  render() {
  if(this.props.genres!==undefined)
{  console.log(this.props.genres)
  this.props.genres.forEach((el)=>{
    console.log(el)
  })
}

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

<IonTabBar>
  <IonTabButton>
    <IonIcon>{logoInstagram}</IonIcon>
  </IonTabButton>
</IonTabBar>
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
