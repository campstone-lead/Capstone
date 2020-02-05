import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar,IonSearchbar,IonItem,IonInput,IonLabel,IonButton, IonCard } from '@ionic/react';
import './Tab1.css';
import {auth,me} from '../store/booker'
import {connect} from 'react-redux'
interface IMyComponentState {
  email: string,
  password:string
}
interface IMyComponentProps{
  booker:object,
  auth:any,
  me:any
}
 class SignUpSignIn extends React.Component<IMyComponentProps,IMyComponentState> {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password:''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

componentDidMount(){

}
  handleSubmit(event) {
    event.preventDefault();
    this.props.auth(this.state.email,this.state.password);
  }
  render() {
console.log('here=>',this.props)
  return (

    <IonPage>
      <IonHeader >
        <IonToolbar id="bar" >
          <IonTitle>Log in</IonTitle>
          {/* <IonSearchbar className="search" placeholder="Search for venue..."  color="red"/> */}
        </IonToolbar>
      </IonHeader>


    <IonContent>

      <IonCard className="welcome-card">
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
        <IonButton type="submit">login</IonButton>
        </form>
        <IonCard >

        <IonTitle>Not a member yet?</IonTitle>
        <IonButton href="/signup0">Sign up</IonButton>
        </IonCard>
      </IonCard>
      </IonContent>
    </IonPage>
  )
  }
};
const mapStateToProps=(state)=>({
  booker:state.booker
})
const mapDispatchToProps=(dispatch)=>({
  auth:(email,password) => dispatch(auth(email,password)),
  me:()=>dispatch(me())
})
export default connect(mapStateToProps,mapDispatchToProps)(SignUpSignIn);
