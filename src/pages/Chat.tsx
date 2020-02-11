import React from 'react';
import { IonContent, IonHeader, IonPage, IonItem, IonList, IonCardHeader, IonCardTitle, IonCardSubtitle, IonToolbar, IonBackButton, IonIcon } from '@ionic/react';
import NewMessageEntry from './NewMessagEntry'
import Message from './Message'
import './Chat.css';
import { connect } from 'react-redux'
import { me } from '../store/user'
import { fetchEvents, gotOneEvents } from '../store/event'
import { fetchOneVenue, getAllVenues } from '../store/venue';
import { sendRequest, sendResponse, fetchOneArtists } from '../store/artist';
import { getOneBooker, getBookerEvents } from '../store/booker'

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
  client: any,
  channel: any,
}

class ChatLead extends React.Component<IMyComponentProps, IMyComponentState> {
  constructor(props) {
    super(props)
    this.state = {
      client: {},
      channel: {},
    }
    // this.client = new StreamChat(this.props.user['firstName']);
    // this.channel = this.client.channel("messaging", "ionic-chat", {
    //   image: "https://i.imgur.com/gwaMDJZ.png",
    //   name: "Ionic Chat"
    // });
  }


  async componentDidMount() {

    this.props.me()


  }



  render() {
    let messages = window.localStorage.getItem('messages')
    messages = JSON.parse(messages || '')
    let newMessages = messages || {}
    if (typeof messages === 'object')
      return (
        <IonPage>
          <IonHeader mode="ios">
            <IonToolbar mode="ios">
              <div className="tabHeader">
                <IonBackButton
                  defaultHref="/home"
                  mode="ios"
                  text=" Back "
                  color="dark"
                  className="backBtn"
                />
                <IonItem lines="none">
                  <label>CHAT</label>
                </IonItem>
              </div>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <div>
              {/* <ul className="media-list">
                {
                  newMessages.map(el => {
                    let message = {
                      author: el.user,
                      content: el.content
                    }
                    return <Message message={message} />
                  })
                }

              </ul> */}
              <NewMessageEntry channelId={1} />
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ChatLead);
