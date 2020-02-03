import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar,IonSearchbar,IonItem,IonInput,IonLabel,IonButton,IonCard } from '@ionic/react';
import './Tab1.css';
import {connect} from 'react-redux'

interface IMyComponentState {
  email: string,
  password:string,
  firstName:string,
  lastName:string,
  phone:string
}
interface IMyComponentProps{
  user:object
}
 class Login extends React.Component<IMyComponentProps,IMyComponentState> {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password:'',
      firstName:'',
      lastName:'',
      phone:''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleSubmit(event) {
    event.preventDefault();
console.log(this.state)
  }
  render() {

  return (

    <IonPage>
      <IonHeader >
        <IonToolbar id="bar" >
          <IonTitle>LEAD</IonTitle>
          {/* <IonSearchbar className="search" placeholder="Search for venue..."  color="red"/> */}
        </IonToolbar>
      </IonHeader>

    <IonContent>
      <IonCard>
      <form onSubmit={this.handleSubmit}>

      <IonItem>
        <IonLabel>First Name</IonLabel>
        <IonInput type="text" placeholder="First Name" required
          value={this.state.firstName}
          onIonChange={(e) => this.setState({firstName:(e.target as HTMLInputElement).value})}
        />
        </IonItem>



      <IonItem>
        <IonLabel>Last Name</IonLabel>
        <IonInput type="text" placeholder="Last Name" required
          value={this.state.lastName}
          onIonChange={(e) => this.setState({lastName:(e.target as HTMLInputElement).value})}
        />
        </IonItem>


      <IonItem>
        <IonLabel>Phone Number</IonLabel>
        <IonInput type="text" placeholder="Phone number" required
          value={this.state.phone}
          onIonChange={(e) => this.setState({phone:(e.target as HTMLInputElement).value})}
        />
        </IonItem>

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




        <IonButton href='/booker/signup/2' onClick={this.handleSubmit}>Next</IonButton>
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
