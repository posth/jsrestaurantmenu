//Class
function Controller(idTheTable, jsonObject) 
{

	this.idTheTable = idTheTable;
	this.jsonObject = jsonObject;

	this.createTable(); 
}

//Creating the table of Junk food items from the junkFood.json file
Controller.prototype.createTable = function() 
{
	var oTheTable = document.getElementById(this.idTheTable); //table object

	var theBodyOfTheTable = document.createElement('TBODY'); //create a TBODY object

	// Looping through the JUNKFOOD object array
	for (key1 in this.jsonObject)
	{
		
		for(var x = 0; x < this.jsonObject[key1].length; x++) 
		{
			var oTR = document.createElement('TR'); //create TR object

			var counter = 0; //variable to add 5th column for checkboxes

		
			//loop C  
			for(key2 in this.jsonObject[key1][x]) //key2 will be equal to the 4 properties in each object
			{
				counter++;

				if(key2 != "PICTURE")
				{
					var sDataForCells = this.jsonObject[key1][x][key2]; //all the values of the properties which ARE NOT PICTURES!!!

					var oTD = document.createElement('TD');  //create a TD object
					oTD.appendChild(document.createTextNode(sDataForCells));
					oTR.appendChild(oTD);



					if (counter == 5) //now time to add 4th column for checkboxes
					{
						var oCB = document.createElement('INPUT');
						oCB.setAttribute('type', 'checkbox');
						var oTD = document.createElement('TD');
						oTD.appendChild(oCB);
						oTR.appendChild(oTD);
					} 

				} 
				else //if it is equal to the picture property
				{
					var oIMG = document.createElement('IMG'); //create an IMAGE object
					oIMG.setAttribute('src', this.jsonObject[key1][x][key2]);
					var oTD = document.createElement('TD');
					oTD.appendChild(oIMG);
					oTR.appendChild(oTD);
				}


			}// end of loop C


			theBodyOfTheTable.appendChild(oTR);

		} // end of loop B

	}  // end of loop A

	oTheTable.appendChild(theBodyOfTheTable);
}

//Highlighting the vegetarian options
Controller.prototype.highlightVeganOptions = function()
{

	var oTable = document.getElementById(this.idTheTable);
	var oTBODY = oTable.getElementsByTagName('TBODY')[0];
	var aTRs = oTBODY.getElementsByTagName('TR');

	//looping through JUNKFOOD
	for (key1 in this.jsonObject)
	{
		//looping through each object in the JUNKFOOD array
		for(var x = 0; x < this.jsonObject[key1].length; x++)
		{
			//if the object's VEGAN property is YES to highlight that row
			if(this.jsonObject[key1][x]['VEGAN'] == 'Yes')
				{
					aTRs[x].style.backgroundColor = 'lightgrey';
				} 
		
		}
	}

}

//Calculate the total amount
Controller.prototype.calculateTotal = function()
{
	var oTable = document.getElementById(this.idTheTable);
	var oTBODY = oTable.getElementsByTagName('TBODY')[0];
	var aTRs = oTBODY.getElementsByTagName('TR');

	var aINPUTS = document.getElementsByTagName('INPUT');

	var priceString;
	var priceFloat;

	//Setting the variable for the counter of the total price
	var totalPrice = 0;

	for(var x = 0; x < aINPUTS.length; x++)
	{

		//If a food item is selected, it adds it's price taken from the JSON property onto a total inputted into the totalPrice variable
		if (aINPUTS[x].checked)
		{

			priceString = this.jsonObject[key1][x]['PRICE'];
			priceFloat = parseFloat(priceString).toFixed(2);

			totalPrice += parseFloat(priceFloat);
		
		} 
	}

	//Showing the calculation results neatly

	//Total price of the orders selected
	var totalPriceShow = totalPrice.toFixed(2);
	document.getElementById('amount').innerHTML = 'Order: ' + '$ ' + totalPriceShow; 

	//Calculating the taxes based on 15%
	var taxes = totalPrice * .15;
	var taxesShow = taxes.toFixed(2);
	document.getElementById('tax').innerHTML = 'Taxes: ' + '$ ' + taxesShow;

	//Adding the taxes with the total order for a total price
	var total = totalPrice + taxes;
	var totalShow = total.toFixed(2);

	document.getElementById('total').innerHTML = 'Total: ' + '$ ' + totalShow;

}

