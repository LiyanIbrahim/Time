#include <Wire.h>
#include <Adafruit_SSD1306.h>
#include <Adafruit_GFX.h>

const int SCREEN_WIDTH = 128; // OLED display width, in pixels
const int SCREEN_HEIGHT = 64; // OLED display height, in pixels

// initialize the display:
Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, -1);

// Time variables
unsigned long previousMillis = 0;
const long interval = 1000;  // 1 second
int seconds = 0;
int minutes = 0;
int hours = 0;

// Button pins
const int buttonHour = 2;
const int buttonMinute = 3;
const int buttonReset = 4;

// Button states
int lastHourButtonState = HIGH;
int lastMinuteButtonState = HIGH;
int lastResetButtonState = HIGH;

// Potentiometer pin
const int potPin = A0;

void setup() {
  // Initialize serial and display
  Serial.begin(9600);
  if (!display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) {
    Serial.println("Display setup failed");
    while (true);
  }
  Serial.println("Display is good to go");

  // Set up buttons as inputs with pull-up resistors
  pinMode(buttonHour, INPUT_PULLUP);
  pinMode(buttonMinute, INPUT_PULLUP);
  pinMode(buttonReset, INPUT_PULLUP);

  // Set initial contrast based on potentiometer
  setContrast();
  displayTime();
}

void loop() {
  unsigned long currentMillis = millis();

  // Time update every second
  if (currentMillis - previousMillis >= interval) {
    previousMillis = currentMillis;

    seconds++;
    if (seconds >= 60) {
      seconds = 0;
      minutes++;
    }
    if (minutes >= 60) {
      minutes = 0;
      hours++;
    }
    if (hours >= 24) {
      hours = 0;
    }

    displayTime();
  }

  // Check for contrast adjustment
  setContrast();

  // Handle button presses
  handleButtons();
}

void displayTime() {
  // Clear the display
  display.clearDisplay();

  // Set the text size and color
  display.setTextSize(2);
  display.setTextColor(SSD1306_WHITE);

  // Display time in HH:MM:SS format
  display.setCursor(0, 0);
  if (hours < 10) display.print("0");
  display.print(hours);
  display.print(":");
  if (minutes < 10) display.print("0");
  display.print(minutes);
  display.print(":");
  if (seconds < 10) display.print("0");
  display.print(seconds);

  // Push everything to the screen
  display.display();
}

void setContrast() {
  // Read the value from the potentiometer
  int potValue = analogRead(potPin);
  // Map the pot value to the contrast range (0-255)
  int contrastValue = map(potValue, 0, 1023, 0, 255);
  // Set the contrast
  display.ssd1306_command(SSD1306_SETCONTRAST); // Send the command for contrast
  display.ssd1306_command(contrastValue); // Send the mapped contrast value
}

void handleButtons() {
  // Hour button press
  int hourButtonState = digitalRead(buttonHour);
  if (hourButtonState == LOW && lastHourButtonState == HIGH) {
    hours++;
    if (hours >= 24) {
      hours = 0;
    }
    displayTime();
  }
  lastHourButtonState = hourButtonState;

  // Minute button press
  int minuteButtonState = digitalRead(buttonMinute);
  if (minuteButtonState == LOW && lastMinuteButtonState == HIGH) {
    minutes++;
    if (minutes >= 60) {
      minutes = 0;
    }
    displayTime();
  }
  lastMinuteButtonState = minuteButtonState;

  // Reset button press
  int resetButtonState = digitalRead(buttonReset);
  if (resetButtonState == LOW && lastResetButtonState == HIGH) {
    hours = 0;
    minutes = 0;
    seconds = 0;
    displayTime();
  }
  lastResetButtonState = resetButtonState;
}
