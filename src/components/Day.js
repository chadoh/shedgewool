import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { load as loadSchedule } from '../redux/reducers/schedule';
import Loader from './Loader';
import '../styles/Day.css';

class Day extends Component {
  static propTypes = {
    schedule: React.PropTypes.object.isRequired,
  }

  componentDidMount() {
    const { schedule } = this.props;
    if (!(schedule.data || schedule.error) && !schedule.loading) {
      this.props.loadSchedule();
    }
  }

  render() {
    const { schedule, params: {day} } = this.props;

    if (!schedule.data) return <Loader />;

    return (
      <div>
        <header className="Day-header">
          {Object.keys(schedule.data || {}).map(d => (
            d === day
              ? <h2 key={d}>{d}</h2>
              : <Link to={d} key={d}>{d}</Link>
          ))}
        </header>

        <ul>
          {Object.keys(schedule.data[day] || {}).map(hour => (
            <li key={hour}>
              <h3>{hour}</h3>
              <ul>
                {schedule.data[day][hour].map(session => (
                  <li key={session.id}>
                    {session.time_start} – {session.time_end}: {session.talk.title}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

Day = connect(state => ({
  schedule: state.schedule,
}), {
  loadSchedule,
})(Day);

export default Day;
