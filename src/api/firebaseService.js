import { db } from '../config/firebaseConfig';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs } from 'firebase/firestore';

export const fetchAppointments = async () => {
  const snapshot = await getDocs(collection(db, 'events'));
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const addAppointment = async (appointment) => {
  await addDoc(collection(db, 'events'), appointment);
};

export const updateAppointment = async (id, appointment) => {
  const appointmentRef = doc(db, 'events', id);
  await updateDoc(appointmentRef, appointment);
};

export const deleteAppointment = async (id) => {
  const appointmentRef = doc(db, 'events', id);
  await deleteDoc(appointmentRef);
};
