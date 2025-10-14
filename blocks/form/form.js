export default function decorate(block) {
  const fieldLabels = [
    'First name', 'Last name', 'PH No', 'Email', 'Confirm Email', 'Message'
  ];

  const fieldContainers = Array.from(block.querySelectorAll(':scope > div > div'));

  fieldContainers.forEach((container, i) => {
    const label = fieldLabels[i] || `Field ${i + 1}`;
    const input = document.createElement(i === 5 ? 'textarea' : 'input');
    input.placeholder = label;
    input.name = label.toLowerCase().replace(/\s+/g, '-');
    input.className = 'form-input';
    input.required = true;

    container.innerHTML = ''; // Clear <p>
    container.appendChild(input);
  });
}
