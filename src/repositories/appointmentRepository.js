import * as firebaseService from '../api/firebaseService';

class AppointmentRepository {
  async getAll() {
    return await firebaseService.fetchAppointments();
  }

  async create(appointment) {
    return await firebaseService.addAppointment(appointment);
  }

  async update(id, appointment) {
    return await firebaseService.updateAppointment(id, appointment);
  }

  async delete(id) {
    return await firebaseService.deleteAppointment(id);
  }
}

export default new AppointmentRepository();
