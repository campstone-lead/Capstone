import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  // IonCardSubtitle,
  IonCardTitle,
  // IonIcon,
  // IonItem,
  // IonLabel,
  // IonList,
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
<IonCardTitle> Welcome back, {this.props.user['firstName']} {this.props.user['lastName']}!</IonCardTitle>
<IonCardTitle className="textBox">We got you some artist you moght be interested in...</IonCardTitle>
</IonCardHeader>

</div>
  :

  <IonCard className="home">
      <IonCardHeader mode="ios">
      <IonCardTitle>{this.props.user['firstName']} {this.props.user['lastName']}</IonCardTitle>
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
