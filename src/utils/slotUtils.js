const buildUpcomingDateKeys = (days = 7) => {
  const dates = [];
  const now = new Date();

  for (let i = 0; i < days; i += 1) {
    const d = new Date(now);
    d.setDate(now.getDate() + i);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    dates.push(`${yyyy}-${mm}-${dd}`);
  }

  return dates;
};

const groupSlotsWithBookings = ({ availableSlots = [], dates = [], bookedMap = {} }) => {
  return dates.map((date) => {
    const bookedForDate = bookedMap[date] || [];

    return {
      date,
      slots: availableSlots.map((time) => ({
        time,
        isBooked: bookedForDate.includes(time)
      }))
    };
  });
};

module.exports = {
  buildUpcomingDateKeys,
  groupSlotsWithBookings
};
