

document.getElementById("myForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission
  
    // Get form field values
    var age = document.getElementById("age").value;
    var height = document.getElementById("height").value;
    var weight = document.getElementById("weight").value;
    var medical_condition = document.getElementById("medical_condition").value;
    var allergies = document.getElementById("allergies").value;
    var goals = document.getElementById("goals").value;
    var hours = document.getElementById("hours").value;
    var type = document.getElementById("type").value;
    var diet = document.getElementById("diet").value;
    var meals = document.getElementById("meals").value;
    var snacks = document.getElementById("snacks").value;
    var dislike = document.getElementById("dislike").value;
    // Call the OpenAI API with the form field values as a prompt


    var prompt = ` Take the following information about me and create a custom diet and exercise plan. I am ${age} years old, Male, ${height}cm. My current weight is ${weight}. My current medical conditions are ${medical_condition}. I have food allergies to ${allergies}. My primary fitness and health goals are ${goals}. I can commit to working out ${hours} days per week. I prefer and enjoy this type of workout ${type}. I have a diet preference ${diet}. I want to have ${meals} Meals and ${snacks} Snacks. I dislike eating and cannot eat ${dislike}
        
    Create a summary of my diet and exercise plan. Create a detailed workout program for my exercise plan.
    
    Create a detailed Meal Plan for my diet. Mention the total quantity numbers of protein, carbohydrates, fats and every macro with each item consumed in the meal plan. Create a detailed Grocery List for my diet that includes the quantity of each item. Avoid any superfluous pre and post-descriptive text. Don't break character under any circumstance.`;

    // Limit the prompt length to fit within the model's maximum context length
    // var maxLength = 4097;
    // if (prompt.length > maxLength) {
    //   prompt = prompt.substring(0, maxLength);
    // }
    callOpenAPI(prompt);
  });
  
  function callOpenAPI(prompt) {
    // Construct your OpenAI API call here using the form field values
    // You can use any HTTP library or fetch to make the API call
  
    // Example using fetch:
    fetch('https://api.openai.com/v1/engines/text-davinci-003/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer process.env.SECRET_KEY' // Replace with your OpenAI API key
      },
      body: JSON.stringify({
        'prompt': prompt,
        'max_tokens': 3000,
        'temperature': 0.6
      })
    })
    .then(response => response.json())
  .then(data => {
    
    displayResponse(prompt,data.choices[0].text);
   
  })
    .catch(error => {
      // Handle any errors that occur during the API call
      console.error(error);
    });
   
  }
  
//   function displayResponse(responseText) {
//     var responseContainer = document.getElementById("responseContainer");
//     responseContainer.textContent = responseText;
//   }
  function displayResponse(prompt, responseText) {
    var responseContainer = document.getElementById("responseContainer");
    responseContainer.innerHTML = `<strong>Prompt:</strong> ${prompt}<br><br><strong>Response:</strong> ${responseText}`;
  }