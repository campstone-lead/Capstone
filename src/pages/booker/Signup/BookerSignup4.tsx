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
  IonCard,
} from '@ionic/react';
import '../../Tab1.css';
import { connect } from 'react-redux';
import './BookerSignup2.css';
import { signUpVenue } from '../../../store/booker';
interface IMyComponentState {
  description: string;
}
interface IMyComponentProps {
  booker: object;
  signUpVenue: any;
}
class Login extends React.Component<IMyComponentProps, IMyComponentState> {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.signUpVenue(this.state);
  }
  componentDidMount() {
    let venue = window.localStorage.getItem('venue');
    venue = JSON.parse(venue || '');
    let newVenue = venue || {};
    if (newVenue['description'] !== undefined) {
      this.setState({
        description: newVenue['description'],
      });
    }
  }
  render() {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar id="bar">
            <IonTitle>Venue description</IonTitle>
            {/* <IonSearchbar className="search" placeholder="Search for venue..."  color="red"/> */}
          </IonToolbar>
        </IonHeader>

        <IonContent>
          <IonCard className="welcome-card">
            <form onSubmit={this.handleSubmit}>
              <IonTitle>Add venue description here...</IonTitle>
              <IonItem>
                <IonInput
                  type="text"
                  required
                  value={this.state.description}
                  onIonChange={e =>
                    this.setState({
                      description: (e.target as HTMLInputElement).value,
                    })
                  }
                  placeholder="Description"
                  className={'description'}
                />
              </IonItem>

              <IonItem>
                <br></br>

                <IonButton
                  size="small"
                  className="next"
                  type="submit"
                  disabled={this.state.description.length === 0}
                  routerLink="/signup/booker/5"
                >
                  Next
                </IonButton>
              </IonItem>
            </form>
          </IonCard>
        </IonContent>
      </IonPage>
    );
  }
}
const mapStateToProps = state => ({
  booker: state.booker,
});
const mapDispatchToProps = dispatch => ({
  signUpVenue: data => dispatch(signUpVenue(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);
