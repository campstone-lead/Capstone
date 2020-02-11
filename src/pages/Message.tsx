import React from 'react';
import './Chat.css';
export default function Message(props) {

  const message = props.message;

  return (
    <li className="media">
      <div className="media-left">
        <a href="/home">
          <img className="media-object" alt="img" />
        </a>
      </div>
      <div className="media-body">
        <h4 className="media-heading">Liana</h4>
        {message.content}
      </div>
    </li>
  );
}
