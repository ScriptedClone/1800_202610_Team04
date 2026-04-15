# FIFA Squad


## Overview
With the FIFA World Cup approaching, tourists from around the world will be traveling to Vancouver. While attending matches is exciting, visitors traveling alone can feel isolated in an unfamiliar environment. To address this, our team (BBY-04) developed FIFA Squad, a web app that helps solo tourists connect with other supporters from their country who are attending the same matches.

After creating an account, users are placed into chat groups (“threads”) based on their selected country, where they can join conversations and meet others. Overall, FIFA Squad aims to reduce isolation and foster a sense of community during the World Cup.

---


## Features

- Chat with other fans from your country who are attending the same match.
- Switch between match threads to meet more people.

---


## Technologies Used

- **Frontend**: HTML, CSS, JavaScript, [Bootstrap](https://getbootstrap.com/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Backend**: Firebase for hosting
- **Database**: Firestore

---


## Usage

To run the application locally:

1.  **Clone** the repository.
2.  **Install dependencies** by running `npm install` in the project root directory.
3.  **Start the development server** by running the command: `npm run dev`.
4.  Open your browser and visit the local address shown in your terminal (usually `http://localhost:5173` or similar).

Once the application is running:

1.  Click "Find your squad" on the landing page to be redirected to login/signup page.
2.  Create your account for the first time.
3.  Select your country during the sign-up process.
4.  Enter a thread and send a message! 

---


## Project Structure

```
fifa-squad/
├── src/
│   ├── authentication.js
│   ├── country-selection.js
│   ├── firebaseConfig.js
│   ├── loginSignup.js
│   ├── other-threads.js
│   ├── profile.js
│   ├── thread-information.js
│   ├── thread.js
│   ├── utilities.js
│   └── components/
│       └── site-navbar.js
├── styles/
│   ├── root.css
│   ├── header-footer.css
│   ├── index.css
│   ├── login.css
│   ├── country-selection.css
│   ├── other-threads.css
│   ├── profile.css
│   ├── thread-information.css
│   └── thread.css
├── public/
│   └── images/
│       ├── country_icons/
│       └── chat_icons/
├── index.html
├── login.html
├── country-selection.html
├── other-threads.html
├── profile.html
├── thread.html
├── thread-information.html
├── package.json
└── README.md
```

---


## Contributors
- **Tracee Miasco** - BCIT CST Student with a passion for designing systems that solves problems.
- **Shamym Ramadhan** - BCIT CST Student, Frontend enthusiast with a knack for creative design. Fun fact: Has a collection of over 50 houseplants.
- **Daniel Berruti Bueno** - BCIT CST Student with an interest in programming and building projects from the ground up.

## Acknowledgments

- Images are for demonstration purposes only.
- Code snippets were adapted from resources such as [Stack Overflow](https://stackoverflow.com/) and [MDN Web Docs](https://developer.mozilla.org/).
- Icons and images sourced from [flaticon](https://www.flaticon.com/).

---


## Limitations and Future Work
### Limitations

- Limited user to user interaction outside of threads
- Country selection only includes Canada, New-Zealand, Egypt, Qatar, Belgium, and Switzerland.
- Accessibility features can be improved.

### Future Work

- Add profile personalization (profile photo, bio, custom username) beyond changing the selected country.
- Implement full functionality for the Thread Information page (replace placeholders).
- Implement error and exception handling throughout the app.
- Add direct messaging between users.

---


## License

This project is licensed under the MIT License. See the LICENSE file for details.
