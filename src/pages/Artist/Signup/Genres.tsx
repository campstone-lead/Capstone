import {
    IonContent, IonHeader, IonPage, IonTitle, IonToolbar,IonItem,IonInput,IonLabel,IonButton
  } from '@ionic/react';
  import React from 'react';
  import '../../Tab1.css';
  import {connect} from 'react-redux'
  import {putGenre} from '../../../store/artist'

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


    handleSubmit(event) {
      event.preventDefault();
      Object.keys(this.state.genreTypes).forEach(key=>{
        if(this.state.genreTypes[key])
          this.state.genres.push(key)
      })
      this.props.putGenre(this.state.genres)

      // const router = document.querySelector('ion-router');
      // const routeRedirect = document.createElement('ion-route-redirect');
      // routeRedirect.setAttribute('from', '*');
      // routeRedirect.setAttribute('to', '/zipcodeform');
      //   router.appendChild(routeRedirect);
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
            <IonLabel> <h3>Pick at least two</h3></IonLabel>
          </IonItem>
        </IonToolbar>
      </IonHeader>


    <IonContent>
        <form onSubmit={this.handleSubmit}>
        <IonButton color='danger' type="button" target="rock" onClick={this.handleClick}>ROCK</IonButton>
        <IonButton color='danger'type="button" target="jazz" onClick={this.handleClick}>JAZZ</IonButton>
        <IonButton color='danger'type="button" target="electronic" onClick={this.handleClick}>ELECTRONIC</IonButton>
        <IonButton color='danger'type="button" target="pop" onClick={this.handleClick}>POP</IonButton>
        <IonButton color='danger'type="button" target="hipHop" onClick={this.handleClick}>HIP-HOP</IonButton>
        <IonButton color='danger'type="button" target="indie" onClick={this.handleClick}>INDIE</IonButton>
        <IonButton color='danger'type="button" target="country" onClick={this.handleClick}>COUNTRY</IonButton>
        <IonButton color='danger'type="button" target="metal" onClick={this.handleClick}>METAL</IonButton>
        <IonButton color='danger'type="button" target="house" onClick={this.handleClick}>HOUSE</IonButton>
        <IonButton color='danger'type="button" target="techno" onClick={this.handleClick}>TECHNO</IonButton>
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
