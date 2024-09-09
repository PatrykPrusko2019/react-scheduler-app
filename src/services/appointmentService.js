import { db } from '../config/firebaseConfig';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

const appointmentService = {
  async getAppointments() {
    const snapshot = await getDocs(collection(db, 'appointments'));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  async addAppointment(appointment) {
    await addDoc(collection(db, 'appointments'), appointment);
  },

  async updateAppointment(id, appointment) {
    const appointmentRef = doc(db, 'appointments', id);
    await updateDoc(appointmentRef, appointment);
  },

  async deleteAppointment(id) {
    const appointmentRef = doc(db, 'appointments', id);
    await deleteDoc(appointmentRef);
  }
};

export default appointmentService;
