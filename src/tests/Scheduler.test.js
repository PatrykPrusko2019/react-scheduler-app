import { render, screen, fireEvent } from '@testing-library/react';
import SchedulerComponent from '../components/Scheduler';
import appointmentService from '../services/appointmentService';

jest.mock('../services/appointmentService');

describe('SchedulerComponent', () => {
  it('should render the Scheduler', () => {
    render(<SchedulerComponent />);
    expect(screen.getByText(/Kalendarz/i)).toBeInTheDocument();
  });

  it('should add an appointment', async () => {
    const mockAppointment = { title: 'New Event' };
    appointmentService.getAppointments.mockResolvedValue([mockAppointment]);

    render(<SchedulerComponent />);

    fireEvent.click(screen.getByText('Dodaj'));
    expect(screen.getByText('New Event')).toBeInTheDocument();
  });
});
