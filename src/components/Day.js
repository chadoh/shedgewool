import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { load as loadSchedule } from '../redux/reducers/schedule';
import Loader from './Loader';
import Container from './Container';
import DetailContainer from './DetailContainer';
import Session from './Session';
import '../styles/Day.css';

const contains = (sessions, id) => {
  return sessions.filter(session => session.id === id)[0];
}

class Day extends Component {
  static propTypes = {
    schedule: React.PropTypes.object.isRequired,
    favorites: React.PropTypes.object.isRequired,
  }

  state = {
    lastChildId: null,
  }

  componentWillReceiveProps(newProps) {
    const oldSessionId = this.props.params.sessionId;
    if (newProps.params.sessionId !== oldSessionId) {
      this.setState({ lastChildId: oldSessionId });
    }
  }

  componentDidMount() {
    const { schedule } = this.props;
    if (!(schedule.data || schedule.error) && !schedule.loading) {
      this.props.loadSchedule();
    }
  }

  renderTimeslot = (hour) => {
    const { schedule, favorites, params: {day, sessionId: currentId} } = this.props;
    const {lastChildId} = this.state;
    const currentSession = contains(schedule.data[day][hour], currentId);
    const lastSession = contains(schedule.data[day][hour], lastChildId);
    const sameRow = lastSession && currentSession;
    return (
      <div key={hour}>
        <Container className="Day-timeslotWrapper">
          <div className="Day-timeslot">
            <div className="Day-hour">{hour}</div>
            {schedule.data[day][hour].map(session => {
              return (
                <div key={session.id} className={
                  `Day-session ${favorites[session.id] && 'Day-favoriteSession'}`}>
                  {favorites[session.id] &&
                    <span className="Day-favorite">⭐️ </span>
                  }
                  <Link className={
                    `Day-sessionLink ${favorites[session.id] && 'Day-favoriteSession'}`}
                    to={session.id === currentId ? `/${day}` : `/${day}/${session.id}`}>
                    {session.image &&
                      <div className="Day-imageWrap">
                        <div className="Day-image" title={session.talk.title}
                          style={{backgroundImage: `url(${session.image})`}}/>
                        <br/>
                      </div>
                    }
                    <span className="Day-sessionTitle">
                      {session.stage}
                    </span>
                    <small className="Day-sessionTime">
                      {session.time_start} – {session.time_end}
                    </small>
                  </Link>
                  {session.id === currentId &&
                    <div className="Day-arrowWrap">
                      <div className="Day-arrow"/>
                    </div>
                  }
                </div>
              );
            })}
          </div>
        </Container>
        {currentSession &&
          this.renderDetail({session: currentSession})}
        {(lastSession && !sameRow) &&
          this.renderDetail({session: lastSession, old: true})}
      </div>
    );
  }

  renderDetail = ({session, old}) => {
    return (
      <DetailContainer old={old}>
        <Session {...this.props} session={session}/>
      </DetailContainer>
    );
  }

  render() {
    const { schedule, params: {day} } = this.props;

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

        {Object.keys(schedule.data[day] || {})
          .sort((a, b) => +a - +b)
          .map(this.renderTimeslot)
        }
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
