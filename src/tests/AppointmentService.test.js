import appointmentService from '../services/appointmentService';
import appointmentRepository from '../repositories/appointmentRepository';

jest.mock('../repositories/appointmentRepository');

describe('AppointmentService', () => {
  it('should fetch all appointments', async () => {
    const mockAppointments = [{ id: '1', title: 'Test' }];
    appointmentRepository.getAll.mockResolvedValue(mockAppointments);

    const appointments = await appointmentService.getAppointments();

    expect(appointments).toEqual(mockAppointments);
    expect(appointmentRepository.getAll).toHaveBeenCalled();
  });

  it('should validate and add an appointment', async () => {
    const newAppointment = { title: 'Meeting', startDate: new Date(), endDate: new Date() };
    await appointmentService.addAppointment(newAppointment);

    expect(appointmentRepository.create).toHaveBeenCalledWith(newAppointment);
  });
});
