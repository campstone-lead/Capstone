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
  IonItemSliding,
  IonTitle

} from '@ionic/react';

import React from 'react';
import { auth, me } from '../store/user'
import { getRecommendedVenues } from '../store/venue'
import { getOneBooker } from '../store/booker'
import { getRocommendedArtists } from '../store/artist'
import { connect } from 'react-redux'
import './Tab1.css';

interface IMyComponentState {

  currentVenue: number,
  currentBookerRecommandations: Array<object>
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
      currentVenue: 1,
      currentBookerRecommandations: []
    }
  }
  async componentDidMount() {
    await this.props.me()
    if (this.props.user['id'] !== undefined) {
      if (this.props.user['status'] === 'booker') {
        const id = this.props.user['id'];
        await this.props.fetchVenues(id);
        await this.setState({ currentVenue: this.props.venues[0].id })
        await this.props.getRocommendedArtists(this.state.currentVenue);
        const rec = this.props.artists.filter(artist => artist['recommendations'][0].score <= 9)
        this.setState({
          currentBookerRecommandations: rec
        })
      }
    }
  }
  handleChange = async (e) => {
    this.setState({ currentVenue: Number(e.target.value) });
    await this.props.getRocommendedArtists(this.state.currentVenue);
    const rec = this.props.artists.filter(artist => artist['recommendations'][0].score <= 9)
    console.log(rec)
    this.setState({
      currentBookerRecommandations: rec
    })
  }
  render() {
    if (this.props.user['id'] === undefined) return <IonTitle>Loading</IonTitle>
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
                <select onChange={this.handleChange}>
                  {

                    this.props.venues !== undefined &&
                    this.props.venues.map((venue, index) => <option value={venue.id} key={index}>{venue.name}</option>)

                  }
                </select>
                <IonCardTitle className="textBox">We got you some artist you might be interested in...</IonCardTitle>
              </IonCardHeader>

              {(this.state.currentBookerRecommandations.map((artist, index) => {
                let genres = ''
                artist['genres'].forEach((el, index) => {
                  genres += el + ' '
                })

                console.log(artist, index)
                return (<IonCard key={index} className='profile' style={{ "width": "250px" }} mode="ios">
                  <div className='artistBox' >

                    <img src={artist['imageUrl']} alt="img.jpg" />

                    <IonItemGroup style={{ "margin": "20px" }}>
                      <IonCardTitle style={{ "textAlign": "center" }} className="artistBoxText">{artist['artistName']}</IonCardTitle>
                      <IonCardSubtitle style={{ "textAlign": "center" }}>{genres}</IonCardSubtitle>
                    </IonItemGroup>
                  </div>
                </IonCard>)
              }

              ))}


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
