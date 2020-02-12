import React from 'react';
import { IonContent, IonHeader, IonPage, IonItem, IonList, IonCardHeader, IonCardTitle, IonCardSubtitle, IonIcon } from '@ionic/react';
import { notificationsOutline } from 'ionicons/icons'
import './Tab1.css';
import { connect } from 'react-redux'
import { me } from '../store/user'
import { fetchEvents, gotOneEvents } from '../store/event'
import { fetchOneVenue, getAllVenues } from '../store/venue';
import { sendRequest, sendResponse, fetchOneArtists } from '../store/artist';
import { getOneBooker, getBookerEvents } from '../store/booker'
import { link } from 'fs';
import { Link } from 'react-router-dom'

interface IMyComponentProps {
  user: object,
  me: any,
  venue: object,
  booker: object,
  fetchOneVenue: any,
  getOneBooker: any,
  getBookerEvents: any,
  events: any,
  sendRequest: any,
  sendResponse: any,
  bookingStatus: any,
  gotOneEvents: any,
  selectedEvent: any,
  fetchOneArtists: any,
  bookerVenues: any,
  attendedEvents: any,
  fetchEvents: any,
  currentArtist: any,
  getAllVenues: any,
  venues: any


}

interface IMyComponentState {
  localStatus: string,
  sender: string,
  currentEvent: any,
  bookingInfo: any,
  bookerEvents: any,
  artistRequests: any
}

class NotificationWall extends React.Component<IMyComponentProps, IMyComponentState> {
  constructor(props) {
    super(props)
    this.state = {
      localStatus: '',
      sender: '',
      currentEvent: '',
      bookingInfo: {},
      bookerEvents: [],
      artistRequests: []
    }
  }


  async componentDidMount() {
    await this.props.me();
    await this.props.fetchEvents();
    if (this.props.user['status'] === 'booker') {
      await this.props.getOneBooker(this.props.user['id']);
      let bEvents = [];
      await this.props.bookerVenues.forEach(venues => {
        bEvents = this.props.events.filter(event => event.venueId === venues.id)
        bEvents.forEach(async (bookerEvent) => {
          await this.props.gotOneEvents(bookerEvent['id'])
          await this.setState({ bookerEvents: [...this.state.bookerEvents, this.props.selectedEvent] })
          await this.props.selectedEvent['artists'].forEach((artist) => {
            this.setState({ artistRequests: [...this.state.artistRequests, { artist, event: this.props.selectedEvent.event }] })
          })
        })
      })


    }
    else if (this.props.user['status'] === 'artist') {
      await this.props.getAllVenues();
      await this.props.fetchEvents();
      let bEvents = [];
      await this.props.venues.forEach(venue => {
        bEvents = this.props.events.filter(event => event.venueId === venue.id)
        bEvents.forEach(async (bookerEvent) => {
          await this.props.gotOneEvents(bookerEvent['id'])
          await this.setState({ bookerEvents: [...this.state.bookerEvents, this.props.selectedEvent] })
          await this.props.selectedEvent['artists'].forEach((artist) => {
            this.setState({ artistRequests: [...this.state.artistRequests, { artist, event: this.props.selectedEvent.event }] })
          })
        })
      })

    }

  }



  render() {


    return (
      <IonPage>
        <IonHeader mode="ios" style={{ '--background': '#f3d2d1' }}>
          <IonCardHeader>
            <IonCardTitle>Notifications</IonCardTitle>
          </IonCardHeader>
        </IonHeader>
        <IonContent style={{ '--background': '#f3d2d1' }}>

          <IonList lines="inset">
            {
              this.state.artistRequests.length !== 0 &&
              this.state.artistRequests.map((artist, index) => {
                if (this.props.user['status'] === 'booker') {

                  if (((artist.artist.status === 'pending' && artist.artist.sender === 'artist') || (artist.artist.status === 'booked' && artist.artist.sender === 'booker') ||
                    (artist.artist.status === 'declined' && artist.artist.sender === 'booker')) && artist.artist.bookerId === this.props.user['id'])
                    return (

                      <IonItem
                        key={index}
                        href={`/allArtists/${artist.artist.artistId}`}
                      >
                        <IonIcon slot="start" color="medium" icon={notificationsOutline} />
                        <IonCardSubtitle style={{ padding: '5px', wordWrap: ' break-word', }}
                          color={(artist.artist.status === 'pending') ? 'black' : ''}
                        >
                          {(artist.artist.status === 'pending' && artist.artist.sender === 'artist') ? `You have a pending request from ${artist.artist.artistName} ` : (artist.artist.sender === 'booker') && `Your request to ${artist.artist.artistName} has been ${artist.artist.status === 'booked' ? 'approved' : 'declined'}`
                          }
                          {' '} for {'  '} {artist.event.name} at {'  '}{artist.event.venueName}
                        </IonCardSubtitle>
                      </IonItem>



                    )
                }
                else {

                  if (((artist.artist.status === 'pending' && artist.artist.sender === 'booker') || (artist.artist.status === 'booked' && artist.artist.sender === 'artist') ||
                    (artist.artist.status === 'declined' && artist.artist.sender === 'artist')) && artist.artist.artistId === this.props.user['id'])
                    return (
                      <IonItem key={index} href={`/allEvents/${artist.artist.eventId}`}>
                        <IonIcon slot="start" color="medium" icon={notificationsOutline} />
                        <IonCardSubtitle style={{ padding: '5px', wordWrap: ' break-word' }}
                          color={(artist.artist.status === 'pending') ? 'black' : ''}>
                          {(artist.artist.status === 'pending' && artist.artist.sender === 'booker') ? `You have a pending request from  ${artist.event.bookerName}.` : (artist.artist.sender === 'artist') && `Your request to ${artist.event.bookerName} has been ${artist.artist.status === 'booked' ? 'approved' : 'declined'}`
                          }
                          {' '} for {'  '} {artist.event.name} at {'  '}{artist.event.venueName}
                        </IonCardSubtitle>
                      </IonItem>
                    )
                }

                return null;
              })
            }
          </IonList>
        </IonContent>


      </IonPage>
    )
  }
}


const mapStateToProps = (state) => ({
  user: state.user,
  venue: state.venue.single,
  venues: state.venue.all,
  bookerVenues: state.booker.venues,
  booker: state.booker,
  events: state.event.allEvents,
  selectedEvent: state.event.currentEvent,
  bookingStatus: state.artist.status,
  currentArtist: state.artist.artist
})

const mapDispatchToProps = (dispatch) => ({
  me: () => dispatch(me()),
  fetchOneVenue: (id) => dispatch(fetchOneVenue(id)),
  getOneBooker: (id) => dispatch(getOneBooker(id)),
  getBookerEvents: (id) => dispatch(getBookerEvents(id)),
  sendRequest: (request) => dispatch(sendRequest(request)),
  sendResponse: (data) => dispatch(sendResponse(data)),
  gotOneEvents: (id) => dispatch(gotOneEvents(id)),
  fetchOneArtists: (id) => dispatch(fetchOneArtists(id)),
  fetchEvents: () => dispatch(fetchEvents()),
  getAllVenues: () => dispatch(getAllVenues())
})

export default connect(mapStateToProps, mapDispatchToProps)(NotificationWall);
