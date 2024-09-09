import * as yup from 'yup';

const appointmentSchema = yup.object().shape({
  title: yup.string().required('Tytuł jest wymagany'),
  startDate: yup.date().required('Data rozpoczęcia jest wymagana'),
  endDate: yup.date().required('Data zakończenia jest wymagana'),
});

export const validateAppointment = (appointment) => {
  try {
    appointmentSchema.validateSync(appointment, { abortEarly: false });
    return { valid: true };
  } catch (error) {
    if (error.inner) {
      const errors = error.inner.reduce((acc, curr) => {
        acc[curr.path] = curr.message;
        return acc;
      }, {});
      return { valid: false, errors };
    }
    return { valid: false, errors: { unknown: 'Nieznany błąd walidacji' } };
  }
};

