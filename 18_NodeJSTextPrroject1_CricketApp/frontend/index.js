const basicInfo = document.getElementById('basic-info');
const personalInfo = document.getElementById('personal-info');
const careerInfo = document.getElementById('career-info');
const formElement = document.querySelector('.form');
const previousDisplay = window.getComputedStyle(formElement).display;

async function saveData(event) {
    event.preventDefault();
    const playerInfo = {
        name: event.target.name.value,
        dob: event.target.dob.value,
        imageUrl: event.target.imageUrl.value,
        birthPlace: event.target.birthPlace.value,
        career: event.target.career.value,
        numberOfMatches: event.target.numberOfMatches.value,
        score: event.target.score.value,
        fifties: event.target.fifties.value,
        centuries: event.target.centuries.value,
        wickets: event.target.wickets.value,
        average: event.target.average.value,
    };

    try {
        const response = await axios.post('http://localhost:4000/player-info', playerInfo);
        alert('Player information added successfully');
        event.target.reset();
    } catch (error) {
        console.log(error);
    }
}

function showPlayerInfo(playerInfo) {
    // Clear previous content
    basicInfo.innerHTML = '';
    personalInfo.innerHTML = '';
    careerInfo.innerHTML = '';

    if (!playerInfo) {
        alert('Player not found');
        return;
    }

    const editBtn = document.createElement('button');
    editBtn.id = 'editBtn';
    editBtn.innerText = 'Edit Info';
    basicInfo.appendChild(editBtn);

    editBtn.onclick = () => {
        basicInfo.innerHTML = '';
        personalInfo.innerHTML = '';
        careerInfo.innerHTML = '';
        formElement.style.display = previousDisplay;
        document.getElementById('name').value = playerInfo.name;
        document.getElementById('dob').value = playerInfo.dob;
        document.getElementById('imageUrl').value = playerInfo.imageUrl;
        document.getElementById('birthPlace').value = playerInfo.birthPlace;
        document.getElementById('career').value = playerInfo.career;
        document.getElementById('numberOfMatches').value = playerInfo.numberOfMatches;
        document.getElementById('score').value = playerInfo.score;
        document.getElementById('fifties').value = playerInfo.fifties;
        document.getElementById('centuries').value = playerInfo.centuries;
        document.getElementById('wickets').value = playerInfo.wickets;
        document.getElementById('average').value = playerInfo.average;
        axios.delete(`http://localhost:4000/player-info/${playerInfo.id}`);
    };

    const img = document.createElement('img');
    img.src = playerInfo.imageUrl;
    img.style.display = 'block';
    basicInfo.appendChild(img);

    const li1 = document.createElement('li');
    li1.innerHTML = `<h3>Player Information</h3><br>${playerInfo.name}<br>${playerInfo.dob} <hr>`;
    basicInfo.appendChild(li1);

    const li2 = document.createElement('li');
    li2.innerHTML = `<h3>Personal Information</h3> <br>
    Birthplace:${playerInfo.birthPlace} <br>
    Number of Matches:${playerInfo.numberOfMatches} <br>
    Score:${playerInfo.score}<br>
    Fifties:${playerInfo.fifties}<br>
    Centuries:${playerInfo.centuries}<br>
    Wickets:${playerInfo.wickets}<br>
    Average:${playerInfo.average} <br>`;
    personalInfo.appendChild(li2);

    const p = document.createElement('p');
    p.innerHTML = `${playerInfo.career}`;
    careerInfo.appendChild(p);
}


async function searchData(event) {
    event.preventDefault();
    const playerName = event.target.playerName.value;
    const encodedPlayerName = encodeURIComponent(playerName);

    try {
        const response = await axios.get(`http://localhost:4000/player-info/${encodedPlayerName}`);
        document.querySelector('.form').style.display = 'none';
        showPlayerInfo(response.data.playerDetails);
        document.getElementById('playerName').value = '';
    } catch (error) {
        console.error(error);
        
        // Handle 404 error (Player Not Found)
        if (error.response && error.response.status === 404) {
            showPlayerInfo(null); // Pass null to show "Not Found" message
        } else {
            // Handle other errors (e.g., 500 Internal Server Error)
            basicInfo.innerHTML = `<h1>An error occurred. Please try again later.</h1>`;
            personalInfo.innerHTML = '';
            careerInfo.innerHTML = '';
        }
    }
}
