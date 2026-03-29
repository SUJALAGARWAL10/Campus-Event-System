// ================= DOM =================
const allEventsContainer = document.getElementById("allEvents");
const myEventsContainer = document.getElementById("myEvents");

// ================= IMAGE FALLBACK =================
const defaultImage = "../assets/images/banner.jpg";

// ================= INIT =================
document.addEventListener("DOMContentLoaded", () => {
  loadAllEvents();
  loadMyEvents();
});

// ================= LOAD ALL EVENTS =================
async function loadAllEvents() {
  const events = await getEvents();

  if (!events) return;

  allEventsContainer.innerHTML = "";

  events.forEach(event => {
    const card = createEventCard(event, true);
    allEventsContainer.appendChild(card);
  });
}

// ================= LOAD MY EVENTS =================
async function loadMyEvents() {
  const myEvents = await getMyRegistrations();

  if (!myEvents) return;

  myEventsContainer.innerHTML = "";

  if (myEvents.length === 0) {
    myEventsContainer.innerHTML = "<p>No registered events yet</p>";
    return;
  }

  myEvents.forEach(item => {
    const event = item.eventId; // assuming populated data
    const card = createEventCard(event, false);
    myEventsContainer.appendChild(card);
  });
}

// ================= CREATE CARD =================
function createEventCard(event, showRegisterBtn) {
  const card = document.createElement("div");
  card.classList.add("event-card");

  const image = event.image || defaultImage;

  card.innerHTML = `
    <img src="${image}" alt="event">

    <div class="event-content">
      <h3>${event.title}</h3>
      <p><strong>Date:</strong> ${new Date(event.date).toLocaleDateString()}</p>
      <p><strong>Venue:</strong> ${event.venue}</p>
      <p><strong>Seats Left:</strong> ${event.seats}</p>

      ${
        showRegisterBtn
          ? `<button onclick="handleRegister('${event._id}')" 
              ${event.seats <= 0 ? "disabled" : ""}>
              ${event.seats <= 0 ? "Full" : "Register"}
            </button>`
          : ""
      }
    </div>
  `;

  return card;
}

// ================= REGISTER EVENT =================
async function handleRegister(eventId) {
  const res = await registerForEvent(eventId);

  if (res) {
    alert("✅ Registered successfully");

    // Refresh UI
    loadAllEvents();
    loadMyEvents();
  }
}

// ================= LOGOUT =================
function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  window.location.href = "login.html";
}