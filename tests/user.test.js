const request = require('supertest')
const app = require('../app')
const { User } = require('../models/index')
const { sequelize } = require('../models/index')
const { queryInterface } = sequelize

beforeAll((done) => {
    const inputUser = {
        email: 'admin@mail.com',
        password: '1234',
        role: 'admin'
    }
    User.create(inputUser)
        .then(res => {
            console.log('admin account created')
            done()
        })
        .catch(err => {
            console.log(err)
        })
})

afterAll((done) => {
    queryInterface.bulkDelete('Users')
    .then(() => {
        done()
    })
    .catch(err => {
        done()
    })
})

describe('Test Login POST /login', () => {
    it('test login success', (done) => {
        request(app)
        .post('/login')
        .send({email: 'admin@mail.com', password: '1234'})
        .then(response => {
            let {body, status} = response
            expect(status).toBe(200)
            expect(body).toHaveProperty('access_token', expect.any(String))
            done()
        })
        .catch(err => {
            console.log(err)
        })
    })
    it('test login email found but wrong pass', (done) => {
        request(app)
        .post('/login')
        .send({email: 'admin@mail.com', password: '123'})
        .then(response => {
            let {body, status} = response
            expect(status).toBe(401)
            expect(body).toHaveProperty('msg', 'Wrong email/password')
            done()
        })
        .catch(err => {
            console.log(err)
        })
    })
    it('test login email not found in db', (done) => {
        request(app)
        .post('/login')
        .send({email: 'lala@mail.com', password: '1234'})
        .then(response => {
            let {body, status} = response

            expect(status).toBe(401)
            expect(body).toHaveProperty('msg', 'Wrong email/password')
            done()
        })
        .catch(err => {
            console.log(err)
        })
    })
    it('test login email and password empty', (done) => {
        request(app)
        .post('/login')
        .send({email: '', password: ''})
        .then(response => {
            let {body, status} = response

            expect(status).toBe(401)
            expect(body).toHaveProperty('msg', 'Wrong email/password')
            done()
        })
        .catch(err => {
            console.log(err)
        })
    })
})