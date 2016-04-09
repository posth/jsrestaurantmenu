$(document).ready(function() //when the DOM is ready this function gets executed
{
	$.getJSON('json/junkFood.json', function(result) //get file data and return result
		{
			var oController = new Controller('junkTable', result); //instantiate object from class Controller
		
			//Event Listener to calculate the total amount
			document.getElementById('calculateButton').addEventListener('click', function()
			{
				oController.calculateTotal(); 
			});

			//Event Listener to highlight the vegetarian options on the menu
			document.getElementById('veganOptions').addEventListener('click', function()
			{
				oController.highlightVeganOptions();
			});
		});


});

$(window).load(function() {

	$(".loader").fadeOut("slow");

});

