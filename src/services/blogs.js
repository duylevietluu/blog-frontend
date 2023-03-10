import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let token = null

const getAll = async() => {
  const response = await axios.get(baseUrl)
  return response.data
}

const setToken = newToken => {
  if (newToken) {
    token = `bearer ${newToken}`
  }
  else {
    token = null
  }
}

const create = async(newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const createComment = async(id, comment) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, {comment})
  return response.data
}

const update = async(id, newObject) => {
  const response = await axios.put(`${ baseUrl }/${id}`, newObject)
  return response.data
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.delete(`${ baseUrl }/${id}`, config)

  return response.data
}

const blogService = { getAll, setToken, create, createComment, update, remove }

export default blogService