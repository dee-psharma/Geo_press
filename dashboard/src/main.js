// Import sample data
import { sample } from "../sample.js";

// Get elements
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const severityFilter = document.getElementById("severityFilter");
const searchBtn = document.getElementById("searchBtn");
const resultsContainer = document.getElementById("resultsContainer");

// Function to render cards dynamically
function renderCards(data) {
  resultsContainer.innerHTML = "";

  if (data.length === 0) {
    resultsContainer.innerHTML = `<p class="text-gray-400 text-center col-span-full">No incidents found.</p>`;
    return;
  }

  data.forEach(item => {
    const card = document.createElement("div");
    card.className = "bg-[#1e1e2f] border border-gray-800 rounded-xl p-5 hover:border-cyan-500/50 transition-all duration-300";

    card.innerHTML = `
      <h3 class="text-lg font-semibold text-cyan-400 mb-2">${item.headline}</h3>
      <p class="text-gray-400 text-sm mb-3">${item.description}</p>
      <p class="text-sm text-gray-300"><span class="font-medium">Type:</span> ${item.incident_type}</p>
      <p class="text-sm text-gray-300"><span class="font-medium">Severity:</span> ${item.severity}</p>
      <p class="text-sm text-gray-300"><span class="font-medium">Location:</span> ${item.location}</p>
      <a href="${item.external_link}" target="_blank" class="inline-block mt-3 text-cyan-400 hover:text-cyan-300 text-sm">Read More →</a>
    `;

    resultsContainer.appendChild(card);
  });
}

// Filter function
function filterData() {
  const searchText = searchInput.value.toLowerCase();
  const category = categoryFilter.value.toLowerCase();
  const severity = severityFilter.value.toLowerCase();

  const filtered = sample.filter(item => {
    const matchSearch = item.location.toLowerCase().includes(searchText);
    const matchCategory = category ? item.incident_type.toLowerCase() === category : true;
    const matchSeverity = severity ? item.severity.toLowerCase() === severity : true;
    return matchSearch && matchCategory && matchSeverity;
  });

  renderCards(filtered);
}

// Initial render
renderCards(sample);

// Event listener for search button
searchBtn.addEventListener("click", filterData);

// Optional: filter on Enter key press
searchInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    filterData();
  }
});
