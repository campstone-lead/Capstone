import React from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonItem,
  IonLabel,
  IonButton,
  IonBackButton,
  IonList,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonSearchbar,
} from '@ionic/react';
import {
  logoInstagram,
  logoFacebook,
  call,
  mailOpen,
  musicalNote,
  microphone,
  musicalNotes,
} from 'ionicons/icons';
import './Tab1.css';
import { connect } from 'react-redux'
import { me } from '../store/user'
import { gotOneEvents } from '../store/event'
import { fetchOneArtists, bookArtist, sendRequest, sendResponse } from '../store/artist'
import { getBookerEvents } from '../store/booker'
import history from './history'
interface IMyComponentProps {
  user: object,
  genres: Array<string>,
  me: any,
  artist: object,
  fetchOneArtists: any,
  bookArtist: any,
  bookingStatus: any,
  events: any,
  getBookerEvents: any,
  gotOneEvents: any,
  selectedEvent: object,
  sendRequest: any,
  sendResponse: any
}
interface IMyComponentState {
  status: any,
  currentEvent: any,
  bookedArtistInfo: object,
  localStatus: string,
  sender: string,
  bookedArtistEvent: object
}
class ArtistSinglePage extends React.Component<
  IMyComponentProps,
  IMyComponentState
  > {
  constructor(props) {
    super(props);
    this.state = {
      status: null,
      currentEvent: '',
      bookedArtistInfo: {},
      localStatus: '',
      sender: '',
      bookedArtistEvent: {}
    }
  }
  handleChange = async e => {
    await this.setState({ currentEvent: e.target.value });

    if (this.props.bookingStatus !== null) {

      let getArtistStatusforCurrentVenue = this.props.bookingStatus.filter(event => event.eventId === Number(this.state.currentEvent))
      console.log(getArtistStatusforCurrentVenue)
      if (getArtistStatusforCurrentVenue.length === 1) {
        await this.setState({
          localStatus: getArtistStatusforCurrentVenue[0]['status'] || '',
          sender: getArtistStatusforCurrentVenue[0]['sender'] || ''
        })
      } else {
        await this.setState({
          localStatus: '',
          sender: ''
        })
      }
      console.log('heeere->>>>', this.state)
    }
  };
  handleClickRespond = async (response) => {
    let eventId = Number(this.state.currentEvent)
    let artistId = this.props.artist['id']
    let filter = this.props.events.filter((el) => el.id === eventId)
    let req = { status: response, eventId, artistId }
    await this.props.sendResponse(req)
    await this.setState({ localStatus: response, bookedArtistEvent: filter[0] })
  }
  handleClick = async () => {
    this.setState({ localStatus: 'pending' });
    let request = {
      eventId: Number(this.state.currentEvent),
      artistId: this.props.artist['id'],
      sender: 'booker'
    }

    await this.props.sendRequest(request);
  };
  async componentDidMount() {
    const id = Number(history.location.pathname.slice(12));
    await this.props.me();
    await this.props.fetchOneArtists(id)
    const bookerId = this.props.user['id']
    await this.props.getBookerEvents(bookerId)
    if (this.props.events.length !== 0)
      await this.setState({ currentEvent: this.props.events[0].id });

    await this.props.events.forEach(async el => {
      await this.props.gotOneEvents(el.id);
      let artist = this.props.selectedEvent['artists'].filter(
        artist => artist.artistId === this.props.artist['id']
      );
      console.log(artist)
      if (artist.length >= 1) {
        await this.setState({ status: this.props.bookingStatus });
        console.log('here', this.props.bookingStatus)
        let getArtistStatusforCurrentVenue = this.props.bookingStatus.filter(event => event.eventId === this.state.currentEvent)
        if (getArtistStatusforCurrentVenue.length !== 0) {
          await this.setState({
            localStatus: getArtistStatusforCurrentVenue[0]['status'] || '',
            sender: getArtistStatusforCurrentVenue[0]['sender'] || ''
          })
        }

      }
    });


  }

  render() {
    let genres = '';
    if (this.props.genres !== undefined) {
      this.props.genres.forEach((el, index) => {
        if (index !== this.props.genres.length - 1) {
          genres += el + ', ';
        } else genres += el;
      });
    }
    console.log(this.props.bookingStatus)
    return (
      <IonPage>
        <IonHeader mode="ios">
          <IonToolbar mode="ios">
            <div className="tabHeader">
              <img
                src="https://www.freepnglogos.com/uploads/music-logo-black-and-white-png-21.png"
                alt="logo.png"
                className="logo"
              />
              <IonSearchbar
                mode="ios"
                className="searchBar"
                animated
                showCancelButton="focus"
                cancelButtonText="x"
              ></IonSearchbar>
            </div>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonBackButton
            defaultHref="/home/"
            mode="ios"
            text=" Back "
            color="dark"
            className="backBtn"
          />
          <div className="profile">
            <img
              src={this.props.artist['imageURL']}
              alt={this.props.artist['firstName']}
              className="profileImage"
            />
            <IonCardHeader>
              <IonCardTitle>{this.props.artist['artistName']}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonCardSubtitle style={{ color: 'black', fontSize: '15.5px' }}>
                {this.props.artist['bio']}
              </IonCardSubtitle>
              <br></br>
              <IonList lines="inset">
                <IonItem>
                  <IonIcon slot="start" color="medium" icon={musicalNotes} />
                  <IonLabel style={{ padding: '5px' }}>
                    {' '}
                    {this.props.artist['type']}{' '}
                  </IonLabel>
                </IonItem>

                <IonItem>
                  <IonIcon slot="start" color="medium" icon={microphone} />
                  <IonLabel style={{ padding: '5px' }}>
                    {' '}
                    My genres are: {genres}{' '}
                  </IonLabel>
                </IonItem>

                <IonItem>
                  <IonIcon slot="start" color="medium" icon={mailOpen} />
                  <IonLabel style={{ padding: '5px' }}>
                    {this.props.artist['email']}{' '}
                  </IonLabel>
                </IonItem>
                <IonItem>
                  <IonIcon slot="start" color="medium" icon={call} />
                  <IonLabel style={{ padding: '5px' }}>
                    {' '}
                    {this.props.artist['phone']}{' '}
                  </IonLabel>
                </IonItem>
              </IonList>

              <IonTabBar slot="bottom">
                <IonTabButton tab="tab2">
                  <IonItem href={this.props.artist['instagramUrl']}>
                    <IonIcon icon={logoInstagram} />
                  </IonItem>
                  <IonLabel>Instagram</IonLabel>
                </IonTabButton>

                <IonTabButton tab="tab2">
                  <IonItem href={this.props.artist['spotifyUrl']}>
                    <IonIcon icon={musicalNote} />
                  </IonItem>
                  <IonLabel>Spotify</IonLabel>
                </IonTabButton>

                <IonTabButton tab="tab2">
                  <IonItem href={this.props.artist['facebookUrl']}>
                    <IonIcon icon={logoFacebook} />
                  </IonItem>
                  <IonLabel>Facebook</IonLabel>
                </IonTabButton>
              </IonTabBar>
            </IonCardContent>
            {(this.props.events !== undefined) &&
              <select onChange={this.handleChange}>
                {this.props.events &&
                  this.props.events.length !== 0 &&
                  this.props.events.map((event, index) => (
                    <option value={event.id} key={index}>
                      {event.name} - {event.venueName}
                    </option>
                  ))}
              </select>}
            {(this.state.sender === 'booker' || this.state.sender.length === 0) ?

              ((this.props.bookingStatus === null || this.state.bookedArtistInfo['status'] === undefined) && (this.state.localStatus !== 'pending') && (this.state.localStatus !== 'booked') && (this.state.localStatus !== 'declined') ?
                null :

                this.props.bookingStatus !== null ?
                  <IonCardSubtitle style={{ "color": "black", "fontSize": "15.5px" }}>This artist is {this.state.localStatus}
                    {'  '}
                    at the selected venue.
  </IonCardSubtitle> : null
              ) : (this.props.bookingStatus !== null || this.state.bookedArtistInfo['status'] !== undefined) && (this.state.localStatus === 'pending') ?
                <IonCardSubtitle>You have an incoming request from {this.props.artist['artistName']}!</IonCardSubtitle> :
                <IonCardSubtitle>You have {this.state.localStatus} {this.props.artist['artistName']}!</IonCardSubtitle>
            }
            {
              (this.state.sender === 'booker' || this.state.sender.length === 0) ? (this.props.events !== undefined && this.props.events.length !== 0 ?
                <IonButton onClick={async () => await this.handleClick()} disabled={(this.state.localStatus.length === 0) ? false : true}>
                  {(this.props.bookingStatus === null || this.state.bookedArtistInfo['status'] === undefined) && (this.state.localStatus === 'pending') ?
                    'Pending request sent' :
                    (this.state.localStatus === 'booked') ?
                      'Booked' : (this.state.localStatus === 'declined') ? 'declined' : 'Book me'}

                </IonButton> : <IonCardSubtitle style={{ "color": "black", "fontSize": "15.5px" }}>You cannot add any artists if you have no events! </IonCardSubtitle>) : (
                  <div>
                    <IonButton disabled={(this.state.localStatus === 'declined' || this.state.localStatus === 'booked') ? true : false}
                      onClick={() => this.handleClickRespond('booked')}

                    >Accept</IonButton>
                    <IonButton disabled={(this.state.localStatus === 'declined' || this.state.localStatus === 'booked') ? true : false}
                      onClick={() => this.handleClickRespond('declined')}
                    >Decline</IonButton>
                  </div>
                )
            }

            <br></br>
            <br></br>
          </div>
        </IonContent>
      </IonPage>
    );
  }
}
const mapStateToProps = state => ({
  user: state.user,
  artist: state.artist.artist,
  genres: state.artist.artist.genres,
  events: state.booker.bookerEvents,
  selectedEvent: state.event.currentEvent,
  bookingStatus: state.artist.status,
});
const mapDispatchToProps = dispatch => ({
  me: () => dispatch(me()),
  fetchOneArtists: (id) => dispatch(fetchOneArtists(id)),
  bookArtist: (info) => dispatch(bookArtist(info)),
  getBookerEvents: (id) => dispatch(getBookerEvents(id)),
  gotOneEvents: (id) => dispatch(gotOneEvents(id)),
  sendRequest: (request) => dispatch(sendRequest(request)),
  sendResponse: (data) => dispatch(sendResponse(data))
})
export default connect(mapStateToProps, mapDispatchToProps)(ArtistSinglePage);
