import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonItemGroup,
  IonButton,
} from '@ionic/react';

import React, { useEffect } from 'react';
import { auth, me } from '../store/user';
import { searchBarValue } from '../store/filter';
import { connect } from 'react-redux';
import { getRecommendedVenues } from '../store/venue';
import { getOneBooker } from '../store/booker';
import { getRecommendedArtists, fetchArtists } from '../store/artist';
import Loading from './loading'
import './Tab1.css';

interface IMyComponentState {
  isSearchBarOpen: boolean;
  currentVenue: number;
  currentBookerRecommandations: Array<object>;
  loading: true
}
interface IMyComponentProps {
  auth: any;
  error: any;
  user: object;
  me: any;
  searchBarValue: (value: boolean) => void;
  isSearchBarOpen: boolean;
  getRecommendedVenues: any;
  fetchVenues: any;
  getRecommendedArtists: any;
  venues: any;
  artists: any;
  recommendations: Array<object>;
  fetchArtists: any;
}

class ArtistRecommendation extends React.Component<
  IMyComponentProps,
  IMyComponentState
  > {
  constructor(props) {
    super(props);
    this.state = {
      isSearchBarOpen: this.props.isSearchBarOpen,
      currentVenue: 1,
      currentBookerRecommandations: [],
      loading: true
    };
  }
  async componentDidMount() {

    await this.props.me();
    if (this.props.user['id'] !== undefined) {
      const id = this.props.user['id'];
      await this.props.fetchVenues(id);
      if (this.props.venues !== undefined && this.props.venues.length > 0) {
        await this.setState({ currentVenue: this.props.venues[0].id });
        await this.props.getRecommendedArtists(this.state.currentVenue);

        let rec = this.props.artists.filter(
          artist => artist['recommendations'][0].score <= 5
        );
        if (rec.length === 0) {
          rec = this.props.artists.filter(
            (artist, index) => index < 5
          );
        }
        this.setState({
          currentBookerRecommandations: rec,
        });
      } else {
        await this.props.fetchArtists();
        this.setState({
          currentBookerRecommandations: this.props.artists,
        });
      }
    }
    let searchbar = window.localStorage.getItem('searchbar');
    if (searchbar !== null) {
      let value: boolean;
      value = JSON.parse(searchbar || '');
      this.props.searchBarValue(value);
    }
    this.setState({
      isSearchBarOpen: this.props.isSearchBarOpen,
    });
  }

  handleChange = async e => {
    await this.setState({ currentVenue: Number(e.target.value) });
    await this.props.getRecommendedArtists(this.state.currentVenue);
    let rec = this.props.artists.filter(artist => {
      if (artist['recommendations']) {
        return artist['recommendations'][0].score <= 5
      }
      return false;
    }
    );
    if (rec.length === 0) {
      rec = this.props.artists.filter(
        (artist, index) => index < 5
      );
    }
    await this.setState({
      currentBookerRecommandations: rec,
    });
  };
  render() {
    console.log(this.state.currentBookerRecommandations, this.state.currentVenue);

    if (this.state.currentBookerRecommandations.length === 0) {
      return (
        <div className="home">
          <Loading />

        </div>
      )
    }
    return (
      <div className="home">
        <IonCardHeader className="home" mode="ios">
          {this.props.venues !== undefined && this.props.venues.length > 0 ? (
            <div className="mainBoxSelect">
              <select onChange={this.handleChange} className="selectBtn"
                style={{ backgroundColor: "white" }}
              >
                {this.props.venues.map((venue, index) => (
                  <option value={venue.id} key={index}>
                    {venue.name}
                  </option>
                ))}
              </select>
              <IonCardTitle className="textBox">
                Here are some artists you might be interested in...
              </IonCardTitle>
            </div>
          ) : (
              <IonButton
                mode="ios"
                href="/addvenue"
                className="homeBtn"
                color="rgb(153, 178, 189);"
              >
                Add venues
            </IonButton>
            )}
        </IonCardHeader>
        {
          <div className="venue">
            {this.state.currentBookerRecommandations.map((artist, index) => {
              let genres = '';
              artist['genres'].forEach((el, index) => {
                genres += el + ' ';
              });

              return (
                <IonCard
                  style={{
                    '--background':
                      'url(https://wallpaperaccess.com/full/851202.jpg)',
                    width: '250px',
                  }}
                  key={index}
                  href={`/allArtists/${artist['id']}`}
                  className="profile"

                  mode="ios"
                >
                  <div className="artistBox">
                    <img src={artist['imageURL']} alt="img.jpg" />

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
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  error: state.user.error,
  user: state.user,
  isSearchBarOpen: state.filter.isSearchBarOpen,
  venues: state.booker.venues,
  artists: state.artist.allArtists,
});
const mapDispatchToProps = dispatch => ({
  auth: (email, password) => dispatch(auth(email, password)),
  me: () => dispatch(me()),
  searchBarValue: value => dispatch(searchBarValue(value)),
  getRecommendedVenues: id => dispatch(getRecommendedVenues(id)),
  getRecommendedArtists: id => dispatch(getRecommendedArtists(id)),
  fetchVenues: id => dispatch(getOneBooker(id)),
  fetchArtists: () => dispatch(fetchArtists()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArtistRecommendation);
