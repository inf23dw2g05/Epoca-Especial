const express = require('express');
const router = express.Router();
const auth = require('../midlewares/auth');
const passport = require('../midlewares/passport');

const ProductController = require('../controllers/ProductController');
const ProductCategoryController = require('../controllers/ProductCategoryController');
const UserController = require('../controllers/UserController');
const CartController = require('../controllers/CartController');
const AuthController = require('../controllers/AuthController');

// Rotas de categoria de produtos
router.get('/ProductCategories', auth,ProductCategoryController.retrieveProductCategories);
router.get('/ProductCategories/:ID',auth,ProductCategoryController.retrieveProductCategory); 
router.post('/ProductCategories',auth,ProductCategoryController.createProductCategory); 
router.put('/ProductCategories/:ID',auth, ProductCategoryController.updateProductCategory); 
router.delete('/ProductCategories/:ID',auth, ProductCategoryController.deleteProductCategory);

// Rotas de produtos
router.get('/Products',auth, ProductController.retrieveProducts); 
router.get('/Products/:ID',auth, ProductController.retrieveProduct); 
router.post('/Products',auth, ProductController.createProduct); 
router.put('/Products/:ID',auth, ProductController.updateProduct); 
router.delete('/Products/:ID',auth, ProductController.deleteProduct); 


// Rotas de usuários
router.get('/Users',auth, UserController.retrieveUsers);
router.get('/Users/:ID',auth, UserController.retrieveUser);
router.post('/Users',auth, UserController.createUsers);
router.put('/Users/:ID',auth, UserController.updateUsers); 
router.delete('/Users/:ID',auth, UserController.deleteUsers); 

// Rotas de carrinho
router.get('/Cart',auth, CartController.listCartItems); 
router.post('/Cart',auth, CartController.addProductToCart); 
router.put('/Cart/:ID',auth, CartController.updateCartItem); 
router.delete('/Cart/:ID',auth, CartController.removeProductFromCart); 

// Routes for Authentication
router.get('/login', AuthController.login);
router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            console.error('Logout error:', err);
            return res.status(500).send('Logout failed');
        }
        res.redirect('/'); // Redireciona para a página inicial ou de login
    });
});

router.get('/', auth, AuthController.protected);
router.get('/auth/github', passport.authenticate("github", { scope: ["user:email"] }), AuthController.authGitHub);
router.get('/auth/github/callback', passport.authenticate("github", { failureRedirect: "/login" }), AuthController.authCallback);
router.get('/me', auth, AuthController.me);
router.get('/githubme', auth, AuthController.gitHubMe);


module.exports = router;