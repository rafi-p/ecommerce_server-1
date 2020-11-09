const request = require('supertest')
const app = require('../app')
const { signToken, verifyToken } = require('../helpers/jwt')
const { User } = require('../models/index')
const { sequelize } = require('../models/index')
const { queryInterface } = sequelize

let access_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsImlhdCI6MTYwNDkyNTI5OX0.LsEEBTCRZeREf_s20ow-4H8k3TMIcfbTMzFPIP3yOK8'
let customer_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJkb3JAbWFpbC5jb20iLCJpYXQiOjE2MDQ5Mjg0ODZ9.BEA94wOuOS-PBHTZut3e49yh4R7oLfK0xFbNtGNK2Ic'
let id;



afterAll((done) => {
    queryInterface.bulkDelete('Products')
    .then(() => {
        done()
    })
    .catch(err => {
        done()
    })
})


describe('Test product POST /products', () => {
    it('Add product success', (done) => {
        request(app)
        .post('/products')
        .set('access_token', access_token)
        .send({
            name: 'Playstation 5', 
            image_url: 'https://www.citypng.com/public/uploads/preview/-11591925787cggjhepdvq.png',
            price: 5000000,
            stock: 13
        })
        .then(response => {
            let {body, status} = response
            
            expect(status).toBe(201)
            expect(body).toHaveProperty('id', expect.any(Number))
            expect(body).toHaveProperty('name', 'Playstation 5')
            expect(body).toHaveProperty('image_url', 'https://www.citypng.com/public/uploads/preview/-11591925787cggjhepdvq.png')
            expect(body).toHaveProperty('price', 5000000)
            expect(body).toHaveProperty('stock', 13)
            expect(body).toHaveProperty('userId', expect.any(Number))
            id = +body.id
            done()
        })
        .catch(err => {
            console.log(err)
        })
    })
    it('Add product failed, no name', (done) => {
        request(app)
        .post('/products')
        .set('access_token', access_token)
        .send({
            name: '', 
            image_url: 'https://www.citypng.com/public/uploads/preview/-11591925787cggjhepdvq.png',
            price: 5000000,
            stock: 13
        })
        .then(response => {
            let {body, status} = response
            
            expect(status).toBe(400)
            expect(body).toHaveProperty('msg', 'Name is required')
            done()
        })
        .catch(err => {
            console.log(err)
        })
    })
    it('Add product failed, no image_url', (done) => {
        request(app)
        .post('/products')
        .set('access_token', access_token)
        .send({
            name: 'Playstation 5', 
            image_url: '',
            price: 5000000,
            stock: 13
        })
        .then(response => {
            let {body, status} = response
            
            expect(status).toBe(400)
            expect(body).toHaveProperty('msg', 'Image_url is required')
            done()
        })
        .catch(err => {
            console.log(err)
        })
    })
    it('Add product failed, no price', (done) => {
        request(app)
        .post('/products')
        .set('access_token', access_token)
        .send({
            name: 'Playstation 5', 
            image_url: 'https://www.citypng.com/public/uploads/preview/-11591925787cggjhepdvq.png',
            price: null,
            stock: 13
        })
        .then(response => {
            let {body, status} = response
            
            expect(status).toBe(400)
            expect(body).toHaveProperty('msg', 'Price is required')
            done()
        })
        .catch(err => {
            console.log(err)
        })
    })
    it('Add product failed, minus price', (done) => {
        request(app)
        .post('/products')
        .set('access_token', access_token)
        .send({
            name: 'Playstation 5', 
            image_url: 'https://www.citypng.com/public/uploads/preview/-11591925787cggjhepdvq.png',
            price: -5000000,
            stock: 13
        })
        .then(response => {
            let {body, status} = response
            
            expect(status).toBe(400)
            expect(body).toHaveProperty('msg', 'Price cannot be below zero')
            done()
        })
        .catch(err => {
            console.log(err)
        })
    })
    it('Add product failed, price not a number', (done) => {
        request(app)
        .post('/products')
        .set('access_token', access_token)
        .send({
            name: 'Playstation 5', 
            image_url: 'https://www.citypng.com/public/uploads/preview/-11591925787cggjhepdvq.png',
            price: 'anehaa',
            stock: 13
        })
        .then(response => {
            let {body, status} = response
            
            expect(status).toBe(400)
            expect(body).toHaveProperty('msg', 'Price must be a number')
            done()
        })
        .catch(err => {
            console.log(err)
        })
    })
    it('Add product failed, no stock', (done) => {
        request(app)
        .post('/products')
        .set('access_token', access_token)
        .send({
            name: 'Playstation 5', 
            image_url: 'https://www.citypng.com/public/uploads/preview/-11591925787cggjhepdvq.png',
            price: 5000000,
            stock: null
        })
        .then(response => {
            let {body, status} = response
            
            expect(status).toBe(400)
            expect(body).toHaveProperty('msg', 'Stock is required')
            done()
        })
        .catch(err => {
            console.log(err)
        })
    })
    it('Add product failed, minus stock', (done) => {
        request(app)
        .post('/products')
        .set('access_token', access_token)
        .send({
            name: 'Playstation 5', 
            image_url: 'https://www.citypng.com/public/uploads/preview/-11591925787cggjhepdvq.png',
            price: 5000000,
            stock: -13
        })
        .then(response => {
            let {body, status} = response
            
            expect(status).toBe(400)
            expect(body).toHaveProperty('msg', 'Stock cannot be below zero')
            done()
        })
        .catch(err => {
            console.log(err)
        })
    })
    it('Add product failed, stock not a number', (done) => {
        request(app)
        .post('/products')
        .set('access_token', access_token)
        .send({
            name: 'Playstation 5', 
            image_url: 'https://www.citypng.com/public/uploads/preview/-11591925787cggjhepdvq.png',
            price: 5000000,
            stock: 'anehhh'
        })
        .then(response => {
            let {body, status} = response
            
            expect(status).toBe(400)
            expect(body).toHaveProperty('msg', 'Stock must be a number')
            done()
        })
        .catch(err => {
            console.log(err)
        })
    })
    it('Add product failed, no access_token', (done) => {
        request(app)
        .post('/products')
        .set('access_token', '')
        .send({
            name: 'Playstation 5', 
            image_url: 'https://www.citypng.com/public/uploads/preview/-11591925787cggjhepdvq.png',
            price: 5000000,
            stock: 13
        })
        .then(response => {
            let {body, status} = response
            
            expect(status).toBe(401)
            expect(body).toHaveProperty('msg', 'Authentication failed')
            done()
        })
        .catch(err => {
            console.log(err)
        })
    })
    it('Add product failed, not admin', (done) => {
        request(app)
        .post('/products')
        .set('access_token', customer_token)
        .send({
            name: 'Playstation 5', 
            image_url: 'https://www.citypng.com/public/uploads/preview/-11591925787cggjhepdvq.png',
            price: 5000000,
            stock: 13
        })
        .then(response => {
            let {body, status} = response
            
            expect(status).toBe(401)
            expect(body).toHaveProperty('msg', 'Not authorized')
            done()
        })
        .catch(err => {
            console.log(err)
        })
    })
})

describe('Test product GET /products', () => {
    it('List all product success', (done) => {
        request(app)
        .get('/products')
        .set('access_token', access_token)
        .then(response => {
            let {body, status} = response
            
            expect(status).toBe(200)
            expect(body.productList.length).toEqual(1)
            done()
        })
        .catch(err => {
            console.log(err)
        })
    })
    it('List all product failed, no access_token', (done) => {
        request(app)
        .get('/products')
        .set('access_token', '')
        .then(response => {
            let {body, status} = response
            
            expect(status).toBe(401)
            expect(body).toHaveProperty('msg', 'Authentication failed')
            done()
        })
        .catch(err => {
            console.log(err)
        })
    })
})


describe('Test product PUT /products', () => {
    it('Update product success', (done) => {
        request(app)
        .put(`/products/${id}`)
        .set('access_token', access_token)
        .send({
            name: 'Xbox One', 
            image_url: 'https://www.pikpng.com/pngl/b/99-990866_xbox-one-x-png-xbox-one-x-console.png',
            price: 1500000,
            stock: 9
        })
        .then(response => {
            let {body, status} = response
            
            expect(status).toBe(200)
            expect(body).toHaveProperty('id', expect.any(Number))
            expect(body).toHaveProperty('name', 'Xbox One')
            expect(body).toHaveProperty('image_url', 'https://www.pikpng.com/pngl/b/99-990866_xbox-one-x-png-xbox-one-x-console.png')
            expect(body).toHaveProperty('price', 1500000)
            expect(body).toHaveProperty('stock', 9)
            done()
        })
        .catch(err => {
            console.log(err)
        })
    })
    it('Update product failed, no name', (done) => {
        request(app)
        .put(`/products/${id}`)
        .set('access_token', access_token)
        .send({
            name: '', 
            image_url: 'https://www.pikpng.com/pngl/b/99-990866_xbox-one-x-png-xbox-one-x-console.png',
            price: 1500000,
            stock: 9
        })
        .then(response => {
            let {body, status} = response
            
            expect(status).toBe(400)
            expect(body).toHaveProperty('msg', 'Name is required')
            done()
        })
        .catch(err => {
            console.log(err)
        })
    })
    it('Update product failed, no image_url', (done) => {
        request(app)
        .put(`/products/${id}`)
        .set('access_token', access_token)
        .send({
            name: 'Xbox One', 
            image_url: '',
            price: 1500000,
            stock: 9
        })
        .then(response => {
            let {body, status} = response
            
            expect(status).toBe(400)
            expect(body).toHaveProperty('msg', 'Image_url is required')
            done()
        })
        .catch(err => {
            console.log(err)
        })
    })
    it('Update product failed, no price', (done) => {
        request(app)
        .put(`/products/${id}`)
        .set('access_token', access_token)
        .send({
            name: 'Xbox One', 
            image_url: 'https://www.pikpng.com/pngl/b/99-990866_xbox-one-x-png-xbox-one-x-console.png',
            price: null,
            stock: 9
        })
        .then(response => {
            let {body, status} = response
            
            expect(status).toBe(400)
            expect(body).toHaveProperty('msg', 'Price is required')
            done()
        })
        .catch(err => {
            console.log(err)
        })
    })
    it('Update product failed, minus price', (done) => {
        request(app)
        .put(`/products/${id}`)
        .set('access_token', access_token)
        .send({
            name: 'Xbox One', 
            image_url: 'https://www.pikpng.com/pngl/b/99-990866_xbox-one-x-png-xbox-one-x-console.png',
            price: -1500000,
            stock: 9
        })
        .then(response => {
            let {body, status} = response
            
            expect(status).toBe(400)
            expect(body).toHaveProperty('msg', 'Price cannot be below zero')
            done()
        })
        .catch(err => {
            console.log(err)
        })
    })
    it('Update product failed, price not a number', (done) => {
        request(app)
        .put(`/products/${id}`)
        .set('access_token', access_token)
        .send({
            name: 'Xbox One', 
            image_url: 'https://www.pikpng.com/pngl/b/99-990866_xbox-one-x-png-xbox-one-x-console.png',
            price: 'anehaa',
            stock: 9
        })
        .then(response => {
            let {body, status} = response
            
            expect(status).toBe(400)
            expect(body).toHaveProperty('msg', 'Price must be a number')
            done()
        })
        .catch(err => {
            console.log(err)
        })
    })
    it('Update product failed, no stock', (done) => {
        request(app)
        .put(`/products/${id}`)
        .set('access_token', access_token)
        .send({
            name: 'Xbox One', 
            image_url: 'https://www.pikpng.com/pngl/b/99-990866_xbox-one-x-png-xbox-one-x-console.png',
            price: 1500000,
            stock: null
        })
        .then(response => {
            let {body, status} = response
            
            expect(status).toBe(400)
            expect(body).toHaveProperty('msg', 'Stock is required')
            done()
        })
        .catch(err => {
            console.log(err)
        })
    })
    it('Update product failed, minus stock', (done) => {
        request(app)
        .put(`/products/${id}`)
        .set('access_token', access_token)
        .send({
            name: 'Xbox One', 
            image_url: 'https://www.pikpng.com/pngl/b/99-990866_xbox-one-x-png-xbox-one-x-console.png',
            price: 1500000,
            stock: -9
        })
        .then(response => {
            let {body, status} = response
            
            expect(status).toBe(400)
            expect(body).toHaveProperty('msg', 'Stock cannot be below zero')
            done()
        })
        .catch(err => {
            console.log(err)
        })
    })
    it('Update product failed, stock not a number', (done) => {
        request(app)
        .put(`/products/${id}`)
        .set('access_token', access_token)
        .send({
            name: 'Xbox One', 
            image_url: 'https://www.pikpng.com/pngl/b/99-990866_xbox-one-x-png-xbox-one-x-console.png',
            price: 1500000,
            stock: 'anehhh'
        })
        .then(response => {
            let {body, status} = response
            
            expect(status).toBe(400)
            expect(body).toHaveProperty('msg', 'Stock must be a number')
            done()
        })
        .catch(err => {
            console.log(err)
        })
    })
    it('Update product failed, no access_token', (done) => {
        request(app)
        .put(`/products/${id}`)
        .set('access_token', '')
        .send({
            name: 'Xbox One', 
            image_url: 'https://www.pikpng.com/pngl/b/99-990866_xbox-one-x-png-xbox-one-x-console.png',
            price: 1500000,
            stock: 9
        })
        .then(response => {
            let {body, status} = response
            
            expect(status).toBe(401)
            expect(body).toHaveProperty('msg', 'Authentication failed')
            done()
        })
        .catch(err => {
            console.log(err)
        })
    })
    it('Update product failed, not admin', (done) => {
        request(app)
        .put(`/products/${id}`)
        .set('access_token', customer_token)
        .send({
            name: 'Xbox One', 
            image_url: 'https://www.pikpng.com/pngl/b/99-990866_xbox-one-x-png-xbox-one-x-console.png',
            price: 1500000,
            stock: 9
        })
        .then(response => {
            let {body, status} = response
            
            expect(status).toBe(401)
            expect(body).toHaveProperty('msg', 'Not authorized')
            done()
        })
        .catch(err => {
            console.log(err)
        })
    })
})

describe('Test product DELETE /products', () => {
    it('Delete product success', (done) => {
        request(app)
        .delete(`/products/${id}`)
        .set('access_token', access_token)
        .then(response => {
            let {body, status} = response
            
            expect(status).toBe(200)
            expect(body).toHaveProperty('message', 'Product success to delete')

            done()
        })
        .catch(err => {
            console.log(err)
        })
    })
    it('Delete product failed, no access_token', (done) => {
        request(app)
        .delete(`/products/${id}`)
        .set('access_token', '')
        .then(response => {
            let {body, status} = response
            
            expect(status).toBe(401)
            expect(body).toHaveProperty('msg', 'Authentication failed')
            done()
        })
        .catch(err => {
            console.log(err)
        })
    })
    it('Delete product failed, not admin', (done) => {
        request(app)
        .delete(`/products/${id}`)
        .set('access_token', customer_token)
        .then(response => {
            let {body, status} = response
            
            expect(status).toBe(401)
            expect(body).toHaveProperty('msg', 'Not authorized')
            done()
        })
        .catch(err => {
            console.log(err)
        })
    })
})