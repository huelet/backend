import { hashString } from "./hash";
import { useID } from "@dothq/id";

const saltPassword = async (password: string) => {
    const hashedPassword = await hashString(password);
    const salt = await useID(2);
    const saltedPassword = `${salt}:${hashedPassword}`;
    return saltedPassword;
}

export default saltPassword;