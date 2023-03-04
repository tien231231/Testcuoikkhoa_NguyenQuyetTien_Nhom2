

const bcrypt = require("bcrypt") //hash mật khẩu
const User = require("../models/User")
const jwt = require("jsonwebtoken")
let refreshTokens = []
const authC = {
    
    registerUser: async(req,res)=> {
        try{
            const salt = await bcrypt.genSalt(10)
            const hashed = await bcrypt.hash(req.body.password,salt)

            // tạo new user
            const newUser = await new User({
                username:req.body.username,
                email:req.body.email,
                password:hashed,
            })

            const user = await newUser.save()
            res.status(200).json(user)
        }catch(err){
            res.status(500).json(err)
        }
    },
    generateAccessToken:(user)=>{
        return jwt.sign(
            {
                id:user.id,admin:user.admin,
            },process.env.JWT_ACCESS_TOKKEN,{expiresIn:"30s"}
        )
    },
    generateRefreshToken:(user)=>{
        return jwt.sign(
            {
                id:user.id,admin:user.admin,
            },process.env.JWT_REFRESH_TOKKEN,{expiresIn:"365d"}
        )
    },

    loginUser: async(req,res)=>{
        try{
            const user = await User.findOne({username:req.body.username})
            if(!user){
                return res.status(400).json("wrong user")

            }
            const validPass = await bcrypt.compare(req.body.password,user.password)
            if(!validPass){
               return res.status(404).json("Wrong pass")
            }
            if(user && validPass){
                const accessToken = authC.generateAccessToken(user)
                const refreshToken = authC.generateRefreshToken(user)
                refreshTokens.push(refreshToken)
                //lưu refresh token
                res.cookie("refreshToken",refreshToken,{
                    httpOnly:true,
                    secure:false, 
                    path:"/",
                    sameSite:"strict",//ngăn chặn tấn công CSRS

                })

                const{password,...others} = user._doc
                res.status(200).json({...others,accessToken})
            }

        }
        catch(err){
            res.status(500).json(err)
        }
    },
    requestRefreshToken: async(req,res) =>{
        const refreshToken = req.cookies.refreshToken 
        if(!refreshToken) return res.status(400).json("you are not authenticated")
        if(!refreshTokens.includes(refreshToken)){
            return res.status(403).json("refresh token is not valid")
        }
        jwt.verify(refreshToken,process.env.JWT_REFRESH_TOKKEN,(err,user)=>{
            if(err){
                console.log(err)

            }refreshTokens = refreshTokens.filter((token)=>token !== refreshToken)
            const newAccessToken = authC.generateAccessToken(user)
            const newRefreshToken = authC.generateRefreshToken(user)
            refreshTokens.push(newRefreshToken)
            res.cookie("refreshToken",newRefreshToken,{
                httpOnly:true,
                secure:false, 
                path:"/",
                sameSite:"strict",//ngăn chặn tấn công CSRS

            })
            res.status(200).json({accessToken:newAccessToken})
        })
    },
    userLogout:async(req,res)=>{
        res.clearCookie("refreshToken")
        refreshTokens = refreshTokens.filter(token => token !== req.cookies.refreshToken)
        res.status(200).json("logged out")
    }
}

module.exports = authC