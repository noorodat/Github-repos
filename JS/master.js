// Main Variables

let theInput = document.querySelector(".get-repos input");
let getButton = document.querySelector(".get-button");
let reposData = document.querySelector(".show-data");

getButton.onclick = function () {
    getRepos();
};

// Get Repos function

function getRepos() {
    if(theInput.value === "") { // if value is empty
        reposData.innerHTML = "<span>Please Write A Github Username </span>";
    }
    else {
        fetch(`https://api.github.com/users/${theInput.value}/repos`)

        .then((res) => res.json())

        .then((repos) => { 

            // Empty The Container
            reposData.innerHTML = "";

            // Loop On Repos
            repos.forEach(repo => {

                // Create The a Tag With It's Attributes
                let repoURL = document.createElement("a");

                repoURL.href = `https://github.com/${theInput.value}/${repo.name}`;

                repoURL.classList.add("repo-name")

                repoURL.setAttribute('target', '_blank');

                // Create The Text Node For a Tag
                let repoURLText = document.createTextNode(repo.name);

                // Append The Text Into The a Tag
                repoURL.appendChild(repoURLText);

                // Create Stars Count Span
                let starsSpan = document.createElement("span");
                starsSpan.classList.add("stars")
                // Create The Stars Count Text;
                let starsText = document.createTextNode(`: Stars ${repo.stargazers_count}`);

                // Add Stars Count Text To Stars Span
                starsSpan.appendChild(starsText);

                // Append To Repo URL
                repoURL.appendChild(starsSpan);
                
                // Append The Repo In the container
                reposData.appendChild(repoURL);
            });
        })
    }
}
