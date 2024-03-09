const url = "https://api.github.com/users/";

const getId = (element) => {
    return document.getElementById(`${element}`);
}

const getClass = (element) => {
    return document.getElementsByClassName(`${element}`);
}

const input = getId("search");
const btn = getId("btn");

btn.addEventListener('click', () => {
    if (input.value !== "") {
        getUserData(url + input.value);
    }
})

input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        if (input.value !== "") {
            getUserData(url + input.value);
        }
    }
}, false);

async function getUserData(gitUrl) {
    const response = await fetch(gitUrl);
    const data = await response.json();
    if (!data) {
        throw data;
    }
    updateProfile(data);
}

const result = document.querySelector(".error");
let dataSplit;

function updateProfile(data) {
    result.style.display = "none";
    if (data.message !== "Not Found") {
        const username = getId("name");
        const userImg = getClass("Profile-img")[0];
        const link = getClass("link")[0];
        const date = getId("joiningDate");
        const repo = getClass("count-Repos")[0];
        const followers = getClass("count-followers")[0];
        const following = getClass("count-following")[0];
        const profileBio = getClass("bio")[0];
        const location = getClass("location")[0];
        const website = getClass("website")[0];
        const twitter = getClass("twitter")[0];
        const linkedIn = getClass("linkedIn")[0];
        const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        userImg.src = `${data.avatar_url}`;
        username.innerText = data?.name;
        link.innerText = `@${data?.login}`;
        link.href = data?.html_url;
        dataSplit = data?.created_at.split("T").shift().split("-");
        date.innerText = `Joined ${dataSplit[2]} ${month[dataSplit[1] - 1]} ${dataSplit[0]}`;
        profileBio.innerText = (data?.bio == null) ? "This Profile has no Bio" : data?.bio;

        repo.innerText = data?.public_repos;
        repo.href = data?.repos_url;

        followers.innerText = data?.followers;
        following.innerText = data?.following;

        location.innerText = data?.location || "Not Available";
        website.innerText = data?.blog || "Not Available";
        website.href = data?.blog || "#";
        twitter.innerText = data?.twitter_username || "Not Available";
        twitter.href = `https://twitter.com/${data?.twitter_username}` || "#";
        linkedIn.innerText = data?.company || "Not Available";
    } else {
        result.style.display = "block";
        setTimeout(() => {
            result.style.display = "none";
        }, 2500);
    }
}

// Dark And Light Mode 
const modeBtn = getId("modeBtn");
const modeText = getId("modeText");
const modeIcon = getId("modeIcon");
let darkMode = false;
const root = document.documentElement.style;

modeBtn.addEventListener("click", () => {

    if (darkMode === false) {
        enableDarkMode();
    }
    else {
        enableLightMode();
    }
});

function enableDarkMode() {
    root.setProperty("--lm-bg", "#141D2F");
    root.setProperty("--lm-bg-content", "#1E2A47");
    root.setProperty("--lm-text", "white");
    root.setProperty("--lm-text-alt", "white");
    root.setProperty("--lm-shadow-xl", "rgba(70,88,109,0.15)");
    modeText.innerText = "LIGHT";
    modeIcon.src = "./Images/sun-icon.svg";
    root.setProperty("--lm-icon-bg", "brightness(1000%)");
    darkMode = true;
}

function enableLightMode() {
    root.setProperty("--lm-bg", "#F6F8FF");
    root.setProperty("--lm-bg-content", "#FEFEFE");
    root.setProperty("--lm-text", "#4B6A9B");
    root.setProperty("--lm-text-alt", "#2B3442");
    root.setProperty("--lm-shadow-xl", "rgba(70, 88, 109, 0.25)");
    modeText.innerText = "DARK";
    modeIcon.src = "./Images/moon-icon.svg";
    root.setProperty("--lm-icon-bg", "brightness(100%)");
    darkMode = false;
}
getUserData(url + "saarakhan");
