
# SnowSwaps
Snow sports are a common winter activity in the Midwest area and all of them require the use of expensive gear to make the experience enjoyable. 
This cost will increase especially if the user is younger, requiring new equipment purchases every year to keep up with their growth. 
This cost can be too much for some and without a way to effectively sell or trade the old gear, 
it has created a robust market full of users spread across different platforms. 
Introducing Snowswap, a full-stack web application meant to assist the user with selling their old winter gear and finding used gear to meet their needs. 
This app is designed to be a hub for snow gear sales and trades helping users cut the cost of equipment and cleaning out their garage.

The app works by arranging a meeting of buyers and sellers called a “swap”. The creator of the swap creates an environment displaying a 
time and a place where other users can trade their gear. There is a beginning period where users add their gear but cannot meet and a “meeting” 
period where users gather at the designated place and time to conduct their business.

This style of commerce can be very beneficial for users such as a highschool Alpine instructor who is looking to trade out old racing team gear 
and potentially find used skis to replenish the team’s loaning stock.

Or for a parent, looking for specified boarder-cross gear for a growing child. 

Or someone interested in the sport but doesn’t want to jump in before testing the waters.
Anyone who partakes in snow sports will benefit from this app.

SnowSwaps is a full-stack web application that bridges the gap between buyers and sellers of used snow sport equipment.  Users can request permission from SnowSwaps to gain the ability to create virtual “swaps” where users can browse items listed in the swap.  Buyers can contact sellers to negotiate price and a location to meet. Swaps can be public, or they can be private requiring a passcode to interact with the swap.

## Prerequisites

Before you get started, make sure you have the following software installed on your computer:
  Each software has instructions on the dowload procedure in their website.
- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)

    
## Development Setup Instructions

- Run `npm install`
- Create a `.env` file at the root of the project and paste this line into the file:
  ```
  SERVER_SESSION_SECRET=superDuperSecret
  ```
  While you're in your new `.env` file, take the time to replace `superDuperSecret` with some long random string like `25POUbVtx6RKVNWszd9ERB9Bb6` to keep your application secure. Here's a site that can help you: [https://passwordsgenerator.net/](https://passwordsgenerator.net/). If you don't do this step, create a secret with less than eight characters, or leave it as `superDuperSecret`, you will get a warning.
- Start postgres if not running already by using `brew services start postgresql`
- Run `npm run server`
- Run `npm run client`
- Navigate to `localhost:3000`


## Production Build

Before pushing to Heroku, run `npm run build` in terminal. This will create a build folder that contains the code Heroku will be pointed at. You can test this build by typing `npm start`. Keep in mind that `npm start` will let you preview the production build but will **not** auto update.

- Start postgres if not running already by using `brew services start postgresql`
- Run `npm start`
- Navigate to `localhost:5000`

Directory Structure:

- `src/` contains the React application
- `public/` contains static assets for the client-side
- `build/` after you build the project, contains the transpiled code from `src/` and `public/` that will be viewed on the production site
- `server/` contains the Express App

This code is also heavily commented. We recommend reading through the comments, getting a lay of the land, and becoming comfortable with how the code works before you start making too many changes. If you're wondering where to start, consider reading through component file comments in the following order:

- src/components
  - App/App
  - Footer/Footer
  - Nav/Nav
  - AboutPage/AboutPage
  - InfoPage/InfoPage
  - UserPage/UserPage
  - LoginPage/LoginPage
  - RegisterPage/RegisterPage
  - LogOutButton/LogOutButton
  - ProtectedRoute/ProtectedRoute

## Deployment

1. Create a new Heroku project
1. Link the Heroku project to the project GitHub Repo
1. Create an Heroku Postgres database
1. Connect to the Heroku Postgres database from Postico
1. Create the necessary tables
1. Add an environment variable for `SERVER_SESSION_SECRET` with a nice random string for security
1. In the deploy section, select manual deploy

## Authors 
  -Chris Emerfoll
  -Collin Radichel
  -Justin Appelgren
  -Woody Kromar
  
## Acknoweldgments
  -Prime Digital Academy for teaching us Full-Stack Development
  -Dane Smith for helping troubleshoot problems
