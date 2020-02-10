import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonInput, IonLabel, IonButton, IonCard, IonDatetime
} from '@ionic/react';
import React from 'react';
import '../../Tab1.css';
import { connect } from 'react-redux'
import { me } from '../../../store/user';
import { getOneBooker } from '../../../store/booker';
import { createdEvent } from '../../../store/event'

interface IMyComponentState {
  event: object,

  currentVenue: number,
  // defaultedVenue: number

}
interface IMyComponentProps {
  booker: any,
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
        name: ''
      },
      currentVenue: 0,
      // defaultedVenue: 0,
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    await this.props.me();
    // if (this.props["match"]["params"]["venueId"]) await this.setState({ defaultedVenue: this.props["match"]["params"]["venueId"] })

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

        <IonLabel>
          Please select the venue for this event
        </IonLabel>
        <IonCard>

          {this.props.venues && this.props.venues.length > 0 ?
            <div className="mainBoxSelect">
              {/* <select onChange={this.handleSelect} defaultValue={this.state.defaultedVenue} className="selectBtn"> */}
              <select onChange={this.handleSelect} className="selectBtn">
                {this.props.venues.map((venue, index) => (
                  <option value={venue.id} key={index} >
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



            <IonButton color='secondary' >Upload a picture</IonButton>

            <IonItem routerLink="/profile">
              <IonButton type="submit">create</IonButton>
            </IonItem>
          </form>
        </IonContent>
      </IonPage >)
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
    fetchVenues: id => dispatch(getOneBooker(id)),
    createEvent: (event) => dispatch(createdEvent(event))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddEventForm);
