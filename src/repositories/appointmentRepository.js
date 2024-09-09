import * as firebaseService from '../api/firebaseService';

const appointmentRepository = {
  async getAll() {
    try {
      return await firebaseService.getAppointments();
    } catch (error) {
      console.error('Error fetching appointments:', error);
      throw error;
    }
  },

  async create(appointment) {
    try {
      return await firebaseService.addAppointment(appointment);
    } catch (error) {
      console.error('Error creating appointment:', error);
      throw error;
    }
  },

  async update(id, appointment) {
    try {
      return await firebaseService.updateAppointment(id, appointment);
    } catch (error) {
      console.error('Error updating appointment:', error);
      throw error;
    }
  },

  async delete(id) {
    try {
      return await firebaseService.deleteAppointment(id);
    } catch (error) {
      console.error('Error deleting appointment:', error);
      throw error;
    }
  }
};

export default appointmentRepository;
