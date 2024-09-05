import appointmentRepository from '../repositories/appointmentRepository';
import { validateAppointment } from '../models/Appointment';

class AppointmentService {
  async getAppointments() {
    return await appointmentRepository.getAll();
  }

  async addAppointment(appointment) {
    validateAppointment(appointment); // Walidacja modelu
    await appointmentRepository.create(appointment);
  }

  async updateAppointment(id, appointment) {
    validateAppointment(appointment);
    await appointmentRepository.update(id, appointment);
  }

  async removeAppointment(id) {
    await appointmentRepository.delete(id);
  }
}

export default new AppointmentService();
