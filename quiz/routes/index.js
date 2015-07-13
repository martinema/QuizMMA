var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');

//Página HOME
router.get('/', function(req, res){
	res.render('index', {title: 'Quiz'});
});

router.get('/quizes/question', quizController.question);
router.get('/quizes/answer', quizController.answer);

module_exports = router;