const { ENUM } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("users", {
        name: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phoneNo: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        },
        is_deleted: {
            type: DataTypes.ENUM("0", "1"),
            defaultValue: "0"
        },
        status: {
            type: DataTypes.ENUM("active", "inactive"),
            defaultValue: "active"
        },
        token:{
            type: DataTypes.STRING

        }
    });

    return User;
};
