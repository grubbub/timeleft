const targetTime = "16:00";

function getTimeUntilTarget() {
  const now = new Date();
  const [targetHours, targetMinutes] = targetTime.split(":");
  const target = new Date();
  target.setHours(parseInt(targetHours, 10));
  target.setMinutes(parseInt(targetMinutes, 10));
  target.setSeconds(0);
  
  let diff = target - now;
  if (diff < 0) {
    target.setDate(target.getDate() + 1);
    diff = target - now;
  }

  const hours = Math.floor(diff / (1000 * 60 * 60));
  diff -= hours * 1000 * 60 * 60;
  const minutes = Math.floor(diff / (1000 * 60));
  diff -= minutes * 1000 * 60;
  const seconds = Math.floor(diff / 1000);

  return { hours, minutes, seconds, diff };
}

function updateCountdown() {
  const { hours, minutes, seconds } = getTimeUntilTarget();
  document.getElementById("countdown").innerHTML = `Time: ${hours} hours, ${minutes} minutes, and ${seconds} seconds to go.`;
}

function updateProgressBar() {
    const now = new Date();
    const startTime = new Date();
    startTime.setHours(7, 0, 0, 0); // 7:00 AM
  
    const endTime = new Date();
    endTime.setHours(16, 0, 0, 0); // 4:00 PM
  
    let progress = 0;
  
    if (now >= startTime && now <= endTime) {
      const totalTime = endTime - startTime;
      const elapsed = now - startTime;
      progress = (elapsed / totalTime) * 100;
    } else if (now > endTime) {
      progress = 100; // If it's past the end time, the progress bar is full.
    }
  
    document.getElementById("progressBar").style.width = `${progress}%`;
  
    const milestones = document.getElementById("milestones");
    if (progress < 25) {
      milestones.textContent = "The coffee is kicking in.";
    } else if (progress < 50) {
      milestones.textContent = "Lunch is a beacon of hope.";
    } else if (progress < 75) {
      milestones.textContent = "You can almost taste freedom.";
    } else if (progress < 100) {
      milestones.textContent = "Final stretch!";
    } else {
      milestones.textContent = "You made it! Treat yourself!";
    }
    // Continuously update progress bar
    if (progress < 100) {
        requestAnimationFrame(updateProgressBar);
    }
}

setInterval(updateCountdown, 1000);
updateCountdown();
updateProgressBar();
