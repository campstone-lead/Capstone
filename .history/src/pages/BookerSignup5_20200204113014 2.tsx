import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar,IonSearchbar,IonItem,IonInput,IonLabel,IonButton,IonCard } from '@ionic/react';
import './Tab1.css';
import {connect} from 'react-redux'
import './BookerSignup2.css';
import{updatedVenue} from '../store/booker'
interface IMyComponentState {
 capacity:string
}
interface IMyComponentProps{
  booker:object,
  updateVenue:any
}
 class Login extends React.Component<IMyComponentProps,IMyComponentState> {
  constructor(props) {
    super(props);
    this.state = {
     capacity:''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleSubmit(event) {
    event.preventDefault();
    this.props.updateVenue({capacity:Number(this.state.capacity)})

  }
  componentDidMount(){
    let booker=window.localStorage.getItem('booker')
    booker=JSON.parse(booker||'');
    let newBooker=booker||{};
    if(newBooker["venue"]["capacity"]!==undefined){
      this.setState({
        capacity:String(newBooker["venue"].capacity)
      })
    }
  }
  render() {
  return (

    <IonPage>
      <IonHeader >
        <IonToolbar id="bar" >
          <IonTitle>Venue capacity</IonTitle>
          {/* <IonSearchbar className="search" placeholder="Search for venue..."  color="red"/> */}
        </IonToolbar>
      </IonHeader>

    <IonContent>
    <IonCard className="welcome-card">
      <form onSubmit={this.handleSubmit} >
    <IonTitle>How many people can fit in your venue?</IonTitle>
      <IonItem >

        <IonInput type="text" required
          value={this.state.capacity}
          onIonChange={(e) => this.setState({capacity:(e.target as HTMLInputElement).value})}
          placeholder="Capacity"
          className={"description"}
        />
        </IonItem>


        <IonButton type="submit"  >Submit</IonButton>
        <IonButton href={'/home'}
        disabled={(this.state.capacity.length===0)?true:false}
        onClick={()=>{
          window.localStorage.clear();
        }}
        >Next</IonButton>


        <IonItem routerLink="/login">
<br></br>

<IonButton size="small" className="next"
 type="submit"
 onClick={()=>{
  window.localStorage.clear();
}}
disabled={(this.state.capacity.length===0)}
    >Next</IonButton>

</IonItem>


        </form>

      </IonCard>
      </IonContent>
    </IonPage>
  )
  }
};
const mapStateToProps=(state)=>({
  booker:state.booker
})
const mapDispatchToProps=(dispatch)=>({
  updateVenue:(data)=>dispatch(updatedVenue(data))
})
export default connect(mapStateToProps,mapDispatchToProps)(Login);
