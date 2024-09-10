import React, { useState, useEffect } from 'react';
import {
  Scheduler,
  MonthView,
  WeekView,
  DayView,
  Appointments,
  AppointmentForm,
  AppointmentTooltip,
  Toolbar,
  DateNavigator,
  ViewSwitcher,
  TodayButton,
} from '@devexpress/dx-react-scheduler-material-ui';
import { EditingState, ViewState } from '@devexpress/dx-react-scheduler';
import appointmentService from '../services/appointmentService';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import plLocale from 'date-fns/locale/pl'; // Import języka polskiego

const SchedulerComponent = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const loadAppointments = async () => {
      try {
        const data = await appointmentService.getAppointments();
        const convertedData = convertToDateObjects(data);
        setAppointments(convertedData);
      } catch (error) {
        console.error('Błąd pobierania danych:', error);
      }
    };
    loadAppointments();
  }, []);

  const commitChanges = async ({ added, changed, deleted }) => {
    try {
      if (added) {
        const addedData = { ...added }; // Pobierz dodane dane
        await appointmentService.addAppointment(addedData);
      }
      if (changed) {
        for (const [id, changes] of Object.entries(changed)) {
          await appointmentService.updateAppointment(id, changes);
        }
      }
      if (deleted) {
        await appointmentService.deleteAppointment(deleted); // Pobierz ID do usunięcia
      }
      const data = await appointmentService.getAppointments();
      const convertedData = convertToDateObjects(data);
      setAppointments(convertedData);
    } catch (error) {
      console.error('Błąd podczas zapisywania zmian:', error);
    }
  };

  const convertToDateObjects = (data) => {
    return data.map(appointment => ({
      ...appointment,
      startDate: appointment.startDate.toDate(), // Konwertuj Timestamp na Date
      endDate: appointment.endDate.toDate()      // Konwertuj Timestamp na Date
    }));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={plLocale}> {/* Dodano adapterLocale */}
      {appointments.length > 0 ? (
        <Scheduler data={appointments}>
          <ViewState defaultCurrentDate={new Date()} />
          <EditingState onCommitChanges={commitChanges} />
          <DayView startDayHour={9} endDayHour={19} />
          <WeekView startDayHour={9} endDayHour={19} />
          <MonthView />
          <Toolbar />
          <DateNavigator />
          <TodayButton />
          <ViewSwitcher />
          <Appointments />
          <AppointmentTooltip showOpenButton showDeleteButton />
          <AppointmentForm />
        </Scheduler>
      ) : (
        <p>Ładowanie danych...</p>
      )}
    </LocalizationProvider>
  );
};

export default SchedulerComponent;
