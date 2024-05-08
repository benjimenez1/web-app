// Make the DIV element draggable:
dragElement(document.getElementById("eight-ball"));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
document.addEventListener('DOMContentLoaded', () => {
    const element = document.getElementById('eight-ball');
    const messageElement = document.getElementById('message');
    let prevPosition = 0;
    let prevTime = performance.now();
    
    setInterval(() => {
      const currentPosition = parseFloat(getComputedStyle(element).left);
      const currentTime = performance.now();
      const distance = Math.abs(currentPosition - prevPosition);
      const timeDiff = (currentTime - prevTime) / 1000; // convert to seconds
      const speed = distance / timeDiff;
      console.log(`Speed: ${speed.toFixed(2)} px/s`);
      if (speed >= 80) {
        const messages = [
          "Ask Again Later",
          "It is certain",
          "Reply hazy try again",
          "Yes",
          "Concentrate and Ask Again",
          "Better not tell you now",
          "Most likely",
          "Very doubtful",
          "You may rely on it",
          "It is decidedly so",
          "Signs point to Yes",
          "Definitely",
          "My sources say no",
          "Without a doubt",
          "Cannot predict now",
          "My reply is no",
          "Maybe"
        ];
        
        const randomIndex = Math.floor(Math.random() * messages.length);
        messageElement.textContent = messages[randomIndex];
      }
      prevPosition = currentPosition;
      prevTime = currentTime;
    }, 1000);
  });
  