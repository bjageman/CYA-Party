import * as actions from 'redux/actions';
import { bindActionCreators } from 'redux';
import { put } from 'redux-saga/effects'

export function mapStateToProps(state) {
  const props = {
    user: state.user,
    response: state.response,
    router: state.router,
    editor: state.editor,
    session: state.session,
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

export function updateObjectInArray(array, insertItem, insertIndex) {
    return array.map( (item, index) => {
        if(index !== insertIndex) {
            return item;
        }
        return {
            ...item,
            ...insertItem
        };
    });
}

export function reorderObjectsInArray(array, firstIndex, secondIndex) {
    let firstItem = array[firstIndex]
    let secondItem = array[secondIndex]
    let newArray = removeItem(array, firstIndex)
    newArray = insertItem(newArray, secondItem, firstIndex)
    newArray = removeItem(newArray, secondIndex)
    newArray = insertItem(newArray, firstItem, secondIndex)
    return newArray
}

export function insertItem(array, item, index) {
    let newArray = array.slice();
    newArray.splice(index, 0, item);
    return newArray;
}

export function removeItem(array, index) {
    let newArray = array.slice();
    newArray.splice(index, 1);
    return newArray;
}
