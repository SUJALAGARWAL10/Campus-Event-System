// ================= DOM =================
const container = document.getElementById("eventDetails");

// ================= GET EVENT ID =================
const params = new URLSearchParams(window.location.search);
const eventId = params.get("id");

// ================= INIT =================
document.addEventListener("DOMContentLoaded", () => {
  if (eventId) {
    loadEventDetails();
  }
});

// ================= LOAD EVENT =================
async function loadEventDetails() {
  const events = await getEvents(); // we’ll optimize backend later

  if (!events) return;

  const event = events.find(e => e._id === eventId);

  if (!event) {
    container.innerHTML = "<p>Event not found</p>";
    return;
  }

  displayEvent(event);
}

// ================= DISPLAY =================
function displayEvent(event) {
  const image = event.image || "../assets/images/banner.jpg";

  container.innerHTML = `
    <img src="${image}" alt="event">

    <h2>${event.title}</h2>
    <p><strong>Date:</strong> ${new Date(event.date).toLocaleDateString()}</p>
    <p><strong>Venue:</strong> ${event.venue}</p>
    <p><strong>Seats Left:</strong> ${event.seats}</p>

    <p style="margin-top:10px;">${event.description}</p>

    <button onclick="handleRegister('${event._id}')"
      ${event.seats <= 0 ? "disabled" : ""}>
      ${event.seats <= 0 ? "Event Full" : "Register"}
    </button>
  `;
}

// ================= REGISTER =================
async function handleRegister(eventId) {
  const res = await registerForEvent(eventId);

  if (res) {
    alert("✅ Registered successfully");
    loadEventDetails();
  }
}

// ================= LOGOUT =================
function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  window.location.href = "login.html";
}