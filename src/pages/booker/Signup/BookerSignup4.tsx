import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonInput, IonButton, IonCard } from '@ionic/react';
import '../../Tab1.css';
import { connect } from 'react-redux'
import './BookerSignup2.css';
import { updatedVenue } from '../../../store/booker'
interface IMyComponentState {
  description: string
}
interface IMyComponentProps {
  booker: object,
  updateVenue: any
}
class Login extends React.Component<IMyComponentProps, IMyComponentState> {
  constructor(props) {
    super(props);
    this.state = {
      description: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleSubmit(event) {
    event.preventDefault();
    this.props.updateVenue(this.state)

  }
  componentDidMount() {
    let booker = window.localStorage.getItem('booker')
    booker = JSON.parse(booker || '');
    let newBooker = booker || {};
    if (newBooker["venue"]["description"] !== undefined) {
      this.setState({
        description: newBooker["venue"].description
      })
    }
  }
  render() {
    return (

      <IonPage>
        <IonHeader >
          <IonToolbar id="bar" >
            <IonTitle>Venue description</IonTitle>
            {/* <IonSearchbar className="search" placeholder="Search for venue..."  color="red"/> */}
          </IonToolbar>
        </IonHeader>

        <IonContent>

          <IonCard className="welcome-card">
            <form onSubmit={this.handleSubmit} >
              <IonTitle>Add venue description here...</IonTitle>
              <IonItem >

                <IonInput type="text" required
                  value={this.state.description}
                  onIonChange={(e) => this.setState({ description: (e.target as HTMLInputElement).value })}
                  placeholder="Description"
                  className={"description"}
                />
              </IonItem>

              <IonItem routerLink="/signup/booker/5">
                <br></br>

                <IonButton size="small" className="next" type="submit"
                  disabled={(this.state.description.length === 0)}
                >Next</IonButton>

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
  updateVenue: (data) => dispatch(updatedVenue(data))
})
export default connect(mapStateToProps, mapDispatchToProps)(Login);
