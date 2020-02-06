import {
  IonButton,
  IonPage,
  IonHeader,
  IonToolbar,
  IonSearchbar,
  IonContent,
} from '@ionic/react';

import React from 'react';
import { auth, me } from '../store/user';
import { searchBarValue } from '../store/filter';
import { connect } from 'react-redux';
import { getRecommendedVenues } from '../store/venue';
import { getOneBooker } from '../store/booker';
import LandingPage from './landingPage';
import './Tab1.css';
import SearchBar from './Artist/SearchBar';
import ArtistRecommendations from './ArtistRecommendations';
// import VenueRecommendations from './VenueRecommendations';

interface IMyComponentState {
  isSearchBarOpen: boolean;
  // currentVenue: number;
  // currentBookerRecommandations: Array<object>;
}
interface IMyComponentProps {
  auth: any;
  error: any;
  user: object;
  me: any;
  searchBarValue: (value: boolean) => void;
  isSearchBarOpen: boolean;
  // getRecommendedVenues: any;
  // venues: any;
  recommendations: Array<object>;
}
class Tab1 extends React.Component<IMyComponentProps, IMyComponentState> {
  constructor(props) {
    super(props);
    this.state = {
      isSearchBarOpen: this.props.isSearchBarOpen,
    };
  }
  async componentDidMount() {
    await this.props.me();

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

  render() {
    return (
      <IonPage>
        {this.props.user['status'] === undefined ? (
          <LandingPage />
        ) : (
            <IonContent>
              <IonHeader mode="ios">
                <IonToolbar mode="ios">
                  <div className="tabHeader">
                    <img
                      src="https://www.freepnglogos.com/uploads/music-logo-black-and-white-png-21.png"
                      alt="logo.png"
                      className="logo"
                    />
                    <IonSearchbar
                      mode="ios"
                      className="searchBar"
                      animated
                      showCancelButton="focus"
                      cancelButtonText="x"
                      onClick={() => {
                        this.props.searchBarValue(true);
                        this.setState({ isSearchBarOpen: true });
                      }}
                    ></IonSearchbar>
                    {this.state.isSearchBarOpen ? (
                      <IonButton
                        fill="clear"
                        color="dark"
                        onClick={() => {
                          this.props.searchBarValue(false);
                          this.setState({ isSearchBarOpen: false });
                        }}
                      >
                        Cancel
                    </IonButton>
                    ) : (
                        ''
                      )}
                  </div>
                </IonToolbar>
              </IonHeader>
              {this.props.isSearchBarOpen ? (
                <IonContent>
                  <SearchBar />
                </IonContent>
              ) : (
                  <IonContent>
                    {this.props.user['status'] === 'booker' ? (
                      <ArtistRecommendations
                      />
                    ) : (
                        // then they must be an artists... so show them venues
                        // <VenueRecommendations />
                        <div>Venue recs here!</div>
                      )}
                  </IonContent>
                )}
            </IonContent>
          )}
      </IonPage>
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
  // getRecommendedVenues: id => dispatch(getRecommendedVenues(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Tab1);
