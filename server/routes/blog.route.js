const express = require("express")
const {blogList, blogAdd, blogEdit, blogById, blogDelete, blogListByUser} = require('../controllers/blog.controlle')
const authMiddleware = require('../middlewares/auth.middleware')
const blogRouter = express.Router()

blogRouter.get('/blogList', blogList)
blogRouter.get('/blogListByUser',authMiddleware, blogListByUser)
blogRouter.post('/blogAdd',authMiddleware, blogAdd)
blogRouter.put('/blogEdit/:id',authMiddleware, blogEdit)
blogRouter.get('/:id', blogById)
blogRouter.delete('/blogDelete/:id',authMiddleware, blogDelete)


module.exports = blogRouter