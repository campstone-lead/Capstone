import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonInput,
  IonButton,
  IonCard,
  IonIcon
} from '@ionic/react';
import React from 'react';
import '../../Tab1.css';
import { connect } from 'react-redux';
import { updatedArtist } from '../../../store/artist';
import {
  create
} from 'ionicons/icons';
interface IMyComponentState {
  bio: string;
}

interface IMyComponentProps {
  putBio: (artistBio: any) => void;
  updateArtist: any;
}

class ArtistBioForm extends React.Component<
  IMyComponentProps,
  IMyComponentState
  > {
  constructor(props) {
    super(props);
    this.state = {
      bio: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    let artist = window.localStorage.getItem('artistInfo');
    if (artist !== null) {
      artist = JSON.parse(artist || '');
      let newArtist = artist || {};
      this.setState({
        bio: newArtist['bio'],
      });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.updateArtist(this.state);
    this.setState({
      bio: '',
    });
  }

  render() {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar id="bar">
            <IonTitle>Tell us about yourself!</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent>
          <div className="welcome-card">
            <form onSubmit={this.handleSubmit}>
              <IonTitle>Include your short artist bio here...</IonTitle>
              <IonItem lines="inset">
                <IonIcon slot="start" color="medium" icon={create} />
                <IonInput
                  type="text"
                  value={this.state.bio}
                  onIonChange={e =>
                    this.setState({ bio: (e.target as HTMLInputElement).value })
                  }
                  placeholder="Bio"
                  className={'bio'}
                />
              </IonItem>

              <div style={{ margin: "10px" }}>
                <IonItem lines="none">
                  <br></br>

                  <IonButton
                    disabled={this.state.bio === '' ? true : false}
                    size="small"
                    className="next"
                    type="submit"
                    routerLink="/zipcodeform"
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
    //   putBio: (artistInfo) => dispatch(updatedArtist(artistInfo))
    updateArtist: artistInfo => dispatch(updatedArtist(artistInfo)),
  };
};

export default connect(null, mapDispatchToProps)(ArtistBioForm);
