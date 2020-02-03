import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,IonItem,IonInput,IonLabel,IonButton
} from '@ionic/react';
import React from 'react';
import '../../Tab1.css';
import {connect} from 'react-redux'
import {putArtistName} from '../../../store/artist'

interface IMyComponentState {
  artistName: string,
}
interface IMyComponentProps{
  putArtistName: (name: string) => void
}

class PersonalInfoForm extends React.Component<IMyComponentProps,IMyComponentState>  {
  constructor(props) {
    super(props);
    this.state = {
      artistName: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleSubmit(event) {
    event.preventDefault();
    this.props.putArtistName(this.state.artistName)
    this.setState({
      artistName: '',
    })

  }
  render(){
  return(<IonPage>
    <IonHeader >
      <IonToolbar id="bar" >
        <IonTitle>What is your artist name?</IonTitle>
        <IonItem>
          <IonLabel> <h3>This name will show on your profile</h3></IonLabel>
        </IonItem>
      </IonToolbar>
    </IonHeader>


  <IonContent>
  <form onSubmit={this.handleSubmit}>

    <IonItem>
      <IonLabel>First Name</IonLabel>
      <IonInput type="text" placeholder="FirstName" required
      value={this.state.artistName}
      onIonChange={(e) => this.setState({artistName:(e.target as HTMLInputElement).value})}
      />

    </IonItem>

      <IonButton type="submit">next</IonButton>
      </form>
    </IonContent>
  </IonPage>)}
}
const mapDispatchToProps=dispatch=>{
  return {
    putArtistName: (name) => dispatch(putArtistName(name))
  }
}
export default connect(null, mapDispatchToProps)(PersonalInfoForm);
