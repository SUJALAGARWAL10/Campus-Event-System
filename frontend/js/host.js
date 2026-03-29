// ================= DOM =================
const eventForm = document.getElementById("eventForm");
const hostEventsContainer = document.getElementById("hostEvents");

// ================= INIT =================
document.addEventListener("DOMContentLoaded", () => {
  loadHostEvents();
});

// ================= CREATE EVENT =================
if (eventForm) {
  eventForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const eventData = {
      title: document.getElementById("title").value.trim(),
      category: document.getElementById("category").value.trim(),
      description: document.getElementById("description").value.trim(),
      date: document.getElementById("date").value,
      venue: document.getElementById("venue").value.trim(),
      seats: document.getElementById("seats").value,
      image: document.getElementById("image").value.trim()
    };

    const res = await createEvent(eventData);

    if (res) {
      alert("✅ Event created successfully");

      eventForm.reset();
      loadHostEvents();
    }
  });
}

// ================= LOAD HOST EVENTS =================
async function loadHostEvents() {
  const events = await getEvents(); // backend will filter by host later

  if (!events) return;

  hostEventsContainer.innerHTML = "";

  // Optional: filter client-side for now
  const role = localStorage.getItem("role");

  events.forEach(event => {
    const card = createHostCard(event);
    hostEventsContainer.appendChild(card);
  });
}

// ================= CREATE CARD =================
function createHostCard(event) {
  const card = document.createElement("div");
  card.classList.add("event-card");

  const image = event.image || "../assets/images/banner.jpg";

  card.innerHTML = `
    <img src="${image}" alt="event">

    <div class="event-content">
      <h3>${event.title}</h3>
      <p><strong>Date:</strong> ${new Date(event.date).toLocaleDateString()}</p>
      <p><strong>Venue:</strong> ${event.venue}</p>
      <p><strong>Seats:</strong> ${event.seats}</p>

      <button onclick="handleDelete('${event._id}')">Delete</button>
    </div>
  `;

  return card;
}

// ================= DELETE EVENT =================
async function handleDelete(eventId) {
  const confirmDelete = confirm("Are you sure you want to delete this event?");

  if (!confirmDelete) return;

  const res = await deleteEvent(eventId);

  if (res) {
    alert("🗑️ Event deleted");
    loadHostEvents();
  }
}

// ================= LOGOUT =================
function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  window.location.href = "login.html";
}