import {
    IonContent, IonHeader, IonPage, IonTitle, IonToolbar,IonItem,IonInput,IonLabel,IonButton
  } from '@ionic/react';
  import React from 'react';
  import '../../Tab1.css';
  import {connect} from 'react-redux'
  import {updatedArtist, putGenre} from '../../../store/artist'

  interface IMyComponentState {
    genres: Array<string>,
    genreTypes: {
        rock: boolean,
        jazz: boolean,
        electronic: boolean,
        pop: boolean,
        hipHop: boolean,
        indie: boolean,
        country: boolean,
        metal: boolean,
        house: boolean,
        techno: boolean,
    }
  }
  interface IMyComponentProps{
    putGenre: (genre: Array<string>) => void,
    updateArtist: any

  }

  class Genres extends React.Component<IMyComponentProps,IMyComponentState>  {
    constructor(props) {
      super(props);
      this.state = {
        genres: [],
        genreTypes: {
            rock: false,
            jazz: false,
            electronic: false,
            pop: false,
            hipHop: false,
            indie: false,
            country: false,
            metal: false,
            house: false,
            techno: false,
        }
      }
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount(){
      let artist=window.localStorage.getItem('artist')
      if(artist!==null){
      artist=JSON.parse(artist||'');
      let newArtist=artist||{};
        this.setState({
          genres:newArtist['genres']
        })
      }
    }



    handleSubmit(event) {
      event.preventDefault();
    //   this.props.history.push('/artisttype')
      Object.keys(this.state.genreTypes).forEach(key=>{
        if(this.state.genreTypes[key])
          this.state.genres.push(key)
      })
      this.props.updateArtist(this.state)

      this.setState({
        genres: [],
      })
    }
    handleClick(event) {
      event.preventDefault();
      this.setState({
        genreTypes: {
          ...this.state.genreTypes,
          [event.target.target]: !this.state.genreTypes[event.target.target]
        }
      })
    }
    render(){
    return(<IonPage>
      <IonHeader >
        <IonToolbar id="bar" >
          <IonTitle>Choose Genres</IonTitle>
          <IonItem>
            <IonLabel> <h3>Pick at least one</h3></IonLabel>
          </IonItem>
        </IonToolbar>
      </IonHeader>


    <IonContent>
        <form onSubmit={this.handleSubmit}>
        <IonButton color={this.state.genreTypes.rock ? 'primary' : 'secondary'} type="button" target="rock" onClick={this.handleClick}>ROCK</IonButton>
        <IonButton color={this.state.genreTypes.jazz ? 'primary' : 'secondary'} type="button" target="jazz" onClick={this.handleClick}>JAZZ</IonButton>
        <IonButton color={this.state.genreTypes.electronic ? 'primary' : 'secondary'}type="button" target="electronic" onClick={this.handleClick}>ELECTRONIC</IonButton>
        <IonButton color={this.state.genreTypes.pop ? 'primary' : 'secondary'}type="button" target="pop" onClick={this.handleClick}>POP</IonButton>
        <IonButton color={this.state.genreTypes.hipHop ? 'primary' : 'secondary'}type="button" target="hipHop" onClick={this.handleClick}>HIP-HOP</IonButton>
        <IonButton color={this.state.genreTypes.indie ? 'primary' : 'secondary'}type="button" target="indie" onClick={this.handleClick}>INDIE</IonButton>
        <IonButton color={this.state.genreTypes.country ? 'primary' : 'secondary'}type="button" target="country" onClick={this.handleClick}>COUNTRY</IonButton>
        <IonButton color={this.state.genreTypes.metal ? 'primary' : 'secondary'}type="button" target="metal" onClick={this.handleClick}>METAL</IonButton>
        <IonButton color={this.state.genreTypes.house ? 'primary' : 'secondary'}type="button" target="house" onClick={this.handleClick}>HOUSE</IonButton>
        <IonButton color={this.state.genreTypes.techno ? 'primary' : 'secondary'}type="button" target="techno" onClick={this.handleClick}>TECHNO</IonButton>

        <IonItem routerLink="/artisttype">
        <br></br>
        <IonButton type = "submit" disabled={(Object.keys(this.state.genreTypes).some(key => this.state.genreTypes[key] === true ))?false:true}>Next</IonButton>
        </IonItem>
        </form>
      </IonContent>

    </IonPage>)}
  }


  const mapDispatchToProps=dispatch=>{
    return {
      // putGenre: (genre) => dispatch(putGenre(genre)),
      updateArtist: (artistInfo) => dispatch(updatedArtist(artistInfo))
    }
  }
  export default connect(null, mapDispatchToProps)(Genres);
