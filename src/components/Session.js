import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import ReactMarkdown from 'react-markdown';
import Container from './Container';
import '../styles/Session.css';
import {
  add as addFavorite,
  remove as removeFavorite,
} from '../redux/reducers/favorites';

class Session extends Component {
  toggleFavorite = () => {
    const { favorites, params: { sessionId }} = this.props;
    if (favorites[sessionId]) this.props.removeFavorite(sessionId);
    else this.props.addFavorite(sessionId);
  }

  render() {
    const {session, favorites, params: { sessionId, day }} = this.props;
    return (
      <div className="Session">
        <Container>
          <Link to={`/${day}`} className="Session-close">
            &times;
          </Link>
          <h4>
            {favorites[sessionId] && '⭐️  '}
            {session.talk.title}
            {favorites[sessionId] && ' ⭐️ '}
          </h4>
          <div className="Session-columns">
            <div>
              <button onClick={this.toggleFavorite}
                className={
                  `Session-button ${favorites[sessionId] && 'Session-isFavorite'}`}>
                {favorites[sessionId] ? 'Remove Favorite' : 'Add Favorite' }
              </button>
              <p>
                <strong>Stage:</strong> {session.stage}<br/>
                <strong>Room:</strong> {session.room}<br/>
                <strong>Time:</strong> {session.time_start} – {session.time_end}<br/>
              </p>
              <ReactMarkdown source={session.talk.description}/>
            </div>
            <div>
              {session.image && <img src={session.image} className="Session-image"
                alt={session.talk.title} />}<br/>
              <h4>{session.speaker.name}</h4>
              <ReactMarkdown source={session.speaker.bio.long}/>
            </div>
          </div>
        </Container>
      </div>
    );
  }
}

Session = connect((state) => ({
  favorites: state.favorites,
}), {
  addFavorite,
  removeFavorite,
})(Session);

export default Session;
