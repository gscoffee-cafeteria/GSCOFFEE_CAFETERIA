import jwt from "jsonwebtoken";

function generateToken(user) {

    return jwt.sign(
        {
            usuario_id: user.usuario_id,
            email: user.email,
            role: user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "2h"
        }
    );
}

export default generateToken;