import {

    IonContent, IonHeader, IonPage, IonTitle, IonToolbar,IonItem,IonInput,IonLabel,IonButton
  } from '@ionic/react';
  import React from 'react';
  import '../../Tab1.css';
  import {connect} from 'react-redux'
  import {updatedArtist} from '../../../store/artist'


  interface IMyComponentState {
    zipCode: string,
  }
  interface IMyComponentProps{
    putZipCode: (zipCode: string) => void,
    updateArtist: any
  }

  class ZipCodeForm extends React.Component<IMyComponentProps,IMyComponentState>  {
    constructor(props) {
      super(props);
      this.state = {
        zipCode: '',
      }
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event) {
      event.preventDefault();
      this.props.updateArtist(this.state)
      this.handleSubmit = this.handleSubmit.bind(this);
  }
  render() {
    return (<IonPage>
      <IonHeader >
        <IonToolbar id="bar" >
          <IonTitle>Let us help to find the right venue for you</IonTitle>
          <IonItem>
            <IonLabel> <h3>Enter your zip code</h3></IonLabel>
          </IonItem>
        </IonToolbar>
      </IonHeader>



    <IonContent>
    <form onSubmit={this.handleSubmit}>

      <IonItem>
        <IonInput type="number" placeholder="ZipCode" required
        value={this.state.zipCode}
        onIonChange={(e) => this.setState({zipCode:(e.target as HTMLInputElement).value})}
        />

      </IonItem>

      <IonItem routerLink="/genres">
        <br></br>
        <IonButton type = "submit" disabled={(this.state.zipCode.length ===0)?true:false}>Next</IonButton>
        </IonItem>
        </form>
      </IonContent>
    </IonPage>)
  }
}


const mapDispatchToProps = dispatch => {
  return {
    updateArtist: (artistInfo) => dispatch(updatedArtist(artistInfo))
  }
}
  export default connect(null, mapDispatchToProps)(ZipCodeForm);

