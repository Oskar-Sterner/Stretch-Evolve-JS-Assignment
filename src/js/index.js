import './load-more.js';
import { renderProfiles, profileTemplate } from './load-more.js';
import { filterProfiles } from './filtering.js';

const urlParams = new URLSearchParams(window.location.search);
const ageFilter = urlParams.get('age');
const genderFilter = urlParams.get('gender');

const container = document.querySelector('.profiles-container');

if (ageFilter || genderFilter) {
  filterProfiles(ageFilter, genderFilter);
} else {
  renderProfiles();
}

const filterForm = document.getElementById('filter-form');

filterForm.addEventListener('submit', function(event) {
  event.preventDefault();

  const ageInput = document.getElementById('age');
  const genderInput = document.getElementById('gender');
  
  const ageFilter = ageInput.value;
  const genderFilter = genderInput.value;

  const params = new URLSearchParams();
  params.append('age', ageFilter);
  params.append('gender', genderFilter);

  const url = window.location.pathname + '?' + params.toString();
  window.history.pushState(null, '', url);

  filterProfiles(ageFilter, genderFilter);
});
