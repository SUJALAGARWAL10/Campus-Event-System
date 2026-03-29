// ================= BASE URL =================
const BASE_URL = "http://localhost:5000/api";

// ================= TOKEN HANDLING =================
function getToken() {
  return localStorage.getItem("token");
}

function setToken(token) {
  localStorage.setItem("token", token);
}

function removeToken() {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
}

// ================= GENERIC REQUEST =================
async function apiRequest(endpoint, method = "GET", body = null) {
  const token = getToken();

  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Attach token
  if (token) {
    options.headers["Authorization"] = `Bearer ${token}`;
  }

  // Attach body
  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, options);

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Something went wrong");
    }

    return data;

  } catch (err) {
    console.error("API Error:", err.message);
    alert(err.message);
    return null;
  }
}

// ================= AUTH APIs =================
async function loginUser(credentials) {
  return await apiRequest("/auth/login", "POST", credentials);
}

async function registerUser(userData) {
  return await apiRequest("/auth/register", "POST", userData);
}

// ================= EVENTS APIs =================
async function getEvents() {
  return await apiRequest("/events");
}

async function createEvent(eventData) {
  return await apiRequest("/events", "POST", eventData);
}

async function updateEvent(id, eventData) {
  return await apiRequest(`/events/${id}`, "PUT", eventData);
}

async function deleteEvent(id) {
  return await apiRequest(`/events/${id}`, "DELETE");
}

// ================= REGISTRATION APIs =================
async function registerForEvent(eventId) {
  return await apiRequest("/registrations", "POST", { eventId });
}

async function getMyRegistrations() {
  return await apiRequest("/registrations/my");
}