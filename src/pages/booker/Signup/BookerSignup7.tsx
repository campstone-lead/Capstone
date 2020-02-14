import React from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonInput,
  IonButton,
  IonIcon,
} from '@ionic/react';
import '../../Tab1.css';
import { connect } from 'react-redux';
import { signUpBooker, signUpWithGoogleBooker } from '../../../store/booker';
import { auth } from '../../../store/user';
import { lock, call } from 'ionicons/icons';

interface IMyComponentState {
  password: string;
  isGoogleOauth: boolean;
  phone: string;
}
interface IMyComponentProps {
  booker: object;
  signUpBooker: any;
  auth: any;
  signUpWithGoogleBooker: any;
}
class Login extends React.Component<IMyComponentProps, IMyComponentState> {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      isGoogleOauth: false,
      phone: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    let google = window.localStorage.getItem('google');
    this.setState({
      isGoogleOauth: google ? true : false,
    });
  }
  async handleSubmit(event) {
    event.preventDefault();
    if (this.state.isGoogleOauth)
      await this.props.signUpWithGoogleBooker(this.state);
    else await this.props.signUpBooker(this.state);
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
          {this.state.isGoogleOauth ? (
            <div className="welcome-card">
              <form onSubmit={this.handleSubmit}>
                <IonTitle>Add a phone number</IonTitle>

                <IonItem lines="inset">
                  <IonIcon slot="start" color="medium" icon={call} />

                  <IonInput
                    type="number"
                    placeholder="Phone"
                    required
                    value={this.state.phone}
                    onIonChange={e =>
                      this.setState({
                        phone: (e.target as HTMLInputElement).value,
                      })
                    }
                  />
                </IonItem>
                <div style={{ margin: '10px' }}>
                  <IonItem lines="none">
                    <IonButton
                      type="submit"
                      disabled={
                        this.state.password.length === 0 &&
                        this.state.phone.length === 0
                          ? true
                          : false
                      }
                      routerLink="/home"
                      size="default"
                    >
                      Submit
                    </IonButton>
                  </IonItem>
                </div>
              </form>
            </div>
          ) : (
            <div className="welcome-card">
              <form onSubmit={this.handleSubmit}>
                <IonTitle>Let's add a password...</IonTitle>
                <IonItem lines="inset">
                  <IonIcon slot="start" color="medium" icon={lock} />

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

                <div style={{ margin: '10px' }}>
                  <IonItem lines="none">
                    <IonButton
                      type="submit"
                      disabled={
                        this.state.password.length === 0 &&
                        this.state.phone.length === 0
                          ? true
                          : false
                      }
                      routerLink="/home"
                      size="default"
                    >
                      Submit
                    </IonButton>
                  </IonItem>
                </div>
              </form>
            </div>
          )}
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
  auth: (email, password) => dispatch(auth(email, password)),
  signUpWithGoogleBooker: data => dispatch(signUpWithGoogleBooker(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);
