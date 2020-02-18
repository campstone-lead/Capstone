import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonInput, IonLabel, IonButton, IonIcon, IonDatetime, IonAvatar,
} from '@ionic/react';
import React from 'react';
import axios from 'axios'
import '../../Tab1.css';
import { connect } from 'react-redux'
import { me } from '../../../store/user';
import { getOneBooker } from '../../../store/booker';
import { createdEvent } from '../../../store/event'
import { time, headset, create } from 'ionicons/icons';
import { firebase, firebase_storage_api } from '../../config'
const entryURL = (process.env.NODE_ENV === 'production' ? 'https://harmonious-capstone.herokuapp.com/' : 'http://localhost:8080/')

axios.defaults.withCredentials = true;
interface IMyComponentState {
  event: object,
  selectedFile: any;
  currentVenue: number,
  photo: string
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
        imageUrl: 'https://www.ggcatering.com/images/venues/default_venue_2.jpg',
        description: '',
        date: '',
        name: '',


      },
      currentVenue: 0,
      selectedFile: null,
      photo: 'https://www.ggcatering.com/images/venues/default_venue_2.jpg'
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    await this.props.me();

    if (this.props.user !== undefined) {
      if (this.props.user['status'] === 'booker') {
        const id = this.props.user['id'];
        await this.props.fetchVenues(id);
        if (this.props.venues !== undefined && this.props.venues.length > 0) {
          await this.setState({ currentVenue: this.props.venues[0].id });
        }
      }
    }
    let event = window.localStorage.getItem('event')
    if (event !== null) {
      event = JSON.parse(event || '')
      let newEvent = event || {};
      await this.setState({ photo: newEvent['imageUrl'] })
    }

  }

  handleSelect = e => {
    this.setState({ currentVenue: Number(e.target.value) });

  };

  async handleSubmit(e) {
    e.preventDefault();
    const event = {
      name: this.state.event['name'],
      description: this.state.event['description'],
      date: this.state.event['date'],
      imageURL: this.state.photo,
      venueId: this.state.currentVenue
    }
    await this.props.createEvent(event)
    window.localStorage.clear();
  }
  onChangeHandler = async  e => {
    e.persist()
    await this.setState({
      selectedFile: e.target.files[0]

    })
    let file = this.state.selectedFile;
    let img = document.getElementsByTagName('img')[0];
    img.src = URL.createObjectURL(file)
  }
  onClickHandler = async (e) => {
    e.preventDefault()

    let file = this.state.selectedFile;
    var metadata = { contentType: 'image/jpeg' };
    try {
      var storageRef = firebase.storage().ref(`email-${this.props.user['email']}-status${this.props.user['status']}/` + file.name)
      let task = storageRef.put(file, metadata);
      task.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => {
          console.log('Photo uploaded')
        },
        (err) => {
          console.log(err)
        },
        () => {
          task.snapshot.ref.getDownloadURL().then(async (downloadURL) => {
            await this.setState({ photo: downloadURL })

          })
        }
      )
    } catch (error) {
      console.log(error)
      console.log(error.message)
    }

    window.localStorage.setItem('event', JSON.stringify(this.state))
  }
  render() {
    return (
      <IonPage>
        <IonHeader >
          <IonToolbar id="bar" >
            <IonTitle >Create a new event</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent style={{
          '--background':
            'url(https://media.idownloadblog.com/wp-content/uploads/2015/06/iTunes-El-Capitan-Wallaper-iPad-Blank-By-Jason-Zigrino.png)',
        }}>



          <div style={{ display: "flex", justifyContent: "space-around", flexDirection: "column", margin: "30px" }}>
            <div>
              {
                this.props.venues && this.props.venues.length > 0 ?

                  (

                    <div className="mainBoxSelect">
                      <IonLabel>
                        Please select the venue for this event
                 </IonLabel>
                      <select onChange={this.handleSelect} className="selectBtn"
                        style={{ backgroundColor: 'white' }}
                      >
                        {this.props.venues.map((venue, index) => (
                          <option value={venue.id} key={index} >
                            {venue.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  ) :
                  (
                    <IonButton
                      mode="ios"
                      href="/addvenue"



                    >
                      Add a venue
              </IonButton>
                  )

              }
            </div>

            <div style={{
              display: "flex", justifyContent: "space-around",
              flexDirection: "column"
            }} >
              <div>
                <div style={{ display: "flex", justifyContent: "space-around", margin: "20px", alignContent: "center", flexDirection: 'row' }}>
                  <IonAvatar style={{ width: '170px', height: '170px', borderRadius: "50px" }}>
                    <img src={this.state.photo} alt='img' />
                  </IonAvatar>

                </div>
                < div style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>

                  <input type='file' name='file' onChange={this.onChangeHandler} placeholder="Choose picture" />
                  <IonButton type="button" onClick={this.onClickHandler} size="default" >Upload a picture</IonButton>
                </div>
              </div>
              <div>


                <form onSubmit={this.handleSubmit} className='updatevenue' >

                  <IonLabel className='venuelabel'>Event name</IonLabel>
                  <IonItem lines="inset" style={{ marginBottom: "15px" }} color='none'>
                    <IonIcon mode="ios" slot="start" color="black" icon={headset} />
                    <IonInput clearInput type="text" required
                      value={this.state.event["name"]}
                      style={{ width: "250px" }}
                      onIonChange={(e) => this.setState({
                        event: { ...this.state.event, name: (e.target as HTMLInputElement).value }
                      })}
                    />
                  </IonItem>

                  <IonLabel className='venuelabel'>Describe the event</IonLabel>
                  <IonItem lines="inset" style={{ marginBottom: "10px" }} color='none'>
                    <IonIcon mode="ios" slot="start" color="black" icon={create} />
                    <IonInput clearInput type="text"

                      style={{ width: "250px" }}
                      value={this.state.event["description"]}
                      onIonChange={(e) => this.setState({
                        event: { ...this.state.event, description: (e.target as HTMLInputElement).value }
                      })}
                    />
                  </IonItem>

                  <IonLabel className='venuelabel'>Time</IonLabel>
                  <IonItem lines="inset" style={{ marginBottom: "10px" }}
                    color='none'
                  >
                    <IonIcon mode="ios" slot="start" color="black" icon={time} />
                    <IonDatetime
                      style={{ width: "250px" }}
                      color="black"
                      value={this.state.event["date"]}
                      placeholder="Select date and time"
                      pickerFormat="MMM D YYYY h mm a"
                      onIonChange={(e) => this.setState({
                        event: { ...this.state.event, date: (e.target as HTMLInputElement).value }
                      })}
                    />
                  </IonItem>





                  <IonItem routerLink="/profile" lines="none" style={{
                    '--background':
                      'none',
                  }}>
                    <IonButton type="submit" size="default">create</IonButton>
                  </IonItem>
                </form>
              </div>
            </div>
          </div>
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
