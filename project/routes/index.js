var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {

    res.render('index', {
            title: 'Välkommen till flytthjälpen',
            user: "ej inloggad",
            searchParameters :  ["Flyttfirma", "Städfirma"]
        }
    );
});

module.exports = router;

