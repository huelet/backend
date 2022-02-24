import sha256 from 'crypto-js/sha256';

const hashString = async (string: string) => {
    const hashedString = sha256(string).toString();
    return hashedString;
};

export { hashString };