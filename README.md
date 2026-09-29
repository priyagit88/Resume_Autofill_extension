# Job Application Autofill Chrome Extension

## Overview

This is a lightweight **Chrome Extension (Manifest V3)** that lets you store your personal and professional details once and automatically fill job‑application forms on any website. The extension **never submits** the form – you review the data and click the site’s submit button yourself.

## Features

- **Profile editor** – Save personal, professional, education, and common job‑application fields.
- **One‑click autofill** – Detects form fields on the current page and fills matching inputs.
- **Keyword‑based field detection** – Works with many naming variations (e.g., `first_name`, `fname`, `candidate_first_name`).
- **Confidence scoring** – Only fields with a high confidence (≥ 90 %) are auto‑filled.
- **Supports** text inputs, textareas, dropdowns, checkboxes, and radio buttons.
- **Privacy‑first** – All data is stored locally with `chrome.storage.local`; nothing is sent to a server.

## Installation

1. Open Chrome and navigate to `chrome://extensions`.
2. Enable **Developer mode** (toggle in the top‑right corner).
3. Click **Load unpacked**.
4. Select the folder `Resume_Autofill_extension` (the root of this repository).
5. The extension icon **Job Application Autofill** will appear next to the address bar.

## Setting Up Your Profile

1. Click the extension icon → **Edit Profile**.
2. Fill in the sections:
   - **Personal Details** (name, email, phone, address, etc.)
   - **Professional Details** (LinkedIn, GitHub, portfolio, skills, current job title, years of experience)
   - **Education** (college, degree, specialization, graduation year, CGPA)
   - **Other Common Details** (expected salary, notice period, relocation willingness, work authorization)
3. Press **Save Profile**. The data is stored locally and will be used for autofill.

## Using the Autofill Feature

1. Navigate to a job‑application page (any site – Workday, Greenhouse, Lever, LinkedIn, etc.).
2. Click the extension icon → **Autofill Form**.
3. The extension scans the page, matches fields, and fills those with a confidence ≥ 90 %.
4. A status message shows how many fields were filled.
5. Review the populated fields and click the site’s **Submit** or **Apply** button yourself.

## How Field Detection Works

- The content script gathers each form element’s `name`, `id`, `placeholder`, associated `<label>`, and `aria-label`.
- It compares these strings against a keyword map (e.g., `firstName`, `fname`, `given_name` → **FIRST_NAME**).
- Each match adds a weighted score (name +5, id +5, label +4, placeholder +3, aria +3). The total is turned into a percentage confidence.
- Only fields with confidence **≥ 90 %** are auto‑filled; lower‑confidence matches are ignored to avoid incorrect data entry.

## Privacy & Security

- All profile data lives **only in the browser** (`chrome.storage.local`).
- No network requests are made; the extension does not collect analytics or send data anywhere.
- The extension never clicks **Submit**, **Apply**, or any other action that would finalize an application.
- It also does **not** attempt to bypass CAPTCHAs, bot protection, or any security mechanisms.

## Limitations

- Dynamic forms that load after the initial page load are handled via a `MutationObserver`, but extremely custom UI components (e.g., Shadow DOM, custom web components) may not be detected.
- Dropdowns are filled only when the exact option text matches the saved value (case‑insensitive).
- Checkboxes/radio buttons are checked only when the saved answer matches the element’s value or adjacent label text.

## Contributing

Feel free to fork the repository, add more keyword mappings, improve the confidence algorithm, or polish the UI. All contributions should respect the privacy‑first philosophy.

## License

This project is released under the **MIT License** – you are free to use, modify, and distribute it.

---

*Enjoy faster job applications while keeping full control over your data!*
