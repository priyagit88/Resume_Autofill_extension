// popup.js

// Load profile from chrome.storage and display summary
function loadProfile() {
  chrome.storage.local.get(['profile'], (result) => {
    const profile = result.profile || {};
    const pre = document.getElementById('profile-data');
    if (pre) {
      pre.textContent = formatProfile(profile);
    }
  });
}

function formatProfile(p) {
  // Show a few key fields for quick glance
  const lines = [];
  if (p.fullName) lines.push(`Name: ${p.fullName}`);
  if (p.email) lines.push(`Email: ${p.email}`);
  if (p.phone) lines.push(`Phone: ${p.phone}`);
  if (p.linkedin) lines.push(`LinkedIn: ${p.linkedin}`);
  return lines.join('\n') || 'No profile saved.';
}

function sendAutofill() {
  // Get active tab and send message to content script
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    if (tabs.length === 0) return;
    const tabId = tabs[0].id;
    chrome.tabs.sendMessage(tabId, {action: 'autofill'}, (response) => {
      const status = document.getElementById('status');
      if (chrome.runtime.lastError) {
        status.textContent = 'Error: ' + chrome.runtime.lastError.message;
      } else if (response && response.success) {
        status.textContent = `✅ ${response.filled} fields filled.`;
      } else {
        status.textContent = 'No fields filled.';
      }
    });
  });
}

function openOptions() {
  // Open options page in a new tab
  chrome.runtime.openOptionsPage();
}

document.addEventListener('DOMContentLoaded', () => {
  loadProfile();
  document.getElementById('autofill-btn').addEventListener('click', sendAutofill);
  document.getElementById('edit-profile-btn').addEventListener('click', openOptions);
});
