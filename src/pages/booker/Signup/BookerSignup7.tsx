import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonInput, IonButton, IonCard } from '@ionic/react';
import '../../Tab1.css';
import { connect } from 'react-redux'
import { updatedVenue } from '../../../store/booker'
import { auth } from '../../../store/user'
interface IMyComponentState {
  password: string,
}
interface IMyComponentProps {
  booker: object,
  updateBooker: any,
  auth: any

}
class Login extends React.Component<IMyComponentProps, IMyComponentState> {
  constructor(props) {
    super(props);
    this.state = {
      password: '',

    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  async handleSubmit(event) {
    event.preventDefault();
    await this.props.updateBooker(this.state);
    console.log('local storage:', window.localStorage.getItem("email"))
    await this.props.auth(JSON.parse(window.localStorage.getItem("email") || ''), this.state.password)
    window.localStorage.clear();

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


              <IonItem>
                <br></br>

                <IonButton type="submit" disabled={(this.state.password.length === 0) ? true : false}
                  routerLink='/home'
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
  updateBooker: (data) => dispatch(updatedVenue(data)),
  auth: (email, password) => dispatch(auth(email, password))
})
export default connect(mapStateToProps, mapDispatchToProps)(Login);
