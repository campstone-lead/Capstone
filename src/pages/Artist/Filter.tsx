import {
  IonPage,
  IonContent,
  IonTitle,
  IonHeader,
  IonIcon,
  IonFab,
  IonFabButton,
  IonItem,
  IonChip,
  IonLabel,
  IonList,
  IonCheckbox,
  IonSelect,
  IonSelectOption,
  IonTextarea,
} from '@ionic/react';
import React from 'react';
import { connect } from 'react-redux';
import { close, closeCircle, arrowBack } from 'ionicons/icons';
import {
  chooseGenres,
  deleteFilter,
  chooseAllSingle,
} from '../../store/filter';

interface IMyComponentProps {
  chosen: Array<string>;
  allSingle: { value: string; isChecked: boolean }[];
  genres: { value: string; isChecked: boolean }[];
  deleteFilter: (filter: string) => void;
  chooseGenres: (genres: any) => void;
  chooseAllSingle: (allSingle: any) => void;
}

interface IMyComponentState {
  genres: any;
  checkedGenres: any;
  allSingle: Array<string>;
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
  }
  componentDidMount() {
    let checkedGenresCopy: any = [];
    this.props.genres.map(genre => {
      if (genre.isChecked) checkedGenresCopy.push(genre.value);
    });
    this.setState({
      checkedGenres: checkedGenresCopy || [],
      genres: this.props.genres,
    });
  }
  genresOnClick(event) {
    this.setState({
      ...this.state,
      checkedGenres: event.target.value,
    });
    this.props.chooseGenres(event.target.value);
  }
  mainOnClick(event) {
    this.setState({
      ...this.state,
      allSingle: event.target.value,
    });
    this.props.chooseAllSingle(event.target.value);
  }
  render() {
    return (
      <IonPage>
        <IonFab vertical="top" horizontal="start">
          <IonFabButton href="/home" color="light">
            <IonIcon size="large" icon={arrowBack} />
          </IonFabButton>
        </IonFab>
        <IonContent style={{ display: 'flex' }}>
          <IonHeader
            style={{
              marginLeft: '0px',
              marginTop: '50px',
              marginBottom: '80px',
            }}
          >
            <IonTitle style={{ fontSize: '30px' }}>Filters</IonTitle>
          </IonHeader>
          <IonContent>
            {this.props.chosen.map((item, indx) => (
              <IonChip
                key={indx}
                id={item}
                onClick={() => {
                  this.props.deleteFilter(item);
                }}
              >
                <IonLabel>{item}</IonLabel>
                <IonIcon icon={closeCircle} />
              </IonChip>
            ))}
            <div>
              <IonLabel
                style={{
                  marginLeft: '15px',
                  fontWeight: 'bold',
                  fontSize: '20px',
                }}
              >
                Main category
              </IonLabel>
            </div>
            {this.props.allSingle.map((filter, indx) => (
              <IonItem key={indx}>
                <IonLabel>{filter.value}</IonLabel>
                <IonCheckbox
                  value={filter.value}
                  checked={filter.isChecked}
                  onIonChange={this.mainOnClick}
                />
              </IonItem>
            ))}
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
                {this.state.genres.map((genre, indx) => (
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
