import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonItemGroup,
  IonButton,
} from '@ionic/react';

import React from 'react';
import { auth, me } from '../store/user';
import { searchBarValue } from '../store/filter';
import { connect } from 'react-redux';
import { getRecommendedVenues } from '../store/venue';
import { getOneBooker } from '../store/booker';
import { getRocommendedArtists } from '../store/artist';
import './Tab1.css';

interface IMyComponentState {
  isSearchBarOpen: boolean;
  currentVenue: number;
  currentBookerRecommandations: Array<object>;
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
  getRocommendedArtists: any;
  venues: any;
  artists: any;
  recommendations: Array<object>;
}
class ArtistRecommendation extends React.Component<IMyComponentProps, IMyComponentState> {
  constructor(props) {
    super(props);
    this.state = {
      isSearchBarOpen: this.props.isSearchBarOpen,
      currentVenue: 1,
      currentBookerRecommandations: [],
    };
  }
  async componentDidMount() {
    await this.props.me();
    if (this.props.user['id'] !== undefined) {
      if (this.props.user['status'] === 'booker') {
        const id = this.props.user['id'];
        await this.props.fetchVenues(id);
        await this.setState({ currentVenue: this.props.venues[0].id });
        await this.props.getRocommendedArtists(this.state.currentVenue);
        const rec = this.props.artists.filter(
          artist => artist['recommendations'][0].score <= 9
        );
        this.setState({
          currentBookerRecommandations: rec,
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
    this.setState({ currentVenue: Number(e.target.value) });
    await this.props.getRocommendedArtists(this.state.currentVenue);
    const rec = this.props.artists.filter(
      artist => artist['recommendations'][0].score <= 9
    );
    this.setState({
      currentBookerRecommandations: rec,
    });
  };
  render() {
    return (
      <div className="home">
        <IonCardHeader className="home" mode="ios">
          <IonButton
            mode="ios"
            href="/artists"
            className="homeBtn"
            color="rgb(153, 178, 189);"
          >
            Artists
                      </IonButton>
          <select onChange={this.handleChange}>
            {this.props.venues !== undefined &&
              this.props.venues.map((venue, index) => (
                <option value={venue.id} key={index}>
                  {venue.name}
                </option>
              ))}
          </select>
          <IonCardTitle className="textBox">
            We got you some artist you might be interested in...
                      </IonCardTitle>
        </IonCardHeader>

        {this.state.currentBookerRecommandations.map(
          (artist, index) => {
            let genres = '';
            artist['genres'].forEach((el, index) => {
              genres += el + ' ';
            });

            return (
              <IonCard
                key={index}
                href={`/allArtists/${artist['id']}`}
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
                      {artist['artistName']}
                    </IonCardTitle>
                    <IonCardSubtitle
                      style={{ textAlign: 'center' }}
                    >
                      {genres}
                    </IonCardSubtitle>
                  </IonItemGroup>
                </div>
              </IonCard>
            );
          }
        )}
      </div>

    )
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
  getRocommendedArtists: id => dispatch(getRocommendedArtists(id)),
  fetchVenues: id => dispatch(getOneBooker(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ArtistRecommendation);
