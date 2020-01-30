import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar,IonSearchbar,IonItem,IonInput } from '@ionic/react';
import './Tab1.css';
const Tab3Page: React.FC = () => {
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
        <label>Name</label>
        <IonInput/>
      </IonItem>
    </form>
      </IonContent>
    </IonPage>
  );
};

export default Tab3Page;
