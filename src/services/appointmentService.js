import { db } from '../config/firebaseConfig';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

const appointmentService = {
  async getAppointments() {
    const snapshot = await getDocs(collection(db, 'events')); // Zmiana na 'events'
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  async addAppointment(appointment) {
    await addDoc(collection(db, 'events'), appointment); // Zmiana na 'events'
  },

  async updateAppointment(id, appointment) {
    const appointmentRef = doc(db, 'events', id); // Zmiana na 'events'
    await updateDoc(appointmentRef, appointment);
  },

  async deleteAppointment(id) {
    const appointmentRef = doc(db, 'events', id); // Zmiana na 'events'
    await deleteDoc(appointmentRef);
  }
};

export default appointmentService;

