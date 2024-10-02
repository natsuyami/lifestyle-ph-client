import CryptoJS from 'crypto-js';
import forge from 'node-forge';

export function Decrypt(encryptedText) {
    console.log("This is decryption");
    const key = CryptoJS.enc.Base64.parse(process.env.VUE_APP_DECRYPTION_KEY);
    const iv = CryptoJS.enc.Utf8.parse(process.env.VUE_APP_DECRYPTION_IV_CODE);
    const decrypted = CryptoJS.AES.decrypt(encryptedText, key, {
        mode: CryptoJS.mode.CBC,
        iv: iv,
        padding: CryptoJS.pad.Pkcs7
    });

    return CryptoJS.enc.Utf8.stringify(decrypted).toString();
}

export function DecryptViaRSA(encryptedText) {
    // Assuming `base64PrivateKey` is the base64-encoded RSA private key
    const privateKeyBytes = forge.util.decode64(process.env.VUE_APP_DECRYPTION_RSA);
    const privateKey = forge.pki.privateKeyFromAsn1(forge.asn1.fromDer(privateKeyBytes));

    // Assuming `encryptedData` is the base64-encoded data encrypted with the corresponding public key
    const encryptedBytes = forge.util.decode64(encryptedText);
    const decryptedBytes = privateKey.decrypt(encryptedBytes);

    // Convert the decrypted bytes to a string
    const decryptedValue = forge.util.decodeUtf8(decryptedBytes);

    console.log('test: ' + decryptedValue);

    return decryptedValue;
}