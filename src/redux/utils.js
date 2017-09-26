import * as actions from 'redux/actions';
import { bindActionCreators } from 'redux';
import { put } from 'redux-saga/effects'

export function mapStateToProps(state) {
  const props = {
    user: state.user,
    response: state.response,
    router: state.router,
  }
  return props
}

export function mapDispatchToProps (dispatch) {
  return bindActionCreators(actions, dispatch);
}

export function verifyData(response){
    return response.status === 200
}

export function* reportError(message){
    yield put(actions.error({ "message": message }))
}
