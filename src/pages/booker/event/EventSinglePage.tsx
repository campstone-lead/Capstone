import React from 'react';
import { IonContent, IonHeader, IonPage, IonToolbar, IonItem, IonLabel, IonButton, IonBackButton, IonCardTitle, IonIcon, IonAvatar, IonCard } from '@ionic/react';
import { connect } from 'react-redux'
import { me } from '../../../store/user'
import { gotOneEvents } from '../../../store/event'
import { sendRequest, sendResponse } from '../../../store/artist';
import {
    image,
    time,
    locate,
    create,
    musicalNotes,
} from 'ionicons/icons';

interface IMyComponentProps {
    user: object,
    me: any,
    event: object,
    gotOneEvents: any,
    sendRequest: any,
    sendResponse: any
}

interface IMyComponentState {
    venue: object,
    localStatus: any,
    sender: string
}

class EventSinglePage extends React.Component<IMyComponentProps, IMyComponentState>{
    constructor(props) {
        super(props)
        this.state = {
            venue: {},
            localStatus: '',
            sender: '',
        }
    }

    async componentDidMount() {
        const id = this.props["match"]["params"]["id"]
        await this.props.me()
        await this.props.gotOneEvents(id)
        let artistStatus = this.props.event['artists'].filter((el) => el.artistId === this.props.user['id']);
        if (artistStatus.length === 1) {
            await this.setState({
                localStatus: artistStatus[0].status,
                sender: artistStatus[0].sender
            })
        }
        await this.setState({
            venue: this.props.event['event']['venue']
        })


    }
    handleClick = async () => {
        this.setState({ localStatus: 'pending', sender: 'artist' });
        let request = {
            eventId: this.props.event['event']['id'],
            artistId: this.props.user['id'],
            sender: 'artist'
        }
        await this.props.sendRequest(request);
    }

    handleClickRespond = async (response) => {
        let eventId = this.props.event['event']['id']
        let artistId = this.props.user['id']
        const res = { status: response, eventId, artistId }
        await this.setState({ localStatus: response, sender: 'booker' })
        await this.props.sendResponse({ status: response, eventId, artistId })

    }
    render() {
        if (!this.props.event['event']) {
            return <IonCardTitle>Loading...</IonCardTitle>;
        } else {
            let genres = ''
            this.props.event['event'].genres.forEach((el, index) => {
                if (index !== this.props.event['event'].genres.length - 1) {
                    genres += el + ', ';
                } else genres += el;
            });

            var dateObj = new Date(this.props.event['event'].date)
            var month = dateObj.getUTCMonth() + 1;
            var day = dateObj.getUTCDate();
            var year = dateObj.getUTCFullYear();

            let newdate = month + "/" + day + "/" + year;

            return (
                <IonPage>
                    <IonHeader mode="ios" >
                        <IonToolbar mode="ios" style={{ '--background': "#fcbcdb" }}>
                            <div className="tabHeader" >
                                <IonItem routerLink="/home">
                                    <img
                                        src="https://www.freepnglogos.com/uploads/music-logo-black-and-white-png-21.png"
                                        alt="logo.png"
                                        className="logo"
                                    />
                                </IonItem>
                                <h4 className="venueBoxText" style={{ textAlign: 'center', color: 'black', fontSize: '19px' }}>

                                    {this.props.event['event']['name']}
                                </h4>
                            </div>
                        </IonToolbar>
                    </IonHeader>

                    <IonContent style={{
                        '--background':
                            'url(https://media.idownloadblog.com/wp-content/uploads/2015/06/iTunes-El-Capitan-Wallaper-iPad-Blank-By-Jason-Zigrino.png)',
                    }}> <IonBackButton
                            defaultHref="/home/"
                            mode="ios"
                            text=" Back "
                            color="dark"
                            className="backBtn"
                        />
                        <div style={{ display: "flex", flexDirection: "column", alignContent: "center" }}>

                            <div style={{ display: "flex", justifyContent: "space-around", margin: "20px", alignContent: "center" }}>
                                <IonAvatar style={{ width: '270px', height: '270px', }}>
                                    <img src={this.props.event['event']['imageURL']} alt='img' />
                                </IonAvatar>
                            </div>
                            <IonCard style={{ margin: "30px", '--background': 'url(https://wallpaperaccess.com/full/851202.jpg)' }}>
                                <div style={{ margin: "10px" }} >
                                    <IonItem lines="inset" style={{
                                        '--background':
                                            'none'
                                    }}>
                                        <IonIcon slot="start" color="black" icon={time} title="Date" />
                                        <IonLabel className="ion-text-wrap" style={{ padding: '5px', color: 'black' }}>
                                            <h2 color='black'>Date</h2>
                                            <p style={{ padding: '5px', color: 'black' }}>
                                                {' '}{newdate}
                                            </p>
                                        </IonLabel>
                                    </IonItem>

                                    <IonItem lines="inset" routerLink={`/allVenues/${this.props.event['event'].venueId}`}
                                        style={{
                                            '--background':
                                                'none'
                                        }}
                                    >
                                        <IonIcon slot="start" color="black" icon={image} title="Date" />
                                        <IonLabel className="ion-text-wrap" style={{ padding: '5px', color: 'black' }}>
                                            <h2 color='black'>Venue</h2>
                                            <p style={{ padding: '5px', color: 'black' }}>
                                                {this.props.event['event'].venueName}
                                            </p>
                                        </IonLabel>
                                    </IonItem>




                                    <IonItem lines="inset" style={{
                                        width: "70%", '--background':
                                            'none'
                                    }}>
                                        <IonIcon slot="start" color="black" icon={locate} title="Date" />
                                        <IonLabel className="ion-text-wrap" style={{ padding: '5px', color: 'black' }}>
                                            <h2 color='black'>Location</h2>
                                            <p style={{ padding: '5px', color: 'black' }}>
                                                {' '}{this.props.event['event'].location}
                                            </p>
                                        </IonLabel>
                                    </IonItem>



                                    <IonItem lines="inset" style={{
                                        '--background':
                                            'none'
                                    }}>
                                        <IonIcon slot="start" color="black" icon={musicalNotes} title="Date" />
                                        <IonLabel className="ion-text-wrap" style={{ padding: '5px', color: 'black' }}>
                                            <h2 color='black'>Genres seeking</h2>
                                            <p style={{ padding: '5px', color: 'black' }}>
                                                {' '}{genres}
                                            </p>
                                        </IonLabel>
                                    </IonItem>



                                    <IonItem lines="inset" style={{
                                        '--background':
                                            'none',


                                    }}

                                    >
                                        <IonIcon slot="start" color="black" icon={create} title="Date" />
                                        <IonLabel className="ion-text-wrap" style={{ padding: '5px', color: 'black' }}>
                                            <h2 color='black'>Description</h2>
                                            <p style={{ padding: '5px', color: 'black' }}>
                                                {' '}{this.props.event['event'].description}
                                            </p>
                                        </IonLabel>
                                    </IonItem>
                                </div>
                            </IonCard>

                        </div>

                        <div style={{
                            display: "flex", alignContent: "center",
                            flexDirection: "column",
                            justifyContent: "space-around",
                            margin: '20px'
                        }}>
                            <h5 style={{ "margin": "20px", color: 'black' }}>
                                {this.props.user['status'] === 'artist' && this.state.sender === 'artist' ?
                                    (this.state.localStatus.length === 0 ? ' ' :
                                        this.state.localStatus === 'pending' ? `You sent a pending request for ${this.state.venue['name']}.` : this.state.localStatus === 'booked' ?
                                            `Your request for ${this.state.venue['name']} was approved.` :
                                            `Your request for ${this.state.venue['name']} was denied.`)
                                    : this.state.sender === 'booker' &&
                                    (this.state.localStatus.length === 0 ? ' ' :
                                        this.state.localStatus === 'pending' ? `You have a pending request for ${this.state.venue['name']}.` : this.state.localStatus === 'booked' ?
                                            `You approved the request for ${this.props.event['event']['name']}!` :
                                            `Your declined the request for  ${this.props.event['event']['name']}.`
                                    )
                                }
                            </h5>
                            {this.props.user['status'] === 'artist' && (this.state.sender === 'artist' || this.state.sender === '') ?
                                <IonButton style={{ "fontSize": "15.5px", "margin": "25px", width: "70%", position: 'relative', left: '20px' }} onClick={this.handleClick}
                                    disabled={this.state.localStatus.length !== 0 ? true : false}
                                >
                                    {
                                        (this.state.localStatus.length === 0 ? 'Connect' :
                                            this.state.localStatus === 'pending' ? `Request is pending` : this.state.localStatus === 'booked' ?
                                                `Request is approved.` :
                                                `Request is denied.`)

                                    }
                                </IonButton>
                                : this.state.sender === 'booker' && (
                                    <div style={{ "marginBottom": "35px", marginLeft: "25px" }}>
                                        <IonButton disabled={(this.state.localStatus === 'declined' || this.state.localStatus === 'booked') ? true : false}
                                            onClick={() => this.handleClickRespond('booked')}

                                        >Accept</IonButton>
                                        <IonButton disabled={(this.state.localStatus === 'declined' || this.state.localStatus === 'booked') ? true : false}
                                            onClick={() => this.handleClickRespond('declined')}
                                        >Decline</IonButton>
                                    </div>
                                )
                            }
                        </div>

                    </IonContent>
                </IonPage>
            )
        }

    }
}

const mapStateToProps = (state) => ({
    user: state.user,
    event: state.event.currentEvent,
})

const mapDispatchToProps = (dispatch) => ({
    me: () => dispatch(me()),
    gotOneEvents: (id) => dispatch(gotOneEvents(id)),
    sendRequest: (request) => dispatch(sendRequest(request)),
    sendResponse: (data) => dispatch(sendResponse(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(EventSinglePage)
