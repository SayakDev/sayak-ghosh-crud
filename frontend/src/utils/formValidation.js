const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^\d{7,15}$/;
const IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

export const validateRTIForm = (values) => {
  const errors = {};

  if (!values.applicantName.trim()) {
    errors.applicantName = 'Applicant name is required';
  }

  if (!values.gender) {
    errors.gender = 'Gender is required';
  }

  if (!values.contactNumber.trim()) {
    errors.contactNumber = 'Contact number is required';
  } else if (!PHONE_REGEX.test(values.contactNumber.trim())) {
    errors.contactNumber = 'Enter a valid phone number';
  }

  if (!values.email.trim()) {
    errors.email = 'Email is required';
  } else if (!EMAIL_REGEX.test(values.email.trim())) {
    errors.email = 'Enter a valid email address';
  }

  if (!values.address.trim()) {
    errors.address = 'Address is required';
  }

  if (!values.subject.trim()) {
    errors.subject = 'Subject is required';
  }

  if (!values.applicationMode) {
    errors.applicationMode = 'Application mode is required';
  }

  if (!values.dateOfReceipt) {
    errors.dateOfReceipt = 'Date of receipt is required';
  }

  if (!values.department) {
    errors.department = 'Department is required';
  }

  if (!values.dueDate) {
    errors.dueDate = 'Due date is required';
  }

  if (!values.reminderFrequency) {
    errors.reminderFrequency = 'Reminder frequency is required';
  }

  if (!values.applicationFile && !values.applicationFileName) {
    errors.applicationFile = 'An application image is required';
  } else if (values.applicationFile instanceof File && !IMAGE_TYPES.includes(values.applicationFile.type)) {
    errors.applicationFile = 'Only JPG, JPEG, or PNG image files are allowed';
  }

  if (values.attachmentFile instanceof File && !IMAGE_TYPES.includes(values.attachmentFile.type)) {
    errors.attachmentFile = 'Only JPG, JPEG, or PNG image files are allowed';
  }

  return errors;
};
