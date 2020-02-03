import {
    IonContent, IonHeader, IonPage, IonTitle, IonToolbar,IonItem,IonInput,IonLabel,IonButton
  } from '@ionic/react';
  import React from 'react';
  import '../../Tab1.css';
  import {connect} from 'react-redux'
  import {putGenre} from '../../../store/artist'
  
  interface IMyComponentState {
    genres: [string],
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
    putGenre: (genre: [string]) => void,
    
  }
  
  class Genres extends React.Component<IMyComponentProps,IMyComponentState>  {
    constructor(props) {
      super(props);
      this.state = {
        genres: [''],
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
    //   this.handleClick = this.handleClick.bind(this);
    }
  
  
    handleSubmit(event) {
      event.preventDefault();
      this.props.putGenre(this.state.genres)
      this.setState({
        genres: [''],
      })
    // handleClick(event){

    // }
  
    }
    render(){
    return(<IonPage>
      <IonHeader >
        <IonToolbar id="bar" >
          <IonTitle>Choose Genres</IonTitle>
          <IonItem>
            <IonLabel> <h3>Pick at least two</h3></IonLabel>
          </IonItem>
        </IonToolbar>
      </IonHeader>
  
  
    <IonContent>
        <form onSubmit={this.handleSubmit}>
        <IonButton color='danger' type="button" onClick={()=>{this.setState({genreTypes: {...this.state.genreTypes, rock: !this.state.genreTypes.rock}})}}>ROCK</IonButton>
        <IonButton color='danger'type="button">JAZZ</IonButton>
        <IonButton color='danger'type="button">ELECTRONIC</IonButton>
        <IonButton color='danger'type="button">POP</IonButton>
        <IonButton color='danger'type="button">HIP-HOP</IonButton>
        <IonButton color='danger'type="button">INDIE</IonButton>
        <IonButton color='danger'type="button">COUNTRY</IonButton>
        <IonButton color='danger'type="button">METAL</IonButton>
        <IonButton color='danger'type="button">HOUSE</IonButton>
        <IonButton color='danger'type="button">TECHNO</IonButton>
        <IonItem>
        <IonButton type="submit">next</IonButton>
        </IonItem>
        </form>
      </IonContent>

    </IonPage>)}
  }


  const mapDispatchToProps=dispatch=>{
    return {
      putGenre: (genre) => dispatch(putGenre(genre))
    }
  }
  export default connect(null, mapDispatchToProps)(Genres);
  