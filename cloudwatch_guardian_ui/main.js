const mockEvents = [
  { time: "2025-07-15 12:34", user: "admin", event: "DeleteTrail", env: "production" },
  { time: "2025-07-15 12:40", user: "root", event: "ConsoleLogin", env: "dev" },
  { time: "2025-07-15 13:10", user: "user1", event: "AccessDenied", env: "staging" }
];

function renderTable(events) {
  const tbody = document.querySelector("#eventsTable tbody");
  tbody.innerHTML = "";
  events.forEach(e => {
    const row = `<tr>
      <td>${e.time}</td>
      <td>${e.user}</td>
      <td>${e.event}</td>
      <td>${e.env}</td>
    </tr>`;
    tbody.innerHTML += row;
  });
}

function filterEvents() {
  const env = document.getElementById("envFilter").value;
  if (env === "all") {
    renderTable(mockEvents);
  } else {
    renderTable(mockEvents.filter(e => e.env === env));
  }
}

document.getElementById("envFilter").addEventListener("change", filterEvents);
document.getElementById("reanalyzeBtn").addEventListener("click", () => {
  alert("Re-analysis triggered (simulation)");
});

renderTable(mockEvents);
