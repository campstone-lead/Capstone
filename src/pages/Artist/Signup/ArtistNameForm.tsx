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
} from '@ionic/react';
import React from 'react';
import '../../Tab1.css';
import { connect } from 'react-redux';
import { updatedArtist } from '../../../store/artist';

interface IMyComponentState {
  name: string;
}
interface IMyComponentProps {
  putArtistName: (name: any) => void;
  updateArtist: any;
}

class PersonalInfoForm extends React.Component<
  IMyComponentProps,
  IMyComponentState
> {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    let artist = window.localStorage.getItem('artistInfo');
    if (artist !== null) {
      artist = JSON.parse(artist || '');
      let newArtist = artist || {};
      this.setState({
        name: newArtist['name'] || '',
      });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.putArtistName(this.state);
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
          <form onSubmit={this.handleSubmit}>
            <IonItem>
              <IonLabel>Artist Name</IonLabel>
              <IonInput
                type="text"
                placeholder="name"
                required
                value={this.state.name}
                onIonChange={e =>
                  this.setState({
                    name: (e.target as HTMLInputElement).value,
                  })
                }
              />
            </IonItem>
            <IonItem>
              <IonButton
                type="submit"
                disabled={this.state.name === '' ? true : false}
                routerLink={'/artistbioform'}
              >
                next
              </IonButton>
            </IonItem>
          </form>
        </IonContent>
      </IonPage>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    putArtistName: artistInfo => dispatch(updatedArtist(artistInfo)),
  };
};
export default connect(null, mapDispatchToProps)(PersonalInfoForm);
