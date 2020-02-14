import React from 'react';
import { IonContent, IonHeader, IonPage, IonToolbar, IonButton, IonBackButton, IonCardTitle, IonItem } from '@ionic/react';
import './Tab1.css';
import { connect } from 'react-redux'
import { me } from '../store/user'
import { gotOneEvents } from '../store/event'
import { fetchOneVenue } from '../store/venue';
import { sendRequest, sendResponse, fetchOneArtists } from '../store/artist';
import { getOneBooker, getBookerEvents } from '../store/booker'

import VenueSingleComponent from './VenueSingleComponent'

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
    attendedEvents


}

interface IMyComponentState {
    localStatus: string,
    sender: string,
    currentEvent: any,
    bookingInfo: any
}

class VenueSinglePage extends React.Component<IMyComponentProps, IMyComponentState> {
    constructor(props) {
        super(props)
        this.state = {
            localStatus: '',
            sender: '',
            currentEvent: '',
            bookingInfo: {}
        }
    }
    handleClickRespond = async (response) => {
        let eventId = this.state.currentEvent
        let artistId = this.props.user['id']
        const res = { status: response, eventId, artistId }
        console.log('making a response to booker', res)
        await this.props.sendResponse({ status: response, eventId, artistId })
        await this.setState({ localStatus: response, sender: 'booker' })
    }
    handleChange = async e => {
        await this.setState({ currentEvent: e.target.value });
        if (this.props.attendedEvents !== null) {

            let getArtistStatusforCurrentVenue = this.props.attendedEvents.filter(event => event.eventId === Number(this.state.currentEvent))
            console.log(getArtistStatusforCurrentVenue)
            if (getArtistStatusforCurrentVenue.length !== 0) {
                await this.setState({
                    localStatus: getArtistStatusforCurrentVenue[0]['status'] || '',
                    sender: getArtistStatusforCurrentVenue[0]['sender'] || ''
                })
            }
            else {
                await this.setState({
                    localStatus: '',
                    sender: ''
                })
            }
            console.log('heeere->>>>', this.state)
        }
    };

    handleClick = async () => {
        this.setState({ localStatus: 'pending' });
        let request = {
            eventId: Number(this.state.currentEvent),
            artistId: this.props.user['id'],
            sender: 'artist'
        }
        console.log(request)
        await this.props.sendRequest(request);
    }

    async componentDidMount() {
        const id = this.props["match"]["params"]["venueId"]
        await this.props.me();
        await this.props.fetchOneArtists(this.props.user['id']);
        await this.props.fetchOneVenue(id)
        const bookerId = this.props.venue['bookerId']
        await this.props.getOneBooker(bookerId)
        await this.props.getBookerEvents(bookerId)

        if (this.props.events && this.props.events.length !== 0)
            this.setState({ currentEvent: this.props.events[0].id })

        if (this.props.attendedEvents !== null) {

            let getArtistStatusforCurrentVenue = this.props.attendedEvents.filter(event => event.eventId === this.state.currentEvent)
            if (getArtistStatusforCurrentVenue.length !== 0) {
                await this.setState({
                    localStatus: getArtistStatusforCurrentVenue[0]['status'] || '',
                    sender: getArtistStatusforCurrentVenue[0]['sender'] || ''
                })
            }

        }
    }



    render() {
        let filteredEvents = new Array(0)

        if (!Array.isArray(this.props.events))
            return <IonCardTitle>Loading...</IonCardTitle>;
        if (this.props.events !== undefined)
            filteredEvents = this.props.events.filter(event => event["venueId"] === this.props.venue['id'])
        return (
            <IonPage>
                <IonHeader mode="ios">
                    <IonToolbar mode="ios" style={{ '--background': "#fcbcdb" }}>
                        <div className="tabHeader">
                            <IonItem routerLink="/home">
                                <img
                                    src="https://www.freepnglogos.com/uploads/music-logo-black-and-white-png-21.png"
                                    alt="logo.png"
                                    className="logo"
                                />
                            </IonItem>
                            <h3>


                                {this.props.venue['name']}
                            </h3>
                        </div>
                    </IonToolbar>
                </IonHeader>
                <IonContent style={{
                    '--background':
                        'url(https://media.idownloadblog.com/wp-content/uploads/2015/06/iTunes-El-Capitan-Wallaper-iPad-Blank-By-Jason-Zigrino.png)',
                }}>
                    <IonBackButton defaultHref="/home/" mode="ios"
                        text=" Back "
                        color="dark"
                        className="backBtn"
                        style={{ '--background': 'none' }}
                    />
                    <div className="profile" style={{ marginTop: "50px", marginBottom: "20px" }}>
                        {/* VENUE VIEW WITH LIST OF EVENTS IS HERE NOW!!! */}
                        <VenueSingleComponent
                            venue={this.props.venue}
                            booker={this.props.booker}
                            events={this.props.events}
                            isOwner={this.props.user["status"] === "booker" && this.props.user["id"] === this.props.venue["bookerId"]}
                        />

                        {(this.props.user['status'] !== 'booker') &&
                            (filteredEvents.length !== 0) ?
                            <select onChange={this.handleChange} style={{ backgroundColor: 'white', marginBottom: '10px' }}>
                                {this.props.events &&
                                    this.props.events.length !== 0 &&
                                    filteredEvents.map((event, index) => {

                                        return <option value={event.id} key={index}>
                                            {event.name} - {event.venueName}
                                        </option>
                                    })}
                            </select> : (filteredEvents.length === 0) && <h3>There are no current events happening here.</h3>
                        }

                        {

                            (this.props.user['status'] !== 'booker' &&

                                filteredEvents.length !== 0) && ((this.state.localStatus && (this.state.sender === 'booker')) ? ((this.state.localStatus === 'pending') ? <h4 color='black'>You have an incoming request from a booker</h4> : (this.state.localStatus.length === 0) ? null : <h4 color='black'>This is  {' '}{(this.state.localStatus === 'booked') ? 'an aproved' : 'a declined'} request by the {this.props.booker['booker']['firstName']}  {' '} {this.props.booker['booker']['lastName']} for the selected event.</h4>)

                                    : (this.state.sender === 'artist' && this.state.localStatus) && (
                                        (this.state.localStatus === 'pending') ? <h4 color='black'>You request for {this.props.booker['booker']['firstName']}  {' '} {this.props.booker['booker']['lastName']} is pending...</h4> : (this.state.localStatus === 'booked') ? <h4 color='black'>You request for {this.props.booker['booker']['firstName']}  {' '} {this.props.booker['booker']['lastName']} has been approved.</h4> : <h4 color='black'>You request for {this.props.booker['booker']['firstName']}  {' '} {this.props.booker['booker']['lastName']} has been declined.</h4>
                                    )
                            )}

                        {(this.props.user['status'] !== 'booker' && filteredEvents.length !== 0) && ((this.state.sender && this.state.sender === 'booker') ?
                            <div>
                                <IonButton disabled={(this.state.localStatus === 'declined' || this.state.localStatus === 'booked') ? true : false}
                                    onClick={() => this.handleClickRespond('booked')}

                                >Accept</IonButton>
                                <IonButton disabled={(this.state.localStatus === 'declined' || this.state.localStatus === 'booked') ? true : false}
                                    onClick={() => this.handleClickRespond('declined')}
                                >Decline</IonButton>
                            </div>
                            : (this.props.user['status'] !== 'booker') && (filteredEvents.length !== 0) && <IonButton style={{ "fontSize": "15.5px", "margin": "20px" }}
                                onClick={async () => await this.handleClick()}
                                disabled={(!this.state.localStatus) ? false : true}


                            > {(!this.state.localStatus) ? 'Connect' : (this.state.localStatus === 'pending') ? 'Pending Request sent' : (this.state.localStatus === 'booked') ? 'Booked' : 'Declined'}</IonButton>)
                        }
                    </div>
                </IonContent>


            </IonPage>
        )
    }
}


const mapStateToProps = (state) => ({
    user: state.user,
    venue: state.venue.single,
    booker: state.booker,
    events: state.booker.bookerEvents,
    selectedEvent: state.event.currentEvent,
    bookingStatus: state.artist.status,
    attendedEvents: state.artist.status
})

const mapDispatchToProps = (dispatch) => ({
    me: () => dispatch(me()),
    fetchOneVenue: (id) => dispatch(fetchOneVenue(id)),
    getOneBooker: (id) => dispatch(getOneBooker(id)),
    getBookerEvents: (id) => dispatch(getBookerEvents(id)),
    sendRequest: (request) => dispatch(sendRequest(request)),
    sendResponse: (data) => dispatch(sendResponse(data)),
    gotOneEvents: (id) => dispatch(gotOneEvents(id)),
    fetchOneArtists: (id) => dispatch(fetchOneArtists(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(VenueSinglePage);
