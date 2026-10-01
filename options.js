// options.js

let statusTimeout = null;
let currentResumeData = null;

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function updateResumeUI(resumeData) {
  const infoBlock = document.getElementById('resume-info');
  const filenameEl = document.getElementById('resume-filename');
  const detailsEl = document.getElementById('resume-details');

  if (resumeData && resumeData.dataUrl) {
    currentResumeData = resumeData;
    filenameEl.textContent = '📄 ' + (resumeData.name || 'Resume Document');
    const sizeStr = resumeData.size ? formatBytes(resumeData.size) : '';
    const typeStr = resumeData.type || '';
    detailsEl.textContent = `Size: ${sizeStr} | Type: ${typeStr}`;
    infoBlock.style.display = 'block';
  } else {
    currentResumeData = null;
    infoBlock.style.display = 'none';
    const fileInput = document.getElementById('resumeFileInput');
    if (fileInput) fileInput.value = '';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('profile-form');
  const statusDiv = document.getElementById('save-status');
  const fileInput = document.getElementById('resumeFileInput');
  const removeResumeBtn = document.getElementById('remove-resume-btn');
  const resumeNoteInput = document.getElementById('resumeNote');

  // Load existing profile & resume data from chrome.storage.local
  chrome.storage.local.get(['profile', 'resumeData'], (result) => {
    const profile = result.profile || {};
    for (const key in profile) {
      const el = document.getElementById(key);
      if (el) {
        if (el.type === 'checkbox' || el.type === 'radio') {
          el.checked = profile[key] === el.value;
        } else {
          el.value = profile[key];
        }
      }
    }

    if (result.resumeData) {
      updateResumeUI(result.resumeData);
    }
  });

  // Handle resume file selection
  if (fileInput) {
    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (evt) => {
        const resumeData = {
          name: file.name,
          type: file.type || 'application/octet-stream',
          size: file.size,
          lastModified: file.lastModified,
          dataUrl: evt.target.result
        };
        updateResumeUI(resumeData);
        // Also auto-fill reference note if empty
        if (resumeNoteInput && !resumeNoteInput.value) {
          resumeNoteInput.value = file.name;
        }
      };
      reader.readAsDataURL(file);
    });
  }

  // Handle resume removal
  if (removeResumeBtn) {
    removeResumeBtn.addEventListener('click', () => {
      chrome.storage.local.remove('resumeData', () => {
        updateResumeUI(null);
      });
    });
  }

  // Handle form submit
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const data = {};
    const elements = form.elements;
    for (let i = 0; i < elements.length; i++) {
      const el = elements[i];
      if (!el.name || el.type === 'file') continue;
      if (el.type === 'checkbox' || el.type === 'radio') {
        if (el.checked) data[el.name] = el.value;
      } else {
        data[el.name] = el.value;
      }
    }

    const payload = { profile: data };
    if (currentResumeData) {
      payload.resumeData = currentResumeData;
    }

    chrome.storage.local.set(payload, () => {
      if (chrome.runtime.lastError) {
        statusDiv.textContent = '❌ Error saving profile.';
        statusDiv.style.color = '#e74c3c';
      } else {
        const now = new Date();
        const timeStr = now.toLocaleTimeString();
        statusDiv.textContent = `✓ Profile saved at ${timeStr}`;
        statusDiv.style.color = '#27ae60';

        // Trigger flash animation on repeated clicks
        statusDiv.classList.remove('flash');
        void statusDiv.offsetWidth; // force reflow
        statusDiv.classList.add('flash');

        if (statusTimeout) clearTimeout(statusTimeout);
        statusTimeout = setTimeout(() => {
          statusDiv.textContent = '';
          statusDiv.classList.remove('flash');
        }, 4000);
      }
    });
  });
});
