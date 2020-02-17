import React from 'react';
import { IonItem, IonItemGroup, IonLabel, IonCardContent, IonCardTitle, IonCardSubtitle, IonCard, IonIcon, IonButton } from '@ionic/react';
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
        <img src={this.props.venue['imageURL']} className="venueImg" alt="img.jpg" />

        <IonCardContent>
          <h4 style={{ "color": "black", "fontSize": "15.5px", }}>{this.props.venue['description']}</h4>
        </IonCardContent>
        <br></br>
        <IonCard style={{ '--background': 'url(https://wallpaperaccess.com/full/851202.jpg)' }} >
          <IonItem style={{ '--background': 'none' }} >
            <IonIcon slot="start" color="black" icon={home} />
            <h6 style={{ "padding": "5px" }}>  {this.props.venue['address']} </h6>
          </IonItem>

          <IonItem style={{ '--background': 'none' }}>
            <IonIcon slot="start" color="black" icon={musicalNote} />
            <h6 style={{ "padding": "5px" }}> {genres} </h6>
          </IonItem>

          <IonItem style={{ '--background': 'none' }}>
            <IonIcon slot="start" color="black" icon={body} />
            <h6 style={{ "padding": "5px" }}> {this.props.venue['capacity']} </h6>
          </IonItem>
        </IonCard>
        {this.props.booker['user'] ?
          <h3>Booker: {this.props.booker["user"]["firstName"]}{' '}{this.props.booker["user"]["lastName"]}</h3> : null}
        <div style={{ "display": "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <h2>Upcoming Events:</h2>
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
              href={`/allEvents/${event['id']}`}
              className=""
              style={{ width: '250px', '--background': '#fcbcdb' }}
              mode="ios"
            >
              <div className="eventBox" >
                <IonItemGroup style={{ margin: '20px' }}>
                  <h4
                    style={{ textAlign: 'center', color: 'black' }}
                    className="eventBox"
                  >
                    {event['name']}
                  </h4>
                  <p
                    style={{ textAlign: 'center' }}
                  >
                    {event['description']}
                  </p>
                  <p
                    style={{ textAlign: 'center' }}
                  >
                    {

                      newdate

                    }
                  </p>
                </IonItemGroup>
              </div>
            </IonCard>
          )



        }) : <h3>There are no upcoming events at this venue</h3>}
      </>
    )
  }
}

export default VenueSingleComponent;


