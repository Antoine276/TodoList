export function customValidityMessage(DOMInput) {
  if (DOMInput.validity.tooShort) {
    return `${DOMInput.minLength} characters minimum`;
  }

  if (DOMInput.validity.tooLong) {
    return `${DOMInput.maxLength} characters maximum`;
  }

  if (DOMInput.validity.typeMismatch) {
    return `Must be of type ${DOMInput.type}`;
  }

  if (DOMInput.validity.rangeUnderflow) {
    return `At least ${DOMInput.min}`;
  }

  if (DOMInput.validity.rangeOverflow) {
    return `${DOMInput.max} or less`;
  }

  if (DOMInput.validity.stepMismatch) {
    return 'Integer only';
  }

  return '';
}
