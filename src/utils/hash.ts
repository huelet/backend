import sha256 from 'crypto-js/sha256';

const hashString = async (string: string) => {
    const hashedString = sha256(string);
    return hashedString;
};

export { hashString };