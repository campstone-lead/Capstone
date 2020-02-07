import {
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonItemGroup,
    IonButton,
} from '@ionic/react';

import React from 'react';
import { me } from '../store/user';
import { getRecommendedVenues } from '../store/venue'
import { connect } from 'react-redux'
import './Tab1.css';

interface IMyComponentState {
    currentArtistRecommandations: Array<object>; //recommending Venues to artist
}

interface IMyComponentProps {
    auth: any;
    error: any;
    user: object;
    me: any;
    fetchVenues: any;
    getRecommendedVenues: any;
    venues: any;
}

class VenueRecommendations extends React.Component<IMyComponentProps, IMyComponentState> {
    constructor(props) {
        super(props)
        this.state = {
            currentArtistRecommandations: []
        }
    }

    async componentDidMount() {
        await this.props.me();

        const id = this.props.user['id'];

        await this.props.getRecommendedVenues(id);

        console.log(this.props.venues, 'this.props.venues')

        const rec = this.props.venues.filter(venue => venue['recommendations'][0].score <= 9)


        this.setState({
            currentArtistRecommandations: rec
        })
    }




    render() {

        console.log(this.props, 'THIS.PROPS')
        console.log('currentArtistRecommendations', this.state.currentArtistRecommandations)

        if (this.state.currentArtistRecommandations.length === 0) {
            return (
                <div>You have no current venue recommendations</div>
            )
        } else {
            return (
                <div className="home">
                    <IonCardHeader className="home" mode="ios">
                        <IonButton mode="ios"
                            href="/venues"
                            className="home-btn" color="rgb(153, 178, 189);">Venues</IonButton>
                        <IonCardTitle className="textBox">We got you some venues you might be interested in...</IonCardTitle>
                    </IonCardHeader>
                    <div className="venue">
                        {this.state.currentArtistRecommandations.map(
                            (venue, index) => {
                                return (
                                    <IonCard
                                        key={index}
                                        href={`/allVenues/${venue['id']}`}
                                        className=""
                                        style={{ width: '250px' }}
                                        mode="ios"
                                    >
                                        <div className="venueBox">
                                            <img src={venue['imageURL']} alt="img.jpg" />

                                            <IonItemGroup style={{ margin: '20px' }}>
                                                <IonCardTitle
                                                    style={{ textAlign: 'center' }}
                                                    className="venueBoxText"
                                                >
                                                    {venue['name']}
                                                </IonCardTitle>
                                                <IonCardSubtitle
                                                    style={{ textAlign: 'center' }}
                                                >
                                                    {venue['address']}
                                                </IonCardSubtitle>
                                            </IonItemGroup>

                                        </div>
                                    </IonCard>
                                )
                            }

                        )}
                    </div>




                </div>


            )
        }

    }
}
const mapStateToProps = (state) => ({
    venues: state.venue.all,
    user: state.user,
})

const mapDispatchToProps = (dispatch) => ({
    getRecommendedVenues: (id) => dispatch(getRecommendedVenues(id)),
    me: () => dispatch(me()),
})

export default connect(mapStateToProps, mapDispatchToProps)(VenueRecommendations)
