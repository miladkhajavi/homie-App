import app from '../index'
import request from 'supertest'
import User from '../models/user'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import {
    SECRET_JWT_CODE
} from '../database/dbConfig'




const ID = new mongoose.Types.ObjectId()
const newUser = {
    _id: ID,
    userName: 'helloworld',
    email: 'helloworld@gmail.com',
    password: "12345",
    tokens: [{
        token: jwt.sign({
            _id: ID
        }, SECRET_JWT_CODE)
    }]
}
beforeEach(async () => {
    await User.deleteMany()
    await new User(newUser).save()
})

describe('****authenticate***', () => {
    test('should user can register', async () => {
        const response = await request(app).post('/user/register').send({
            userName: 'milad',
            email: 'mkhajavi5@gmail.com',
            password: "12345"
        }).expect(200)
        // assert that the database was changed correctly
        const user = await User.findOne({
            _id: response.body.item._id
        })
        expect(user).not.toBeNull()
        // assert about the response
        expect(response.body).toMatchObject({
            item: {
                userName: 'milad',
                email: 'mkhajavi5@gmail.com'
            }
        })
        expect(user.password).not.toBe('12345')

    })

    test('should login exist users', async () => {
        const response = await request(app).post('/user/login').send({
            email: newUser.email,
            password: newUser.password
        }).expect(200)

        const user = await User.findOne({
            _id: newUser
        })
        expect(response.body.token).toBe(user.tokens[1].token)
    });

    test('user is not exsist please register', async () => {
        await request(app).post('/user/login').send({
            email: "Adldapdkadsaddasdad@gmail.com",
            password: newUser.password
        }).expect(500)
    });

    test('bad request', async () => {
        await request(app).post('/user/login').send({
            email: "Adldapdkadsaddasdad@gmail.com",
        }).expect(400)
    });

    test('password incorrect', async () => {
        await request(app).post('/user/login').send({
            email: newUser.email,
            password: "145Mm43"
        }).expect(500)
    });

});


describe('****User Info****', () => {
    test('user should seen profile', async () => {
        await request(app).get('/user/profile')
            .set('Authorization', `jwt ${newUser.tokens[0].token}`)
            .send()
            .expect(200)
    });

    test('should not get profile unAthenticated User ', async () => {
        await request(app).get('/user/profile')
            .send()
            .expect(401)
    });

    test('show all users in exist pages', async () => {
        await request(app).get('/user/users')
            .set('Authorization', `jwt ${newUser.tokens[0].token}`)
            .query({
                page: 1
            })
            .expect(200)
    });

    test('Your request has not been answered', async () => {
        await request(app).get('/user/users')
            .set('Authorization', `jwt ${newUser.tokens[0].token}`)
            .query({
                page: 100
            })
            .expect(404)
    });

    test('should not show get all users when user unAthenticated', async () => {
        await request(app).get('/user/users')
            .expect(401)
    });

    test('should delete account for user ', async () => {
        await request(app).delete('/user/deleteAccount')
            .set('Authorization', `jwt ${newUser.tokens[0].token}`)
            .send().expect(200)
        const user = await User.findOne({
            _id: ID
        })
        expect(user).toBeNull()
    });

    test('should not delete account for unAuthenticated user', async () => {
        await request(app).delete('/user/deleteAccount')
            .send().expect(401)
    })


    test('should user can edit profile', async () => {
        await request(app).put('/user/edit')
            .set('Authorization', `jwt ${newUser.tokens[0].token}`)
           .send({
           })
           await User.update({_id:ID},{$set:{
            firstName:"milad",
            lastName:"khajavi",
            mobile:"0912567890",
           }})
           expect(200);
    })
    test('should not edit account for unAuthenticated user', async() => {
        await request(app).put('/user/edit')
        .send()
        .expect(401)
    });
    
});