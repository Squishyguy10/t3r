
# T3R :earth_americas:

The 3 Rs, created by Aaron, Andrew, Damon, and Felix for Hack the Classroom between 1 and 3 September 2023!

## How Does Our App Work :question:

Our app consists of two main components. We have the *Supermarket Program* & the *Recycling Program*. From the homepage of our app, you can read the introductions to the two parts of our app.

***

### Supermarket Program :shopping_cart:

The idea of the supermarket program is to tackle food waste. As supermarkets end up with a lot of excess food, especially produce, at the end of every day, they eventually have to throw it out as the supply exceeds the demand and the food eventually goes bad. Our app allows supermarkets to register an account and list items for sale on the app. When registering, supermarkets have to provide the company name, store name, username, password, email address, telephone number, and their location. Similarily, customers are able to register accounts, with all of the same information save for company and store names. Supermarkets are allowed to list items for sale, by putting the item names, quantity, expirity date, and price. These items are then displayed onto the item catalogue, where customers are allowed to add to their cart and proceed with their orders.

***

### Recycling Program :recycle:

The recycling program provides users with a quick survey to fill out. They fill out information about their lifestyles with respect to the environment and then submit it. Our program then takes this information, and, using an artificial intelligence, provides specifically tailored advice to the user for next steps they can take in living a more sustainable life. Moreover, because the users are registererd with their location, our app will find nearby facilities that could aid in the reusing or recycling of items that the user may not have a use for anymore. All of this information is then given to the user, where they will hopefully take some advice and make a shift towards a more sustainable lifestyle. 

<br><br>

## Why We Created This App :grey_question:

### Supermarket Program :shopping_cart:

Roughly *1 billion metric tonnes* of food is thrown out every single year. A big portion of that waste comes from supermarkets alone. Moreover, a lot of that food is in perfectly good condition and does not have to be thrown out. Every day, supermarkets have to throw out *hundreds* of kilograms if not *tonnes* of food that goes bad. It is needless to say that this is a major roadblock towards our goals for achieving sustainability, as wasting food not only prevents many from being fed, but also increases demand for food production, which leads to more greenhouse gas emissions. We recognize that this is a problem that can definitely be solved with some effort, and part of our app aims to solve this exact problem.

####  Supermarkets :convenience_store:

Our app benefits supermarkets very greatly. Rather than having far too many losses from throwing out perfectly good food that would go bad because no one is buying it, supermarkets can now turn that loss into profit. With our program, they can sell their food that may be nearing the expiry date, but is still perfectly good to eat.

####  Consumers :family:

Consumers will benefit from this vastly as well. They will be able to purchase groceries at a much cheaper price, saving themselves a lot of buck and putting food onto their plates.

***

### Recycling Program :recycle:

Consumerism is a problem that plagues us all. Whether it is planned obsolescence or perceived obsolescence, too many non-biodegradable items get thrown out for seemingly no good reason. Why must this continue? How can we stop this? First and foremost, we must address the root causes of these issues. While planned obsolescence is out of our control, we can most certainly help prevent perceived obsolescence. We provide to the user a survey that asks very important questions about their lifestyles with respect to the environment. We then provide meaningful and life-changing recommendations to the user as to what next steps they can take in making their lifestyles much more sustainable, drastically improving their impact on the beautiful planet we call home. Furthermore, we understand that many people simply do not know where they can go or what they can do with items that they no longer have any use for but are still perfectly usable. Our app also helps people with that.

<br><br>

## What Technologies Did We Use :computer:

### React

React was the main Javascript library we used to build our front-end. All of the functions that you can see in our front end were done in React. Our `components` folder stores all of the React components that we made. We used the following React libraries to enhance the user experience as well as:
* **React Router DOM**
	* This allowed us to route different components to different pages
* **Heroicons**
	* We used many icons from the Heroicons library to make the overall look of our app nicer 
* **React Places Autocomplete**
	* This, in conjunction with the Google Maps API, allowed the user to select their location during the signup process
* **SurveyJS**
	* This library allowed us to build our survey for our recycling program
* **Any API's React library**

On top of the libraries, we made use of built in React features like the `state` and `useState` hooks for class and functional components respectively, and we made use of `useEffect` and event listeners for certain cool effects on our website. 

***

### Tailwind CSS

We made use of many of Tailwind's features to style all of the aspects of our website to create a user friendly and appealing aesthetic. Examples of what we used it for are text, backgrounds, positioning of elements etc.

***

### Node.js



***

### MongoDB Atlas



***

### GitHub

Throughout the entire hackathon we have been committing, pushing, and pulling from GitHub. We divided the workload between the four of us, and it was essential that we constantly gave each other our changes so we could work with each other accordingly. We made use of the push descriptions and each of our pushes were meaningful with a reason behind them. We have made over 150 commits throughout the hacking period.

On top of that, we also utilized GitHub pages as a way to host our website. We deployed our website there so that anyone is able to view our project easily, without having to install all the dependencies and download all the files natively.

***

### npm

Node package manager was essential for us, as this is where we got all of our required dependencies, libraries, and packages from. We used `npm init -y` to create our Node.js back-end and used `npx create-react-app` to create our React app. Throughout the hacking period, we ran `npm install` many times to install all the libraries we wanted to use for our app.

***

### Google Maps API

Google Maps API was essential to the functioning of our program. We used it in multiple places. One of the places we used it in was in the Supermarket Program, during the customer/supermarket signups. Each account would have a location tied to it and we used Google Maps API to let the user fill out their location and select the most appropriate one from the Google Maps search results. 

Furthermore, we used Google Maps API for the Recycling Program. When users submit their survey, the program sends a request to query for recycling/donating facilities near the user. It will then display the map with the nearby facilities pinned.

***

### OpenAI API

Part of our app uses a generative pre-trained transformer (GPT) to generate an eloquent response for the user to see in the recycling program. We used `gpt-3.5-turbo` as it supports chat completion, therefore it will produce the most eloquent responses while costing the least amount of money as opposed to `gpt-4`. 

<br><br>

## File Structure :file_folder:

From our root directory, you can see the following folders:

```
├── client
├── server
```

The `client` folder stores the React app and all of the front-end code, while `server` stores the Node.js server and all of the back-end code. 

Within `client`, you can see the following (and other files):

```
├── public
└── src
├── App.jsx
    ├── index.css
    ├── index.js
    └── components
	├── BottomBar.jsx
        ├── Main.jsx
        ├── NavBar.jsx
```

`index.js` is the entry point of the React app and it contains the component `App.jsx`. Our `components` folder stores all of the components that we made. The above snippet shows just a couple of them: `Main.jsx` and `NavBar.jsx`. All of these components are placed in `App.jsx`, and use `react-router-dom` to be put on different pages of the website.

***

Within `server` , the only important file is `index.js`, which stores all of the back-end processes, including the API calls, accessing MongoDB Atlas, as well as handling calls with the front-end. It stores all of the API methods that we use, and any time a user from the front-end presses a submit button or anything that requires the calling of an API, it is handled in `server/index.js`.

<br><br>

## Challenges Faced :fearful:

Our journey in creating this project was not without its fair share of challenges. Near the beginning, when we were just setting everything up, we had a lot of problems with Tailwind. For some reason, a lot of the styling simply did not work. For example, I tried colouring a button using `bg-green-400`, but for some reason it only accepted `bg-green-300` or `bg-green-200`, despite `bg-green-400` being a perfectly valid colour. Also, one of our computers simply did not render *any* of the CSS. We could not figure out why this was happening, so we simply deleted everything and rewrote the code. Magically, the error disappeared. 

Another problem we faced was setting up the APIs. This was our first time ever working with APIs in Javascript and we had to learn a lot about how to pass headers and make `GET` and `POST` requests. The hardest API by far was the OpenAI API. The reason for this was because the official documentation's code snippets were all in Python and other websites' tutorials and online videos demonstrated the older versions' Javascript code. Eventually, we ran some trial and error on old code and found update guides for the latest version of OpenAI and were eventually able to get the API to work. One of the updates was as small as changing from

```jsx
const chatCompletion = await openai.createChatCompletion(/* Request JSON here */);
```

to

```jsx
const chatCompletion = await openai.chat.completions.create(/* Request JSON here */);
```

Also, we struggled a little bit with MongoDB Atlas as well, since this was our first time ever working with it. However, through reading documentation and watching YouTube videos, we were able to figure out how to use it for our needs.

Another struggle we faced was displaying the item catalogue to the user, where they would be able to add items to a shopping cart. In specific, we did not know how to limit a user from adding more items than there were in stock to their cart, but through reading resources on the internet and watching YouTube videos, we were able to create our own implementation of a cart system. 

<br><br>

## Accomplishments We Are Proud Of :trophy:

Making this app ourselves while learning throughout the journey, we have many things we are proud of. Here is a list of all our achievements we hold dear!
* Planning and coming up with everything in our program by ourselves

* Learning how to work so many great APIs such as:
   * *MongoDB* for storing and organizing all our user data
   * *Google Maps* to help with location finding
   * *OpenAI* for helping to come up with responses to our recycling survey

* Our overall improvements in our front-end and back-end skills
	* Especially the front-end in our main and login pages
	* And back-end with GPT, maps, and server setup

* And of course, all our perserverence and hardwork we put in!

<br><br>

## Future of T3R :globe_with_meridians:

With all of our collective effort poured into this app, we hope to continue working on this app, improving it whenever we have the chance. We have many ideas we would like to implement: to name a few, we are planning on integrating _______________