/* eslint-disable array-callback-return */
import {
  IonPage,
  IonContent,
  IonTitle,
  IonHeader,
  IonIcon,
  IonItem,
  IonChip,
  IonLabel,
  IonCheckbox,
  IonSelect,
  IonSelectOption,
  IonBackButton,
} from '@ionic/react';
import React from 'react';
import { connect } from 'react-redux';
import { closeCircle } from 'ionicons/icons';
import {
  chooseGenres,
  deleteFilter,
  chooseAllSingle,
  getState,
} from '../../../store/filter';

interface IMyComponentProps {
  chosen: Array<string>;
  allSingle: { value: string; isChecked: boolean }[];
  genres: { value: string; isChecked: boolean }[];
  deleteFilter: (filter: string) => void;
  chooseGenres: (genres: any) => void;
  chooseAllSingle: (allSingle: any) => void;
  getState: (filter: any) => void;
}

interface IMyComponentState {
  genres: any;
  checkedGenres: any;
  allSingle: any;
}
export class Filter extends React.Component<
  IMyComponentProps,
  IMyComponentState
> {
  constructor(props) {
    super(props);
    this.state = {
      genres: [],
      checkedGenres: [],
      allSingle: [],
    };
    this.genresOnClick = this.genresOnClick.bind(this);
    this.mainOnClick = this.mainOnClick.bind(this);
    this.deleteOnClick = this.deleteOnClick.bind(this);
  }
  async componentDidMount() {
    let filter = await window.localStorage.getItem('filter');
    let value: any;
    if (filter !== null) {
      value = JSON.parse(filter || '');
      await this.props.getState(value);
      this.setState({
        genres: value.genres,
        allSingle: value.allSingle,
      });
    } else {
      let checkedGenresCopy: any = [];
      this.props.genres.map(genre => {
        if (genre.isChecked) checkedGenresCopy.push(genre.value);
      });
      this.setState({
        checkedGenres: checkedGenresCopy || [],
        genres: this.props.genres,
        allSingle: this.props.allSingle,
      });
    }
  }
  async genresOnClick(event) {
    this.setState({
      ...this.state,
      checkedGenres: event.target.value,
    });
    await this.props.chooseGenres(event.target.value);
  }
  async mainOnClick(event) {
    const val = event.target.value;
    if (event.target.value) {
      await this.props.chooseAllSingle(event.target.value);
      this.setState({
        ...this.state,
        allSingle: val,
      });
    }
  }
  async deleteOnClick(event) {
    this.setState({
      allSingle: this.props.allSingle,
      genres: this.props.genres,
    });
    await this.props.deleteFilter(event.target.title);
  }
  render() {
    return (
      <IonPage>
        <IonContent style={{ display: 'flex' }}>
          <IonBackButton
            defaultHref="/home/"
            mode="ios"
            text=" Apply filters "
            color="dark"
            className="backBtn"
          />
          <IonHeader
            style={{
              marginLeft: '0px',
              marginTop: '50px',
              marginBottom: '80px',
            }}
          >
            <IonTitle
              style={{
                marginLeft: '0px',
                fontSize: '30px',
              }}
            >
              Filters
            </IonTitle>
          </IonHeader>
          <IonContent>
            <IonItem>
              <IonLabel
                style={{
                  fontWeight: 'bold',
                  fontSize: '20px',
                }}
              >
                All filters
              </IonLabel>
            </IonItem>
            <IonItem>
              <div>
                {this.props.chosen.map((item, indx) => (
                  <IonChip key={indx} title={item} onClick={this.deleteOnClick}>
                    <IonLabel>{item}</IonLabel>
                    <IonIcon title={item} icon={closeCircle} />
                  </IonChip>
                ))}
              </div>
            </IonItem>
            <IonItem>
              <IonLabel
                style={{
                  fontWeight: 'bold',
                  fontSize: '20px',
                }}
              >
                Main category
              </IonLabel>
            </IonItem>
            <div>
              {this.props.allSingle.map((filter, indx) => (
                <IonItem key={indx}>
                  <IonLabel>{filter.value}</IonLabel>
                  <IonCheckbox
                    value={filter.value}
                    onClick={this.mainOnClick}
                    disabled={
                      !filter.isChecked &&
                      this.props.allSingle.some(i => i.isChecked)
                    }
                    checked={filter.isChecked}
                  />
                </IonItem>
              ))}
            </div>
            <IonItem>
              <IonLabel
                style={{
                  fontWeight: 'bold',
                  fontSize: '20px',
                }}
              >
                Filter by genres
              </IonLabel>

              <IonSelect
                multiple={true}
                cancelText="Cancel"
                okText="Save"
                onIonChange={this.genresOnClick}
              >
                {this.props.genres.map((genre, indx) => (
                  <IonSelectOption
                    key={indx}
                    value={genre.value}
                    selected={genre.isChecked}
                  >
                    {genre.value}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>
          </IonContent>
        </IonContent>
      </IonPage>
    );
  }
}

const mapStateToProps = state => ({
  chosen: state.filter.chosen,
  allSingle: state.filter.allSingle,
  genres: state.filter.genres,
});

const mapDispatchToProps = dispatch => ({
  deleteFilter: filter => dispatch(deleteFilter(filter)),
  chooseGenres: genres => dispatch(chooseGenres(genres)),
  chooseAllSingle: allSingle => dispatch(chooseAllSingle(allSingle)),
  getState: filter => dispatch(getState(filter)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
