import bcryptjs from "bcryptjs";

const salt_round = 10;

async function hashPassword(password) {
    return await bcryptjs.hash(password, salt_round)
}

async function comparePassword(password, hashpassword) {
    return await bcryptjs.compare(password, hashpassword)
}

export { hashPassword, comparePassword }