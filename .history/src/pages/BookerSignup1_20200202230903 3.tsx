import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar,IonSearchbar,IonItem,IonInput,IonLabel,IonButton,IonCard } from '@ionic/react';
import './Tab1.css';
import {connect} from 'react-redux'
import {updatedBooker} from '../store/booker'
interface IMyComponentState {
  email: string,
  password:string,
  firstName:string,
  lastName:string,
  phone:string,
}
interface IMyComponentProps{
  booker:object,
  updateBooker:any

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

componentDidMount(){
  let booker=window.localStorage.getItem('booker')
  if(booker!==null){
  booker=JSON.parse(booker||'');
  let newBooker=booker||{};
    this.setState({
      email: newBooker["email"],
      password:newBooker["password"],
      firstName:newBooker["firstName"],
      lastName:newBooker["lastName"],
      phone:newBooker["phone"]
    })
  }
}
  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state)
this.props.updateBooker(this.state);

  }
  render() {
console.log('hereeee',this.props)
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
      <form onSubmit={this.handleSubmit}>

      <IonItem>

        <IonInput type="text" placeholder="First Name" required
          value={this.state.firstName}
          onIonChange={(e) => this.setState({firstName:(e.target as HTMLInputElement).value})}
        />
        </IonItem>



      <IonItem>

        <IonInput type="text" placeholder="Last Name" required
          value={this.state.lastName}
          onIonChange={(e) => this.setState({lastName:(e.target as HTMLInputElement).value})}
        />
        </IonItem>


      <IonItem>

        <IonInput type="text" placeholder="Phone number" required
          value={this.state.phone}
          onIonChange={(e) => this.setState({phone:(e.target as HTMLInputElement).value})}
        />
        </IonItem>

      <IonItem>

        <IonInput type="email" placeholder="Email" required
        value={this.state.email}
        onIonChange={(e) => this.setState({email:(e.target as HTMLInputElement).value})}
        />

      </IonItem>


      <IonItem>

        <IonInput type="password" placeholder="Password" required
          value={this.state.password}
          onIonChange={(e) => this.setState({password:(e.target as HTMLInputElement).value})}
        />
        </IonItem>



      <br></br>
        <IonButton type="submit"  >Submit</IonButton>
        <IonButton href={'/signup/booker/2'} disabled={(this.state.email.length===0||this.state.firstName.length===0||this.state.password.length===0||this.state.lastName.length===0||this.state.phone.length===0)?true:false} >Next</IonButton>
        </form>

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
  updateBooker:(data)=>dispatch(updatedBooker(data))
})
export default connect(mapStateToProps,mapDispatchToProps)(Login);
