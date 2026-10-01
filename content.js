// content.js

// ─── FIELD MAP: keyword arrays for each profile key ───
const FIELD_MAP = {
  // Personal
  fullName: ['full_name', 'fullname', 'name', 'candidate_name', 'applicant_name', 'your_name'],
  firstName: ['first_name', 'firstname', 'fname', 'given_name', 'givenname', 'first'],
  lastName: ['last_name', 'lastname', 'lname', 'surname', 'family_name', 'familyname', 'last'],
  email: ['email', 'email_address', 'emailaddress', 'candidate_email', 'personal_email', 'mail', 'e_mail', 'e-mail'],
  phone: ['phone', 'phone_number', 'mobile', 'mobile_number', 'contact_number', 'telephone', 'contact', 'cell', 'tel'],
  dob: ['dob', 'date_of_birth', 'dateofbirth', 'birth_date', 'birthdate', 'birthday'],
  gender: ['gender', 'sex'],
  nationality: ['nationality', 'citizen'],
  address: ['address', 'street_address', 'street', 'residential_address', 'mailing_address'],
  city: ['city', 'town'],
  state: ['state', 'province', 'region'],
  country: ['country', 'nation'],
  pincode: ['pincode', 'pin_code', 'zip', 'zipcode', 'zip_code', 'postal_code', 'postalcode', 'pin'],
  maritalStatus: ['marital_status', 'marital', 'married'],
  languages: ['languages', 'language', 'languages_known'],

  // Professional
  linkedin: ['linkedin', 'linkedin_url', 'linkedin_profile', 'linked_in'],
  github: ['github', 'github_url', 'github_profile', 'git_hub'],
  portfolio: ['portfolio', 'portfolio_url', 'personal_website', 'website', 'personal_site'],
  currentJobTitle: ['current_job_title', 'job_title', 'designation', 'current_title', 'current_role', 'position', 'title'],
  currentCompany: ['current_company', 'company', 'current_employer', 'employer', 'organization', 'organisation'],
  yearsExperience: ['years_of_experience', 'years_experience', 'experience', 'total_experience', 'work_experience', 'exp'],
  skills: ['skills', 'skill', 'key_skills', 'technical_skills', 'core_skills', 'competencies'],

  // 10th
  tenthSchool: ['tenth_school', '10th_school', 'sslc_school', 'high_school', 'school_name_10'],
  tenthBoard: ['tenth_board', '10th_board', 'sslc_board', 'board_10'],
  tenthPercentage: ['tenth_percentage', '10th_percentage', 'sslc_percentage', '10th_marks', 'tenth_cgpa', '10th_cgpa'],
  tenthStartYear: ['tenth_start_year', '10th_start_year', 'sslc_start_year', 'tenth_start', '10th_start', 'sslc_start', '10th_joining_year'],
  tenthYear: ['tenth_year', '10th_year', 'sslc_year', '10th_passout', 'tenth_passout', '10th_end_year'],

  // 12th / PUC
  twelfthCollege: ['twelfth_college', '12th_college', 'puc_college', '12th_school', 'puc_school', 'intermediate_college', 'hsc_school'],
  twelfthBoard: ['twelfth_board', '12th_board', 'puc_board', 'hsc_board', 'intermediate_board'],
  twelfthStream: ['twelfth_stream', '12th_stream', 'puc_stream', 'stream', 'hsc_stream'],
  twelfthPercentage: ['twelfth_percentage', '12th_percentage', 'puc_percentage', '12th_marks', 'twelfth_cgpa', '12th_cgpa', 'hsc_percentage'],
  twelfthStartYear: ['twelfth_start_year', '12th_start_year', 'puc_start_year', '12th_start', 'twelfth_start', 'puc_start', 'hsc_start_year'],
  twelfthYear: ['twelfth_year', '12th_year', 'puc_year', '12th_passout', 'twelfth_passout', 'hsc_year', '12th_end_year'],

  // UG
  ugCollege: ['ug_college', 'ug_university', 'undergraduate_college', 'bachelor_college', 'college', 'university', 'institution'],
  ugDegree: ['ug_degree', 'undergraduate_degree', 'bachelor_degree', 'degree', 'qualification', 'education'],
  ugSpecialization: ['ug_specialization', 'ug_branch', 'specialization', 'major', 'branch', 'discipline'],
  ugCgpa: ['ug_cgpa', 'ug_percentage', 'ug_gpa', 'cgpa', 'gpa', 'grade', 'percentage'],
  ugStartYear: ['ug_start_year', 'ug_start', 'undergraduate_start', 'bachelor_start', 'college_start_year', 'ug_joining_year', 'ug_from_year'],
  ugPassoutYear: ['ug_passout', 'ug_year', 'graduation_year', 'grad_year', 'year_of_graduation', 'passout_year', 'passing_year', 'year_of_passing', 'ug_end_year'],

  // PG
  pgCollege: ['pg_college', 'pg_university', 'postgraduate_college', 'master_college', 'pg_institution'],
  pgDegree: ['pg_degree', 'postgraduate_degree', 'master_degree', 'masters_degree'],
  pgSpecialization: ['pg_specialization', 'pg_branch', 'pg_major'],
  pgCgpa: ['pg_cgpa', 'pg_percentage', 'pg_gpa'],
  pgStartYear: ['pg_start_year', 'pg_start', 'postgraduate_start', 'master_start', 'pg_joining_year', 'pg_from_year'],
  pgPassoutYear: ['pg_passout', 'pg_year', 'pg_passout_year', 'pg_end_year'],

  // Internship
  internCompany: ['intern_company', 'internship_company', 'internship_organization', 'intern_org'],
  internRole: ['intern_role', 'internship_role', 'internship_title', 'intern_title', 'intern_position'],
  internDuration: ['intern_duration', 'internship_duration', 'internship_period'],
  internDescription: ['intern_description', 'internship_description', 'internship_work', 'intern_work', 'internship_responsibilities', 'intern_responsibilities', 'internship_details'],

  // Work experience
  expCompany: ['exp_company', 'experience_company', 'previous_company', 'prev_company'],
  expJobTitle: ['exp_title', 'experience_title', 'previous_title', 'prev_title', 'previous_role'],
  expStartDate: ['exp_start', 'start_date', 'joining_date', 'from_date'],
  expEndDate: ['exp_end', 'end_date', 'leaving_date', 'to_date', 'till_date'],
  expDescription: ['exp_description', 'experience_description', 'job_description', 'responsibilities', 'work_description', 'role_description'],

  // Job preferences
  expectedSalary: ['expected_salary', 'salary', 'expected_ctc', 'salary_expectation', 'expected_compensation'],
  currentCtc: ['current_ctc', 'current_salary', 'present_salary', 'present_ctc'],
  noticePeriod: ['notice_period', 'notice', 'serving_notice'],
  availability: ['availability', 'available', 'available_from', 'joining_date', 'date_of_joining', 'when_can_you_join', 'earliest_start', 'start_date_preference'],
  relocate: ['relocate', 'willing_to_relocate', 'relocation', 'open_to_relocate'],
  workAuth: ['work_authorization', 'work_auth', 'authorization', 'visa_status', 'work_permit'],
  preferredLocation: ['preferred_location', 'preferred_city', 'location_preference', 'work_location'],
  jobType: ['job_type', 'employment_type', 'work_type', 'position_type'],

  // Resume File
  resumeFile: ['resume', 'cv', 'attach_resume', 'upload_resume', 'resume_file', 'cv_file', 'curriculum_vitae', 'attachment', 'upload_cv', 'document']
};

// ─── SCORING WEIGHTS ───
const WEIGHTS = {
  name: 90,
  id: 90,
  placeholder: 70,
  label: 80,
  aria: 50
};

// ─── HELPER: get label text for an element ───
function getLabelText(element) {
  if (element.id) {
    const lbl = document.querySelector(`label[for="${element.id}"]`);
    if (lbl) return lbl.innerText;
  }
  const parentLabel = element.closest('label');
  if (parentLabel) return parentLabel.innerText;
  const prev = element.previousElementSibling;
  if (prev && prev.tagName === 'LABEL') return prev.innerText;
  return '';
}

// ─── MATCH a single element against the FIELD_MAP ───
function matchField(element) {
  const nameAttr = (element.getAttribute('name') || '').toLowerCase();
  const idAttr = (element.id || '').toLowerCase();
  const placeholderAttr = (element.getAttribute('placeholder') || '').toLowerCase();
  const labelAttr = (getLabelText(element) || '').toLowerCase();
  const ariaAttr = (element.getAttribute('aria-label') || '').toLowerCase();

  const attrs = {
    name: nameAttr,
    id: idAttr,
    placeholder: placeholderAttr,
    label: labelAttr,
    aria: ariaAttr
  };

  let best = { type: null, confidence: 0, reasons: [] };

  for (const [type, keywords] of Object.entries(FIELD_MAP)) {
    let score = 0;
    const reasons = [];
    for (const key of Object.keys(attrs)) {
      const val = attrs[key];
      if (!val) continue;
      const normalised = val.replace(/[\s\-_]/g, '').toLowerCase();
      for (const kw of keywords) {
        const normKw = kw.replace(/[\s\-_]/g, '').toLowerCase();
        if (normalised.includes(normKw) || normKw.includes(normalised)) {
          score += WEIGHTS[key];
          reasons.push(`${key} match (+${WEIGHTS[key]})`);
          break;
        }
      }
    }
    if (score > best.confidence) {
      best = { type, confidence: score, reasons };
    }
  }

  const percent = Math.min(100, best.confidence);
  return { type: best.type, confidence: percent, reasons: best.reasons };
}

// Helper to turn base64 DataURL to File object
function dataUrlToFile(dataUrl, fileName, mimeType) {
  const arr = dataUrl.split(',');
  const mime = mimeType || (arr[0].match(/:(.*?);/)?.[1] || 'application/octet-stream');
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], fileName, { type: mime });
}

// ─── FILL a single element with a value ───
function fillElement(element, value) {
  if (!value && value !== 0) return;
  value = String(value);
  const tag = element.tagName.toLowerCase();

  if (tag === 'select') {
    const options = Array.from(element.options);
    let match = options.find(o => o.text.trim().toLowerCase() === value.trim().toLowerCase());
    if (!match) {
      match = options.find(o => o.value.toLowerCase() === value.trim().toLowerCase());
    }
    if (!match) {
      match = options.find(o => o.text.trim().toLowerCase().includes(value.trim().toLowerCase()));
    }
    if (match) {
      element.value = match.value;
      element.dispatchEvent(new Event('change', { bubbles: true }));
    }
  } else if (tag === 'input' && (element.type === 'checkbox' || element.type === 'radio')) {
    const elVal = (element.value || '').toLowerCase();
    const elLabel = (element.nextSibling && element.nextSibling.textContent) ? element.nextSibling.textContent.trim().toLowerCase() : '';
    const targetVal = value.toLowerCase();
    if (elVal === targetVal || elLabel === targetVal || elLabel.includes(targetVal)) {
      element.checked = true;
      element.dispatchEvent(new Event('change', { bubbles: true }));
    }
  } else {
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype, 'value'
    )?.set || Object.getOwnPropertyDescriptor(
      window.HTMLTextAreaElement.prototype, 'value'
    )?.set;

    if (nativeInputValueSetter) {
      nativeInputValueSetter.call(element, value);
    } else {
      element.value = value;
    }
    element.dispatchEvent(new Event('input', { bubbles: true }));
    element.dispatchEvent(new Event('change', { bubbles: true }));
    element.dispatchEvent(new Event('blur', { bubbles: true }));
  }
}

// ─── AUTOFILL all matching fields on the page ───
function autofillAll(callback) {
  chrome.storage.local.get(['profile', 'resumeData'], (result) => {
    const profile = result.profile || {};
    const resumeData = result.resumeData || null;
    const elements = document.querySelectorAll('input, textarea, select');
    let filledCount = 0;

    elements.forEach(el => {
      // Handle File Upload separately
      if (el.tagName.toLowerCase() === 'input' && el.type === 'file') {
        if (el.disabled || el.readOnly || !resumeData || !resumeData.dataUrl) return;
        const { type, confidence } = matchField(el);
        const labelText = (getLabelText(el) || '').toLowerCase();
        const idName = ((el.id || '') + ' ' + (el.name || '')).toLowerCase();

        // If matched as resumeFile or label/id contains resume/cv
        if (type === 'resumeFile' || confidence >= 50 || idName.includes('resume') || idName.includes('cv') || labelText.includes('resume') || labelText.includes('cv')) {
          try {
            const fileObj = dataUrlToFile(resumeData.dataUrl, resumeData.name, resumeData.type);
            const dt = new DataTransfer();
            dt.items.add(fileObj);
            el.files = dt.files;
            el.dispatchEvent(new Event('change', { bubbles: true }));
            el.dispatchEvent(new Event('input', { bubbles: true }));
            filledCount++;
          } catch (err) {
            console.error('Failed to attach resume file:', err);
          }
        }
        return;
      }

      // Skip hidden, disabled, readonly, submit, button
      if (el.type === 'hidden' || el.type === 'submit' || el.type === 'button' || el.disabled || el.readOnly) return;

      const { type, confidence } = matchField(el);
      if (!type) return;
      if (confidence >= 70) {
        const value = profile[type];
        if (value) {
          if (el.type !== 'checkbox' && el.type !== 'radio' && el.value && el.value.trim() !== '') return;
          fillElement(el, value);
          filledCount++;
        }
      }
    });

    if (callback) callback({ success: true, filled: filledCount });
  });
}

// ─── MESSAGE LISTENER (from popup) ───
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === 'autofill') {
    autofillAll((result) => {
      sendResponse(result);
    });
    return true; // keep channel open for async response
  }
  return false;
});

// ─── MUTATION OBSERVER for dynamic forms ───
const observer = new MutationObserver(() => {
  // Fields detected on autofill click
});
observer.observe(document.body, { childList: true, subtree: true });
