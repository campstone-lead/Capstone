import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonInput, IonButton, IonCard } from '@ionic/react';
import '../../Tab1.css';
import { connect } from 'react-redux'
import { updatedVenue } from '../../../store/booker'
interface IMyComponentState {
  password: string,
}
interface IMyComponentProps {
  booker: object,
  updateBooker: any

}
class Login extends React.Component<IMyComponentProps, IMyComponentState> {
  constructor(props) {
    super(props);
    this.state = {
      password: '',

    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.updateBooker(this.state);

  }
  render() {

    return (

      <IonPage>
        <IonHeader >
          <IonToolbar id="bar" >
            <IonTitle>Personal information</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent>
          <IonCard className="welcome-card">
            <form onSubmit={this.handleSubmit}>
              <IonTitle>Let's add a password...</IonTitle>

              <IonItem>

                <IonInput type="password" placeholder="Password" required
                  value={this.state.password}
                  onIonChange={(e) => this.setState({ password: (e.target as HTMLInputElement).value })}
                />
              </IonItem>


              <IonItem routerLink='/home' >
                <br></br>

                <IonButton type="submit" disabled={(this.state.password.length === 0) ? true : false}
                  onClick={() => {
                    window.localStorage.clear();
                  }}
                >Submit</IonButton>
              </IonItem>


            </form>

          </IonCard>
        </IonContent>
      </IonPage>
    )
  }
};
const mapStateToProps = (state) => ({
  booker: state.booker
})
const mapDispatchToProps = (dispatch) => ({
  updateBooker: (data) => dispatch(updatedVenue(data))
})
export default connect(mapStateToProps, mapDispatchToProps)(Login);
