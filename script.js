// Create stars for background
function createStars() {
    const starsContainer = document.getElementById('stars');
    const starsCount = 150;
    
    for (let i = 0; i < starsCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        // Random position and size
        const size = Math.random() * 3;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        
        // Random animation delay
        star.style.animationDelay = `${Math.random() * 5}s`;
        
        starsContainer.appendChild(star);
    }
}

// Islamic months
const islamicMonths = [
    "Muharram", "Safar", "Rabi' al-Awwal", "Rabi' al-Thani", 
    "Jumada al-Awwal", "Jumada al-Thani", "Rajab", "Sha'ban", 
    "Ramadan", "Shawwal", "Dhu al-Qi'dah", "Dhu al-Hijjah"
];

// Days of week
const daysOfWeek = [
    "Sunday", "Monday", "Tuesday", "Wednesday", 
    "Thursday", "Friday", "Saturday"
];

// Approximate dates for Islamic events (these would need to be updated yearly)
// For demonstration, using 2024 dates
const ramadanStart = new Date("2024-03-11");
const eidUlFitr = new Date("2024-04-10");
const eidUlAdha = new Date("2024-06-16");

function updateClock() {
    const now = new Date();
    
    // Convert to Pakistan time (UTC+5)
    const pakistanOffset = 5 * 60 * 60 * 1000; // 5 hours in milliseconds
    const pakistanTime = new Date(now.getTime() + pakistanOffset);
    
    // Format time
    const hours = String(pakistanTime.getUTCHours()).padStart(2, '0');
    const minutes = String(pakistanTime.getUTCMinutes()).padStart(2, '0');
    const seconds = String(pakistanTime.getUTCSeconds()).padStart(2, '0');
    
    document.getElementById('time').textContent = `${hours}:${minutes}:${seconds}`;
    
    // Format Gregorian date
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' };
    const gregorianDate = pakistanTime.toLocaleDateString('en-US', options) + ' PKT';
    document.getElementById('gregorian-date').textContent = gregorianDate;
    
    // Calculate Islamic date (approximation)
    const islamicDate = calculateIslamicDate(pakistanTime);
    document.getElementById('islamic-date').textContent = islamicDate;
    
    // Update other information
    document.getElementById('day-of-week').textContent = daysOfWeek[pakistanTime.getUTCDay()];
    
    // Calculate Ramadan information
    const ramadanInfo = calculateRamadanInfo(pakistanTime);
    document.getElementById('ramadan-info').textContent = ramadanInfo;
    
    // Update Eid dates
    document.getElementById('eid-ul-fitr').textContent = formatDate(eidUlFitr);
    document.getElementById('eid-ul-adha').textContent = formatDate(eidUlAdha);
}

function calculateIslamicDate(date) {
    // This is a simplified calculation - in a real application, 
    // you would use a proper Hijri calendar calculation library
    
    // Base date: 1 Muharram 1446 AH = July 19, 2024 (approximate)
    const baseHijri = new Date("2024-07-19");
    const baseHijriYear = 1446;
    const baseHijriMonth = 0; // Muharram
    
    const diffTime = date - baseHijri;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    // Approximate Islamic month length (29.5 days)
    const monthsSinceBase = Math.floor(diffDays / 29.5);
    const islamicMonthIndex = (baseHijriMonth + monthsSinceBase) % 12;
    const islamicDay = Math.floor(diffDays % 29.5) + 1;
    const islamicYear = baseHijriYear + Math.floor((baseHijriMonth + monthsSinceBase) / 12);
    
    document.getElementById('islamic-month').textContent = islamicMonths[islamicMonthIndex];
    
    return `${islamicDay} ${islamicMonths[islamicMonthIndex]} ${islamicYear} AH`;
}

function calculateRamadanInfo(date) {
    const today = new Date(date.getTime());
    today.setHours(0, 0, 0, 0);
    
    // Check if we're in Ramadan
    if (today >= ramadanStart && today < eidUlFitr) {
        const daysInRamadan = Math.floor((eidUlFitr - ramadanStart) / (1000 * 60 * 60 * 24));
        const daysPassed = Math.floor((today - ramadanStart) / (1000 * 60 * 60 * 24));
        const daysLeft = daysInRamadan - daysPassed;
        
        return `${daysPassed} days passed, ${daysLeft} days remaining`;
    } 
    // Check if Ramadan is upcoming
    else if (today < ramadanStart) {
        const daysUntilRamadan = Math.floor((ramadanStart - today) / (1000 * 60 * 60 * 24));
        return `Ramadan starts in ${daysUntilRamadan} days`;
    } 
    // Ramadan has passed
    else {
        const nextRamadan = new Date(ramadanStart);
        nextRamadan.setFullYear(nextRamadan.getFullYear() + 1);
        const daysUntilNextRamadan = Math.floor((nextRamadan - today) / (1000 * 60 * 60 * 24));
        return `Next Ramadan in ${daysUntilNextRamadan} days`;
    }
}

function formatDate(date) {
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
    });
}

// Birthday Check Function
function checkBirthday() {
    const birthdayInput = document.getElementById('birthday-input').value;
    const resultElement = document.getElementById('birthday-result');
    
    if (!birthdayInput) {
        resultElement.textContent = "Please select a date!";
        resultElement.style.color = "#ff6b6b";
        return;
    }
    
    const birthday = new Date(birthdayInput);
    const today = new Date();
    
    // Set both dates to start of day for accurate comparison
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const birthdayThisYear = new Date(today.getFullYear(), birthday.getMonth(), birthday.getDate());
    
    // Calculate age
    const age = today.getFullYear() - birthday.getFullYear();
    const isBirthdayToday = todayStart.getTime() === birthdayThisYear.getTime();
    
    // Calculate days until next birthday
    let nextBirthday = new Date(today.getFullYear(), birthday.getMonth(), birthday.getDate());
    if (todayStart > nextBirthday) {
        nextBirthday.setFullYear(today.getFullYear() + 1);
    }
    
    const daysUntilBirthday = Math.ceil((nextBirthday - todayStart) / (1000 * 60 * 60 * 24));
    
    // Display result
    if (isBirthdayToday) {
        resultElement.innerHTML = `🎉 <strong>Happy Birthday!</strong> 🎉<br>You are ${age} years old today!`;
        resultElement.style.color = "#4CAF50";
        
        // Add celebration effect
        createCelebration();
    } else {
        resultElement.innerHTML = `Your birthday is in <strong>${daysUntilBirthday}</strong> day${daysUntilBirthday !== 1 ? 's' : ''}<br>You will be <strong>${age + (daysUntilBirthday === 365 ? 0 : 1)}</strong> years old`;
        resultElement.style.color = "#FFC107";
    }
}

// Celebration effect for birthday
function createCelebration() {
    const colors = ['#FFC107', '#E91E63', '#4CAF50', '#2196F3', '#9C27B0'];
    const container = document.querySelector('.left-panel');
    
    for (let i = 0; i < 20; i++) {
        const confetti = document.createElement('div');
        confetti.innerHTML = '🎉';
        confetti.style.position = 'absolute';
        confetti.style.fontSize = (Math.random() * 20 + 15) + 'px';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-30px';
        confetti.style.opacity = '0.8';
        confetti.style.animation = `confettiFall ${Math.random() * 3 + 2}s linear forwards`;
        confetti.style.zIndex = '1000';
        
        // Add keyframes for confetti animation
        if (!document.getElementById('confetti-animation')) {
            const style = document.createElement('style');
            style.id = 'confetti-animation';
            style.textContent = `
                @keyframes confettiFall {
                    0% { transform: translateY(0) rotate(0deg); opacity: 0.8; }
                    100% { transform: translateY(600px) rotate(360deg); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
        
        container.appendChild(confetti);
        
        // Remove confetti after animation
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
}

// Initialize the clock
createStars();
updateClock();
setInterval(updateClock, 1000);

// Add event listener for Enter key in birthday input
document.getElementById('birthday-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        checkBirthday();
    }
});