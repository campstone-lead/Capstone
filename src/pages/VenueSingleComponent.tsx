import React from 'react';
import { IonItem, IonItemGroup, IonLabel, IonList, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCard, IonIcon, IonButton, IonTabButton } from '@ionic/react';
import { home, body, musicalNote, add } from 'ionicons/icons'
import './Tab1.css';

interface IMyComponentProps {
  venue: object,
  booker: object,
  events: Array<object>,
  isOwner: boolean
}

interface IMyComponentState {
}

class VenueSingleComponent extends React.Component<IMyComponentProps, IMyComponentState> {
  constructor(props) {
    super(props)
    this.state = {
      currentEvent: '',
    }
  }

  render() {
    let genres = '';
    if (this.props.venue !== undefined && this.props.venue['genres'] !== undefined) {
      this.props.venue['genres'].forEach((el, index) => {
        if (index !== this.props.venue['genres'].length - 1) {
          genres += el + ', ';
        } else genres += el;
      });
    }
    return (
      <>
        <img src={this.props.venue['imageURL']} alt="img.jpg" />
        <IonCardHeader>
          <IonCardTitle>{this.props.venue['name']}</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <IonCardSubtitle style={{ "color": "black", "fontSize": "15.5px" }}>{this.props.venue['description']}</IonCardSubtitle>
        </IonCardContent>

        <br></br>
        <IonList lines="inset">
          <IonItem>
            <IonIcon slot="start" color="medium" icon={home} />
            <IonLabel style={{ "padding": "5px" }}>  {this.props.venue['address']} </IonLabel>
          </IonItem>

          <IonItem>
            <IonIcon slot="start" color="medium" icon={musicalNote} />
            <IonLabel style={{ "padding": "5px" }}> {genres} </IonLabel>
          </IonItem>

          <IonItem>
            <IonIcon slot="start" color="medium" icon={body} />
            <IonLabel style={{ "padding": "5px" }}> Max Capacity: {this.props.venue['capacity']} </IonLabel>
          </IonItem>
        </IonList>
        {this.props.booker['user'] ?
          <IonCardTitle>Booker: {this.props.booker["user"]["firstName"]}{' '}{this.props.booker["user"]["lastName"]}</IonCardTitle> : null}
        <div style={{ "display": "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <h1>Upcoming Events:</h1>
          {this.props.isOwner && (
            <IonButton routerLink={`/addevent/${this.props.venue["id"]}`}>
              <IonIcon icon={add} />
            </IonButton>
          )}



        </div>

        {this.props.events ? this.props.events.filter(event => event["venueId"] === this.props.venue['id']).map((event, index) => {
          var dateObj = new Date(event['date'])
          var month = dateObj.getUTCMonth() + 1;
          var day = dateObj.getUTCDate();
          var year = dateObj.getUTCFullYear();

          let newdate = month + "/" + day + "/" + year;

          return (



            <IonCard key={index}
              href={`/events/${event['id']}`}
              className=""
              style={{ width: '250px' }}
              mode="ios"
            >
              <div className="eventBox">
                <IonItemGroup style={{ margin: '20px' }}>
                  <IonCardTitle
                    style={{ textAlign: 'center' }}
                    className="eventBox"
                  >
                    {event['name']}
                  </IonCardTitle>
                  <IonCardSubtitle
                    style={{ textAlign: 'center' }}
                  >
                    {event['description']}
                  </IonCardSubtitle>
                  <IonCardSubtitle
                    style={{ textAlign: 'center' }}
                  >
                    {

                      newdate

                    }
                  </IonCardSubtitle>
                </IonItemGroup>
              </div>
            </IonCard>
          )



        }) : <h3>There are no upcoming events at this venue</h3>}
      </>
    )
  }
}

// {this.props.events ? this.props.events.filter(event) => event["venueId"] === this.props.venue["id"]
// }


export default VenueSingleComponent;


