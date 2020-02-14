import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonInput,
  IonLabel,
  IonButton,
  IonIcon,
  IonCardHeader,
} from '@ionic/react';
import React from 'react';
import '../../Tab1.css';
import { connect } from 'react-redux';
import { updatedArtist, signUpArtistWithGoogle } from '../../../store/artist';
import { locate } from 'ionicons/icons';

interface IMyComponentState {
  isGoogleOauth: boolean;
  zipCode: string;
}
interface IMyComponentProps {
  putZipCode: (zipCode: string) => void;
  updateArtist: any;
  signUpArtistWithGoogle: any;
}

class ZipCodeForm extends React.Component<
  IMyComponentProps,
  IMyComponentState
> {
  constructor(props) {
    super(props);
    this.state = {
      isGoogleOauth: false,
      zipCode: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  async componentDidMount() {
    let artistGoogle = window.localStorage.getItem('google');
    if (artistGoogle !== null) {
      artistGoogle = JSON.parse(artistGoogle || '');
      let newArtist = artistGoogle || {};
      await this.setState({
        zipCode: newArtist['zipCode'] || '',
        isGoogleOauth: true,
      });
    }
  }
  handleSubmit(event) {
    event.preventDefault();
    if (this.state.isGoogleOauth)
      this.props.signUpArtistWithGoogle({ zipCode: this.state.zipCode });
    else this.props.updateArtist({ zipCode: this.state.zipCode });
  }
  render() {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar id="bar">
            <IonTitle>Let us help to find the right venue for you</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent>
          <div className="welcome-card">
            <form onSubmit={this.handleSubmit}>
              <IonItem lines="none">
                <IonCardHeader>
                  {' '}
                  <h3>Enter your zip code</h3>
                </IonCardHeader>
              </IonItem>
              <IonItem lines="inset">
                <IonIcon slot="start" color="medium" icon={locate} />
                <IonInput
                  type="number"
                  placeholder="ZipCode"
                  required
                  value={this.state.zipCode}
                  onIonChange={e =>
                    this.setState({
                      zipCode: (e.target as HTMLInputElement).value,
                    })
                  }
                />
              </IonItem>

              <div style={{ margin: '10px' }}>
                <IonItem lines="none">
                  <br></br>
                  <IonButton
                    type="submit"
                    disabled={
                      !/(^\d{5}$)|(^\d{5}-\d{4}$)/.test(this.state.zipCode)
                    }
                    routerLink="/genres"
                    size="default"
                  >
                    Next
                  </IonButton>
                </IonItem>
              </div>
            </form>
          </div>
        </IonContent>
      </IonPage>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateArtist: artistInfo => dispatch(updatedArtist(artistInfo)),
    signUpArtistWithGoogle: artistInfo =>
      dispatch(signUpArtistWithGoogle(artistInfo)),
  };
};
export default connect(null, mapDispatchToProps)(ZipCodeForm);
