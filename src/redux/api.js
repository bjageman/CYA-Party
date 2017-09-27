import axios from 'axios'
import myConfig from 'config.js'

var baseURL = myConfig.API_URL + "/api/v" + myConfig.API_VERSION

var axiosRequest = axios.create({
  baseURL: baseURL,
  timeout: myConfig.TIMEOUT,
  headers: {
      'Content-Type': 'application/json',
  }
})

export function postAuthData(loginData) {
    return axios.post(myConfig.API_URL + "/auth", loginData, {'Content-Type': 'application/json'})
    .then(function (response) {
        return response
    })
    .catch(function (error) {
        console.log(error)
        return error.response
    })
}

function setToken(token){
    if (token){
        axiosRequest.defaults.headers.common['Authorization'] = 'JWT ' + token
    }
}

export function postDataApi(url, postData, token = null) {
    setToken(token)
    return axiosRequest.post(url, postData)
    .then(function (response) {
        return response
    })
    .catch(function (error) {
        console.log(error)
        return error.response
    })
}

export function getDataApi(url, token = null) {
    setToken(token)
    return axiosRequest.get(url)
    .then(function (response) {
        return response
        })
    .catch(function (error) {
        console.log(error)
        return error.response
    })
}

export function deleteDataApi(url, token = null) {
    setToken(token)
    return axiosRequest.delete(url)
    .then(function (response) {
        return response
        })
    .catch(function (error) {
        console.log(error)
        return error.response
    })
}
