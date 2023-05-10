import axios from 'axios';
import Config from 'react-native-config';


const url = Config.BASE_URL;


type RequestProps = {
  route?: string;
  method?: string;
  payload?: any;
  params?: object;
}


/**
 * Helper function that configures axios requests
 * @param {object} config The configuration data.
 * route - The route to make request to. e.g profiles, search?q=term&size=5
 * method - The HTTP method to use. e.g post, get, patch,
 * payload - The request body payload
 * token - The authorization token to use if any
 * @returns {Promise} The axios promise
 */
const request = async (
  {
    route,
    method,
    payload,
    params,
  }: RequestProps
) => {
  method = method || 'get';
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  return axios({
    data: payload,
    url: `${url}/${route}`,
    method,
    headers,
    params,
  });
};

export default request;
