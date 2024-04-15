// Target time (in 24-hour format, e.g., "17:30")
const targetTime = "19:00";

function getTimeUntilTarget() {
  // Get current time
  const now = new Date();
  
  // Parse target time
  const [targetHours, targetMinutes] = targetTime.split(":");
  const target = new Date();
  target.setHours(parseInt(targetHours, 10));
  target.setMinutes(parseInt(targetMinutes, 10));
  target.setSeconds(0);
  
  // Calculate the difference in milliseconds
  let diff = target - now;
  
  // Check if the target time is already passed today
  if (diff < 0) {
    // Set target time for tomorrow
    target.setDate(target.getDate() + 1);
    diff = target - now;
  }
  
  // Calculate remaining hours, minutes, and seconds
  const hours = Math.floor(diff / (1000 * 60 * 60));
  diff -= hours * 1000 * 60 * 60;
  const minutes = Math.floor(diff / (1000 * 60));
  diff -= minutes * 1000 * 60;
const seconds = Math.floor(diff / 1000);

  return { hours, minutes, seconds };
}

function updateCountdown() {
  const { hours, minutes, seconds } = getTimeUntilTarget();
  document.getElementById("countdown").innerHTML = `Time: ${hours} hours, ${minutes} minutes, and ${seconds} seconds to go.`;
}

// Update the countdown every second
setInterval(updateCountdown, 1000);
updateCountdown(); // Initial call to display the countdown immediately
