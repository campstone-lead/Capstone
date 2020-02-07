import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonItemGroup,
  IonContent,
} from '@ionic/react';

import React from 'react';
import { me } from '../../../store/user';
import { getAllVenues, filterVenues } from '../../../store/venue';
import { connect } from 'react-redux';
import '../../Tab1.css';

interface IMyComponentState {
  filterSelected: any;
}

interface IMyComponentProps {
  venues: object;
  me: object;
  filterSelected: any;
  allSingle: { value: any; isChecked: boolean }[];
  genres: { value: any; isChecked: boolean }[];
  getAllVenues: () => void;
  filterVenues: (
    mainFilters: Array<string>,
    genreFilters: Array<string>
  ) => void;
}
export class AllVenuesView extends React.Component<
  IMyComponentProps,
  IMyComponentState
> {
  constructor(props) {
    super(props);
    this.state = {
      filterSelected: this.props.filterSelected,
    };
  }
  async componentDidMount() {
    let filter = window.localStorage.getItem('filter');
    let value: any;
    if (filter !== null) {
      let allSingle: Array<string> = [],
        genres: Array<string> = [];
      value = JSON.parse(filter || '');
      value.allSingle.map(filter => {
        if (filter.isChecked) {
          allSingle.push(filter.value);
        }
      });
      value.genres.map(filter => {
        if (filter.isChecked) genres.push(filter.value);
      });
      this.props.filterVenues(allSingle, genres);
    }
    // await this.props.getAllVenues();
  }
  // componentWillReceiveProps(refresh) {
  //   this.state = {
  //     filterSelected: refresh.refresh,
  //   };
  // }
  render() {
    if (!Array.isArray(this.props.filterSelected))
      return <IonCardTitle>Loading...</IonCardTitle>;
    console.log('renders in venue filter component');
    return (
      <IonContent>
        <div className="home">
          {this.props.filterSelected.map((venue, index) => {
            let genres = '';
            venue['genres'].forEach((el, index) => {
              genres += el + ' ';
            });

            return (
              <IonCard
                href={`/allVenues/${venue.id}`}
                key={index}
                className="profile"
                style={{ width: '250px' }}
                mode="ios"
              >
                <div className="artistBox">
                  <img src={venue['imageURL']} alt="img.jpg" />

                  <IonItemGroup style={{ margin: '20px' }}>
                    <IonCardTitle
                      style={{ textAlign: 'center' }}
                      className="artistBoxText"
                    >
                      {venue['name']}
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
    );
  }
}
const mapStateToProps = state => ({
  venues: state.venue.all,
  user: state.user,
  allSingle: state.filter.allSingle,
  genres: state.filter.genres,
  filterSelected: state.venue.filterSelected,
});
const mapDispatchToProps = dispatch => ({
  me: () => dispatch(me()),
  getAllVenues: () => dispatch(getAllVenues()),
  filterVenues: (mainFilters, genreFilters) =>
    dispatch(filterVenues(mainFilters, genreFilters)),
});
export default connect(mapStateToProps, mapDispatchToProps)(AllVenuesView);
