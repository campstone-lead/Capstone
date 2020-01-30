import React,{useState} from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar,IonSearchbar,IonItem,IonInput,IonLabel } from '@ionic/react';
import './Tab1.css';
 class Tab3Page extends React.Component<{},{name:string}> {
  constructor(props:IMyComponentState) {
    super(props);

    this.state = {
      name: ''
    }
  }


  // handleInputChange=(e:any) =>{
  //   this.setState({
  //     [e.target.name]: e.target.value
  //   });
  // }


  render() {
    console.log(this.props,this.state)
  return (

    <IonPage>
      <IonHeader >
        <IonToolbar id="bar" >
          <IonTitle>LEAD</IonTitle>
          <IonSearchbar className="search" placeholder="Search for venue..."  color="red"/>
        </IonToolbar>
      </IonHeader>
      <IonContent>
    <form>
      <IonItem>
        <IonLabel>Name</IonLabel>
        <IonInput type="text" placeholder="name" required


        />

      </IonItem>


      <IonItem>
        <IonLabel>Password</IonLabel>
        <IonInput type="password" placeholder="Password" required>
          </IonInput>
      </IonItem>
    </form>
      </IonContent>
    </IonPage>
  )
  }
};

export default Tab3Page;
interface IMyComponentState {
  name: string,
  password:string
}
