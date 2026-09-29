// content.js

// Simple keyword mapping for field types
const FIELD_MAP = {
  fullName: ['full_name', 'fullname', 'name', 'candidate_name'],
  firstName: ['first_name', 'firstname', 'fname', 'given_name', 'givenname'],
  lastName: ['last_name', 'lastname', 'lname', 'surname', 'family_name'],
  email: ['email', 'email_address', 'emailaddress', 'candidate_email', 'personal_email'],
  phone: ['phone', 'phone_number', 'mobile', 'mobile_number', 'contact_number', 'telephone'],
  address: ['address', 'street_address'],
  city: ['city'],
  state: ['state', 'province'],
  country: ['country', 'nation'],
  linkedin: ['linkedin', 'linkedin_url', 'linkedin_profile'],
  github: ['github', 'github_url', 'github_profile'],
  portfolio: ['portfolio', 'portfolio_url', 'personal_website', 'website'],
  college: ['college', 'university', 'school', 'institution'],
  degree: ['degree', 'qualification', 'education'],
  specialization: ['specialization', 'major'],
  graduationYear: ['graduation_year', 'grad_year', 'year_of_graduation'],
  cgpa: ['cgpa', 'gpa', 'grade'],
  expectedSalary: ['expected_salary', 'salary'],
  noticePeriod: ['notice_period', 'notice'],
  relocate: ['relocate', 'willing_to_relocate'],
  workAuth: ['work_authorization', 'work_auth', 'authorization']
};

// Scoring weights (simple)
const WEIGHTS = {
  name: 90,
  id: 90,
  placeholder: 70,
  label: 80,
  aria: 50
};

function getLabelText(element) {
  if (element.id) {
    const lbl = document.querySelector(`label[for="${element.id}"]`);
    if (lbl) return lbl.innerText;
  }
  const parentLabel = element.closest('label');
  if (parentLabel) return parentLabel.innerText;
  return '';
}

function matchField(element) {
  const attrs = {
    name: element.getAttribute('name') || '',
    id: element.id || '',
    placeholder: element.getAttribute('placeholder') || '',
    label: getLabelText(element) || '',
    aria: element.getAttribute('aria-label') || ''
  };
  let best = {type: null, confidence: 0, reasons: []};
  for (const [type, keywords] of Object.entries(FIELD_MAP)) {
    let score = 0;
    const reasons = [];
    for (const key of Object.keys(attrs)) {
      const val = attrs[key].toLowerCase();
      if (!val) continue;
      for (const kw of keywords) {
        if (val.includes(kw)) {
          score += WEIGHTS[key];
          reasons.push(`${key} match (+${WEIGHTS[key]})`);
          break; // avoid double counting same attr
        }
      }
    }
    if (score > best.confidence) {
      best = {type, confidence: score, reasons};
    }
  }
  const percent = Math.min(100, best.confidence);
  return {type: best.type, confidence: percent, reasons: best.reasons};
}

function fillElement(element, value) {
  if (!value) return;
  const tag = element.tagName.toLowerCase();
  if (tag === 'select') {
    const options = Array.from(element.options);
    const match = options.find(o => o.text.trim().toLowerCase() === value.trim().toLowerCase());
    if (match) {
      element.value = match.value;
      element.dispatchEvent(new Event('change', {bubbles: true}));
    }
  } else if (tag === 'input' && (element.type === 'checkbox' || element.type === 'radio')) {
    if (element.value.toLowerCase() === value.toLowerCase() ||
        (element.nextSibling && element.nextSibling.innerText && element.nextSibling.innerText.trim().toLowerCase() === value.toLowerCase())) {
      element.checked = true;
      element.dispatchEvent(new Event('change', {bubbles: true}));
    }
  } else {
    element.value = value;
    element.dispatchEvent(new Event('input', {bubbles: true}));
    element.dispatchEvent(new Event('change', {bubbles: true}));
  }
}

function autofillAll(callback) {
  chrome.storage.local.get(['profile'], (result) => {
    const profile = result.profile || {};
    const elements = document.querySelectorAll('input, textarea, select');
    let filledCount = 0;
    elements.forEach(el => {
      const {type, confidence} = matchField(el);
      if (!type) return;
      if (confidence >= 90) {
        const value = profile[type] || profile[convertToProfileKey(type)];
        if (value && !(el.value && el.value.trim() !== '')) {
          fillElement(el, value);
          filledCount++;
        }
      }
    });
    if (callback) callback({success: true, filled: filledCount});
  });
}

function convertToProfileKey(mappedType) {
  return mappedType;
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === 'autofill') {
    autofillAll((result) => {
      sendResponse(result);
    });
    return true; // keep channel open for async response
  }
  return false;
});

// Observe DOM changes to handle dynamic forms
const observer = new MutationObserver(() => {});
observer.observe(document.body, {childList: true, subtree: true});
