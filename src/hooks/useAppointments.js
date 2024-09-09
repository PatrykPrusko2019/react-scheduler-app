import { useState, useCallback } from 'react';
import { db } from '../config/firebaseConfig';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

const useFirebase = () => {
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = useCallback(async () => {
    const querySnapshot = await getDocs(collection(db, 'appointments'));
    const appointmentsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setAppointments(appointmentsData);
    return appointmentsData;
  }, []);

  const addAppointment = async (appointment) => {
    await addDoc(collection(db, 'appointments'), appointment);
    await fetchAppointments();
  };

  const updateAppointment = async (id, appointment) => {
    const appointmentDoc = doc(db, 'appointments', id);
    await updateDoc(appointmentDoc, appointment);
    await fetchAppointments();
  };

  const deleteAppointment = async (id) => {
    const appointmentDoc = doc(db, 'appointments', id);
    await deleteDoc(appointmentDoc);
    await fetchAppointments();
  };

  return { fetchAppointments, addAppointment, updateAppointment, deleteAppointment, appointments };
};

export { useFirebase };
