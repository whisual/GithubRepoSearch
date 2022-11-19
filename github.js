const themeStyle = document.getElementById('theme-style');
const colourMode = document.getElementById('colour-mode');
const searchInput = document.getElementById('search');
const search = document.getElementById('search-user');
const errorMessage = document.getElementById('error-message');
const userImage = document.querySelector('.profile-img img');
const userTitle = document.querySelector('.profile h1');
const userName = document.querySelector('.profile a');
const userJoindate = document.querySelector('.profile small');
// default user

const defaultUser = 'Octocat';

function switchTheme() {
    // the style should change to dark

    // first click # => styles/dark.css
    if (themeStyle.getAttribute('href') == '#') {
        // this means only style.css file is applied
        // we need to change the style to dark.css

        themeStyle.href = 'styles/dark.css';
    } else {
        // this means that it's dark mode
        // changing it to light mode
        themeStyle.href = '#';
    }
}

// get the Github user details

function getGithubUserDetails(username) {
    // fetch from the github api, the details of the particular user
    fetch(`https://api.github.com/users/${username}`)
        .then((res) => res.json()) // converting the parsed data to json
        .then((data) => {
            if (data['message'] === 'Not Found') {
                // make the error-msg display as inline block
                errorMessage.style.display = 'inline-block';
                console.log(data);
            } else {
                if ((errorMessage.style.display = 'inline-block')) {
                    errorMessage.style.display = 'none';
                }
                console.log(data);
                // for adding profile image
                userImage.src = data['avatar_url'];
                // adding user-name
                userTitle.innerText = data['name'] == null ? username : data['name'];

                // showing the username and navigating to the user's github profile
                userName.innerText = `@${username}`;
                userName.href = `https://github.com/${username}`;

                // user joined date
                const date = new Date(data['created_at']).toDateString().slice(3, 16);
                userJoindate.innerText = `Joined on ${date}`;
            }
        });
}

function searchUser(e) {
    e.preventDefault();
    console.log(searchInput.value);
    // to receive the input value
    const user = searchInput.value;

    // for this user(input value), get his github details
    getGithubUserDetails(user);
}

getGithubUserDetails(defaultUser);

colourMode.onclick = switchTheme;

search.onsubmit = searchUser;
