const sessionIdToUserMap = new Map();
const jwt = require("jsonwebtoken"); 

const secret = "kirtan123"


function setUser(user){
const payload = {
    id,
    ...user,
};

return jwt.sign(payload,secret)
}

function getUser(token) {
  return jwt.verify(token,secret)
}

module.exports ={
    setUser,
    getUser,
}