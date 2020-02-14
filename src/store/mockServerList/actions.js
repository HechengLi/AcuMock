import axios from 'axios'

export const REQUEST_MOCK_SERVER_LIST = 'REQUEST_MOCK_SERVER_LIST'
export const RECEIVE_MOCK_SERVER_LIST = 'RECEIVE_MOCK_SERVER_LIST'

function requestMockServerList() {
  return {
    type: REQUEST_MOCK_SERVER_LIST
  }
}

function receivedMockServerList(mockServerList) {
  return {
    type: RECEIVE_MOCK_SERVER_LIST,
    mockServerList
  }
}

export function getMockServerList() {
  return (dispatch, getState) => {
    if (getState().mockServerList.fetching) return
    dispatch(requestMockServerList())
    axios.get('/api/mock_server').then(response => {
      dispatch(receivedMockServerList(response.data))
    })
  }
}
