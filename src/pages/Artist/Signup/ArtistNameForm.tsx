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
} from '@ionic/react';
import React from 'react';
import '../../Tab1.css';
import { connect } from 'react-redux';
import { updatedArtist, signUpArtistWithGoogle } from '../../../store/artist';
import { microphone } from 'ionicons/icons';
interface IMyComponentState {
  isGoogleOauth: boolean;
  name: string;
}
interface IMyComponentProps {
  putArtistName: (name: any) => void;
  updateArtist: any;
  signUpArtistWithGoogle: any;
}

class PersonalInfoForm extends React.Component<
  IMyComponentProps,
  IMyComponentState
> {
  constructor(props) {
    super(props);
    this.state = {
      isGoogleOauth: false,
      name: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    let artist = window.localStorage.getItem('artistInfo');
    let artistGoogle = window.localStorage.getItem('google');
    if (artist !== null) {
      artist = JSON.parse(artist || '');
      let newArtist = artist || {};
      this.setState({
        name: newArtist['name'] || '',
      });
    } else if (artistGoogle !== null) {
      artistGoogle = JSON.parse(artistGoogle || '');
      let newArtist = artistGoogle || {};
      await this.setState({
        name: newArtist['name'] || '',
        isGoogleOauth: true,
      });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.isGoogleOauth)
      this.props.signUpArtistWithGoogle({ name: this.state.name });
    else this.props.putArtistName({ name: this.state.name });
    this.setState({
      name: '',
    });
  }
  render() {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar id="bar">
            <IonTitle>What is your artist name?</IonTitle>
            <IonItem>
              <IonLabel>
                {' '}
                <h3>This name will show on your profile</h3>
              </IonLabel>
            </IonItem>
          </IonToolbar>
        </IonHeader>

        <IonContent>
          <div className="welcome-card">
            <form onSubmit={this.handleSubmit}>
              <IonItem lines="inset">
                <IonIcon slot="start" color="medium" icon={microphone} />
                <IonInput
                  type="text"
                  placeholder="Artist name"
                  required
                  value={this.state.name}
                  onIonChange={e =>
                    this.setState({
                      name: (e.target as HTMLInputElement).value,
                    })
                  }
                />
              </IonItem>
              <div style={{ margin: '10px' }}>
                <IonItem lines="none">
                  <IonButton
                    type="submit"
                    disabled={this.state.name === '' ? true : false}
                    routerLink={'/artistbioform'}
                    size="default"
                  >
                    NEXT
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
    putArtistName: artistInfo => dispatch(updatedArtist(artistInfo)),
    signUpArtistWithGoogle: artistInfo =>
      dispatch(signUpArtistWithGoogle(artistInfo)),
  };
};
export default connect(null, mapDispatchToProps)(PersonalInfoForm);
