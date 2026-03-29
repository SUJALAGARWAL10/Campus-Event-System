// ================= DOM =================
const container = document.getElementById("eventsContainer");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const availabilityFilter = document.getElementById("availabilityFilter");

// ================= IMAGE FALLBACK =================
const categoryImages = {
  tech: "../assets/images/tech.jpg",
  sports: "../assets/images/sports.jpg",
  cultural: "../assets/images/cultural.jpg",
  default: "../assets/images/banner.jpg"
};

// ================= STATE =================
let allEvents = [];

// ================= INIT =================
document.addEventListener("DOMContentLoaded", () => {
  fetchEvents();
});

// ================= FETCH EVENTS =================
async function fetchEvents() {
  const data = await getEvents();

  if (!data) return;

  allEvents = data;
  displayEvents(allEvents);
}

// ================= DISPLAY EVENTS =================
function displayEvents(events) {
  container.innerHTML = "";

  if (events.length === 0) {
    container.innerHTML = "<p>No events found</p>";
    return;
  }

  events.forEach(event => {
    const card = createEventCard(event);
    container.appendChild(card);
  });
}

// ================= CREATE CARD =================
function createEventCard(event) {
  const card = document.createElement("div");
  card.classList.add("event-card");

  const image =
    event.image ||
    categoryImages[event.category?.toLowerCase()] ||
    categoryImages.default;

  card.innerHTML = `
    <img src="${image}" alt="event">

    <div class="event-content">
      <h3>${event.title}</h3>
      <p><strong>Date:</strong> ${new Date(event.date).toLocaleDateString()}</p>
      <p><strong>Venue:</strong> ${event.venue}</p>
      <p><strong>Seats Left:</strong> ${event.seats}</p>

      <button onclick="viewDetails('${event._id}')"
        ${event.seats <= 0 ? "disabled" : ""}>
        ${event.seats <= 0 ? "Full" : "View Details"}
      </button>
    </div>
  `;

  return card;
}

// ================= VIEW DETAILS =================
function viewDetails(eventId) {
  // Redirect to details page
  window.location.href = `eventDetails.html?id=${eventId}`;
}

// ================= FILTER =================
function filterEvents() {
  let filtered = [...allEvents];

  const searchValue = searchInput.value.toLowerCase();
  const categoryValue = categoryFilter.value;
  const availabilityValue = availabilityFilter.value;

  if (searchValue) {
    filtered = filtered.filter(e =>
      e.title.toLowerCase().includes(searchValue)
    );
  }

  if (categoryValue) {
    filtered = filtered.filter(e => e.category === categoryValue);
  }

  if (availabilityValue === "available") {
    filtered = filtered.filter(e => e.seats > 0);
  } else if (availabilityValue === "full") {
    filtered = filtered.filter(e => e.seats <= 0);
  }

  displayEvents(filtered);
}

// ================= LISTENERS =================
if (searchInput) searchInput.addEventListener("input", filterEvents);
if (categoryFilter) categoryFilter.addEventListener("change", filterEvents);
if (availabilityFilter) availabilityFilter.addEventListener("change", filterEvents);