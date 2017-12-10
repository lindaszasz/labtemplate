var express = require('express');
var router = express.Router();
var employee = require('../service/').employee;

router.get('/', employee.list);
router.get('/:id', employee.findById);
router.post('/', employee.create);
router.delete('/:id', employee.delete);
module.exports = router;