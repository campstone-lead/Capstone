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
  IonCard,
} from '@ionic/react';
import React from 'react';
import '../../Tab1.css';
import { connect } from 'react-redux';
import { auth } from '../../../store/user'
import { updatedArtist } from '../../../store/artist';

interface IMyComponentState {
  password: string;
}

interface IMyComponentProps {
  // putType: (artistType: any) => void,
  updateArtist: any;
  auth: any;
}

class ArtistPassword extends React.Component<
  IMyComponentProps,
  IMyComponentState
  > {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  async handleSubmit(event) {
    event.preventDefault();
    await this.props.updateArtist(this.state);
    await this.props.auth(JSON.parse(window.localStorage.getItem("email") || ''), this.state.password);
    window.localStorage.clear();
  }
  render() {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar id="bar">
            <IonTitle>Personal information</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent>
          <IonCard className="welcome-card">
            <form onSubmit={this.handleSubmit}>
              <IonTitle>Let's add a password...</IonTitle>

              <IonItem>
                <IonInput
                  type="password"
                  placeholder="Password"
                  required
                  value={this.state.password}
                  onIonChange={e =>
                    this.setState({
                      password: (e.target as HTMLInputElement).value,
                    })
                  }
                />
              </IonItem>

              <IonItem >
                <br></br>

                <IonButton
                  type="submit"
                  disabled={this.state.password.length === 0 ? true : false}
                  routerLink="/home"
                >
                  Done
                </IonButton>
              </IonItem>
            </form>
          </IonCard>
        </IonContent>
      </IonPage>
    );
  }
}

// const mapStateToProps = (state) => ({
//   email: state.artist.email
// })

const mapDispatchToProps = dispatch => ({
  updateArtist: artistInfo => dispatch(updatedArtist(artistInfo)),
  auth: (email, password) => dispatch(auth(email, password))
});

export default connect(null, mapDispatchToProps)(ArtistPassword);
