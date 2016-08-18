import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { load as loadSchedule } from '../redux/reducers/schedule';
import Container from './Container';

class Schedule extends Component {
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
    const { schedule } = this.props;
    return (
      <Container>
        <h2>Pick a day:</h2>
        <ul>
          {Object.keys(schedule.data || {}).map(day => (
            <li key={day}>
              <Link to={day}>{day}</Link>
            </li>
          ))}
        </ul>
      </Container>
    );
  }
}

Schedule = connect(state => ({
  schedule: state.schedule,
}), {
  loadSchedule,
})(Schedule);

export default Schedule;
