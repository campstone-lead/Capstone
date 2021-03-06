import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonButton,
  IonCardHeader,
} from '@ionic/react';
import React from 'react';
import '../../Tab1.css';
import { connect } from 'react-redux';
import { updatedArtist, signUpArtistWithGoogle } from '../../../store/artist';

interface IMyComponentState {
  isGoogleOauth: boolean;
  type: any;
  artistTypes: any;
}
interface IMyComponentProps {
  putType: (artistType: any) => void;
  updateArtist: any;
  signUpArtistWithGoogle: any;
}

class ArtistType extends React.Component<IMyComponentProps, IMyComponentState> {
  constructor(props) {
    super(props);
    this.state = {
      isGoogleOauth: false,
      type: '',
      artistTypes: {
        solo: false,
        dj: false,
        band: false,
      },
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    let artistGoogle = window.localStorage.getItem('google');
    if (artistGoogle !== null) {
      this.setState({
        isGoogleOauth: true,
      });
    }
  }
  handleSubmit(event) {
    event.preventDefault();
    if (this.state.isGoogleOauth)
      this.props.signUpArtistWithGoogle({
        type: this.state.type,
      });
    else
      this.props.updateArtist({
        type: this.state.type,
      });
  }

  handleClick(event) {
    event.preventDefault();
    let currentType;
    if (this.state.type) currentType = this.state.type;
    this.setState({
      type: event.target.target,
    });
    if (currentType)
      this.setState({
        artistTypes: {
          [currentType]: false,
          [event.target.target]: true,
        },
      });
    else
      this.setState({
        artistTypes: {
          [event.target.target]: true,
        },
      });
  }

  render() {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar id="bar">
            <IonTitle>ARTIST TYPE</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent>
          <div className="welcome-card">
            <form onSubmit={this.handleSubmit}>
              <IonCardHeader>What type of artist are you?</IonCardHeader>
              <IonButton
                color={this.state.artistTypes.dj ? 'primary' : 'secondary'}
                type="button"
                target="dj"
                onClick={this.handleClick}
              >
                DJ
              </IonButton>
              <IonButton
                color={this.state.artistTypes.solo ? 'primary' : 'secondary'}
                type="button"
                target="solo"
                onClick={this.handleClick}
              >
                SOLO
              </IonButton>
              <IonButton
                color={this.state.artistTypes.band ? 'primary' : 'secondary'}
                type="button"
                target="band"
                onClick={this.handleClick}
              >
                IN A BAND
              </IonButton>

              <IonItem lines="none">
                <IonButton
                  type="submit"
                  routerLink={'/uploadpicture'}
                  size="default"
                >
                  Next
                </IonButton>
              </IonItem>
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
export default connect(null, mapDispatchToProps)(ArtistType);
