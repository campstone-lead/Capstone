import React from 'react';
import { IonContent, IonHeader, IonPage, IonToolbar, IonItem, IonLabel, IonButton, IonBackButton, IonList, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonTabBar, IonTabButton, IonIcon, IonSearchbar } from '@ionic/react';
import { logoInstagram, logoFacebook, call, mailOpen, musicalNote, microphone, musicalNotes } from 'ionicons/icons'
import './Tab1.css';
import { connect } from 'react-redux'
import { me } from '../store/user'
import { gotOneEvents } from '../store/event'
import { fetchOneArtists, bookArtist } from '../store/artist'
import { getBookerEvents } from '../store/booker'
import history from './history'
interface IMyComponentProps {
  user: object,
  genres: Array<string>,
  me: any,
  artist: object,
  fetchOneArtists: any,
  bookArtist: any,
  bookingStatus: string,
  events: any,
  getBookerEvents: any,
  gotOneEvents: any,
  selectedEvent: object

}
interface IMyComponentState {
  status: string,
  currentEvent: any
}
class ArtistSinglePage extends React.Component<IMyComponentProps, IMyComponentState> {
  constructor(props) {
    super(props)
    this.state = {
      status: 'none',
      currentEvent: ''
    }
  }
  handleChange = async e => {
    this.setState({ currentEvent: e.target.value });

  };
  handleClick = async () => {

  }
  async componentDidMount() {
    const id = Number(history.location.pathname.slice(12))
    await this.props.me();
    await this.props.fetchOneArtists(id)
    const bookerId = this.props.user['id']
    await this.props.getBookerEvents(bookerId)
    this.setState({ currentEvent: this.props.events[0].id })
    this.setState({ status: this.props.bookingStatus })

  }

  render() {

    let genres = '';
    if (this.props.genres !== undefined) {
      this.props.genres.forEach((el, index) => {
        if (index !== this.props.genres.length - 1) {
          genres += el + ', '
        }
        else genres += el;
      })
    }
    console.log(this.props.bookingStatus)
    return (
      < IonPage >
        <IonHeader mode="ios"  >
          <IonToolbar mode="ios" >
            <div className="tabHeader">
              <img src="https://www.freepnglogos.com/uploads/music-logo-black-and-white-png-21.png" alt="logo.png" className="logo" />
              <IonSearchbar
                mode="ios"
                className="searchBar"
                animated
                showCancelButton="focus"
                cancelButtonText='x'
              >
              </IonSearchbar>
            </div>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonBackButton defaultHref="/artists/" mode="ios"
            text=" Back "
            color="dark"
            className="backBtn"
          />
          <div className="profile">
            <img src={this.props.artist['imageUrl']} alt={this.props.artist['firstName']} className="profileImage" />
            <IonCardHeader>
              <IonCardTitle>{this.props.artist['artistName']}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>

              <IonCardSubtitle style={{ "color": "black", "fontSize": "15.5px" }}>{this.props.artist['bio']}</IonCardSubtitle>
              <br></br>
              <IonList lines="inset">
                <IonItem>
                  <IonIcon slot="start" color="medium" icon={musicalNotes} />
                  <IonLabel style={{ "padding": "5px" }}>  {this.props.artist['type']} </IonLabel>
                </IonItem>

                <IonItem>
                  <IonIcon slot="start" color="medium" icon={microphone} />
                  <IonLabel style={{ "padding": "5px" }}>  My genres are: {genres} </IonLabel>
                </IonItem>

                <IonItem>
                  <IonIcon slot="start" color="medium" icon={mailOpen} />
                  <IonLabel style={{ "padding": "5px" }}>{this.props.artist['email']} </IonLabel>

                </IonItem>
                <IonItem>
                  <IonIcon slot="start" color="medium" icon={call} />
                  <IonLabel style={{ "padding": "5px" }}>  {this.props.artist['phone']} </IonLabel>
                </IonItem>
              </IonList>

              <IonTabBar slot="bottom" >

                <IonTabButton tab="tab2" >
                  <IonItem href={this.props.artist['instagramUrl']}>
                    <IonIcon icon={logoInstagram} />
                  </IonItem>
                  <IonLabel>Instagram</IonLabel>
                </IonTabButton>


                <IonTabButton tab="tab2" >
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
            <select onChange={this.handleChange}>
              {this.props.events.length !== 0 &&
                this.props.events.map((event, index) => (
                  <option value={event.id} key={index}>
                    {event.name} - {event.venueName}
                  </option>
                ))}
            </select>
            <IonButton onClick={this.handleClick} disabled={(this.state.status === null) ? false : true}>
              {(this.props.bookingStatus === null) ? 'Booke me' : (this.props.bookingStatus === 'pending' ? 'Pending request sent' : 'Booked')}
            </IonButton>

            <br></br>
            <br></br>
          </div>



        </IonContent>
      </IonPage >
    )
  }
};
const mapStateToProps = (state) => ({
  user: state.user,
  artist: state.artist.artist,
  genres: state.artist.artist.genres,
  events: state.booker.bookerEvents,
  selectedEvent: state.event.currentEvent,
  bookingStatus: state.artist.status
})
const mapDispatchToProps = (dispatch) => ({
  me: () => dispatch(me()),
  fetchOneArtists: (id) => dispatch(fetchOneArtists(id)),
  bookArtist: (info) => dispatch(bookArtist(info)),
  getBookerEvents: (id) => dispatch(getBookerEvents(id)),
  gotOneEvents: (id) => dispatch(gotOneEvents(id))
})
export default connect(mapStateToProps, mapDispatchToProps)(ArtistSinglePage);
