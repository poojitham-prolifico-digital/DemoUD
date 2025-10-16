export default function decorate(block) {
  const fieldLabels = [
    'First Name', 'Last Name', 'Phone Number', 'Email Address', 'Confirm Email', 'Message'
  ];

  const requiredFields = ['first-name', 'phone-number', 'email-address', 'message'];

  const fieldContainers = Array.from(block.querySelectorAll(':scope > div > div'));

  fieldContainers.forEach((container, i) => {
    const label = fieldLabels[i] || `Field ${i + 1}`;
    const input = document.createElement(i === 5 ? 'textarea' : 'input');
    input.placeholder = label;
    input.name = label.toLowerCase().replace(/\s+/g, '-');
    input.className = 'form-input';

    // Only mark required fields
    if (requiredFields.includes(input.name)) {
      input.setAttribute('data-required', 'true');
    }

    const error = document.createElement('p');
    error.className = 'error-message';
    error.textContent = 'This field is required.';
    error.style.display = 'none';

    container.innerHTML = '';
    container.appendChild(input);
    container.appendChild(error);
  });

  // Submit validation
  const submitBtn = document.querySelector('#submit');
  if (submitBtn) {
    submitBtn.addEventListener('click', () => {
      fieldContainers.forEach((container) => {
        const input = container.querySelector('.form-input');
        const error = container.querySelector('.error-message');
        const isRequired = input.hasAttribute('data-required');

        if (isRequired) {
          if (!input.value.trim()) {
            error.style.display = 'flex';
            input.classList.add('error-highlight');
          } else {
            error.style.display = 'none';
            input.classList.remove('error-highlight');
          }
        } else {
          error.style.display = 'none';
          input.classList.remove('error-highlight');
        }
      });

      // Validate checkbox
      const checkbox = document.querySelector('#consent-checkbox');
      if (checkbox && !checkbox.checked) {
        checkbox.classList.add('error-highlight');
      } else {
        checkbox.classList.remove('error-highlight');
      }
    });
  }

// Inject checkbox directly before consent paragraph
const consentWrapper = document.querySelector('.form-container .default-content-wrapper:nth-of-type(2)');
if (consentWrapper) {
  const paragraph = consentWrapper.querySelector('p');
  if (paragraph) {
    const checkboxWrapper = document.createElement('div');
    checkboxWrapper.className = 'consent-checkbox-wrapper';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.required = true;
    checkbox.id = 'consent-checkbox';

    const label = document.createElement('label');
    label.htmlFor = 'consent-checkbox';
    label.textContent = 'I agree to the terms';

    checkboxWrapper.appendChild(checkbox);
    checkboxWrapper.appendChild(label);

    // Insert checkbox wrapper before the paragraph
    consentWrapper.insertBefore(checkboxWrapper, paragraph);
  }
}


}
