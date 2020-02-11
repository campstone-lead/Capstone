import {

  IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonInput, IonLabel, IonButton, IonIcon, IonCardHeader
} from '@ionic/react';
import React from 'react';
import '../../Tab1.css';
import { connect } from 'react-redux'
import { updatedArtist } from '../../../store/artist'
import {
  locate
} from 'ionicons/icons';

interface IMyComponentState {
  zipCode: string,
}
interface IMyComponentProps {
  putZipCode: (zipCode: string) => void,
  updateArtist: any
}

class ZipCodeForm extends React.Component<IMyComponentProps, IMyComponentState>  {
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

        </IonToolbar>
      </IonHeader>



      <IonContent>

        <div className="welcome-card">
          <form onSubmit={this.handleSubmit}>
            <IonItem lines="none">
              <IonCardHeader> <h3>Enter your zip code</h3></IonCardHeader>
            </IonItem>
            <IonItem lines="inset">
              <IonIcon slot="start" color="medium" icon={locate} />
              <IonInput type="number" placeholder="ZipCode" required
                value={this.state.zipCode}
                onIonChange={(e) => this.setState({ zipCode: (e.target as HTMLInputElement).value })}
              />

            </IonItem>

            <div style={{ margin: "10px" }}>
              <IonItem lines="none">
                <br></br>
                <IonButton
                  type="submit"
                  disabled={!(/(^\d{5}$)|(^\d{5}-\d{4}$)/.test(this.state.zipCode))}
                  routerLink="/genres"
                  size="default"
                >
                  Next</IonButton>
              </IonItem>
            </div>
          </form>

        </div>
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

