import Cookies from 'js-cookie';
import { USER_DATA } from '../constant/DefaultValue';

export function isCookieSet(cookieName) {
    // Split document.cookie by semicolons into an array of key-value pairs
    const cookies = document.cookie.split(';');

    // Loop through the cookies to find the one with the specified name
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        // Check if the cookie starts with the specified name followed by '='
        if (cookie.startsWith(`${cookieName}=`)) {
        return true; // Cookie is set
        }
    }
    return false; // Cookie is not set
}

export const tokenSetter = (data) => {
    console.log('test json' + JSON.stringify(data));
    const [numerator, denominator] = process.env.VUE_APP_COOKIE_EXPIRY.split('/').map(Number);
    Cookies.set(USER_DATA, 
        JSON.stringify(data), 
        { 
            expires: numerator/denominator
        },
        { 
            sameSite: process.env.VUE_APP_COOKIE_SAME_SITE, 
            secure: process.env.VUE_APP_COOKIE_SECURE, 
            domain: process.env.VUE_APP_COOKIE_DOMAIN
        },
    );
}

export const cookieSetter = (key, data) => {
    console.log('test json' + JSON.stringify(data));
    const [numerator, denominator] = process.env.VUE_APP_COOKIE_EXPIRY.split('/').map(Number);
    Cookies.set(key, 
        JSON.stringify(data), 
        { 
            expires: numerator/denominator
        },
        { 
            sameSite: process.env.VUE_APP_COOKIE_SAME_SITE, 
            secure: process.env.VUE_APP_COOKIE_SECURE, 
            domain: process.env.VUE_APP_COOKIE_DOMAIN
        },
    );
}

export const cookieGetter = (name) => {
    if (isCookieSet(name)) {
        console.log(Cookies.get(name));
        return JSON.parse(Cookies.get(name));
    } else {
        return {};
    }
}

export const tokenPropertyVal = (name, property) => {
    const cookieVal = cookieGetter(name); 
    if (Object.keys(cookieVal).length > 0) {
        console.log('status: ' + cookieVal[property]);
        if (null !== cookieVal[property] && undefined !== cookieVal[property]) {
            return cookieVal[property];
        }

        return cookieVal[property];
    } else {
        return null;
    }
}

export function DeleteCookie(name) {
    Cookies.remove(name);
}