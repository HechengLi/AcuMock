export const REQUEST_MOCK_SERVER = 'REQUEST_MOCK_SERVER'
export const RECEIVE_MOCK_SERVER = 'RECEIVE_MOCK_SERVER'

function requestMockServer(name) {
  return {
    type: REQUEST_MOCK_SERVER,
    name
  }
}

function receivedMockServer(name, data) {
  return {
    type: RECEIVE_MOCK_SERVER,
    name,
    data
  }
}

export function getMockServer(name) {
  return (dispatch, getState) => {
    const mockServer = getState().mockServers[name]
    if (mockServer && mockServer.fetching) return
    dispatch(requestMockServer(name))
    return setTimeout(() => {
      dispatch(receivedMockServer(name, {
        "name": name,
        "port": 8000,
        "routes": {
          "get": {
            "/api/systemMode": {
              "status": 200,
              "data": {
                "systemMode": 1
              }
            }
          },
          "post": {},
          "put": {},
          "patch": {},
          "delete": {}
        },
        "_configurations$": {
          "name": { "type": "input", "variant": "text" },
          "port": { "type": "input", "variant": "number" },
          "routes": {
            "get": {
              "/api/systemMode": {
                "status": {
                  "type": "input",
                  "variant": "number"
                },
                "data": {
                  "systemMode": {
                    "type": "input",
                    "variant": "number"
                  }
                }
              }
            },
            "post": {},
            "put": {},
            "patch": {},
            "delete": {}
          }
        }
      }))
    }, 200)
  }
}