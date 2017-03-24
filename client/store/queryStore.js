import url from 'url';

//Парсим строку и получаем из нее параметры
const query = url.parse(window.location.href, true).query;
const response = JSON.parse(query.api_result).response[0];

const data = {
    apiId       : query.api_id,
    apiSettings : query.api_settings,
    userId      : query.viewer_id,
    accessToken : query.access_token,
    authKey     : query.auth_key,
    user: {
        uid: response.uid,
        firstName: response.first_name,
        lastName: response.last_name
    }
};

export default data;