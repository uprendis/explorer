var express = require('express'), router = express.Router();

router.use('/public/api', require('./transactions'));
router.use('/public/api', require('./transaction_hash'));
router.use('/public/api', require('./balance'));

router.get('/public/api', function(req, res) {
    console.log('/public/api')
    res.statusCode = 201;
    res.json({
      status: 201,
      message: ' User successfully authenticated ',
    });
    res.end();
});
module.exports = router;