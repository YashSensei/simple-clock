# Analog Clock

A beautiful analog clock web application with stopwatch, timer, and alarm functionality.


## Features

### Clock
- Analog clock with smooth hand movements
- Digital time display below the clock
- Real-time updates every second
- Neomorphic interface design

### Stopwatch
- Start, Stop, and Reset functionality
- Lap recording with timestamps
- Millisecond precision display (HH:MM:SS.mmm)
- Scrollable lap history list
- Fixed-width monospace display (no layout shifting)

### Timer
- Custom time input (hours, minutes, seconds)
- Quick preset buttons (1 min, 5 min, 10 min, 30 min)
- Pause and Resume functionality
- Audio alert when timer completes
- Visual flashing effect on completion
- Cancel option to stop timer early

### Alarm
- Set alarms for any time (24-hour input, 12-hour AM/PM display)
- Support for multiple active alarms
- Delete individual alarms
- Audio alert when alarm triggers
- Looping sound with "Stop Sound" button
- Automatic removal after alarm rings

### User Interface
- Tab-based navigation (Clock, Stopwatch, Timer, Alarm)
- Smooth fade-in animations when switching tabs
- Dark Mode and Light Mode themes
- Responsive design for mobile devices
- Neomorphic design with subtle 3D shadows
- Custom alarm sound support


## Technologies Used

- HTML5
- CSS3 (Flexbox, Animations, Neomorphism)
- Vanilla JavaScript


## How to Use

1. **Clock**: View the current time in analog and digital format
2. **Stopwatch**: Click Start to begin, Lap to record times, Stop to pause, Reset to clear
3. **Timer**: Set hours/minutes/seconds or use presets, then Start. Use Pause/Resume as needed
4. **Alarm**: Enter hour (0-23) and minute (0-59), click Set Alarm. Click Delete to remove


## Customization

### Custom Alarm Sound
Replace `CSS/little_krishna.mp3` with your own audio file and update the path in `index.html`:
```html
<audio id="alarm-sound" preload="auto" loop>
    <source src="your-sound-file.mp3" type="audio/mpeg">
</audio>
```


## File Structure

```
AnalogClock/
├── index.html          # Main HTML file
├── CSS/
│   ├── main.css        # All styles
│   └── little_krishna.mp3  # Alarm sound
├── JS/
│   └── main.js         # All JavaScript logic
├── clock.png           # Clock face image
├── favicon.png         # Browser icon
└── README.md           # This file
```


## References

- [Google Fonts](https://fonts.googleapis.com/css2?family=Work+Sans:wght@300&display=swap)
- [Neomorphism Generator](https://neumorphism.io/)
- [CSS-tricks Neomorphism Guide](https://css-tricks.com/neumorphism-and-css/)
