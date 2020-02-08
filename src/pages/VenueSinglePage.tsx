import React from 'react';
import { IonContent, IonHeader, IonPage, IonToolbar, IonItem, IonItemGroup, IonLabel, IonButton, IonBackButton, IonList, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCard, IonTabBar, IonTabButton, IonIcon, IonSearchbar } from '@ionic/react';
import { home, body, musicalNote } from 'ionicons/icons'
import './Tab1.css';
import { connect } from 'react-redux'
import { me } from '../store/user'
import { fetchEvents, gotOneEvents } from '../store/event'
import { fetchOneVenue } from '../store/venue';
import { sendRequest, sendResponse, fetchOneArtists } from '../store/artist';
import { getOneBooker, getBookerEvents } from '../store/booker'
import history from './history'

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
        const id = Number(history.location.pathname.slice(11))
        await this.props.me();
        await this.props.fetchOneArtists(this.props.user['id']);
        await this.props.fetchOneVenue(id)
        const bookerId = this.props.venue['bookerId']
        await this.props.getOneBooker(bookerId)
        await this.props.getBookerEvents(bookerId)

        if (this.props.events.length !== 0)
            this.setState({ currentEvent: this.props.events[0].id })

        // this.props.events.forEach(async el => {
        //     await this.props.gotOneEvents(el.id);
        //     let artist = this.props.selectedEvent['artists'].filter(
        //         artist => artist.artistId === this.props.user['id']
        //     );
        //     if (artist.length === 1) {
        //         if (this.props.bookingStatus !== null)
        //             await this.setState({
        //                 localStatus: this.props.bookingStatus['status'],
        //                 sender: this.props.bookingStatus['sender']
        //             })

        //     }
        // })
        if (this.props.attendedEvents !== null) {

            let getArtistStatusforCurrentVenue = this.props.attendedEvents.filter(event => event.eventId === this.state.currentEvent)
            if (getArtistStatusforCurrentVenue.length !== 0) {
                await this.setState({
                    localStatus: getArtistStatusforCurrentVenue[0]['status'] || '',
                    sender: getArtistStatusforCurrentVenue[0]['sender'] || ''
                })
            }
            console.log('heeere->>>>', this.state)
        }

        // if (this.props.events.length !== 0)
        //     this.setState({ currentEvent: this.props.events[0].id })

        // await this.setState({
        //     localStatus: this.props.bookingStatus['status'],
        //     sender: this.props.bookingStatus['sender'],
        //     bookingInfo: this.props.bookingStatus
        // })
        // let artist = this.props.events.filter(
        //     event => event['artistId'] === this.props.user['id']
        // );
        // console.log('here', artist)
        // if (artist.length >= 1) {

        //     await this.props.gotOneEvents(artist[0].id)

        //     artist = this.props.selectedEvent['artists'].filter(
        //         artist => artist.artistId === this.props.user['id']
        //     );

        //     if (artist.length >= 1)
        //         await this.setState({
        //             localStatus: artist[0]['status'] || '',
        //             sender: artist[0]['sender'] || ''
        //         })


        // this.setState({ currentBooker: this.props.venue['bookerId'] })
    }



    render() {
        console.log(this.props)
        let genres = '';
        if (this.props.venue !== undefined && this.props.venue['genres'] !== undefined) {
            this.props.venue['genres'].forEach((el, index) => {
                if (index !== this.props.venue['genres'].length - 1) {
                    genres += el + ', ';
                } else genres += el;
            });
        }

        if (!Array.isArray(this.props.events))
            return <IonCardTitle>Loading...</IonCardTitle>;
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
                    <IonBackButton defaultHref="/home/" mode="ios"
                        text=" Back "
                        color="dark"
                        className="backBtn"
                    />
                    <div className="profile">
                        <img src={this.props.venue['imageURL']} alt="img.jpg" />
                        <IonCardHeader>
                            <IonCardTitle>{this.props.venue['name']}</IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent>
                            <IonCardSubtitle style={{ "color": "black", "fontSize": "15.5px" }}>{this.props.venue['description']}</IonCardSubtitle>
                        </IonCardContent>

                        <br></br>
                        <IonList lines="inset">
                            <IonItem>
                                <IonIcon slot="start" color="medium" icon={home} />
                                <IonLabel style={{ "padding": "5px" }}>  {this.props.venue['address']} </IonLabel>
                            </IonItem>

                            <IonItem>
                                <IonIcon slot="start" color="medium" icon={musicalNote} />
                                <IonLabel style={{ "padding": "5px" }}> {genres} </IonLabel>
                            </IonItem>

                            <IonItem>
                                <IonIcon slot="start" color="medium" icon={body} />
                                <IonLabel style={{ "padding": "5px" }}> Max Capacity: {this.props.venue['capacity']} </IonLabel>
                            </IonItem>
                        </IonList>
                        {this.props.booker['user'] ?
                            <IonCardTitle>Booker: {this.props.booker["user"]["firstName"]}{' '}{this.props.booker["user"]["lastName"]}</IonCardTitle> : null}
                        <h1>Upcoming Events:</h1>
                        {this.props.events ? this.props.events.map((event, index) => {
                            console.log(typeof event['date'])
                            var dateObj = new Date(event['date'])
                            var month = dateObj.getUTCMonth() + 1;
                            var day = dateObj.getUTCDate();
                            var year = dateObj.getUTCFullYear();

                            let newdate = year + "/" + month + "/" + day;
                            return (
                                <IonCard key={index}
                                    href={`/events/${event['id']}`}
                                    className=""
                                    style={{ width: '250px' }}
                                    mode="ios"
                                >
                                    <div className="eventBox">
                                        <img src={event['imageURL']} alt="img.jpg" />
                                        <IonItemGroup style={{ margin: '20px' }}>
                                            <IonCardTitle
                                                style={{ textAlign: 'center' }}
                                                className="eventBox"
                                            >
                                                {event['name']}
                                            </IonCardTitle>
                                            <IonCardSubtitle
                                                style={{ textAlign: 'center' }}
                                            >
                                                {event['description']}
                                            </IonCardSubtitle>
                                            <IonCardSubtitle
                                                style={{ textAlign: 'center' }}
                                            >
                                                {

                                                    newdate

                                                }
                                            </IonCardSubtitle>
                                        </IonItemGroup>
                                    </div>
                                </IonCard>
                            )
                        }) : <h3>This venue currently has no events</h3>}


                        <select onChange={this.handleChange}>
                            {this.props.events &&
                                this.props.events.length !== 0 &&
                                this.props.events.map((event, index) => (
                                    <option value={event.id} key={index}>
                                        {event.name} - {event.venueName}
                                    </option>
                                ))}
                        </select>

                        {(this.state.localStatus && (this.state.sender === 'booker')) && (this.state.localStatus === 'pending') ? <IonCardSubtitle>You have an incoming request from a booker</IonCardSubtitle> : (this.state.localStatus.length === 0) ? null : <IonCardSubtitle>This is  {' '}{(this.state.localStatus === 'booked') ? 'an aproved' : 'a declined'} request by the {this.props.booker['user']['firstName']}  {' '} {this.props.booker['user']['lastName']} for the selected event.</IonCardSubtitle>}
                        {(this.state.sender && this.state.sender === 'booker') ?
                            <div>
                                <IonButton disabled={(this.state.localStatus === 'declined' || this.state.localStatus === 'booked') ? true : false}
                                    onClick={() => this.handleClickRespond('booked')}

                                >Accept</IonButton>
                                <IonButton disabled={(this.state.localStatus === 'declined' || this.state.localStatus === 'booked') ? true : false}
                                    onClick={() => this.handleClickRespond('declined')}
                                >Decline</IonButton>
                            </div>
                            : <IonButton style={{ "fontSize": "15.5px", "margin": "20px" }}
                                onClick={async () => await this.handleClick()}
                                disabled={(!this.state.localStatus) ? false : true}


                            > {(!this.state.localStatus) ? 'Connect' : (this.state.localStatus === 'pending') ? 'Pending Request sent' : (this.state.localStatus === 'booked') ? 'Booked' : 'Declined'}</IonButton>
                        }
                    </div>
                </IonContent>


            </IonPage>
        )
    }
}

// <IonItem key={index}>
// <h1>Upcoming Events: {event.name}</h1>
// </IonItem>

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
