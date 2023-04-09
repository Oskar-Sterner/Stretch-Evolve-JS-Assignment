import { renderProfiles, profileTemplate } from './load-more.js';
import _ from 'lodash';
import profiles from '../database/profiles.json';

export function filterProfiles(ageFilter, genderFilter) {
    let filteredProfiles = profiles;
  
    if (ageFilter) {
      filteredProfiles = _.filter(filteredProfiles, { 'dob': { 'age': parseInt(ageFilter) } });
    }
  
    if (genderFilter) {
      filteredProfiles = _.filter(filteredProfiles, { 'gender': genderFilter });
    }
    
    const container = document.querySelector('.profiles-container');
    if (filteredProfiles.length > 0) {
      container.innerHTML = profileTemplate({ profiles: filteredProfiles });
      const loadMoreButton = document.querySelector('.load-more-button');
      loadMoreButton.innerText = 'LOAD MORE';
    } else {
      container.innerHTML = '<p id="filter-not-found">Ooops, the filter does not match any profiles</p>';
      const loadMoreButton = document.querySelector('.load-more-button');
      loadMoreButton.innerText = 'RESET';
    }
  }