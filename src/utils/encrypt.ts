import { AES } from "crypto-js/aes";
import * as dotenv from "dotenv";

dotenv.config();

const encryptString = async (string: string) => {
    const encryptedString = AES.encrypt(string).toString();
    return encryptedString;
}

export { encryptString };