import jwt from "jsonwebtoken"

const privateKey = 'eyJlbWFpbCI6ImlzYWFjLnBhc3NlZGV2YW50QGdtYWlsLmNvbSIsInVzZXIiOnRydWUsImFkbWluIjp0cnVlLCJpYXQiOjE2NjY1MjQyNjYsImV4cCI6MTY2NjUyNzg2NiwiYWxnIjoiSFMyNTYifQ.e30.obna6U_iZEoo3LDTGYIxDP-QyJk6ekdamaS08nBg7nI'

export const generateToken = async (userData) => {
    try {
        const token = await jwt.sign(userData, privateKey)
        return token
    } catch(err) {
        console.log(err)
        return 
    }
}

export const verifyToken = async (token) => {
    try {
        const jwtToken = await jwt.verify(token, privateKey)
        return jwtToken
    }
    catch(err){
        // token invalide
        return undefined
    }
}