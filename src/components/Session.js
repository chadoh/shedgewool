import React from 'react';
import { Link } from 'react-router';
import Container from './Container';
import '../styles/Session.css';

export default ({session, params: { day }}) => {
  return (
    <div className="Session">
      <Container>
        <Link to={`/${day}`} className="Session-close">
          &times;
        </Link>
        <div className="Session-columns">
          <div>
            <h4>{session.talk.title}</h4>
            <p>
              <strong>Stage:</strong> {session.stage}<br/>
              <strong>Room:</strong> {session.room}<br/>
              <strong>Time:</strong> {session.time_start} – {session.time_end}<br/>
            </p>
            <p>{session.talk.description}</p>
          </div>
          <div>
            {session.image && <img src={session.image} className="Day-image"
              alt={session.talk.title} />}<br/>
            <h4>{session.speaker.name}</h4>
            <p>{session.speaker.bio.long}</p>
          </div>
        </div>
      </Container>
    </div>
  );
}
