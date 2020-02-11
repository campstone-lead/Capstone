import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonItemGroup,
  IonPage,
  IonBackButton,
} from '@ionic/react';

import React from 'react';
import { me } from '../store/user';
import { fetchArtists } from '../store/artist';
import { connect } from 'react-redux';
import './Tab1.css';

interface IMyComponentProps {
  artists: object;
  me: any;
  fetchArtists: any;
}
class AllArtistView extends React.Component<IMyComponentProps, {}> {
  async componentDidMount() {
    await this.props.fetchArtists();
  }

  render() {
    if (!Array.isArray(this.props.artists))
      return <IonCardTitle>Loading...</IonCardTitle>;
    return (
      <IonPage>
        {
          //Do we need it here? a searchbar?
          //probably will go under a searchbar from tab1
          //bc we'll be using filters
          /* <IonHeader mode="ios"  >
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
        </IonHeader> */
        }
        <IonContent>
          <div className="home">
            <IonCardHeader className="home" mode="ios">
              <IonBackButton
                defaultHref="/home"
                mode="ios"
                text=" Back "
                color="dark"
                className="backBtn"
              />
              <IonCardTitle className="textBox homeTitle">
                Here is a list with all artist registered on our platform
              </IonCardTitle>
            </IonCardHeader>

            {/* this is where artists go */}
            {this.props.artists.map((artist, index) => {
              let genres = '';
              artist['genres'].forEach((el, index) => {
                genres += el + ' ';
              });

              return (
                <IonCard
                  href={`/allArtists/${artist.id}`}
                  key={index}
                  className="profile"
                  style={{ width: '250px' }}
                  mode="ios"
                >
                  <div className="artistBox">
                    <img src={artist['imageUrl']} alt="img.jpg" />

                    <IonItemGroup style={{ margin: '20px' }}>
                      <IonCardTitle
                        style={{ textAlign: 'center' }}
                        className="artistBoxText"
                      >
                        {artist['name']}
                      </IonCardTitle>
                      <IonCardSubtitle style={{ textAlign: 'center' }}>
                        {genres}
                      </IonCardSubtitle>
                    </IonItemGroup>
                  </div>
                </IonCard>
              );
            })}
          </div>
        </IonContent>
      </IonPage>
    );
  }
}
const mapStateToProps = state => ({
  artists: state.artist.allArtists,
  user: state.user,
});
const mapDispatchToProps = dispatch => ({
  me: () => dispatch(me()),
  fetchArtists: () => dispatch(fetchArtists()),
});
export default connect(mapStateToProps, mapDispatchToProps)(AllArtistView);
