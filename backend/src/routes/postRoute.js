import express from 'express'
import { getAllPosts,createPost,searchPosts,closePost } from '../controllers/postController.js';
import { protect,authorizeRoles } from '../middlewares/userMiddleware.js';
const router=express.Router()

router.post('/create',protect,authorizeRoles('Student'),createPost)
router.get('/', getAllPosts)
router.get('/search', searchPosts)
router.put('/close/:id',protect,closePost)
export default router