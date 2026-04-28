import userModel from "../models/user.model.js";


async function registerController(params) {
    const { email, password } = params;
    const user = new userModel({ email, password });
    await user.save();
}


async function loginController(params) {
    const { email, password } = params;


}