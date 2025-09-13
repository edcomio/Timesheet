let entries = JSON.parse(localStorage.getItem('timesheet')) || [];
const form = document.getElementById('timesheet-form');
const body = document.getElementById('timesheet-body');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const project = document.getElementById('project').value;
  const date = document.getElementById('date').value;
  const hours = document.getElementById('hours').value;

  const entry = { id: Date.now(), name, project, date, hours };
  entries.push(entry);
  localStorage.setItem('timesheet', JSON.stringify(entries));
  form.reset();
  renderTable();
});

function renderTable() {
  body.innerHTML = '';
  entries.forEach(entry => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${entry.name}</td>
      <td>${entry.project}</td>
      <td>${entry.date}</td>
      <td>${entry.hours}</td>
      <td class="actions">
        <button onclick="editEntry(${entry.id})">Edit</button>
        <button onclick="deleteEntry(${entry.id})">Delete</button>
      </td>
    `;
    body.appendChild(row);
  });
}

function deleteEntry(id) {
  entries = entries.filter(entry => entry.id !== id);
  localStorage.setItem('timesheet', JSON.stringify(entries));
  renderTable();
}

function editEntry(id) {
  const entry = entries.find(e => e.id === id);
  document.getElementById('name').value = entry.name;
  document.getElementById('project').value = entry.project;
  document.getElementById('date').value = entry.date;
  document.getElementById('hours').value = entry.hours;

  deleteEntry(id); 
}

renderTable();

