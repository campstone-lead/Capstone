import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar,IonSearchbar,IonItem,IonInput,IonLabel,IonButton } from '@ionic/react';
import './Tab1.css';
import {connect} from 'react-redux'

interface IMyComponentProps{
  booker:object
}
 class Profile extends React.Component<IMyComponentProps,{}> {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password:''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleSubmit(event) {
    event.preventDefault();

  }
  render() {
console.log('here=>',this.props.booker)
  return (

    <IonPage>
      <IonHeader >
        <IonToolbar id="bar" >
          <IonTitle>LEAD</IonTitle>
          {/* <IonSearchbar className="search" placeholder="Search for venue..."  color="red"/> */}
        </IonToolbar>
      </IonHeader>


    <IonContent>
   <IonTitle>Welcome Back!</IonTitle>
      </IonContent>
    </IonPage>
  )
  }
};
const mapStateToProps=(state)=>({
  booker:state.booker
})
export default connect(mapStateToProps)(Profile);
