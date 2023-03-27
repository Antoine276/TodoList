export function customValidityMessage(DOMInput) {
  // Custom message
  let strCustomMessage = '';

  if (DOMInput.validity.tooShort) {
    strCustomMessage = `${DOMInput.minLength} characters minimum`;
  } else if (DOMInput.validity.tooLong) {
    strCustomMessage = `${DOMInput.maxLength} characters maximum`;
  } else if (DOMInput.validity.typeMismatch) {
    strCustomMessage = `Must be of type ${DOMInput.type}`;
  } else if (DOMInput.validity.rangeUnderflow) {
    strCustomMessage = `At least ${DOMInput.min}`;
  } else if (DOMInput.validity.rangeOverflow) {
    strCustomMessage = `${DOMInput.max} or less`;
  } else if (DOMInput.validity.stepMismatch) {
    strCustomMessage = 'Integer only';
  }

  DOMInput.setCustomValidity(strCustomMessage);
  return strCustomMessage;
}
