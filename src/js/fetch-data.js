const fetch = require('isomorphic-fetch');
const fs = require('fs');
const path = require('path');

async function fetchData() {
  try {
    const response = await fetch('https://randomuser.me/api/?results=50');
    const data = await response.json();

    const profiles = JSON.stringify(data.results);

    const databasePath = path.join(__dirname, '..', 'database');
    if (!fs.existsSync(databasePath)) {
      fs.mkdirSync(databasePath);
    }

    const profilesPath = path.join(databasePath, 'profiles.json');
    fs.writeFileSync(profilesPath, profiles);

    console.log(`Data saved 🌱`);
  } catch (error) {
    console.error(error);
  }
}

fetchData();
