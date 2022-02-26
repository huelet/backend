import sha256 from 'crypto-js/sha256';
import sha1 from "crypto-js/sha1";

const hashString = async (string: string) => {
    const hashedString = sha256(string).toString();
    return hashedString;
};
const hashStringSHA1 = async (string: string) => {
    const hashedString = sha1(string).toString();
    return hashedString;
}

export { hashString, hashStringSHA1 };