import React from 'react';
import { IonContent, IonHeader, IonPage, IonToolbar, IonItem, IonLabel, IonButton, IonBackButton, IonList, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonTabBar, IonTabButton, IonIcon, IonSearchbar } from '@ionic/react';
import './Tab1.css';
import { connect } from 'react-redux'
import { me } from '../store/user'
import { fetchEvents } from '../store/event'
import { fetchOneVenue } from '../store/venue';
import history from './history'

interface IMyComponentProps {
    user: object,
    me: any,
    venue: object,
    fetchOneVenue: any,
}

interface IMyComponentState {

}

class VenueSinglePage extends React.Component<IMyComponentProps, IMyComponentState> {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    async componentDidMount() {
        console.log(history.location.pathname.length, 'history pathname')
        const id = Number(history.location.pathname.slice(11))

        console.log('ID', id)
        await this.props.me();
        await this.props.fetchOneVenue(id)
    }


    render() {
        return (
            <IonPage>
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
                    </div>
                </IonContent>

            </IonPage>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
    venue: state.venue.single
})

const mapDispatchToProps = (dispatch) => ({
    me: () => dispatch(me()),
    fetchOneVenue: (id) => dispatch(fetchOneVenue(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(VenueSinglePage);