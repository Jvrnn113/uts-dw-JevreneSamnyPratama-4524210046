// Seleksi elemen input
const titleInput = document.querySelector('#input-title');
const dateInput = document.querySelector('#input-date');
const priorityInput = document.querySelector('#input-priority');
const tasksInput = document.querySelector('#input-tasks');
const coverInput = document.querySelector('#input-cover');
const coverWrap = document.querySelector('#wrap-cover');

// Seleksi elemen preview
const previewTitle = document.querySelector('#preview-title');
const previewDate = document.querySelector('#preview-date');
const previewPriority = document.querySelector('#preview-priority');
const previewTasks = document.querySelector('#preview-tasks');
const previewCover = document.querySelector('#preview-cover');

// Helper: format tanggal ke lokal Indonesia (fallback jika kosong)
function formatDate(value) {
  if (!value) return 'Date not selected';
  try {
    const d = new Date(value);
    return d.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });
  } catch {
    return 'Date not selected';
  }
}

// Helper: render tasks dari teks koma
function renderTasks(text) {
  const container = previewTasks;
  container.innerHTML = '';
  const items = (text || '').split(',').map(s => s.trim()).filter(Boolean);

  if (items.length === 0) {
    const li = document.createElement('li');
    li.textContent = 'no tasks added';
    container.appendChild(li);
    return;
  }

  items.forEach(task => {
    const li = document.createElement('li');
    li.textContent = task;
    container.appendChild(li);
  });
}

// Update cover dengan fallback gambar default
function updateCover(url) {
  const fallback = 'default-cover.jpg';
  previewCover.src = url || fallback;
}

// Update semua bidang preview
function updatePreview() {
  previewTitle.textContent = titleInput.value || 'Planner Title';
  previewDate.textContent = formatDate(dateInput.value);
  previewPriority.textContent = priorityInput.value || 'Priority not selected';
  renderTasks(tasksInput.value);
  updateCover(coverInput.value);
}

// Event listener untuk input live preview
[titleInput, dateInput, priorityInput, tasksInput, coverInput].forEach(el => {
  el.addEventListener('input', updatePreview);
});

// Event listener untuk input file cover
coverInput.addEventListener('change', () => {
  const file = coverInput.files[0];
  if (file) {
    previewCover.src = URL.createObjectURL(file);
  } else {
    previewCover.src = 'default-cover.jpg';
  }
});

previewCover.addEventListener('load', () => {
  coverWrap.style.height = previewCover.naturalHeight + 'px';
});

// Inisialisasi awal
updatePreview();