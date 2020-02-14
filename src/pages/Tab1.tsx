import {
  IonButton,
  IonPage,
  IonHeader,
  IonToolbar,
  IonSearchbar,
  IonContent,
  IonItem,
} from '@ionic/react';

import React from 'react';
import { auth, me } from '../store/user';
import { searchBarValue } from '../store/filter';
import { connect } from 'react-redux';
import LandingPage from './landingPage';
import './Tab1.css';
import SearchBar from './Artist/Search/SearchBar';
import ArtistRecommendations from './ArtistRecommendations';
import VenueRecommendations from './VenueRecommendations';
import { getState, customedFilter } from '../store/filter';

interface IMyComponentState {
  isSearchBarOpen: boolean;
  searchWord: string;
  // currentVenue: number;
  // currentBookerRecommandations: Array<object>;
}
interface IMyComponentProps {
  auth: any;
  error: any;
  user: object;
  me: any;
  word: string;
  searchBarValue: (value: boolean) => void;
  isSearchBarOpen: boolean;
  allSingleChosen: any;
  genresChosen: any;
  getState: (value: any) => void;
  customedFilter: (
    mainFilters: Array<string>,
    genreFilters: Array<string>,
    input: string
  ) => void;
  // getRecommendedVenues: any;
  // venues: any;
  recommendations: Array<object>;
}
class Tab1 extends React.Component<IMyComponentProps, IMyComponentState> {
  constructor(props) {
    super(props);
    this.state = {
      //false?
      isSearchBarOpen: this.props.isSearchBarOpen,
      searchWord: '',
    };
    this.onSearchBarChange = this.onSearchBarChange.bind(this);
  }
  async componentDidMount() {
    await this.props.me();

    let searchbar = window.localStorage.getItem('searchbar');
    let filter = await window.localStorage.getItem('filter');
    if (filter !== null) {
      let value: any;
      value = JSON.parse(filter || '');
      await this.props.customedFilter(
        value.allSingleChosen,
        value.genresChosen,
        value.word
      );
    }
    if (searchbar !== null) {
      let value: boolean;
      value = JSON.parse(searchbar || '');
      await this.props.searchBarValue(value);
    }
    this.setState({
      isSearchBarOpen: this.props.isSearchBarOpen,
      searchWord: this.props.word,
    });
  }

  async onSearchBarChange(event) {
    event.preventDefault();
    this.setState({ searchWord: event.target.value });
    let filter = await window.localStorage.getItem('filter');
    if (filter !== null) {
      let value: any;
      value = JSON.parse(filter || '');
      this.props.getState(value);
      await this.props.customedFilter(
        value.allSingleChosen,
        value.genresChosen,
        this.state.searchWord
      );
      window.localStorage.setItem(
        'filter',
        JSON.stringify({ ...value, word: event.target.value })
      );
    } else await this.props.customedFilter([], [], this.state.searchWord);
  }

  render() {
    return (
      <IonPage>
        {this.props.user['status'] === undefined ? (
          <LandingPage />
        ) : (
          <IonContent>
            <IonHeader mode="ios">
              <IonToolbar
                mode="ios"
                style={{
                  '--background':
                    'url(https://wallpaperaccess.com/full/851202.jpg)',
                }}
              >
                <div className="tabHeader">
                  <img
                    src="https://www.freepnglogos.com/uploads/music-logo-black-and-white-png-21.png"
                    alt="logo.png"
                    className="logo"
                  />
                  <IonSearchbar
                    mode="ios"
                    color="light"
                    className="searchBar"
                    animated
                    showCancelButton="focus"
                    autocomplete="on"
                    cancelButtonText="x"
                    onClick={() => {
                      this.props.searchBarValue(true);
                      this.setState({ isSearchBarOpen: true });
                    }}
                    value={this.state.searchWord}
                    onIonChange={this.onSearchBarChange}
                  ></IonSearchbar>
                  {this.state.isSearchBarOpen ? (
                    <IonButton
                      fill="clear"
                      color="dark"
                      onClick={() => {
                        this.props.searchBarValue(false);
                        window.localStorage.removeItem('filter');
                        this.setState({
                          isSearchBarOpen: false,
                          searchWord: '',
                        });
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
            {this.state.isSearchBarOpen ? (
              <IonContent>
                <SearchBar />
              </IonContent>
            ) : (
              <IonContent
                style={{
                  '--background':
                    'url(https://media.idownloadblog.com/wp-content/uploads/2015/06/iTunes-El-Capitan-Wallaper-iPad-Blank-By-Jason-Zigrino.png)',
                }}
              >
                {this.props.user['status'] === 'booker' ? (
                  <ArtistRecommendations />
                ) : (
                  // then they must be an artists... so show them venues
                  <VenueRecommendations />
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
  word: state.filter.word,
});
const mapDispatchToProps = dispatch => ({
  auth: (email, password) => dispatch(auth(email, password)),
  me: () => dispatch(me()),
  searchBarValue: value => dispatch(searchBarValue(value)),
  getState: value => dispatch(getState(value)),
  customedFilter: (mainFilters, genreFilters, input) =>
    dispatch(customedFilter(mainFilters, genreFilters, input)),
  // getRecommendedVenues: id => dispatch(getRecommendedVenues(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Tab1);
