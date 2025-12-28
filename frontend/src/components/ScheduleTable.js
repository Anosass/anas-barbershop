import React from 'react';

const schedule = [
  { day: 'Monday', open: '10:00', close: '20:00' },
  { day: 'Tuesday', open: '10:00', close: '20:00' },
  { day: 'Wednesday', open: '10:00', close: '20:00' },
  { day: 'Thursday', open: '10:00', close: '20:00' },
  { day: 'Friday', open: '10:00', close: '20:00' },
  { day: 'Saturday', open: '10:00', close: '20:00' },
  { day: 'Sunday', open: 'Closed', close: '' }
];

function ScheduleTable() {
  return (
    <div className="schedule-card card bg-barber-blue border-0 text-light shadow-sm">
      <div className="card-body">
        <h3 className="h5 mb-3 text-uppercase text-barber-red">
          Opening Hours
        </h3>
        <div className="table-responsive">
          <table className="table table-dark table-striped align-middle mb-0">
            <thead>
              <tr>
                <th scope="col">Day</th>
                <th scope="col">Opening</th>
                <th scope="col">Closing</th>
              </tr>
            </thead>
            <tbody>
              {schedule.map((row) => (
                <tr key={row.day}>
                  <td>{row.day}</td>
                  <td>{row.open}</td>
                  <td>{row.close || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="small mt-3 mb-0 text-light-75">
          Walk-ins are welcome. For busy evenings we recommend booking through
          the contact form.
        </p>
      </div>
    </div>
  );
}

export default ScheduleTable;
