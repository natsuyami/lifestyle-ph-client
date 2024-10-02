import { cookieGetter, cookieSetter } from '../utils/CookieUtils.js';
import { client, maya, MayaPaymentData } from './RestClient.js';
import { v4 as uuidv4 } from 'uuid';

export async function FetchVideo(id, data) {
    return client.get('/videos/video/'+id, {data : {}}).then(response => {
        data.value = response.data;
        return response.data;
    }).catch(error => {
        console.log('from the FetchVideo error: ' + error);
    });
}

export async function GetVideos() {
    return client.get('/videos/all', {data : {}}).then(response => {
        return response.data;
    }).catch(error => {
        console.log('from the GetVideos error: ' + error);
        return [];
    });
}

export async function GetLogin(url) {
    client.get('/auth/url', { data: {}}).then(response => {
        console.log('url: ' + JSON.stringify(response.data));
        url.value = JSON.stringify(response.data).replace(/^"(.+(?="$))"$/, '$1');
    })
    .catch(error => {
        console.error('There was a problem with the Axios request:', error);
    });
}

export async function MayaPayment(emailAddress) {
    const idempotencyKey = uuidv4();

    console.log("MAYA uuid=" + idempotencyKey);
    if (cookieGetter(emailAddress) !== idempotencyKey) {
        maya.post('/checkout/v1/checkouts', MayaPaymentData(emailAddress, idempotencyKey)).then(response => {
            cookieSetter(emailAddress, idempotencyKey);
            console.log('successfully responds maya gateway ' + JSON.stringify(response.data));
            window.location.href = response.data.redirectUrl;
        })
        .catch(error => {
            console.error('There was a problem with the Maya request:', error);
        });
    }
}