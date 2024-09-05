import React, { useState, useEffect } from 'react';
import {
  Scheduler,
  DayView,
  WeekView,
  MonthView,
  Appointments,
  AppointmentForm,
  AppointmentTooltip,
  Toolbar,
  ViewSwitcher,
  DateNavigator,
  TodayButton,
  EditingState,
  IntegratedEditing,
} from '@devexpress/dx-react-scheduler-material-ui';
import appointmentService from '../services/appointmentService';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import plLocale from 'date-fns/locale/pl';

const SchedulerComponent = () => {
  const [appointments, setAppointments] = useState([]);
  const [locale] = useState('pl-PL');

  useEffect(() => {
    const loadAppointments = async () => {
      const data = await appointmentService.getAppointments();
      setAppointments(data);
    };
    loadAppointments();
  }, []);

  const commitChanges = async ({ added, changed, deleted }) => {
    if (added) {
      await appointmentService.addAppointment(added);
    }
    if (changed) {
      const id = Object.keys(changed)[0];
      await appointmentService.updateAppointment(id, changed[id]);
    }
    if (deleted) {
      await appointmentService.removeAppointment(deleted);
    }
    const data = await appointmentService.getAppointments();
    setAppointments(data);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={plLocale}>
      <Scheduler data={appointments} locale={locale}>
        <EditingState onCommitChanges={commitChanges} />
        <IntegratedEditing />
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
    </LocalizationProvider>
  );
};

export default SchedulerComponent;
