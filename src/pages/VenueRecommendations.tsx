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
import './Tab1.css';

interface IMyComponentState {
  currentArtistRecommandations: Array<object>;
  loading: boolean;
  //recommending Venues to artist
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

    let rec = this.props.venues;
    rec = this.props.venues.filter(
      venue => venue['recommendations'][0].score > 9
    );

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
    return (
      <div className="home">
        <IonCardHeader className="home" mode="ios">
          {/* <IonButton
            mode="ios"
            href="/venues"
            className="homeBtn"
            color="rgb(153, 178, 189);"
          >
            Venues
          </IonButton> */}
          {/* <IonItem
            // className="textBox"
            style={{
              fontWeight: 'bold',
              fontSize: '20px',
            }}
          > */}
          <IonCardTitle className="textBox">
            Check out our venues that suit you the most:
          </IonCardTitle>
          {/* </IonItem> */}
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
                // style={{ width: '250px' }}
                mode="ios"
              >
                <div className="venueBox">
                  <img src={venue['imageURL']} alt="img.jpg" />

                  <IonItemGroup style={{ margin: '20px' }}>
                    <IonCardTitle
                      style={{ textAlign: 'center' }}
                      className="venueBoxText"
                      //     let rec = this.props.venues;

                      //     rec = this.props.venues.filter(
                      //         venue => venue['recommendations'][0].score <= 10
                      //     );

                      //     await this.setState({
                      //         currentArtistRecommandations: rec,
                      //         loading: true
                      //     });

                      // }
                      // // shouldComponentUpdate() {
                      // //     if (this.state.loading)
                      // //         return this.props.isSearchBarOpen;
                      // //     return true;

                      // // }

                      // render() {
                      //     console.log(this.props.venues)
                      //     return (
                      //         <div className="home">
                      //             <IonCardHeader className="home" mode="ios">
                      //                 <IonButton
                      //                     mode="ios"
                      //                     href="/venues"
                      //                     className="homeBtn"
                      //                     color="rgb(153, 178, 189);"
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
