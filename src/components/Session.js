import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Container from './Container';
import '../styles/Session.css';
import {
  add as addFavorite,
  remove as removeFavorite,
} from '../redux/reducers/favorites';

class Session extends Component {
  toggleFavorite = (e) => {
    e.preventDefault();
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
          <div className="Session-columns">
            <div>
              <h4>{session.talk.title}</h4>
              {favorites[sessionId] ? '⭐️  ' : '☆  '}
              <a onClick={this.toggleFavorite} href="#toggle-favorite">
                {favorites[sessionId] ? 'Remove Favorite' : 'Add Favorite' }
              </a>
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
}

Session = connect((state) => ({
  favorites: state.favorites,
}), {
  addFavorite,
  removeFavorite,
})(Session);

export default Session;
