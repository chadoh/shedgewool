import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { load as loadSchedule } from '../redux/reducers/schedule';
import Loader from './Loader';
import Container from './Container';
import '../styles/Day.css';

const contains = (sessions, id) => {
  return sessions.filter(session => session.id === id)[0];
}

class Day extends Component {
  static propTypes = {
    schedule: React.PropTypes.object.isRequired,
    favorites: React.PropTypes.object.isRequired,
  }

  componentDidMount() {
    const { schedule } = this.props;
    if (!(schedule.data || schedule.error) && !schedule.loading) {
      this.props.loadSchedule();
    }
  }

  render() {
    const { schedule, favorites, params: {day, sessionId} } = this.props;

    if (!schedule.data) return <Loader />;

    return (
      <div>
        <Container>
          <header className="Day-header">
            {Object.keys(schedule.data || {}).map(d => (
              d === day
                ? <h2 key={d}>{d}</h2>
                : <Link to={`/${d}`} key={d}>{d}</Link>
            ))}
          </header>
        </Container>

        {Object.keys(schedule.data[day] || {}).sort().map(hour => {
          const currentSession = contains(schedule.data[day][hour], sessionId);
          return (
            <div key={hour}>
              <Container>
                <div className="Day-timeslot">
                  <div className="Day-hour">{hour}</div>
                  {schedule.data[day][hour].map(session => {
                    return (
                      <div key={session.id}>
                        {favorites[session.id] &&
                          <span className="Day-favorite">⭐️ </span>
                        }
                        <Link className="Day-sessionLink" to={
                          session.id === sessionId
                            ? `/${day}`
                            : `/${day}/${session.id}`
                        }>
                          <strong>{session.stage}</strong><br/>
                          {session.image && <img src={session.image} className="Day-image"
                            alt={session.talk.title} />}<br/>
                          <small><em>{session.time_start} – {session.time_end}</em></small>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </Container>
              { sessionId && currentSession &&
                React.cloneElement(this.props.children, {
                  session: currentSession,
                })
              }
            </div>
          );
        })}
      </div>
    );
  }
}

Day = connect(state => ({
  schedule: state.schedule2,
  favorites: state.favorites,
}), {
  loadSchedule,
})(Day);

export default Day;
