import client from '../../helpers/ApiClient';
import { takeLatest } from 'redux-saga';
import { call, put, fork } from 'redux-saga/effects';
import {
  LOAD, LOAD_SUCCESS, LOAD_FAIL,
} from '../reducers/schedule.js';

const normalize = (_data) => {
  const byDays = _data.days.reduce((daysAcc, day) => {
    daysAcc[day.name] = day.stages.reduce((stagesAcc, stage) => {
      stagesAcc = [
        ...stagesAcc,
        ...stage.sessions.map(session => ({
          ...session,
          time_start: String(session.time_start),
          time_end: String(session.time_end),
          stage: stage.name,
        }))
      ];
      return stagesAcc;
    }, []);
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
