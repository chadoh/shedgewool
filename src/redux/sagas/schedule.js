import client from '../../helpers/ApiClient';
import { takeLatest } from 'redux-saga';
import { call, put, fork } from 'redux-saga/effects';
import {
  LOAD, LOAD_SUCCESS, LOAD_FAIL,
} from '../reducers/schedule.js';

const normalize = (_data) => {
  const byDays = _data.days.reduce((daysAcc, day) => {
    daysAcc[day.name] = day.stages.reduce((stagesAcc, stage) => {
      stage.sessions.forEach(session => {
        const time = Number(session.time_start) / 100;
        const floor = Math.floor(time);
        const decimal = time - floor;
        const adjusted = floor + (decimal * 1.6666667);
        const hour = Math.round(adjusted);
        stagesAcc[hour] = [
          ...(stagesAcc[hour] || []),
          {
            ...session,
            time_start: Number(session.time_start),
            time_end: Number(session.time_end),
            stage: stage.name,
          }
        ]
      })
      return stagesAcc;
    }, {});
    return daysAcc;
  }, {});
  return byDays;
};

// SUBROUTINES

function* load(action) {
  try {
    const result = yield call(client.get, '/schedule.json');

    yield put({ ...action, type: LOAD_SUCCESS, result: normalize(result) });
  }
  catch (e) {
    if (e instanceof Error) throw e;
    yield put({ ...action, type: LOAD_FAIL, error: e.resource });
  }
}


// WATCHERS

function* watchLoad() {
  yield* takeLatest(LOAD, load);
}

export default function* watchPreview() {
  yield [
    fork(watchLoad),
  ]
}
