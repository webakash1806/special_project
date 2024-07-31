// Importing the Router from Express to create modular route handlers
import { Router } from "express";

// Importing various controller functions and middlewares
import {
    register,
    login,
    logout,
    profile,
    forgotPassword,
    resetPassword,
    changePassword,
    updateProfile,
    carDriverList,
    updateDriverStatus,
    getDriverData,
    usersList,
    boatManList,
    updateBoatmanStatus,
    getBoatmanDetail
} from "../controllers/admin.controller.js";

import { isLoggedIn } from "../middlewares/auth.middleware.js";
import { loginAuth } from "../middlewares/login.middleware.js";
import upload from '../middlewares/multer.middleware.js'
import { allCarOrder, getCarOrderData } from "../controllers/bookings/carOrder.controller.js";
import { allBoatOrder, getBoatOrderData } from "../controllers/bookings/boatOrder.controller.js";

// Creating an instance of the Express Router
const router = Router()

// Route for user registration with optional avatar upload using multer middleware
router.post('/register', register)

// Route for user login with authentication middleware (loginAuth)
router.post('/login', loginAuth, login)

// Route for user logout
router.get('/logout', logout)

// Route to get user profile information, requires user to be logged in (isLoggedIn)
router.get('/me', isLoggedIn, profile)

// Route for initiating the forgot password process
router.post('/forgot-password', forgotPassword)

// Route for resetting the user's password with a reset token
router.post('/reset-password/:resetToken', resetPassword)

// Route for changing the user's password, requires user to be logged in
router.post('/change-password', isLoggedIn, changePassword)

// Route for updating user profile information with optional avatar upload
router.put('/update-profile/:id', isLoggedIn, upload.single("avatar"), updateProfile)


router.get('/car/list', isLoggedIn, carDriverList)

router.get('/user/list', isLoggedIn, usersList)

router.get('/boat/list', isLoggedIn, boatManList)

router.put('/car/update-status', isLoggedIn, updateDriverStatus)

router.put('/boat/update-status', isLoggedIn, updateBoatmanStatus)

router.get('/car/detail/:id', isLoggedIn, getDriverData)

router.get('/boat/detail/:id', isLoggedIn, getBoatmanDetail)

router.get('/car-orders', allCarOrder)

router.get('/boat-orders', allBoatOrder)

router.get('/car-orders/:id', getCarOrderData)

router.get('/boat-orders/:id', getBoatOrderData)



// Exporting the router instance to be used in the main application
export default router