For this week's assignment, I had a bunch of really cool ideas that I really wanted to execute but I felt very overwhelmed and confused by the concept of the arduino being able to read time and in what ways we can utilize that. I first started by looking at Blinkwithoutdelay and understanding the code behind it. I also downloaded and tried to use the Ramp library which worked and I understood the basic logic behind it but I couldn’t completely understand what the values being displayed were and how it can be used with other pcomp materials (the example I tried just used arduino and a serial monitor) 
</br> 
These were the values displayed.

</br> 
What I ended up doing was using an OLED screen display and three buttons to read and update the time elapsed since the start of the program. It uses the same logic as blinkwithoutdelays with the millis function and calculating the time that has elapsed and comparing it to an interval of 1 second. But the code also stores variables for seconds, minutes and hours and increments the time based on that. 
</br> 
Since arduino does not have an internal clock with it, we decided to add 3 buttons, an hour increment button, a minute increment button and a reset button to reset everything to 00:00:00 on the OLED display. 
</br> 
I initially had some issues with the buttons and I wasn’t sure why. My circuit and it’s wiring was pretty messy (at least compared to Melika’s who I was doing the assignment with) but I also did not use resistors and I used Input Pullup in my function but that didn’t work so I ended up attaching resistors and then the buttons worked. 
