import * as actions from 'redux/actions';
import { bindActionCreators } from 'redux';

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
