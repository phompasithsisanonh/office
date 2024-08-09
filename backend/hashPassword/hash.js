const bcrypt = require('bcryptjs')


const hashPassword = async (password)=>{
    try{
      const hashPassword_1 =await bcrypt.hash(password,process.env.saltRouds) 
      return hashPassword_1
    }catch(err){
      console.log(err)
    }
}
const compare1 =async (password , hashPassword)=>{
    return bcrypt.compare(password,hashPassword)
}
module.exports.compare1=compare1
module.exports.hashPassword =hashPassword 