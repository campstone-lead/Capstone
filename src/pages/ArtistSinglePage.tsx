import React from 'react';

import {
  IonContent,
  IonPage,
  IonButton,
  IonBackButton,
  IonHeader,
  IonToolbar,
  IonSelectOption,
  IonSelect,
} from '@ionic/react';
import './Tab1.css';
import { connect } from 'react-redux';
import { me } from '../store/user';
import { gotOneEvents } from '../store/event';
import {
  fetchOneArtists,
  bookArtist,
  sendRequest,
  sendResponse,
} from '../store/artist';
import Loading from './loading'
import { getBookerEvents } from '../store/booker';
import history from './history';
import ArtistProfileComponent from './ArtistProfileComponent';
interface IMyComponentProps {
  user: object;
  genres: Array<string>;
  me: any;
  artist: object;
  fetchOneArtists: any;
  bookArtist: any;
  bookingStatus: any;
  events: any;
  getBookerEvents: any;
  gotOneEvents: any;
  selectedEvent: object;
  sendRequest: any;
  sendResponse: any;
}
interface IMyComponentState {
  status: any;
  currentEvent: number;
  bookedArtistInfo: object;
  localStatus: string;
  sender: string;
  bookedArtistEvent: object;
}
class ArtistSinglePage extends React.Component<
  IMyComponentProps,
  IMyComponentState
  > {
  constructor(props) {
    super(props);
    this.state = {
      status: null,
      currentEvent: 1,
      bookedArtistInfo: {},
      localStatus: '',
      sender: '',
      bookedArtistEvent: {},
    };
  }
  handleChange = async e => {
    await this.setState({ currentEvent: Number(e.target.value) });

    if (this.props.bookingStatus !== null) {
      let getArtistStatusforCurrentVenue = this.props.bookingStatus.filter(
        event => event.eventId === Number(this.state.currentEvent)
      );

      if (getArtistStatusforCurrentVenue.length === 1) {
        await this.setState({
          localStatus: getArtistStatusforCurrentVenue[0]['status'] || '',
          sender: getArtistStatusforCurrentVenue[0]['sender'] || '',
        });
      } else {
        await this.setState({
          localStatus: '',
          sender: '',
        });
      }
    }
  };
  handleClickRespond = async response => {
    let eventId = Number(this.state.currentEvent);
    let artistId = this.props.artist['id'];
    let filter = this.props.events.filter(el => el.id === eventId);
    let req = { status: response, eventId, artistId };
    await this.props.sendResponse(req);
    await this.setState({
      localStatus: response,
      bookedArtistEvent: filter[0],
    });
  };
  handleClick = async () => {
    this.setState({ localStatus: 'pending' });
    let request = {
      eventId: Number(this.state.currentEvent),
      artistId: this.props.artist['id'],
      sender: 'booker',
    };

    await this.props.sendRequest(request);
  };
  async componentDidMount() {
    const id = Number(history.location.pathname.slice(12));
    await this.props.me();
    await this.props.fetchOneArtists(id);
    const bookerId = this.props.user['id'];
    await this.props.getBookerEvents(bookerId);
    if (this.props.events.length !== 0) {
      await this.setState({ currentEvent: this.props.events[0].id });
    }
    await this.props.events.forEach(async el => {
      await this.props.gotOneEvents(el.id);
      let artist = this.props.selectedEvent['artists'].filter(
        artist => artist.artistId === this.props.artist['id']
      );
      if (artist.length >= 1) {
        await this.setState({ status: this.props.bookingStatus });
        let getArtistStatusforCurrentVenue = this.props.bookingStatus.filter(
          event => event.eventId === this.state.currentEvent
        );
        if (getArtistStatusforCurrentVenue.length !== 0) {
          await this.setState({
            localStatus: getArtistStatusforCurrentVenue[0]['status'] || '',
            sender: getArtistStatusforCurrentVenue[0]['sender'] || '',
          });
        }
      }
    });
  }

  render() {

    if (!this.props.artist) {
      return (
        <div className="home">
          <Loading />
        </div>
      )
    }
    return (
      <IonPage>
        <IonHeader mode="ios">
          <IonToolbar mode="ios" style={{ '--background': '#fcbcdb' }}>
            <div className="tabHeader">
              <img
                src="https://www.freepnglogos.com/uploads/music-logo-black-and-white-png-21.png"
                alt="logo.png"
                className="logo"
              />
              <h3 style={{ textAlign: 'center' }}>
                {this.props.artist['name']}
              </h3>
            </div>
          </IonToolbar>
        </IonHeader>
        <IonContent
          style={{
            '--background':
              'url(https://media.idownloadblog.com/wp-content/uploads/2015/06/iTunes-El-Capitan-Wallaper-iPad-Blank-By-Jason-Zigrino.png)',
          }}
        >
          <IonBackButton
            defaultHref="/home/"
            mode="ios"
            text=" Back "
            color="dark"
            className="backBtn"
          />

          <div className="profile" style={{ marginTop: '50px' }}>
            <ArtistProfileComponent
              genres={this.props.genres}
              artist={this.props.artist}
              history={this.props['history']}
            />

            {this.props.user['status'] !== 'artist' &&
              this.props.events !== undefined && (
                <IonSelect
                  cancelText="Cancel"
                  okText="Save"
                  mode="ios"
                  onIonChange={this.handleChange}
                  placeholder="Choose an event"
                >
                  {this.props.events &&
                    this.props.events.length !== 0 &&
                    this.props.events.map((event, index) => (
                      <IonSelectOption value={event.id} key={index}>
                        {event.name} - {event.venueName}
                      </IonSelectOption>
                    ))}
                </IonSelect>
              )}
            {this.props.user['status'] !== 'artist' &&
              (this.state.sender === 'booker' ||
                this.state.sender.length === 0 ? (
                  (this.props.bookingStatus === null ||
                    this.state.bookedArtistInfo['status'] === undefined) &&
                    this.state.localStatus !== 'pending' &&
                    this.state.localStatus !== 'booked' &&
                    this.state.localStatus !== 'declined' ? null : this.props
                      .bookingStatus !== null ? (
                        <h5 style={{ color: 'black', fontSize: '15.5px' }}>
                          This artist is {this.state.localStatus + '  '}
                          at the selected venue.
                  </h5>
                      ) : null
                ) : (this.props.bookingStatus !== null ||
                  this.state.bookedArtistInfo['status'] !== undefined) &&
                  this.state.localStatus === 'pending' ? (
                    <h5
                      style={{
                        color: 'black',
                        fontSize: '15.5px',
                        padding: '15px',
                      }}
                    >
                      You have an incoming request from {this.props.artist['name']}!
                </h5>
                  ) : (
                    <h5
                      style={{
                        color: 'black',
                        fontSize: '15.5px',
                        padding: '15px',
                      }}
                    >
                      You have {this.state.localStatus + '  '}{' '}
                      {this.props.artist['name']}!
                </h5>
                  ))}
            {this.props.user['status'] !== 'artist' &&
              (this.state.sender === 'booker' ||
                this.state.sender.length === 0 ? (
                  this.props.events !== undefined &&
                    this.props.events.length !== 0 ? (
                      <IonButton
                        onClick={async () => await this.handleClick()}
                        disabled={
                          this.state.localStatus.length === 0 ? false : true
                        }
                      >
                        {(this.props.bookingStatus === null ||
                          this.state.bookedArtistInfo['status'] === undefined) &&
                          this.state.localStatus === 'pending'
                          ? 'Pending request sent'
                          : this.state.localStatus === 'booked'
                            ? 'Booked'
                            : this.state.localStatus === 'declined'
                              ? 'declined'
                              : 'Book me'}
                      </IonButton>
                    ) : (
                      <h5 style={{ color: 'black', fontSize: '15.5px' }}>
                        You cannot add any artists if you have no events!{' '}
                      </h5>
                    )
                ) : (
                  <div>
                    <IonButton
                      disabled={
                        this.state.localStatus === 'declined' ||
                          this.state.localStatus === 'booked'
                          ? true
                          : false
                      }
                      onClick={() => this.handleClickRespond('booked')}
                    >
                      Accept
                  </IonButton>
                    <IonButton
                      disabled={
                        this.state.localStatus === 'declined' ||
                          this.state.localStatus === 'booked'
                          ? true
                          : false
                      }
                      onClick={() => this.handleClickRespond('declined')}
                    >
                      Decline
                  </IonButton>
                  </div>
                ))}

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
  fetchOneArtists: id => dispatch(fetchOneArtists(id)),
  bookArtist: info => dispatch(bookArtist(info)),
  getBookerEvents: id => dispatch(getBookerEvents(id)),
  gotOneEvents: (id, userId, userStaus) => dispatch(gotOneEvents(id, userId, userStaus)),
  sendRequest: request => dispatch(sendRequest(request)),
  sendResponse: data => dispatch(sendResponse(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ArtistSinglePage);
