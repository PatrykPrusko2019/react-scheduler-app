import * as yup from 'yup';

const appointmentSchema = yup.object().shape({
  title: yup.string().required('Tytuł jest wymagany'),
  startDate: yup.date().required('Data rozpoczęcia jest wymagana'),
  endDate: yup.date().required('Data zakończenia jest wymagana'),
});

export const validateAppointment = (appointment) => {
  appointmentSchema.validateSync(appointment);
};
