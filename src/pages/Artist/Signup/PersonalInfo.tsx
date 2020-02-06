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
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
}
interface IMyComponentProps {
  putInfo: (info: any) => void;
  updateArtist: any;
}

class PersonalInfoForm extends React.Component<
  IMyComponentProps,
  IMyComponentState
> {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      phone: '',
      firstName: '',
      lastName: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    let artist = window.localStorage.getItem('artistInfo');
    if (artist !== null) {
      artist = JSON.parse(artist || '');
      let newArtist = artist || {};
      this.setState({
        email: newArtist['email'],
        firstName: newArtist['firstName'],
        lastName: newArtist['lastName'],
        phone: newArtist['phone'],
      });
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    this.props.putInfo(this.state);
    this.setState({
      email: '',
      phone: '',
      firstName: '',
      lastName: '',
    });
  }
  render() {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar id="bar">
            <IonTitle>Tell us about yourself...</IonTitle>
            {/* <IonSearchbar className="search" placeholder="Search for venue..."  color="red"/> */}
          </IonToolbar>
        </IonHeader>

        <IonContent>
          <form onSubmit={this.handleSubmit}>
            <IonItem>
              <IonLabel>First Name</IonLabel>
              <IonInput
                type="text"
                placeholder="FirstName"
                required
                value={this.state.firstName}
                onIonChange={e =>
                  this.setState({
                    firstName: (e.target as HTMLInputElement).value,
                  })
                }
              />
            </IonItem>

            <IonItem>
              <IonLabel>Last Name</IonLabel>
              <IonInput
                type="text"
                placeholder="LastName"
                required
                value={this.state.lastName}
                onIonChange={e =>
                  this.setState({
                    lastName: (e.target as HTMLInputElement).value,
                  })
                }
              />
            </IonItem>

            <IonItem>
              <IonLabel>Email</IonLabel>
              <IonInput
                type="email"
                placeholder="Email"
                required
                value={this.state.email}
                onIonChange={e =>
                  this.setState({ email: (e.target as HTMLInputElement).value })
                }
              />
            </IonItem>

            <IonItem>
              <IonLabel>Phone Number</IonLabel>
              <IonInput
                type="number"
                placeholder="PhoneNumber"
                required
                value={this.state.phone}
                onIonChange={e =>
                  this.setState({ phone: (e.target as HTMLInputElement).value })
                }
              />
            </IonItem>

            <IonItem routerLink={'/artistnameform'}>
              <IonButton
                type="submit"
                disabled={
                  this.state.email === '' ||
                  this.state.firstName === '' ||
                  this.state.lastName === '' ||
                  this.state.phone === ''
                    ? true
                    : false
                }
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
    putInfo: artistInfo => dispatch(updatedArtist(artistInfo)),
  };
};
export default connect(null, mapDispatchToProps)(PersonalInfoForm);
