import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCardHeader, IonItem, IonInput, IonButton, IonIcon } from '@ionic/react';
import '../../Tab1.css';
import { connect } from 'react-redux'
import { signUpBooker } from '../../../store/booker';
import {
  call,
  mailOpen,
  person
} from 'ionicons/icons';
interface IMyComponentState {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
}
interface IMyComponentProps {
  booker: object;
  signUpBooker: any;
}
class BookerSignup1 extends React.Component<
  IMyComponentProps,
  IMyComponentState
  > {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      firstName: '',
      lastName: '',
      phone: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    let booker = window.localStorage.getItem('booker');
    if (booker !== null) {
      booker = JSON.parse(booker || '');
      let newBooker = booker || {};
      this.setState({
        email: newBooker['email'],
        firstName: newBooker['firstName'],
        lastName: newBooker['lastName'],
        phone: newBooker['phone'],
      });
    }
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.signUpBooker(this.state);
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
          <div className="welcome-card">
            <form onSubmit={this.handleSubmit}>
              <IonTitle>Tell us about yourself...</IonTitle>
              <IonItem lines="inset">
                <IonIcon slot="start" color="medium" icon={person} />
                <IonInput type="text" placeholder="First Name" required
                  value={this.state.firstName}
                  onIonChange={e =>
                    this.setState({
                      firstName: (e.target as HTMLInputElement).value,
                    })
                  }
                />
                <IonInput type="text" placeholder="Last Name" required
                  value={this.state.lastName}
                  onIonChange={e =>
                    this.setState({
                      lastName: (e.target as HTMLInputElement).value,
                    })
                  }
                />

              </IonItem>








              <IonItem lines="inset">
                <IonIcon slot="start" color="medium" icon={call} />
                <IonInput type="text" placeholder="Phone number" required
                  value={this.state.phone}
                  onIonChange={e =>
                    this.setState({
                      phone: (e.target as HTMLInputElement).value,
                    })
                  }
                />
              </IonItem>

              <IonItem lines="inset">
                <IonIcon slot="start" color="medium" icon={mailOpen} />
                <IonInput type="email" placeholder="Email" required
                  value={this.state.email}
                  onIonChange={e =>
                    this.setState({
                      email: (e.target as HTMLInputElement).value,
                    })
                  }
                />
              </IonItem>

              <IonItem lines="none">
                <IonCardHeader>
                  <IonButton
                    type="submit"
                    style={{ width: '100px', height: '38px' }}
                    color="tertiary"
                    disabled={
                      this.state.email.length === 0 ||
                        this.state.firstName.length === 0 ||
                        this.state.lastName.length === 0 ||
                        this.state.phone.length === 0
                        ? true
                        : false
                    }
                    routerLink="/signup/booker/2"
                  >
                    Next
                  </IonButton>
                </IonCardHeader>
              </IonItem>
            </form>
          </div>
        </IonContent>
      </IonPage>
    );
  }
}
const mapStateToProps = state => ({
  booker: state.booker,
});
const mapDispatchToProps = dispatch => ({
  signUpBooker: data => dispatch(signUpBooker(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(BookerSignup1);
