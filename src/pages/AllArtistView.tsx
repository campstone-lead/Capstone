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
import Loading from './loading'

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
    if (!Array.isArray(this.props.artists)) {
      return (
        <div className="home">
          <Loading />
        </div>
      )
    }

    return (
      <IonPage>
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
