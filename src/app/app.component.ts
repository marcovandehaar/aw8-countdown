import { Component, OnInit, ElementRef } from '@angular/core';
import { Fireworks, FireworksOptions } from 'fireworks-js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  countdownDate = new Date(Date.UTC(2024, 2, 1, 8, 15, 0)).getTime();
  days: number = 0;
  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;

  countDownActive = true;

  constructor(private elRef: ElementRef) { }

  ngOnInit() {
    this.startCountdown();
  }

  startCountdown() {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = this.countdownDate - now;

      this.days = Math.floor(distance / (1000 * 60 * 60 * 24));
      this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      this.seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        clearInterval(intervalId);
        this.launchFireworks();
      }
    };

    updateCountdown(); // Update once immediately to avoid initial delay
    const intervalId = setInterval(updateCountdown, 1000);
  }

  launchFireworks() {
    const fireworksOptions: FireworksOptions = {
      hue: { min: 0, max: 360 }, // Color hue range
      rocketsPoint: { min: 50, max: 100 }, // Point on the screen (percentage) where rockets spawn
      opacity: 0.5, // Opacity of each particle
      acceleration: 1.05, // Acceleration rate of fireworks
      friction: 0.95, // Friction effect on particle speed
      gravity: 1.5, // Gravity effect on particles
      particles: 150, // Number of particles per explosion
      explosion: 5, // Explosion intensity
      mouse: {
        click: true, // Allow fireworks to spawn at mouse click
        move: false, // Allow fireworks to follow the mouse
        max: 5 // Max number of fireworks initiated by mouse
      },
      boundaries: {
        x: 0,
        y: 0,
        width: window.innerWidth,
        height: window.innerHeight,
        debug: false // Set true to draw boundaries on canvas
      },
      sound: {
        enabled: false, // Enable sound effects
        files: [], // Sound files to play on explosion
        volume: { min: 1, max: 100 } // Volume range
      },
      delay: { min: 15, max: 30 }, // Delay between each fireworks launch
      brightness: { min: 50, max: 80 }, // Brightness range
      decay: { min: 0.015, max: 0.03 }, // Decay rate of particles
      flickering: 20, // Percentage of particles that will flicker
      intensity: 10, // Number of rockets launched when fireworks start
      traceLength: 5, // Length of the rocket's trail
      traceSpeed: 2, // Speed of the rocket before explosion
      lineWidth: {
        explosion: { min: 1, max: 3 }, // Line width of explosion particles
        trace: { min: 1, max: 5 } // Line width of the rocket's trail
      },
      lineStyle: 'round', // Style of the line ('round' or 'square')
      autoresize: true, // Automatically resize the fireworks container
    };

    this.countDownActive = false;

    const container = this.elRef.nativeElement.querySelector('.fireworks-container');
    const fireworks = new Fireworks(container, fireworksOptions);
    fireworks.start();

  }
}
