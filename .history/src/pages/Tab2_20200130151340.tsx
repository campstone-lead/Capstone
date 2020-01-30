import React from 'react';
import { IonContent, IonItem, IonLabel, IonList, IonPage } from '@ionic/react';

const Tab2: React.FC = () => {
  return (
    <IonPage>

      <IonContent>
        <IonList>
          <IonItem routerLink="/tab2/details">
            <IonLabel>
              <h2>Go to detail</h2>
            </IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
