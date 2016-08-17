import React, { Component } from 'react';
import { connect } from 'react-redux';
import { load as loadSchedule } from '../redux/reducers/schedule';
import Loader from './Loader';

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
        <h2>Here's the schedule for {day}</h2>
        <pre style={{whiteSpace: 'pre-wrap'}}>
          <code>
            {JSON.stringify(schedule.data[day])}
          </code>
        </pre>
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
