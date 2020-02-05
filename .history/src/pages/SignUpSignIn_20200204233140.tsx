import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar,IonIcon,IonItem,IonInput,IonLabel,IonButton, IonCard,IonCardHeader } from '@ionic/react';
import './Tab1.css';
import {auth} from '../store/user'
import {connect} from 'react-redux'
import {logoFacebook,logoGoogleplus}from 'ionicons/icons'
import history from './history'
import Profile from './Profile';
import {Link} from 'react-router-dom'
interface IMyComponentState {
  email: string,
  password:string
}
interface IMyComponentProps{
  auth:any,
  error:any,
  userId:any
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


  async handleSubmit(event) {
    event.preventDefault();
   await  this.props.auth(this.state.email,this.state.password);
  await this.setState({
      email:'',
      password:''
    })
    const {error,userId}=this.props
console.log('here',error,userId)
  }
  render() {

const {error,userId}=this.props
  return (

    <IonPage>
      <IonHeader >
        <IonToolbar id="bar" >
          <IonTitle>Log in</IonTitle>
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

        {error && error.response && <IonCardHeader> {error.response.data} </IonCardHeader>}


        <br></br>
        <IonItem lines="none" routerLink={
          (userId!==undefined)?
          (error!==undefined)
          ?'/login':'/profile':'/login'
        }>
        <IonCardHeader>
        <IonButton type="submit" style={{"width":"270px","height":"38px"}}
        color="tertiary"
        >Login</IonButton>
       </IonCardHeader>
        </IonItem>




        </form>
        <div className="profile">
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <IonTitle>Not a member yet?</IonTitle>
        <br></br>

        <IonButton href="/signup0" style={{"width":"270px","margin":"10px"}} color="tertiary" >Sign up</IonButton>
        <IonButton  style={{"width":"270px","margin":"10px"}} color="danger">
          <IonIcon icon={logoGoogleplus}/>
          Sign up with Google
          </IonButton>
        <IonButton  style={{"width":"270px","margin":"10px"}} >
        <IonIcon icon={logoFacebook}/>
         Sign up with Facebook</IonButton>
        </div>
      </IonCard>
      </IonContent>
    </IonPage>
  )
  }
};
const mapStateToProps=(state)=>({
  error:state.user.error,
  userId:state.user.id
})
const mapDispatchToProps=(dispatch)=>({
  auth:(email,password) => dispatch(auth(email,password))
})
export default connect(mapStateToProps,mapDispatchToProps)(SignUpSignIn);
