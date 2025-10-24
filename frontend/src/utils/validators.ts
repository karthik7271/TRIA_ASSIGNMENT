// Email validation
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Phone validation (basic)
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  const cleaned = phone.replace(/\D/g, '');
  return phoneRegex.test(cleaned) && cleaned.length >= 10;
};

// Name validation
export const isValidName = (name: string): boolean => {
  return name.trim().length >= 2;
};

// Contact form validation
export interface ValidationErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  [key: string]: string | undefined;
}

export const validateContactForm = (data: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!isValidName(data.firstName)) {
    errors.firstName = 'First name must be at least 2 characters';
  }

  if (!isValidName(data.lastName)) {
    errors.lastName = 'Last name must be at least 2 characters';
  }

  if (!isValidEmail(data.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (data.phone && !isValidPhone(data.phone)) {
    errors.phone = 'Please enter a valid phone number';
  }

  return errors;
};
