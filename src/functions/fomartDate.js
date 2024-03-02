function formatDate(dateString) {
    // Create a Date object from the string
    const date = new Date(dateString);
  
    // Get today's date
    const today = new Date();
  
    // Check if the year is the same as the current year
    const isSameYear = date.getFullYear() === today.getFullYear();
  
    // Format the date based on different scenarios
    if (isSameYear && date.getDate() === today.getDate() - 1) {
      return `Yesterday ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else if (isSameYear) {
      const month = date.toLocaleString('default', { month: 'short' });
      const day = date.getDate();
      return `${day} ${month}`;
    } else {
      const month = date.toLocaleString('default', { month: 'short' });
      const year = date.getFullYear();
      return `${month} ${year}`;
    }
  }
  
  export default formatDate;