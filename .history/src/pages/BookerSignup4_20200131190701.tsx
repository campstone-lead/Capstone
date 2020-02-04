import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar,IonSearchbar,IonItem,IonInput,IonLabel,IonButton,IonCard } from '@ionic/react';
import './Tab1.css';
import {connect} from 'react-redux'
import './BookerSignup2.css';
import history from '../history'
import { laptop } from 'ionicons/icons';
interface IMyComponentState {
 description:string
}
interface IMyComponentProps{
  user:object,
  history:object
}
 class Login extends React.Component<IMyComponentProps,IMyComponentState> {
  constructor(props) {
    super(props);
    this.state = {
     description:''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleSubmit(event) {
    event.preventDefault();
console.log(this.state)

  }
  render() {
console.log(this.props)
  return (

    <IonPage>
      <IonHeader >
        <IonToolbar id="bar" >
          <IonTitle>LEAD</IonTitle>
          {/* <IonSearchbar className="search" placeholder="Search for venue..."  color="red"/> */}
        </IonToolbar>
      </IonHeader>

    <IonContent>
    <IonCard className="welcome-card">
      <form onSubmit={this.handleSubmit} >

      <IonItem >

        <IonInput type="text" required
          value={this.state.description}
          onIonChange={(e) => this.setState({description:(e.target as HTMLInputElement).value})}
          mode="ios"
          pattern="text"
          placeholder="Description"
          size={50}
          className={"description"}
        />
        </IonItem>


        <IonButton type="submit"  >Submit</IonButton>
        <IonButton href={'/home'} >Next</IonButton>
        </form>

      </IonCard>
      </IonContent>
    </IonPage>
  )
  }
};
const mapStateToProps=(state)=>({
  user:state.user
})
export default connect(mapStateToProps)(Login);