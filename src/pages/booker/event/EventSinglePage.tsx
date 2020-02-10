import React from 'react';
import { IonContent, IonHeader, IonPage, IonToolbar, IonItem, IonItemGroup, IonLabel, IonButton, IonBackButton, IonList, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCard, IonIcon, IonSearchbar } from '@ionic/react';
import { connect } from 'react-redux'
import { me } from '../../../store/user'
import { gotOneEvents } from '../../../store/event'
import { fetchOneVenue } from '../../../store/venue'
import history from '../../history'

interface IMyComponentProps {
    user: object,
    me: any,
    event: object,
    venue: object,
    gotOneEvents: any,
    fetchOneVenue: any
}

interface IMyComponentState {

}

class EventSinglePage extends React.Component<IMyComponentProps, IMyComponentState>{
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    async componentDidMount() {
        const id = Number(history.location.pathname.slice(8))
        await this.props.me()
        await this.props.gotOneEvents(id)
        await this.props.fetchOneVenue(id)
    }


    render() {
        console.log('venue', this.props.venue)

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
                    <IonHeader mode="ios">
                        <IonToolbar mode="ios">
                            <div className="tabHeader">
                                <img
                                    src="https://www.freepnglogos.com/uploads/music-logo-black-and-white-png-21.png"
                                    alt="logo.png"
                                    className="logo"
                                />
                            </div>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent>
                        <IonBackButton defaultHref={`/allVenues/${this.props.venue["id"]}`} mode="ios"
                            text=" Back "
                            color="dark"
                            className="backBtn"
                        />
                        <div className="profile">
                            <br></br>
                            <br></br>
                            <IonCardHeader>
                                <IonCardTitle>{this.props.event['event'].name}</IonCardTitle>
                            </IonCardHeader>
                        </div>
                        <br></br>
                        <IonList lines="inset">
                            <IonItem>
                                <p><span style={{ "fontWeight": "bold" }}>DATE:</span>{' '}{newdate}</p>
                            </IonItem>
                            <IonItem>
                                <p><span style={{ "fontWeight": "bold" }}>VENUE:</span>{' '}  {this.props.event['event'].venueName}</p>
                            </IonItem>
                            <IonItem>

                                <p><span style={{ "fontWeight": "bold" }}>LOCATION:</span>{' '}{this.props.event['event'].location}</p>
                            </IonItem>
                            <IonItem>
                                <p><span style={{ "fontWeight": "bold" }}>GENRES SEEKING: </span>{' '}{genres}</p>


                            </IonItem>
                            <IonItem>
                                <p><span style={{ "fontWeight": "bold" }}>DESCRIPTION:</span>{' '}{this.props.event['event'].description}</p>
                            </IonItem>
                        </IonList>

                        <p style={{ "margin": "20px" }}>Click the button below if you are interested in playing this event!</p>

                        <IonButton style={{ "fontSize": "15.5px", "margin": "20px" }}>Connect with Booker</IonButton>
                    </IonContent>
                </IonPage>
            )
        }

    }
}

const mapStateToProps = (state) => ({
    user: state.user,
    event: state.event.currentEvent,
    venue: state.venue.single
})

const mapDispatchToProps = (dispatch) => ({
    me: () => dispatch(me()),
    gotOneEvents: (id) => dispatch(gotOneEvents(id)),
    fetchOneVenue: (id) => dispatch(fetchOneVenue(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(EventSinglePage)