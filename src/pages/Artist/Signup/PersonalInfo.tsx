import {
  IonContent,
  IonPage,
  IonTitle,
  IonItem,
  IonInput,
  IonIcon,
  IonButton,
  IonBackButton,
  IonLabel,
} from '@ionic/react';
import React from 'react';
import '../../Tab1.css';
import { connect } from 'react-redux';
import { updatedArtist } from '../../../store/artist';
import {
  call,
  mailOpen,
  person
} from 'ionicons/icons';
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
        <IonContent

        >
          <IonItem lines="inset"
            style={{
              height: '50px',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}
          >
            <div>
              <IonBackButton
                defaultHref="/signup0"
                mode="ios"
                text=""
                color="dark"
              // className="backBtn"
              />
            </div>
            <div>
              <IonTitle>Tell us about yourself...</IonTitle>
            </div>
          </IonItem>
          <div className="welcome-card">
            <form onSubmit={this.handleSubmit}>
              <IonItem lines="inset">
                <IonIcon slot="start" color="medium" icon={person} />
                <IonInput
                  type="text"
                  placeholder="First Name"
                  required
                  value={this.state.firstName}
                  onIonChange={e =>
                    this.setState({
                      firstName: (e.target as HTMLInputElement).value,
                    })
                  }
                />
                <IonInput
                  type="text"
                  placeholder="Last Name"
                  required
                  value={this.state.lastName}
                  onIonChange={e =>
                    this.setState({
                      lastName: (e.target as HTMLInputElement).value,
                    })
                  }
                />
              </IonItem>



              <IonItem lines="inset">
                <IonIcon slot="start" color="medium" icon={mailOpen} />
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

              <IonItem lines="inset">
                <IonIcon slot="start" color="medium" icon={call} />
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
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <IonItem
                  detail={false}
                  lines={'none'}
                >
                  <div style={{ margin: "10px" }}>
                    <IonButton
                      size="default"

                      strong
                      type="submit"
                      routerLink={'/artistnameform'}
                      disabled={
                        this.state.email === '' ||
                          this.state.firstName === '' ||
                          this.state.lastName === '' ||
                          this.state.phone === ''
                          ? true
                          : false
                      }
                    >
                      NEXT
                    </IonButton>
                  </div>

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
    putInfo: artistInfo => dispatch(updatedArtist(artistInfo)),
  };
};
export default connect(null, mapDispatchToProps)(PersonalInfoForm);
