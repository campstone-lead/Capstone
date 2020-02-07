import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonInput, IonLabel, IonButton, IonCardTitle, IonCard, IonDatetime
} from '@ionic/react';
import React from 'react';
import '../../Tab1.css';
import { connect } from 'react-redux'
import { me } from '../../../store/user';
import { getOneBooker } from '../../../store/booker';
import { createdVenue } from '../../../store/booker'
import { createdEvent } from '../../../store/event'
// import './venue-form.css'

interface IMyComponentState {
  // imageUrl: string,
  // description: string,
  // date: string,
  // photo: string,
  event: object,

  currentVenue: number,
  // name: string,

}
interface IMyComponentProps {
  booker: any,
  // createVenue: (venue: object) => void,
  createEvent: (event: object) => void,
  fetchVenues: any;
  venues: any;
  user: object;
  me: any;

}

class AddEventForm extends React.Component<IMyComponentProps, IMyComponentState>  {
  constructor(props) {
    super(props);
    this.state = {
      event: {
        imageUrl: '',
        description: '',
        date: '',
        photo: '',
        name: ''
      },
      currentVenue: 0,
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    await this.props.me();
    console.log('this.props.user:', this.props.user)
    if (this.props.user !== undefined) {
      if (this.props.user['status'] === 'booker') {
        const id = this.props.user['id'];
        await this.props.fetchVenues(id);
        if (this.props.venues !== undefined && this.props.venues.length > 0) {
          await this.setState({ currentVenue: this.props.venues[0].id });
        }
      }
    }
  }

  handleSelect = e => {
    this.setState({ currentVenue: Number(e.target.value) });
  };

  handleSubmit(event) {
    event.preventDefault();
    this.props.createEvent(this.state)
  }

  render() {
    return (
      <IonPage>
        <IonHeader >
          <IonToolbar id="bar" >
            <IonTitle >Create a new event</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonCardTitle className="textBox">
          Please select the venue for this event
        </IonCardTitle>
        <IonCard>

          {this.props.venues && this.props.venues.length > 0 ?
            <div className="mainBoxSelect">
              <select onChange={this.handleSelect} className="selectBtn">
                {this.props.venues.map((venue, index) => (
                  <option value={venue.id} key={index}>
                    {venue.name}
                  </option>
                ))}
              </select>
            </div>
            :
            (
              <IonButton
                mode="ios"
                href="/addvenue"
                className="homeBtn"
                color="rgb(153, 178, 189);"
              >
                Add a venue
              </IonButton>
            )
          }
        </IonCard>



        {/* {this.state.currentVenue === 0 ? null :
(

)} */}
        <IonContent>
          <form onSubmit={this.handleSubmit} className='updatevenue' >

            <IonLabel className='venuelabel'>Event name</IonLabel>
            <IonItem >
              <IonInput clearInput type="text" required
                value={this.state.event["name"]}
                onIonChange={(e) => this.setState({
                  event: { ...this.state.event, name: (e.target as HTMLInputElement).value }
                })}
              />
            </IonItem>

            <IonLabel className='venuelabel'>Describe the event</IonLabel>
            <IonItem >
              <IonInput clearInput type="text"
                value={this.state.event["description"]}
                onIonChange={(e) => this.setState({
                  event: { ...this.state.event, description: (e.target as HTMLInputElement).value }
                })}
              />
            </IonItem>

            <IonLabel className='venuelabel'>Time</IonLabel>
            <IonItem >
              <IonDatetime
                value={this.state.event["date"]}
                placeholder="Select date and time"
                pickerFormat="MMM D YYYY h mm a"
                onIonChange={(e) => this.setState({
                  event: { ...this.state.event, date: (e.target as HTMLInputElement).value }
                })}
              />
            </IonItem>

            {/* <IonLabel className='venuelabel'>Genres</IonLabel>
            <IonItem >
              <IonInput clearInput type="number" min='0' required
                value={this.state.event["capacity"]}
                onIonChange={(e) => this.setState({
                  event: {...this.state.event, capacity: (e.target as HTMLInputElement).value}
                })}
              />
            </IonItem> */}

            <IonButton color='secondary' >Upload a picture</IonButton>

            <IonItem routerLink="/profile">
              <IonButton type="submit">create</IonButton>
            </IonItem>
          </form>
        </IonContent>
      </IonPage>)
  }
}
const mapStateToProps = (state) => ({
  booker: state.booker,
  user: state.user,
  venues: state.booker.venues
})
const mapDispatchToProps = dispatch => {
  return {
    me: () => dispatch(me()),
    createVenue: (venue) => dispatch(createdVenue(venue)),
    fetchVenues: id => dispatch(getOneBooker(id)),
    createEvent: (event) => dispatch(createdEvent(event))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddEventForm);
