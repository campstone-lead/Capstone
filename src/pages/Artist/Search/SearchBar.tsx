import {
  IonChip,
  IonIcon,
  IonLabel,
  IonItem,
  IonButton,
  IonContent,
} from '@ionic/react';
import { closeCircle, switcher } from 'ionicons/icons';
import React from 'react';
// import { auth, me } from '../store/user';
import { connect } from 'react-redux';
import { deleteFilter, getState } from '../../../store/filter';
import { customedFilter } from '../../../store/filter';
import SearchResults from './SearchResults';

interface IMyComponentProps {
  filters: Array<string>;
  allSingleChosen: any;
  genresChosen: any;
  word: string;
  deleteFilter: (filter: string) => void;
  getState: (filter: any) => void;
  customedFilter: (
    mainFilters: Array<string>,
    genreFilters: Array<string>,
    input: string
  ) => void;
}

export class SearchBar extends React.Component<IMyComponentProps, {}> {
  constructor(props) {
    super(props);
    this.deleteOnClick = this.deleteOnClick.bind(this);
  }
  async componentDidMount() {
    let filter = await window.localStorage.getItem('filter');
    let value: any;
    if (filter !== null) {
      value = JSON.parse(filter || '');
      await this.props.getState(value);
      if (this.props.allSingleChosen.length || this.props.genresChosen.length)
        await this.props.customedFilter(
          this.props.allSingleChosen,
          this.props.genresChosen,
          this.props.word
        );
    }
  }
  async deleteOnClick(event) {
    await this.props.deleteFilter(event.target.title);
    await this.props.customedFilter(
      this.props.allSingleChosen,
      this.props.genresChosen,
      this.props.word
    );
    this.setState({
      filters: this.props.filters,
    });
  }
  render() {
    return (
      <IonContent
        style={{
          '--background':
            'url(https://media.idownloadblog.com/wp-content/uploads/2015/06/iTunes-El-Capitan-Wallaper-iPad-Blank-By-Jason-Zigrino.png)',
        }}
      >
        <IonItem
          style={{
            '--background': 'url(https://wallpaperaccess.com/full/851202.jpg)',
          }}
        >
          <div>
            {this.props.filters.map((item, indx) => (
              <IonChip key={indx} id={item} onClick={this.deleteOnClick}>
                <IonLabel>{item}</IonLabel>
                <IonIcon title={item} icon={closeCircle} />
              </IonChip>
            ))}
          </div>

          <IonButton
            color="light"
            size="small"
            slot="end"
            mode="ios"
            href="/filter"
          >
            Filters
            <IonIcon icon={switcher} />
          </IonButton>
        </IonItem>
        {this.props.filters.length === 0 && this.props.word.length === 0 ? (
          ''
        ) : (
            <SearchResults />
          )}
      </IonContent>
    );
  }
}

const mapStateToProps = state => ({
  filters: state.filter.chosen,
  allSingleChosen: state.filter.allSingleChosen,
  genresChosen: state.filter.genresChosen,
  word: state.filter.word,
});

const mapDispatchToProps = dispatch => ({
  deleteFilter: filter => dispatch(deleteFilter(filter)),
  getState: filter => dispatch(getState(filter)),
  customedFilter: (mainFilters, genreFilters, input) =>
    dispatch(customedFilter(mainFilters, genreFilters, input)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
