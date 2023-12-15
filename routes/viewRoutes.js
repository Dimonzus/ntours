const express = require('express');
// eslint-disable-next-line import/no-unresolved
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');
const bookingController = require('../controllers/bookingController');

const router = express.Router();

router.use(authController.isLoggedIn);

router.get(
  '/',
  bookingController.createBookingCheckout,
  viewsController.getOverview
);
router.get('/tour/:slug', viewsController.getTour);
// router.get('/login', viewsController.getLoginForm);

router.get('/', authController.isLoggedIn, viewsController.getOverview);
router.get('/tour/:slug', authController.isLoggedIn, viewsController.getTour);
router.get('/login', authController.isLoggedIn, viewsController.getLoginForm);
router.get('/me', authController.protect, viewsController.getAccount);
router.get(
  '/my-tours',
  bookingController.createBookingCheckout,
  authController.protect,
  viewsController.getMyTours
);
router.get(
  '/my-tours/delete/:id',
  authController.protect,
  bookingController.cancelBookedTour
);

router.post(
  '/submit-user-data',
  authController.protect,
  viewsController.updateUserData
);

module.exports = router;
