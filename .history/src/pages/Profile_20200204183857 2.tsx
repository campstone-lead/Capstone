import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar,IonSearchbar,IonItem,IonInput,IonLabel,IonButton, IonCard,IonList, IonItemGroup, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonTabBar, IonTabButton, IonIcon, IonButtons, IonText } from '@ionic/react';
import {logoInstagram,logoFacebook,logoPinterest,call,mailOpen,musicalNote,microphone}from 'ionicons/icons'
import './Tab1.css';
import {connect} from 'react-redux'
import {getOneBooker} from '../store/booker'
import {me} from '../store/user'
interface IMyComponentProps{
  user:object,
  genres:Array<string>,
  getOneBooker:any,
  me:any,
  booker:object
}
 class Profile extends React.Component<IMyComponentProps,{}> {



  async componentDidMount(){
     await this.props.me()
    if(this.props.user['status']==='booker'){
      const id=this.props.user['id']
      console.log(id)
    }
  }
  render() {
    let genres=''
    if(this.props.genres!==undefined){
      this.props.genres.forEach((el,index)=>
    {
     if(index!==this.props.genres.length-1) {
       genres+=el+', '
     }
     else genres+=el;
    })
    }

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
<IonList>
<IonItem>
      <IonIcon icon={microphone}/>
        <IonLabel style={{"padding":"5px"}}>  My genres are: {genres} </IonLabel>
      </IonItem>

      <IonItem>
      <IonIcon icon={mailOpen}/>
        <IonLabel style={{"padding":"5px"}}>{this.props.user['email']} </IonLabel>

      </IonItem>
      <IonItem>
      <IonIcon icon={call}/>
        <IonLabel style={{"padding":"5px"}}>  {this.props.user['phone']} </IonLabel>
      </IonItem>
    </IonList>

<IonTabBar slot="bottom">
<IonTabButton tab="tab2" href={this.props.user['instagramUrl']}>
    <IonIcon icon={logoInstagram}/>
    <IonLabel>Instagram</IonLabel>
  </IonTabButton>
  <IonTabButton tab="tab2"  href={this.props.user['spotifyUrl']}>
    <IonIcon icon={musicalNote}/>
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
    < IonCardContent>
      <IonCardTitle>{this.props.user['firstName']} {this.props.user['lastName']}</IonCardTitle>
      <IonList>
      <IonItem>
      <IonIcon icon={mailOpen}/>
        <IonLabel style={{"padding":"5px"}}>{this.props.user['email']} </IonLabel>
      </IonItem>
      <IonItem>
      <IonIcon icon={call}/>
        <IonLabel style={{"padding":"5px"}}>  {this.props.user['phone']} </IonLabel>
      </IonItem>
    </IonList>

    </ IonCardContent>
    <IonButton>Update profile</IonButton>
  </IonCard>
  )
}

      </IonContent>
    </IonPage>
  )
  }
};
const mapStateToProps=(state)=>({
  user:state.user,
  genres: state.user.genres,
  booker:state.booker
})
const mapDispatchToProps=(dispatch)=>({
  getOneBooker:(id)=>dispatch(getOneBooker(id)),
  me:()=>dispatch(me()),
})
export default connect(mapStateToProps,mapDispatchToProps)(Profile);
