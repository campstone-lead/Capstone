import React from 'react';
import { IonContent, IonHeader, IonPage, IonToolbar, IonItem, IonItemGroup, IonLabel, IonButton, IonBackButton, IonList, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCard, IonTabBar, IonTabButton, IonIcon, IonSearchbar } from '@ionic/react';
import { home, body, musicalNote } from 'ionicons/icons'
import './Tab1.css';
import { connect } from 'react-redux'
import { me } from '../store/user'
import { fetchEvents } from '../store/event'
import { fetchOneVenue } from '../store/venue';
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
    events: any

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
        console.log(history.location.pathname.length, 'history pathname')
        const id = Number(history.location.pathname.slice(11))

        console.log('ID', id)
        await this.props.me();
        await this.props.fetchOneVenue(id)
        const bookerId = this.props.venue['bookerId']
        await this.props.getOneBooker(bookerId)
        await this.props.getBookerEvents(bookerId)

        // this.setState({ currentBooker: this.props.venue['bookerId'] })
    }


    render() {
        console.log(this.props.booker, 'booker')
        console.log(this.props.events, 'this.props.events')

        if (!Array.isArray(this.props.events))
            return <IonCardTitle>Loading...</IonCardTitle>;
        return (
            <IonPage>

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

                        <IonCardSubtitle style={{ "color": "black", "fontSize": "15.5px" }}>{this.props.venue['description']}</IonCardSubtitle>
                        <br></br>
                        <IonList lines="inset">
                            <IonItem>
                                <IonIcon slot="start" color="medium" icon={home} />
                                <IonLabel style={{ "padding": "5px" }}>  {this.props.venue['address']} </IonLabel>
                            </IonItem>

                            <IonItem>
                                <IonIcon slot="start" color="medium" icon={musicalNote} />
                                <IonLabel style={{ "padding": "5px" }}>  Genres: {this.props.venue['genres']} </IonLabel>
                            </IonItem>

                            <IonItem>
                                <IonIcon slot="start" color="medium" icon={body} />
                                <IonLabel style={{ "padding": "5px" }}> Max Capacity: {this.props.venue['capacity']} </IonLabel>
                            </IonItem>

                            {this.props.booker['user'] ? <IonItem><h1>Booker: {this.props.booker["user"]["firstName"]}</h1> <br></br> <h1>{this.props.booker["user"]["lastName"]}</h1> </IonItem> : null}
                            <h1>Upcoming Events:</h1>
                            {this.props.events ? this.props.events.map((event, index) => (
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
                                                {event['date']}
                                            </IonCardSubtitle>
                                        </IonItemGroup>
                                    </div>
                                </IonCard>
                            )) : <h3>This venue currently has no events</h3>}
                        </IonList>
                    </div>
                </IonContent>

                <IonButton>Connect</IonButton>

                {/* <IonButton onClick={async () => await this.handleClick()} disabled={}>

                </IonButton> */}

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
    getBookerEvents: (id) => dispatch(getBookerEvents(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(VenueSinglePage);