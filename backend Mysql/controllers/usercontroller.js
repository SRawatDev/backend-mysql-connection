const db = require('../models')
const userValidation = require("../validation/user")
const bycrypt = require("bcrypt")
const _ = require("lodash")
const jwt = require("jsonwebtoken")
const user = db.user
exports.createUser = async (request, response) => {
    try {
        const validation = await userValidation.Signupvalidation(request.body)

        if (validation.fails()) {
            let err_msg_all = "";
            let msg = "";
            _.each(validation.errors.errors, (err_msg, key) => {
                msg = key;
                err_msg_all = err_msg;
            });
            return response
                .status(200)
                .json({ status: false, message: validation.errors.first(msg) });
        }
        console.log(validation.input.email)
        const checkingemail = await user.findOne({where :{ email: validation.input.email }})
        if (checkingemail) {
            return response.status(200).json(
                {
                    status: false,
                    message: "emil already exist"
                }
            )
        }
        const hashpassword = bycrypt.hashSync(request.body.password, 10)
        const temp = {
            name: request.body.name,
            email: request.body.email,
            password: hashpassword,
            phoneNo: request.body.phoneNo

        }
        const data = await user.create(temp)
        return response.status(200).json(
            {
                data: data,
                status: true
            }
        )
    } catch (error) {
        console.log(error)
        return response.status(500).json(
            {
                status: false,
                message: error.message
            }
        )
    }
}
exports.login = async (request, response) => {
    try {
        const validation = await userValidation.loginvalidation(request.body)

        if (validation.fails()) {
            let err_msg_all = "";
            let msg = "";
            _.each(validation.errors.errors, (err_msg, key) => {
                msg = key;
                err_msg_all = err_msg;
            });
            return response
                .status(200)
                .json({ status: false, message: validation.errors.first(msg) });
        }
        const checkingemail = await user.findOne({where :{ email: request.body.email }})
        if (!checkingemail) {
            return response.status(200).json(
                {
                    message: "email not register",
                    status: false
                }
            )
        }
        const checkingPasswoord = bycrypt.compareSync( request.body.password,checkingemail.dataValues.password)
        if (!checkingPasswoord) {
            return response.status(200).json(
                {
                    message: "password not match",
                    status: false
                }
            )
        }
        const jwtData=jwt.sign(checkingemail.dataValues,"sumitrawat")
        checkingemail.dataValues.token=jwtData
        return response.status(200).json(
            {
                status:true,
                message:"user login succesfully",
                data: checkingemail.dataValues      

            }
        )
   

    } catch (error) {
        console.log(error)
        return response.status(500).json(
            {
                status: false,
                message: error.message
            }
        )

    }
}