import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar,IonSearchbar,IonItem,IonInput,IonLabel,IonButton,IonCard } from '@ionic/react';
import './Tab1.css';
import {connect} from 'react-redux'
import './BookerSignup2.css';
import{updatedVenue} from '../store/booker'
interface IMyComponentState {
 description:string
}
interface IMyComponentProps{
  booker:object,
  updateVenue:any
}
 class Login extends React.Component<IMyComponentProps,IMyComponentState> {
  constructor(props) {
    super(props);
    this.state = {
     description:''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleSubmit(event) {
    event.preventDefault();
    this.props.updateVenue(this.state)

  }
  componentDidMount(){
    let booker=window.localStorage.getItem('booker')
    booker=JSON.parse(booker||'');
    let newBooker=booker||{};
    if(newBooker["venue"]["description"]!==undefined){
      this.setState({
        description:newBooker["venue"].description
      })
    }
  }
  render() {
console.log(this.props)
  return (

    <IonPage>
      <IonHeader >
        <IonToolbar id="bar" >
          <IonTitle>LEAD</IonTitle>
          {/* <IonSearchbar className="search" placeholder="Search for venue..."  color="red"/> */}
        </IonToolbar>
      </IonHeader>

    <IonContent>
    <IonCard className="welcome-card">
      <form onSubmit={this.handleSubmit} >

      <IonItem >

        <IonInput type="text" required
          value={this.state.description}
          onIonChange={(e) => this.setState({description:(e.target as HTMLInputElement).value})}
          placeholder="Description"
          className={"description"}
        />
        </IonItem>


        <IonButton type="submit"  >Submit</IonButton>
        <IonButton href={'/home'} onClick={()=>{
            if(this.state.description!==undefined){
              window.localStorage.clear();
            }
        }}
        disabled={(this.state.description.length===0)?true:false}
        >Next</IonButton>
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
