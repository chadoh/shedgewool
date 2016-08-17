import { fork } from 'redux-saga/effects';
import schedule from './schedule';

export default function* root() {
 yield [
   fork(schedule),
 ];
}
