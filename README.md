### Harmonious app

- Are you an artist that is tired of needlessly scouring the web for venues that are close to you and fit your artistic style?
- Are you a booker looking for an artist who’s the perfect match for your venue?
  --- Harmonious is the answer! ---
  Harmonious is a Progressive Web Application that streamlines the booking process by connecting venues/bookers with artists.

We decided to create this app because we understand a frustration for musician's at finding a suitable place to play. Our app also helps venues find suitible artists to play at their events. We have our recommendations for both users (bookers and artists) showing the best match, based on their location and preferable genres. If you are interested in someone particular or a specific place, you can also search for them.

## Build status

travis.........

## Screenshots

Check out how our app looks like below:

- Home page of a guest user:
  ![Home_guest](https://user-images.githubusercontent.com/43704877/74783280-58a2c380-5273-11ea-9cd5-930502c90d0c.PNG)

- Login and sign up page:
  ![Login_sign_up](https://user-images.githubusercontent.com/43704877/74783310-67897600-5273-11ea-8897-f2c090491027.PNG)

- Initial sign up page (booker and artist have different sign up processes):
  ![sign_up](https://user-images.githubusercontent.com/43704877/74783451-b8996a00-5273-11ea-9578-8b218b9cd399.PNG)

- Home page for a booker with recommended artists (same for artist):
  ![Home_user](https://user-images.githubusercontent.com/43704877/74783572-f72f2480-5273-11ea-8734-8b17c42ccb12.PNG)

- Profile page for a booker:
  ![Profile](https://user-images.githubusercontent.com/43704877/74783678-2c3b7700-5274-11ea-9d93-3262d86e9f44.PNG)

- Global chat page:
  ![Chat](https://user-images.githubusercontent.com/43704877/74783753-568d3480-5274-11ea-9b54-f637b354e2ef.PNG)

- Filter page:
  ![Filter](https://user-images.githubusercontent.com/43704877/74783791-6c025e80-5274-11ea-8e93-322108f96feb.PNG)
  ![Filter](https://user-images.githubusercontent.com/43704877/74783826-82a8b580-5274-11ea-958e-246fe3b53613.PNG)

- Search page with chosen filters:
  ![Search](https://user-images.githubusercontent.com/43704877/74783837-9227fe80-5274-11ea-81c7-7311dc88e7da.PNG)

- Create a new venue page:
  ![Create a new venue page](https://user-images.githubusercontent.com/43704877/74783866-a7049200-5274-11ea-9247-ec90d6adfecb.PNG)

- Update booker profile page:
  ![Update_booker_profile](https://user-images.githubusercontent.com/43704877/74783925-c69bba80-5274-11ea-9982-519cceb40523.PNG)

- Notifications page:
  ![Notifications](https://user-images.githubusercontent.com/43704877/74783972-de733e80-5274-11ea-8341-5e9c0b686ab5.PNG)

## Wireframes

- Booker sign up wireframe:
  ![booker_sign_up](https://user-images.githubusercontent.com/43704877/74785582-9d7d2900-5278-11ea-8c3a-4f800b19de56.png)

- Artist sign up wireframe:
  ![artist_sign_up](https://user-images.githubusercontent.com/43704877/74785798-2b591400-5279-11ea-8bbf-bb54ef2474f4.png)

- Artist wireframe:
  ![artist](https://user-images.githubusercontent.com/43704877/74785942-8d197e00-5279-11ea-810a-d4fe6ec0bda6.png)

- Booker wirefrimes:
  ![booker_home](https://user-images.githubusercontent.com/43704877/74786146-f8635000-5279-11ea-8bb7-7e38a138db7d.png)
  ![add_venue](https://user-images.githubusercontent.com/43704877/74786166-03b67b80-527a-11ea-817e-75142e9ae43a.png)
  ![booker_profile](https://user-images.githubusercontent.com/43704877/74786170-05803f00-527a-11ea-9807-a82f851dd864.png)

## Schema

## Tech-stack

Built with:

- TypeScript (front-end)
- Ionic-React
- Redux
- Capacitor
- Java Script (back-end)
- PostgresQL
- Sequelize
- Node.js
- Express
- Google API
- Socket io
- Firebase

## Features

We implemented:

1. Realtime chat
2. Realtime notifications
3. Storing all images in the cloud
4. Filter and search feature
5. Recommendations for bookers and artists

## Setup

Do the following steps:

- Don't fork or clone this repo! Instead, create a new, empty
  directory on your machine and `git init` (or create an empty repo on
  Github and clone it to your local machine)
- Run the following commands:

```
git remote add harmonious https://github.com/campstone-lead/Capstone.git
git fetch harmonious
git merge harmonious/master
```

Why did we do that? Because every once in a while, `harmonious` may
be updated with additional features or bug fixes, and you can easily
get those changes from now on by entering:

```
git fetch harmonious
git merge harmonious/master
```

## Customize

Now that you've got the code, follow these steps:

1. INSTALL ionic command tool lines: `npm install -g @ionic/cli`
2. `npm install`
3. Create postgres database `capstone`

```
createdb capstone
```

4. Check out the starting seed file in `seed.js` - you can run it by executing `npm run seed`
5. Create a file called `secrets.js` in the project root

- This file is listed in `.gitignore`, and will _only_ be required
  in your _development_ environment
- Its purpose is to attach the secret environment variables that you
  will use while developing
- However, it's **very** important that you **not** push it to
  Github! Otherwise, _prying eyes_ will find your secret API keys!
- It might look like this:

```
process.env.GOOGLE_MAPS_API_KEY = 'pretty secret'
```

6. `npm run start-dev` will start the build process and application with two localhosts: 8100 for ionic and 8080 for api routes

**#macOS**

npm install -g @ionic/cli -> INSTALL ionic command tool lines if not installed

npm install

npm run start-dev -> opens localhost 8100 for ionic and localhost 8080 for api routes
