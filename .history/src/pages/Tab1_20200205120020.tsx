import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonHeader,
  IonToolbar,
  IonSearchbar,
  IonTitle,
  IonImg

} from '@ionic/react';
import { book, build, colorFill, grid,remove } from 'ionicons/icons';
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
class Tab1 extends React.Component <{},IMyComponentProps> {



  render(){
    console.log('here',this.props)
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