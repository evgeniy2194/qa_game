import url from 'url';

export function getAppParams() {

    let data;
    console.log(process);

    if ( true ) {

        data = {
            apiId: 5738699,
            apiSettings: 3,
            userId: 20012099,
            accessToken: "530a424fc17acf4de84d825ca2c4272fcd91fa399aee1dde233860362cc5f73f4ef749e5c6f5d3e22cfec",
            authKey: "45a044b35df8c648d4cbc5256d1beec7",
            user: {
                uid: 20012099,
                firstName: "Иван",
                lastName: "Иванов"
            }
        };
    } else {

        const query = url.parse(window.location.href, true).query;
        const response = JSON.parse(query.api_result).response[0];

        data = {
            apiId: query.api_id,
            apiSettings: query.api_settings,
            userId: query.viewer_id,
            accessToken: query.access_token,
            authKey: query.auth_key,
            user: {
                uid: response.uid,
                firstName: response.first_name,
                lastName: response.last_name
            }
        };
    }

    return data;
}