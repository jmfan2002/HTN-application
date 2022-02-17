## Hack The North Application 2022 James Fan

**Walk us through your development process as you worked on this project. How did you plan out the structure and design of it? How did decide on the tools you've used? Did you encounter any problems? And if so, how did you solve them? Are there any areas of your code that you're particularly proud of or want to point out?**

During the planning phase of the project, I first thoroughly read over the requirements so I could get a rough idea of what the product was, what the goals were, etc. Since I had only a limited amount of time to work on the project, I decided to use React as the front-end framework and Bootstrap for styling, since those 2 libraries are great for quickly building front-end web apps that work and look half-decent. I decided to write the app using typescript; although I had no prior typescript experience I was extremely interested in learning it since I was familiar with the advantages that typescript had to offer, the static-casting and various OOP features seemed incredibly useful.
Since it was my first time working with Typescript and it had been a long time since I’d worked with React and Bootstrap, a major hurdle with the development process was re-learning the quirks of each tool. Ex. how to simulate lifecycle methods like `componentDidMount` and `componentDidUpdate` inside functional components, different ways to apply styling with Bootstrap, creating types/interfaces with Typescript, etc. I spent a long time reading over documentation, scrolling through StackOverflow, and having dozens of tabs open at once to absorb all the information I could.
There were multiple issues I ran into that pushed me to rethink the architecture of the app, I originally envisioned the app as having a separate page for homepage vs events but in the interest of time I was pushed to restructure the site as a single page app, so I implemented the "show more" feature of an event as a modal instead of a separate page.
The main issue I was consistently running into was how to style the app, a variety of different issues like how to size the search bar in a certain way, how to arrange the events as a grid, how to add a logo to the nav bar, etc. Thankfully, bootstrap has fairly good documentation on detailing what options are available, and combined with StackOverflow I was able to overcome most of my styling issues, and I'm confident I'd be able to overcome the leftover issues if given a little more time.
The area of code I'm the most proud of is the search bar that can update in real time, i.e. without needing to submit (although the submit button works too!). To implement it, I passed the search query setter from `useState` to the Searchbar component, so I could update the search query upon every input.

**Given additional time, how would you extend your application to become a fully functional product that thousands of hackers and the general public would use at Hackathon Global Inc.™'s next event? Would you add more features and performance metrics? If so, what would they be?**

If I were to extend this application into a fully functional product, I'd be sure to add unit/integration tests. Especially if I want to create an app that devs will be working on after I leave, it'd be important to includ proper tests to ensure everything is working properly.
On top of tests, I would add some way of tracking performance metrics and user statistics, so we could get critical info like load times, crash rate, and demographic info of the users (ex. their browser, location) so that we would know how to better serve the users. I also didn't have enough time to ensure that the website was responsive across a variety of browsers/devices, so some effort would need to be expended to make sure every user can have a good experience.
The theming and appearance of the site is currently quite basic so the site would need a major overhaul in appearance before launching to the public to add things like cool animations, dark mode, enticing graphics, etc.
Currently there's been little/no security initiatives implemented into the site, so a vital feature to add would be effective security measures, to prevent bad actors from doing things like making malicious network requests.
A useful feature for users of the app would be to implement a schedule and notification ability, so that hackers could view a timeline of when events are happening, and also subscribe to notifications (maybe through email, or a bell icon on the site) to ensure they can attend the events they're most interested in.

**Any other thoughts you have (not limited to the previous questions).**
While I'm not against writing comments and often add them when appropriate, I prefer to write my code in a very readable way so that the code can be understandable on its own, with just a few comments for clarity, separation, etc. I think I succeeded in doing so here, and I'm quite happy with how it turned out. I learned a lot on this project, learning various different techniques that can be done with React and Bootstrap. I'm also really glad I spent time learning Typescript, it's features are so useful it's hard to imagine going without them.
