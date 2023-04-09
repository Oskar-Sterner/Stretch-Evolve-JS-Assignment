import profiles from '../database/profiles.json';
import _ from 'lodash';

const container = document.querySelector('.profiles-container');
const loadMoreButton = document.querySelector('.load-more-button');

let numDisplayedProfiles = 12;

export function renderProfiles() {
  const displayedProfiles = _.slice(profiles, 0, numDisplayedProfiles);
  const html = profileTemplate({ profiles: displayedProfiles });
  container.innerHTML += html;
}

loadMoreButton.addEventListener('click', function() {
    if(loadMoreButton.innerText !== 'RESET'){
        numDisplayedProfiles += 3;
        renderProfiles();
    }else{
        window.history.pushState({}, document.title, '/');
        window.location.reload();
    }
});

const sortedProfiles = _.orderBy(profiles, ['name.first']);

export const profileTemplate = _.template(`
  <% _.forEach(profiles, function(profile) { %>
    <div id="profile">
      <img class=pfp" src="<%= profile.picture.medium %>" alt="Profile picture">
      <div class="name"><p>Name: <%= profile.name.first %> <%= profile.name.last %></p></div>
      <div class="age"><p>Age: <%= profile.dob.age %></p></div>
      <div class="username"><p>Username: <br><%= profile.login.username %></p></div>
      <div class="gender"><p>Gender: <%= profile.gender %></p></div>
      <div class="location"><p>City: <br><%= profile.location.city %></p></div>
    </div>
  <% }); %>
`);

renderProfiles();
