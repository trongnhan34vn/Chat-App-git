export const validatePassword = (type: string) => {
  let message = '';
  switch (type) {
    case 'required':
      message = 'Please enter the password!';
      break;
    case 'pattern':
      message =
        'Password must be more than 6 characters, at least 1 character upper case and at least 1 special charater.';
      break;
    default:
      break;
  }
  return <span className="text-left text-red-500 text-[12px]">{message}</span>;
};

export const validateEmail = (type: string) => {
  let message = '';
  switch (type) {
    case 'required':
      message = 'Please enter the email!';
      break;
    case 'pattern':
      message = 'Email is invalid, please enter a valid email address';
      break;
    default:
      break;
  }
  return <span className="text-left text-red-500 text-[12px]">{message}</span>;
};
