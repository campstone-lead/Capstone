import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar,IonSearchbar,IonItem,IonInput,IonLabel,IonButton, IonCard,IonCardHeader } from '@ionic/react';
import './Tab1.css';
import {auth} from '../store/user'
import {connect} from 'react-redux'
interface IMyComponentState {
  email: string,
  password:string
}
interface IMyComponentProps{
  auth:any,
  error:object
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


  handleSubmit(event) {
    event.preventDefault();
    this.props.auth(this.state.email,this.state.password);
    console.log('ERROR->>>>',this.props.error)

  }
  render() {

  return (

    <IonPage>
      <IonHeader >
        <IonToolbar id="bar" >
          <IonTitle>Log in</IonTitle>
          {/* <IonSearchbar className="search" placeholder="Search for venue..."  color="red"/> */}
        </IonToolbar>
      </IonHeader>


    <IonContent>

      <IonCard className="welcome-card" >
    <form onSubmit={this.handleSubmit}>
      <IonItem lines="inset">
        <IonLabel>Email</IonLabel>
        <IonInput type="email" placeholder="       user@email.com" required
        value={this.state.email}
        onIonChange={(e) => this.setState({email:(e.target as HTMLInputElement).value})}
        />

      </IonItem>


      <IonItem lines="inset">
        <IonLabel>Password</IonLabel>
        <IonInput type="password" placeholder=" *******" required
          value={this.state.password}
          onIonChange={(e) => this.setState({password:(e.target as HTMLInputElement).value})}
        />
        </IonItem>

        <IonItem routerLink="/home" lines="none">
        <br></br>
        <IonCardHeader>
        <IonButton type="submit" style={{"width":"220px","height":"38px"}} disabled={(this.state.password.length!==0&&this.state.email.length!==0)?false:true}>login</IonButton>
       </IonCardHeader>
        </IonItem>


        </form>
        <div className="profile">

        <IonTitle>Not a member yet?</IonTitle>

        <IonButton href="/signup0" style={{"width":"220px","margin":"10px"}} >Sign up</IonButton>
        <IonButton  style={{"width":"220px","margin":"10px"}}>Sign up with Google</IonButton>
        <IonButton  style={{"width":"220px","margin":"10px"}}>Sign up with Facebook</IonButton>
        </div>
      </IonCard>
      </IonContent>
    </IonPage>
  )
  }
};
const mapStateToProps=(state)=>({
  error:state.user
})
const mapDispatchToProps=(dispatch)=>({
  auth:(email,password) => dispatch(auth(email,password))
})
export default connect(mapStateToProps,mapDispatchToProps)(SignUpSignIn);
