import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonInput, IonButton, IonIcon } from '@ionic/react';
import '../../Tab1.css';
import { connect } from 'react-redux';
import './BookerSignup2.css';
import {
  people
} from 'ionicons/icons';

import { signUpVenue } from '../../../store/booker'
interface IMyComponentState {
  capacity: string;
}
interface IMyComponentProps {
  booker: object;
  signUpVenue: any;
}
class Login extends React.Component<IMyComponentProps, IMyComponentState> {
  constructor(props) {
    super(props);
    this.state = {
      capacity: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.signUpVenue({ capacity: Number(this.state.capacity) });
  }
  componentDidMount() {
    let venue = window.localStorage.getItem('venue');
    venue = JSON.parse(venue || '');
    let newVenue = venue || {};
    if (newVenue['capacity'] !== undefined) {
      this.setState({
        capacity: String(newVenue['capacity']),
      });
    }
  }
  render() {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar id="bar">
            <IonTitle>Venue capacity</IonTitle>
            {/* <IonSearchbar className="search" placeholder="Search for venue..."  color="red"/> */}
          </IonToolbar>
        </IonHeader>

        <IonContent>
          <div className="welcome-card">
            <form onSubmit={this.handleSubmit} >
              <IonTitle>How many people can fit in your venue?</IonTitle>
              <IonItem lines="inset">
                <IonIcon slot="start" color="medium" icon={people} />
                <IonInput type="text" required
                  value={this.state.capacity}
                  onIonChange={e =>
                    this.setState({
                      capacity: (e.target as HTMLInputElement).value,
                    })
                  }
                  placeholder="Capacity"
                  className={'description'}
                />
              </IonItem>



              <div>
                <br></br>

                <IonButton
                  size="small"
                  className="next"
                  type="submit"
                  disabled={this.state.capacity.length === 0}
                  routerLink="/signup/booker/6"
                >Next</IonButton>

              </div>


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
  signUpVenue: data => dispatch(signUpVenue(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);
