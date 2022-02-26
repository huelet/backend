import axios from "axios";
import { hashStringSHA1 } from "../hash";

const checkPwnedPwd = async (password: string) => {
    const hashedPassword = await hashStringSHA1(password);
    const start = hashedPassword.substring(0, 5);
    const rest = hashedPassword.substring(5).toUpperCase();
    let { data: hashes } = await axios.get(`https://api.pwnedpasswords.com/range/${start}`);
    hashes = hashes.split("\n");
    for (const hash of hashes) {
        if (hash.split(":")[0].includes(rest)) {
            return true;
        }
    }
    return false;
}
const checkSafePwd = async (password: string) => {
    if (!/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/.test(password)) {
        // to test if password meets generally accepted guidelines
        return { success: false, message: "0x10614" };
    } else if (/((^[0-9]+[a-z]+)|(^[a-z]+[0-9]+))+[0-9a-z]+$/i.test(password)) {
        // to test if password uses non alphabet, numerical or symbolic characters
        return { success: false, message: "0x10616" };
    } else {
        return { success: true };
    }
}

export { checkPwnedPwd, checkSafePwd };