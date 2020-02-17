import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonItemGroup,
} from '@ionic/react';

import React from 'react';
import { me } from '../store/user';
import { getRecommendedVenues } from '../store/venue';
import { connect } from 'react-redux';
import Loading from './loading'
import './Tab1.css';

interface IMyComponentState {
  currentArtistRecommandations: Array<object>;
  loading: boolean;
}

interface IMyComponentProps {
  auth: any;
  error: any;
  user: object;
  me: any;
  isSearchBarOpen: boolean;
  fetchVenues: any;
  getRecommendedVenues: any;
  venues: any;
}

class VenueRecommendations extends React.Component<
  IMyComponentProps,
  IMyComponentState
  > {
  constructor(props) {
    super(props);
    this.state = {
      currentArtistRecommandations: [],
      loading: false,
    };
  }

  async componentDidMount() {
    await this.props.me();

    const id = this.props.user['id'];

    await this.props.getRecommendedVenues(id);
    let rec = []
    rec = this.props.venues.filter(
      venue => {
        if (venue['recommendations']) {
          return venue['recommendations'][0].score <= 5
        }
        return false;
      }
    );

    if (rec.length === 0) {
      rec = this.props.venues.filter(
        (artist, index) => index < 5
      );
    }

    await this.setState({
      currentArtistRecommandations: rec,
      loading: true,
    });

  }
  shouldComponentUpdate() {
    if (this.state.loading) return this.props.isSearchBarOpen;
    return true;
  }

  render() {
    if (this.state.currentArtistRecommandations.length === 0) {
      return (
        <div className="home">
          <Loading />

        </div>
      )
    }
    console.log('here it is venues', this.props.venues)
    return (
      <div className="home">
        <IonCardHeader className="home" mode="ios">
          <IonCardTitle className="textBox">
            Check out our venues that suit you the most:
          </IonCardTitle>
        </IonCardHeader>
        <div
          style={{
            marginTop: '15px',
            marginBottom: '60px',
          }}
        >
          {this.state.currentArtistRecommandations.map((venue, index) => {
            return (
              <IonCard
                style={{
                  '--background':
                    'url(https://wallpaperaccess.com/full/851202.jpg)',
                  width: '250px',
                }}
                key={index}
                href={`/allVenues/${venue['id']}`}
                className=""
                mode="ios"
              >
                <div className="venueBox">
                  <img src={venue['imageURL']} alt="img.jpg" />

                  <IonItemGroup style={{ margin: '20px' }}>
                    <IonCardTitle
                      style={{ textAlign: 'center' }}
                      className="venueBoxText"
                    >
                      {venue['name']}
                    </IonCardTitle>
                    <IonCardSubtitle style={{ textAlign: 'center' }}>
                      {venue['address']}
                    </IonCardSubtitle>
                  </IonItemGroup>
                </div>
              </IonCard>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  venues: state.venue.all,
  user: state.user,
  isSearchBarOpen: state.filter.isSearchBarOpen,
});

const mapDispatchToProps = dispatch => ({
  getRecommendedVenues: id => dispatch(getRecommendedVenues(id)),
  me: () => dispatch(me()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VenueRecommendations);
