// options.js

// Save profile data to chrome.storage.local when the form is submitted

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('profile-form');
  const statusDiv = document.getElementById('save-status');

  // Load existing profile into the form fields
  chrome.storage.local.get(['profile'], (result) => {
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
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = {};
    const elements = form.elements;
    for (let i = 0; i < elements.length; i++) {
      const el = elements[i];
      if (!el.name) continue; // skip buttons etc.
      if (el.type === 'checkbox' || el.type === 'radio') {
        if (el.checked) data[el.name] = el.value;
      } else {
        data[el.name] = el.value;
      }
    }
    // Save under key "profile"
    chrome.storage.local.set({profile: data}, () => {
      if (chrome.runtime.lastError) {
        statusDiv.textContent = 'Error saving profile.';
      } else {
        statusDiv.textContent = 'Profile saved.';
        // Also update popup preview if open (optional)
      }
    });
  });
});
