$(function() {

var questions = [
{question:"What is the capital of France?", answer: 3, choices:["London", "Madrid", "Rome", "Paris"]},
{question:"What is the capital of Germany?", answer: 1, choices:["London", "Berlin", "Rome", "Paris"]},
{question:"What is the capital of the Netherlands?", answer: 0, choices:["Amsterdam", "Berlin", "Rome", "Paris"]},
{question:"What is the capital of Belgium?", answer: 3, choices:["London", "Amsterdam", "Rome", "Brussels"]},
{question:"What is the capital of Poland?", answer: 1, choices:["London", "Warsaw", "Prague", "Kiev"]}
];

var questionCount = 0;
var score = 0;
var selection = [];


displayStuff();


// EVENT LISTENERS


$('.container').on('click', '.next-button', function(e){

	if ($('input[name="answer"]:checked').val() === undefined) {
		alert('Answer the question man');
	}

	if($('input[name="answer"]:checked').val() !== undefined) {
	
	addValue();

	// replace container content with new content

	$('.container').fadeOut(function(){
		$('.question-element').remove();
		questionCount++

		if (questionCount < 5) {
			var newElement = createElement(questionCount);
			$('.container').append(newElement).fadeIn();
		}
		else{
			var finalScore = calculateFinalScore()
			var finalScoreElement = displayFinalScoreElement(finalScore)
			$('.container').append(finalScoreElement).fadeIn();


		}
		});
	}
});

		// go back by removing and replacing the content

$('.container').on('click', '.previous-button', function(e){
	
	popValue();

	$('.container').fadeOut(function(){
		$('.question-element').remove();
		questionCount--

		var newElement = createElement(questionCount);
			$('.container').append(newElement).fadeIn();
	})
})


// DISPLAY DISPLAY DISPLAY DISPLAY


function displayStuff() {
	var questionElement = createElement(questionCount);
	$('.container').append(questionElement);
}



function createElement (questionCount) {
	var questionElement = $('<div class="question-element">')

	var header = $('<h2 class="question-header">');
	var questionNumber = 'Question ' + (questionCount + 1) + ':'
	header.append(questionNumber)
	questionElement.append(header)


	var question = $('<h3 class="question-itself">');
	var questionText = questions[questionCount].question;
	question.append(questionText)
	questionElement.append(question)

	var radioButtonsList = createRadioButtons();
	questionElement.append(radioButtonsList)

	
	var previousButton = $('<button class="previous-button">')
		previousButton.append("previous")
		if (questionCount === 0 ) {
			previousButton.css('visibility', 'hidden')
		}
		questionElement.append(previousButton);
	


	var nextButton = $('<button class="next-button">')
	nextButton.append("next")
	questionElement.append(nextButton);

	return questionElement
}

function createRadioButtons() {
	var list = $('<ul>');
	for (var i = 0; i < 4; i++) {
		var listItem = $('<li>')
		var input = '<input name="answer" type="radio" value="' + i + '"/>'
		input += questions[questionCount].choices[i]
		listItem.append(input);
		list.append(listItem);
		}
	return list
	}

function displayFinalScoreElement(finalScore) {
	var finalScoreElement = createFinalScoreElement(finalScore);

return finalScoreElement


}

function createFinalScoreElement(finalScore) {
	var finalScoreElement = $('<div class="finalScoreElement">')

	var finalResultHeader = $('<h1>');
	var finalResultHeaderText = "Quiz night tonight result:"
	finalResultHeader.append(finalResultHeaderText);
	finalScoreElement.append(finalResultHeader);

	var loserGod = $('<h2>');
	var loserGodText = "";
	switch (finalScore) {
		case 0:
			loserGodText = "UNREAL LOSAH"
			break;
		case 1:
			loserGodText = "LOSAH"
			break;
		case 2:
			loserGodText = "SUCKAH"
			break;
		case 3:
			loserGodText = "BOY AVERAGE"
			break;
		case 4:
			loserGodText = "KING!"
			break;
		case 5:
			loserGodText = "GOD!"
			break;
	}
	loserGod.append(loserGodText);
	finalScoreElement.append(loserGod)

	var actualScore = $('<h2>');
	var actualScoreText = finalScore + "/5"
	actualScore.append(actualScoreText);
	finalScoreElement.append(actualScore);

	return finalScoreElement
}

//updateScores and questions object


function addValue() {
	var answer = $('input[name="answer"]:checked').val();
	selection.push(answer)
}

function popValue() {
	selection.pop();
}

function calculateFinalScore(){
	for (var i = 0; i < selection.length; i++) {
		if (selection[i] == questions[i].answer) {
			score++
		}
	}
return score
}



});


