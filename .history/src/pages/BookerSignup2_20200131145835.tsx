import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar,IonSearchbar,IonItem,IonInput,IonLabel,IonButton } from '@ionic/react';
// import './BookerSignup2.css';

import {connect} from 'react-redux'
interface IMyComponentState {
  email: string,
  password:string
}
interface IMyComponentProps{
  user:object
}
 class Login extends React.Component<IMyComponentProps,IMyComponentState> {
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
console.log('here=>',this.props.user)
  return (

    <IonPage>
      <IonHeader >
        <IonToolbar id="bar" >
          <IonTitle>LEAD</IonTitle>
          {/* <IonSearchbar className="search" placeholder="Search for venue..."  color="red"/> */}
        </IonToolbar>
      </IonHeader>


    <IonContent>
    <form onSubmit={this.handleSubmit}>
      <IonItem>
        <IonLabel>Email</IonLabel>
        <IonInput type="email" placeholder="Email" required
        value={this.state.email}
        onIonChange={(e) => this.setState({email:(e.target as HTMLInputElement).value})}
        />

      </IonItem>


      <IonItem>
        <IonLabel>Password</IonLabel>
        <IonInput type="password" placeholder="Password" required
          value={this.state.password}
          onIonChange={(e) => this.setState({password:(e.target as HTMLInputElement).value})}
        />
        </IonItem>
        <IonButton type="submit">submit</IonButton>
        </form>
      </IonContent>
    </IonPage>
  )
  }
};
const mapStateToProps=(state)=>({
  user:state.user
})
export default connect(mapStateToProps)(Login);
