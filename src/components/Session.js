import React from 'react';
import Container from './Container';
import '../styles/Session.css';

export default ({session}) => {
  return (
    <Container>
      <h4>{session.talk.title}</h4>
      <p>{session.talk.description}</p>
      <p>{JSON.stringify(session)}</p>
    </Container>
  );
}
