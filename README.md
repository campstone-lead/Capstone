### Harmonious app

- Are you an artist that is tired of needlessly scouring the web for venues that are close to you and fit your artistic style?
- Are you a booker looking for an artist who’s the perfect match for your venue?
  --- Harmonious is the answer! ---
  Harmonious is a Progressive Web Application that streamlines the booking process by connecting venues/bookers with artists.

We decided to create this app because we understand a frustration for musician's at finding a suitable place to play. Our app also helps venues find suitible artists to play at their events. We have our recommendations for both users (bookers and artists) showing the best match, based on their location and preferable genres. If you are interested in someone particular or a specific place, you can also search for them.

## Screenshots

Check out how our app looks like below:

Home - Login - Signup
<img width="1232" alt="Screen Shot 2020-02-20 at 6 11 11 PM" src="https://user-images.githubusercontent.com/55503788/74988736-a1da4b00-540c-11ea-8f4a-a59a53e82215.png">

Home(Recommended artists) - Filter - Filtered results
<img width="1232" alt="Screen Shot 2020-02-20 at 6 11 15 PM" src="https://user-images.githubusercontent.com/55503788/74988767-c1717380-540c-11ea-951f-e54af8e6524d.png">

User Profile - Notification wall - Update Profile
<img width="1232" alt="Screen Shot 2020-02-20 at 6 11 22 PM" src="https://user-images.githubusercontent.com/55503788/74988784-ccc49f00-540c-11ea-955e-401af13d2b56.png">

Chat Box
<img width="1232" alt="Screen Shot 2020-02-20 at 6 11 18 PM" src="https://user-images.githubusercontent.com/55503788/74988792-d3531680-540c-11ea-8979-2c1920baf88d.png">

## Wireframes

- Booker sign up wireframe:
  ![booker_sign_up](https://user-images.githubusercontent.com/43704877/74785582-9d7d2900-5278-11ea-8c3a-4f800b19de56.png)

- Artist sign up wireframe:
  ![artist_sign_up](https://user-images.githubusercontent.com/43704877/74785798-2b591400-5279-11ea-8bbf-bb54ef2474f4.png)

- Artist wireframe:
  ![artist](https://user-images.githubusercontent.com/43704877/74785942-8d197e00-5279-11ea-810a-d4fe6ec0bda6.png)

- Booker wirefrimes:
  ![booker_home](https://user-images.githubusercontent.com/43704877/74786146-f8635000-5279-11ea-8bb7-7e38a138db7d.png)
  <img width="1232" alt="Screen Shot 2020-02-20 at 6 19 22 PM" src="https://user-images.githubusercontent.com/55503788/74989121-90de0980-540d-11ea-8de3-03a53edd3d61.png">

## Schema

![LEAD Capstone Schema Diagram](https://user-images.githubusercontent.com/43704877/75004013-d0215000-5437-11ea-8116-640f79d3a0dc.png)

<!-- <img width="1232" alt="LEAD Capstone Schema Diagram" src="https://github.com/campstone-lead/Capstone/files/4234211/LEAD.Capstone.Schema.Diagram.pdf"> -->

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

4. Check out the starting seed file in `seed.js` - you can run it by executing `node seed.js`
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
