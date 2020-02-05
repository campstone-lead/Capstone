import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  // IonIcon,
  // IonItem,
  // IonLabel,
  IonItemGroup,
  // IonListHeader,
IonButton,
  IonPage,
  IonHeader,
  IonToolbar,
  IonSearchbar,
  IonContent,

} from '@ionic/react';

import React from 'react';
import {auth,me} from '../store/user'
import {connect} from 'react-redux'
import './Tab1.css';


interface IMyComponentProps{
  auth:any,
  error:any,
  user:object,
  me:any
}
class Tab1 extends React.Component <IMyComponentProps,{}> {

  async componentDidMount(){
    await this.props.me()
  }

  render(){

  return (
    <IonPage>
       <IonHeader mode="ios"  >
        <IonToolbar mode="ios" >
        <div className="tabHeader">
        <img src="https://im6.ezgif.com/tmp/ezgif-6-046ac8f056bc.png" alt="logo.png" className="logo" />
        <IonSearchbar
          mode="ios"
          className="searchBar"
          animated
          showCancelButton="focus"
          cancelButtonText='x'
          >
          </IonSearchbar>
        </div>
        </IonToolbar>
      </IonHeader>
      <IonContent>
    {(this.props.user['status']==='booker')?

<div className="home">

<IonCardHeader className="home" mode="ios">
<IonButton mode="ios" className="homeBtn" color="rgb(153, 178, 189);">Artists</IonButton>
<IonCardTitle className="textBox">We got you some artist you might be interested in...</IonCardTitle>
</IonCardHeader>

{/* this is where artists go */}
<IonCard className='profile' style={{ "width":"250px"}}>
          <div className='artistBox' >
            <IonItemGroup>
              <img  src="https://images.vexels.com/media/users/3/147101/isolated/preview/b4a49d4b864c74bb73de63f080ad7930-instagram-profile-button-by-vexels.png" alt="img.jpg"/>
            </IonItemGroup>
            <IonItemGroup>
            <IonCardTitle>Artist Name</IonCardTitle>
            <IonCardSubtitle>Genres</IonCardSubtitle>
            </IonItemGroup>
          </div>
        </IonCard>



</div>
  :

  <IonCard className="home">
      <IonCardHeader mode="ios">

      <IonCardTitle className="textBox">{this.props.user['firstName']} {this.props.user['lastName']}</IonCardTitle>

    </IonCardHeader>
  </IonCard>
  }

      </IonContent>
    </IonPage>
  );
  }
};
const mapStateToProps=(state)=>({
  error:state.user.error,
  user:state.user
})
const mapDispatchToProps=(dispatch)=>({
  auth:(email,password) => dispatch(auth(email,password)),
  me:()=>dispatch(me()),
})
export default connect(mapStateToProps,mapDispatchToProps)(Tab1);
