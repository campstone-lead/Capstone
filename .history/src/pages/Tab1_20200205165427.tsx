import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  // IonIcon,
  // IonItem,
  // IonLabel,
  IonItemGroup,
  // IonListHeader,
  IonButton,
  IonPage,
  IonHeader,
  IonToolbar,
  IonSearchbar,
  IonContent,
  IonItemOptions,
  IonItemOption,
  IonItemSliding

} from '@ionic/react';

import React from 'react';
import { auth, me } from '../store/user'
import { getRecommendedVenues } from '../store/venue'
import { getOneBooker } from '../store/booker'
import { getRocommendedArtists } from '../store/artist'
import { connect } from 'react-redux'
import './Tab1.css';

interface IMyComponentState {

  currentVenue: object
}
interface IMyComponentProps {
  auth: any,
  error: any,
  user: object,
  me: any,
  getRecommendedVenues: any,
  fetchVenues: any,
  getRocommendedArtists: any,
  venues: any,
  artists: any,
  recommendations: Array<object>
}
class Tab1 extends React.Component<IMyComponentProps, IMyComponentState> {

  constructor(props) {
    super(props)
    this.state = {
      currentVenue: {}
    }
  }
  async componentDidMount() {
    await this.props.me()
    if (this.props.user['status'] === 'booker') {
      const id = this.props.user['id'];
      console.log(id)
      await this.props.fetchVenues(id);
      this.setState({ currentVenue: this.props.venues[0] })
    }

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
          {(this.props.user['status'] === 'booker') ?

            <div className="home">

              <IonCardHeader className="home" mode="ios">
                <IonButton mode="ios"
                  href="/artists"
                  className="homeBtn" color="rgb(153, 178, 189);">Artists</IonButton>
                <select>
                  {

                    this.props.venues !== undefined &&
                    this.props.venues.map((venue, index) => <option key={index}>{venue.name}</option>)

                  }
                </select>
                <IonCardTitle className="textBox">We got you some artist you might be interested in...</IonCardTitle>
              </IonCardHeader>

              {/* this is where artists go */}
              <IonCard className='profile' style={{ "width": "250px" }} mode="ios">
                <div className='artistBox' >
                  <IonItemGroup>
                    <img src="https://images.vexels.com/media/users/3/147101/isolated/preview/b4a49d4b864c74bb73de63f080ad7930-instagram-profile-button-by-vexels.png" alt="img.jpg" />
                  </IonItemGroup>
                  <IonItemGroup>
                    <IonCardTitle>Artist Name</IonCardTitle>
                    <IonCardSubtitle>Genres</IonCardSubtitle>
                  </IonItemGroup>
                </div>
              </IonCard>



            </div>
            :

            <IonCard className="home">
              <IonCardHeader mode="ios">

                <IonCardTitle className="textBox">{this.props.user['firstName']} {this.props.user['lastName']}</IonCardTitle>

              </IonCardHeader>
            </IonCard>
          }

        </IonContent>
      </IonPage>
    );
  }
};
const mapStateToProps = (state) => ({
  error: state.user.error,
  user: state.user,
  venues: state.booker.venues,
  artists: state.artist
})
const mapDispatchToProps = (dispatch) => ({
  auth: (email, password) => dispatch(auth(email, password)),
  me: () => dispatch(me()),
  getRecommendedVenues: (id) => dispatch(getRecommendedVenues(id)),
  getRocommendedArtists: (id) => dispatch(getRocommendedArtists(id)),
  fetchVenues: (id) => dispatch(getOneBooker(id))
})
export default connect(mapStateToProps, mapDispatchToProps)(Tab1);
