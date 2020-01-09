const express = require('express')
const multer = require('multer')
const Profile = require('../controllers/profile')
const Route = express.Router()
const uuidv1 = require('uuid/v1')

const storageBuyer = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, './public/images/profile')
    },
    filename: (request, file, callback) => {
        let filetype = ''
        if (file.mimetype === 'image/gif') {
          filetype = 'gif'
        }
        if (file.mimetype === 'image/png') {
          filetype = 'png'
        }
        if (file.mimetype === 'image/jpeg') {
          filetype = 'jpg'
        }
        if (file.mimetype === 'image/jpeg') {
          filetype = 'jpg'
        }
        callback(null, 'buyer-' + uuidv1() + '.' + filetype)
      }
})

const storageSeller = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, './public/images/profile')
    },
    filename: (request, file, callback) => {
        let filetype = ''
        if (file.mimetype === 'image/gif') {
          filetype = 'gif'
        }
        if (file.mimetype === 'image/png') {
          filetype = 'png'
        }
        if (file.mimetype === 'image/jpeg') {
          filetype = 'jpg'
        }
        if (file.mimetype === 'image/jpeg') {
          filetype = 'jpg'
        }
        callback(null, 'seller-' + uuidv1() + '.' + filetype)
      }
})

const storageStore = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, './public/images/store')
    },
    filename: (request, file, callback) => {
        let filetype = ''
        if (file.mimetype === 'image/gif') {
          filetype = 'gif'
        }
        if (file.mimetype === 'image/png') {
          filetype = 'png'
        }
        if (file.mimetype === 'image/jpeg') {
          filetype = 'jpg'
        }
        if (file.mimetype === 'image/jpeg') {
          filetype = 'jpg'
        }
        callback(null, 'store-' + uuidv1() + '.' + filetype)
      }
})

const uploadBuyer = multer({
    storage: storageBuyer
})

const uploadSeller = multer({
    storage: storageSeller
})

const uploadStore = multer({
    storage: storageStore
})

Route.get('/', Profile.getProfile)
Route.post('/', Profile.createProfile)
Route.put('/', Profile.updateProfile)
Route.delete('/', Profile.deleteProfile)
Route.put('/upload-buyer', uploadBuyer.single('image'), Profile.uploadBuyer)
Route.put('/upload-seller', uploadSeller.single('image'), Profile.uploadSeller)
Route.put('/upload-store', uploadStore.single('image'), Profile.uploadStore)

module.exports = Route
