const validateForm = () => {
    const errors = {};
    if (!formData.name) {
      errors.name = "Please fill out this field.";
    }
    if (!formData.email) {
      errors.email = "Please fill out this field.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(formData.email)) {
      errors.email = "Please enter a valid email address.";
    }
    return errors;
  };
  