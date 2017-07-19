import 'whatwg-fetch';
import querystring from 'querystring';

export default class VKSdkDev {
    static api(url, params, cb) {
        const queryParams = querystring.stringify(params);

        console.log('[SEND API REQUEST]', url, queryParams);

        fetch('/dev/api?url=' + url + '&' + queryParams).then(function (response) {
            return response.json();
        }).then(function (body) {
            console.log('[API RESULT]', body);
            cb({data: body});
        })
    }
}