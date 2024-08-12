const jwt = require("jsonwebtoken")
exports.usermiddleware = async (request, response, next) => {
    try {
        const bearer = request.headers["authorization"]
        const token=bearer.split(" ")[1];
        if (!token) {
            return response.status(200).json(
                {
                    status: false,
                    message: "no tokken"
                }
            )
        }
        const verify=jwt.verify(token,"sumitrawat",async(error,auth)=>{
            console.log(auth)


        })

    } catch (error) {
        return response.status(500).json(
            {
                status: false,
                message: error.message
            }
        )

    }

}
