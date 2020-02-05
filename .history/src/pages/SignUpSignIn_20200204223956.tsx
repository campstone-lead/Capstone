import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar,IonIcon,IonItem,IonInput,IonLabel,IonButton, IonCard,IonCardHeader } from '@ionic/react';
import './Tab1.css';
import {auth} from '../store/user'
import {connect} from 'react-redux'
import {logoFacebook,logoGoogleplus}from 'ionicons/icons'
import history from './history'
interface IMyComponentState {
  email: string,
  password:string
}
interface IMyComponentProps{
  auth:any,
  error:any,
  user:any,
  history:any
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
    this.setState({
      email:'',
      password:''
    })
    const error=this.props.error
console.log('here',error,this.props.user['id'])
  }
  render() {
const error=this.props.error
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

        {error && error.response && <IonCardHeader> {error.response.data} </IonCardHeader>}


        <br></br>
        <IonCardHeader>
        <IonButton type="submit" style={{"width":"270px","height":"38px"}}
        onClick={() => {
          if(error&&error.response)
          return this.props.history.push(`/profile`)
        }}
        color="tertiary"
        >Login</IonButton>
       </IonCardHeader>



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
  user:state.user
})
const mapDispatchToProps=(dispatch)=>({
  auth:(email,password) => dispatch(auth(email,password))
})
export default connect(mapStateToProps,mapDispatchToProps)(SignUpSignIn);
