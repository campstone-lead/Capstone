import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar,IonSearchbar } from '@ionic/react';
import './Tab1.css';
const Tab3Page: React.FC = () => {
  return (
    <IonPage>
      <IonHeader className="bar">
        <IonToolbar >
          <IonTitle>LEAD</IonTitle>
          <IonSearchbar className="search" placeholder="Search for venue..."  color="red"/>
        </IonToolbar>
      </IonHeader>
      <IonContent>

      </IonContent>
    </IonPage>
  );
};

export default Tab3Page;
