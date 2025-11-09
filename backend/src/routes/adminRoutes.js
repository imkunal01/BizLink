const  express = require('express');
const {getAllUsers, toggleBlockUser, updateUserRole, deleteUser, getStats} = require('../controllers/adminController');
const {protect, adminOnly} = require('../middleware/authMiddleware');
const router = express.Router();

router.use(protect,adminOnly);


router.get("/users", getAllUsers);
router.put("/user/block/:id", toggleBlockUser);
router.put("/user/role/:id", updateUserRole);
router.delete("/user/:id", deleteUser);
router.get("/stats", getStats);

module.exports = router;