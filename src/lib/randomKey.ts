import { randomBytes } from "crypto";

function generateKey(length : number) : string {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';

    while (result.length < length) {
        const bytes = randomBytes(length);
        for (let i = 0; i < bytes.length; i++) {
            const char = alphabet[bytes[i] % alphabet.length];
            result += char;
            if (result.length === length) {
                break;
            }
        }
    }

    return result;
}

export { generateKey }