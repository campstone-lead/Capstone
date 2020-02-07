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
import { any } from 'prop-types';

interface IMyComponentState {
  filterSelected: any;
  sChosen: any;
  gChosen: any;
}

interface IMyComponentProps {
  venues: object;
  me: object;
  filterSelected: any;
  allSingle: { value: any; isChecked: boolean }[];
  genres: { value: any; isChecked: boolean }[];
  allSingleChosen: any;
  genresChosen: any;
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
      sChosen: [],
      gChosen: [],
      filterSelected: [],
    };
  }
  async componentDidMount() {
    console.log('in componendidmount');
    // let filter = window.localStorage.getItem('filter');
    // let value: any;
    // if (filter !== null) {
    //   let allSingle: Array<string> = [],
    //     genres: Array<string> = [];
    //   value = JSON.parse(filter || '');
    //   value.allSingle.map(filter => {
    //     if (filter.isChecked) {
    //       allSingle.push(filter.value);
    //     }
    //   });
    //   value.genres.map(filter => {
    //     if (filter.isChecked) genres.push(filter.value);
    //   });
    //   this.props.filterVenues(allSingle, genres);
    // }
    // await this.props.getAllVenues();
    this.props.filterVenues(
      this.props.allSingleChosen,
      this.props.genresChosen
    );
    this.setState({
      sChosen: this.props.allSingleChosen,
      gChosen: this.props.genresChosen,
      filterSelected: this.props.filterSelected,
    });
  }
  // getSnapshotBeforeUpdate() {
  //   let filter = window.localStorage.getItem('filter');
  //   if (filter !== null) {
  //     let value = JSON.parse(filter || '');
  //     this.setState({
  //       sChosen: value.allSingleChosen,
  //       gChosen: value.genresChosen,
  //     });
  //     // return (
  //     //   this.state.sChosen !== value.allSingleChosen ||
  //     //   this.state.gChosen !== value.genresChosen
  //     // );
  //   }
  //   // return false;
  // }
  // shouldComponentUpdate() {
  //   let filter = window.localStorage.getItem('filter');
  //   if (filter !== null) {
  //     let value = JSON.parse(filter || '');
  //     return (
  //       this.state.sChosen !== value.allSingleChosen ||
  //       this.state.gChosen !== value.genresChosen
  //     );
  //   }
  //   return false;
  // }
  render() {
    if (!Array.isArray(this.props.filterSelected))
      return <IonCardTitle>Loading...</IonCardTitle>;
    console.log(
      'in all venues',
      this.props.filterSelected,
      this.state.filterSelected
    );
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
  allSingleChosen: state.filter.allSingleChosen,
  genresChosen: state.filter.genresChosen,
});
const mapDispatchToProps = dispatch => ({
  me: () => dispatch(me()),
  getAllVenues: () => dispatch(getAllVenues()),
  filterVenues: (mainFilters, genreFilters) =>
    dispatch(filterVenues(mainFilters, genreFilters)),
});
export default connect(mapStateToProps, mapDispatchToProps)(AllVenuesView);
