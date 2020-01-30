import React,{useState} from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar,IonSearchbar,IonItem,IonInput,IonLabel } from '@ionic/react';
import './Tab1.css';
const Tab3Page: React.FC = () => {
  const [name,setName]=useState('Liana');
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
        value={name}
        onIonChange={(e) => setName(e.target.value)}
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
  );
};

export default Tab3Page;
