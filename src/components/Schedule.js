import React, { Component } from 'react';
import { connect } from 'react-redux';
import { load as loadSchedule } from '../redux/reducers/schedule';

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
      <div>
        <p>
          Here's the schedule!
        </p>
        <pre style={{whiteSpace: "pre-wrap"}}>
          <code>
            {JSON.stringify(schedule.data)}
          </code>
        </pre>
      </div>
    );
  }
}

Schedule = connect(state => ({
  schedule: state.schedule,
}), {
  loadSchedule,
})(Schedule);

export default Schedule;
