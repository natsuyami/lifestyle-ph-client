import { client } from './RestClient.js';
import { tokenPropertyVal, tokenSetter, isCookieSet } from '../utils/CookieUtils.js';
import { USER_DATA } from '../constant/DefaultValue.js';

export async function GenerateToken(code) {
    if (!isCookieSet(USER_DATA)) {
        const response = client.get('/auth/callback', {
        params: {
            code: code
        }
        }).then(response => {
            console.log('token token has been success = ' + JSON.stringify(response.data));
            tokenSetter(response.data.data);
            return "/film/list";
        }).catch(error => {
            if (error.response && error.response.status === 400) {
                console.log('data extracted:' + JSON.stringify(error.response.data));
                if (error.response.data.code === "user_not_paid") {
                    tokenSetter(error.response.data.data);
                    return "/subscribe";
                }
                return "/";
            }
            console.log('from the GenerateToken error: ' + error);
        });

        return response;
    } else {
        return tokenPropertyVal(USER_DATA, "status");
    }
}