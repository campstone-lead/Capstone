import React from 'react';
import { IonContent, IonHeader, IonPage, IonToolbar, IonItem, IonItemGroup, IonLabel, IonButton, IonBackButton, IonList, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCard, IonTabBar, IonTabButton, IonIcon, IonSearchbar } from '@ionic/react';
import { home, body, musicalNote } from 'ionicons/icons'
import './Tab1.css';
import { connect } from 'react-redux'
import { me } from '../store/user'
import { fetchEvents } from '../store/event'
import { fetchOneVenue } from '../store/venue';
import { sendRequest } from '../store/artist';
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
    sendRequest: any

}

interface IMyComponentState {

}

class VenueSinglePage extends React.Component<IMyComponentProps, IMyComponentState> {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    handleChange = () => {

    }

    handleClick = () => {

    }

    async componentDidMount() {
        const id = Number(history.location.pathname.slice(11))
        await this.props.me();
        await this.props.fetchOneVenue(id)
        const bookerId = this.props.venue['bookerId']
        console.log(this.props.venue, 'heeere')
        await this.props.getOneBooker(bookerId)
        await this.props.getBookerEvents(bookerId)

        // this.setState({ currentBooker: this.props.venue['bookerId'] })
    }


    render() {
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

                    </div>
                </IonContent>

                <IonButton>Connect</IonButton>

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
    events: state.booker.bookerEvents
})

const mapDispatchToProps = (dispatch) => ({
    me: () => dispatch(me()),
    fetchOneVenue: (id) => dispatch(fetchOneVenue(id)),
    getOneBooker: (id) => dispatch(getOneBooker(id)),
    getBookerEvents: (id) => dispatch(getBookerEvents(id)),
    sendRequest: (request) => dispatch(request)
})

export default connect(mapStateToProps, mapDispatchToProps)(VenueSinglePage);
