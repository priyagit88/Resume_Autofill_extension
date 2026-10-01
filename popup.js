// popup.js

function loadProfile() {
  chrome.storage.local.get(['profile', 'resumeData'], (result) => {
    const profile = result.profile || {};
    const resumeData = result.resumeData || null;
    const pre = document.getElementById('profile-data');
    if (pre) {
      let text = formatProfile(profile);
      if (resumeData && resumeData.name) {
        text += '\nResume: 📄 ' + resumeData.name;
      }
      pre.textContent = text;
    }
  });
}

function formatProfile(p) {
  const lines = [];
  if (p.fullName) lines.push('Name: ' + p.fullName);
  else if (p.firstName) lines.push('Name: ' + p.firstName + (p.lastName ? ' ' + p.lastName : ''));
  if (p.email) lines.push('Email: ' + p.email);
  if (p.phone) lines.push('Phone: ' + p.phone);
  if (p.dob) lines.push('DOB: ' + p.dob);
  if (p.gender) lines.push('Gender: ' + p.gender);
  if (p.city) lines.push('City: ' + p.city);
  if (p.linkedin) lines.push('LinkedIn: ' + p.linkedin);
  if (p.github) lines.push('GitHub: ' + p.github);

  if (p.ugDegree) {
    let ugStr = 'UG: ' + p.ugDegree + (p.ugSpecialization ? ' - ' + p.ugSpecialization : '');
    const years = [p.ugStartYear, p.ugPassoutYear].filter(Boolean).join('–');
    if (years) ugStr += ` (${years})`;
    lines.push(ugStr);
  }
  if (p.pgDegree) {
    let pgStr = 'PG: ' + p.pgDegree + (p.pgSpecialization ? ' - ' + p.pgSpecialization : '');
    const years = [p.pgStartYear, p.pgPassoutYear].filter(Boolean).join('–');
    if (years) pgStr += ` (${years})`;
    lines.push(pgStr);
  }

  if (p.currentJobTitle) lines.push('Role: ' + p.currentJobTitle);
  return lines.join('\n') || 'No profile saved.';
}

function sendAutofill() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length === 0) return;
    const tabId = tabs[0].id;
    chrome.tabs.sendMessage(tabId, { action: 'autofill' }, (response) => {
      const status = document.getElementById('status');
      if (chrome.runtime.lastError) {
        status.textContent = 'Error: ' + chrome.runtime.lastError.message;
        status.style.color = '#e74c3c';
      } else if (response && response.success) {
        status.textContent = response.filled + ' fields filled.';
        status.style.color = '#27ae60';
      } else {
        status.textContent = 'No fields filled.';
        status.style.color = '#e67e22';
      }
    });
  });
}

function openOptions() {
  chrome.runtime.openOptionsPage();
}

document.addEventListener('DOMContentLoaded', () => {
  loadProfile();
  document.getElementById('autofill-btn').addEventListener('click', sendAutofill);
  document.getElementById('edit-profile-btn').addEventListener('click', openOptions);
});
