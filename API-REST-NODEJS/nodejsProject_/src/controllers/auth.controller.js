//Import
const User = require('../models/User');
const Rol = require('../models/Rol');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

//Controller 
class Users {
    //Sing-Up
    async singup (body) {
        try {
            const { fullName, username, email, area, password, rol } = body;
            const newUser = new User({ 
                fullName, 
                username, 
                email, 
                area,
                password: await User.cifrar(password)
            });
            //Rol
            if (rol) {
                const foundRol = await Rol.find({name: {$in: rol}});
                newUser.rol = foundRol.map(roles => roles._id);
            } else {
                const role = await Rol.findOne({name: 'user'});
                newUser.rol = [role._id];
            };
            //Guardar
            const userSaved = await newUser.save();
            //Generar un token
            const token = jwt.sign({id: userSaved._id}, config.SECRET, {
                expiresIn: 10368000 //120 días 
            });
            return {token}; 
        } catch (err) {
            console.error(err);            
        };
    };
    //Sing-In
    async singin (body) {
        try {
            //Comprobar registro del usuario 
           const userRegis = await User.findOne({email: body.email}).populate('rol');
           if (userRegis) {
               //Comprobar contraseña 
               const comparePassword = await User.comparePass(body.password, userRegis.password);
               if(comparePassword) {
                   const token = jwt.sign({id: userRegis._id}, config.SECRET, {
                       expiresIn: 10368000 //120 días 
                    });
                   return { token };
                } else return 'Contraseña incorrecta';
            } else return 'El usuario no se encuentra registrado';
        } catch (err) {
            console.error(err);
        };
    };
};

//Export 
module.exports = Users;
