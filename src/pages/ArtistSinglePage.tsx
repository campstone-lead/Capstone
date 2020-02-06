import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonButton, IonBackButton, IonList, IonItemGroup, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonTabBar, IonTabButton, IonIcon, IonSearchbar } from '@ionic/react';
import { logoInstagram, logoFacebook, call, mailOpen, musicalNote, microphone, musicalNotes } from 'ionicons/icons'
import './Tab1.css';
import { connect } from 'react-redux'
import { me } from '../store/user'
import { fetchOneArtists } from '../store/artist'
import history from './history'
interface IMyComponentProps {
  user: object,
  genres: Array<string>,
  me: any,
  artist: object,
  fetchOneArtists: any,

}
class ArtistSinglePage extends React.Component<IMyComponentProps, {}> {
  async componentDidMount() {
    const id = Number(history.location.pathname.slice(12))
    await this.props.fetchOneArtists(id)
  }

  render() {
    let genres = '';
    if (this.props.genres !== undefined) {
      this.props.genres.forEach((el, index) => {
        if (index !== this.props.genres.length - 1) {
          genres += el + ', '
        }
        else genres += el;
      })
    }
    return (
      < IonPage >
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
          <IonBackButton defaultHref="/artists/" mode="ios"
            text=" Back "
            color="dark"
            className="backBtn"
          />
          <div className="profile">
            <img src={this.props.artist['imageUrl']} alt={this.props.artist['firstName']} className="profileImage" />
            <IonCardHeader>
              <IonCardTitle>{this.props.artist['artistName']}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>

              <IonCardSubtitle style={{ "color": "black", "fontSize": "15.5px" }}>{this.props.artist['bio']}</IonCardSubtitle>
              <br></br>
              <IonList lines="inset">
                <IonItem>
                  <IonIcon slot="start" color="medium" icon={musicalNotes} />
                  <IonLabel style={{ "padding": "5px" }}>  {this.props.artist['type']} </IonLabel>
                </IonItem>

                <IonItem>
                  <IonIcon slot="start" color="medium" icon={microphone} />
                  <IonLabel style={{ "padding": "5px" }}>  My genres are: {genres} </IonLabel>
                </IonItem>

                <IonItem>
                  <IonIcon slot="start" color="medium" icon={mailOpen} />
                  <IonLabel style={{ "padding": "5px" }}>{this.props.artist['email']} </IonLabel>

                </IonItem>
                <IonItem>
                  <IonIcon slot="start" color="medium" icon={call} />
                  <IonLabel style={{ "padding": "5px" }}>  {this.props.artist['phone']} </IonLabel>
                </IonItem>
              </IonList>

              <IonTabBar slot="bottom" >

                <IonTabButton tab="tab2" >
                  <IonItem href={this.props.artist['instagramUrl']}>
                    <IonIcon icon={logoInstagram} />
                  </IonItem>
                  <IonLabel>Instagram</IonLabel>
                </IonTabButton>


                <IonTabButton tab="tab2" >
                  <IonItem href={this.props.artist['spotifyUrl']}>
                    <IonIcon icon={musicalNote} />
                  </IonItem>
                  <IonLabel>Spotify</IonLabel>
                </IonTabButton>




                <IonTabButton tab="tab2">
                  <IonItem href={this.props.artist['facebookUrl']}>
                    <IonIcon icon={logoFacebook} />
                  </IonItem>
                  <IonLabel>Facebook</IonLabel>
                </IonTabButton>


              </IonTabBar>
            </IonCardContent>
            <IonButton>Book me</IonButton>

          </div>



        </IonContent>
      </IonPage >
    )
  }
};
const mapStateToProps = (state) => ({
  user: state.user,
  artist: state.artist.artist,
  genres: state.artist.artist.genres
})
const mapDispatchToProps = (dispatch) => ({
  me: () => dispatch(me()),
  fetchOneArtists: (id) => dispatch(fetchOneArtists(id))
})
export default connect(mapStateToProps, mapDispatchToProps)(ArtistSinglePage);
