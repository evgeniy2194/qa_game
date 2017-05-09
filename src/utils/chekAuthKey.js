import crypto from 'crypto';
import config from '../../config/config';

export default function checkAuthKey(uid, authKey){

    const appId = config.app.appId;
    const apiSecret = config.app.apiSecret;

    const string = appId + "_" + uid + "_" + apiSecret;
    const hash = crypto.createHash('md5').update(string).digest('hex');

    return authKey === hash;

}