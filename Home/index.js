import { sample } from './sample.js';

// Function to get severity class
function getSeverityClass(severity) {
  switch (severity.toLowerCase()) {
    case 'critical':
      return 'severity critical';
    case 'high':
      return 'severity high';
    case 'medium':
      return 'severity medium';
    case 'low':
      return 'severity low';
    default:
      return 'severity default';
  }
}

// Function to render incident cards
function renderIncidents(incidents) {
  const container = document.getElementById('incident-container');
  container.innerHTML = ''; // Clear existing content

  incidents.forEach(incident => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <h2>${incident.headline}</h2>
      <p class="description">${incident.description}</p>
      <div class="details">
        <p><strong>Incident Type:</strong> ${incident.incident_type}</p>
        <p><strong>Severity:</strong> 
          <span class="${getSeverityClass(incident.severity)}">${incident.severity}</span>
        </p>
        <p><strong>Location:</strong> ${incident.location_address}</p>
        <p><strong>Reported Date:</strong> ${incident.reported_date}</p>
        <p><strong>Source:</strong> ${incident.news_source}</p>
        <p><strong>Link:</strong> 
          <a href="${incident.external_link}" target="_blank">Read more</a>
        </p>
        <a href="${incident.loction}" target="_blank">view location</a>
      </div>
    `;
    container.appendChild(card);
  });
}

// Call the function once DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  renderIncidents(sample);
});


//
var map = L.map('map').setView([27.5770, 77.6336], 12);

// add tiles
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
// loop through incidents and add markers
sample.forEach(incident => {
  const marker = L.marker([incident.latitude, incident.longitude]).addTo(map);

  const popupContent = `
    <b>${incident.headline}</b><br>
    ${incident.description}<br>
    <small><b>Type:</b> ${incident.incident_type} | <b>Severity:</b> ${incident.severity}</small><br>
    <small><b>Location:</b> ${incident.location_address}</small><br>
    <small><b>Date:</b> ${incident.reported_date}</small><br>
    <a href="${incident.external_link}" target="_blank">Read more</a>
  `;

  marker.bindPopup(popupContent);
});
