let dragItem = document.querySelector(".item");
let container = document.querySelector(".container");   // reference to the respective DOM elements

let active = false;
let currentX, currentY, initialX, initialY;
let xOffset = yOffset = 0;

container.addEventListener("mousedown", (event) => {        // when we click on the object
    initialX = event.clientX - xOffset;
    initialY = event.clientY - yOffset;     // calculate the initial position of the draggable object


    if (event.target === dragItem) {        // check if the element we click is the one that is draggable
        active = true;
    }
});

container.addEventListener("mousemove", (event) => {        // when we're dragging the object
    if (active) {
        event.preventDefault(); // The preventDefault() method cancels the event if it is cancelable, meaning that the default action that belongs to the event will not occur.

        currentX = event.clientX - initialX;    // calculate the current position
        currentY = event.clientY - initialY;

        xOffset = currentX;     // the offsets allow future drags to pick up from where the current position left off
        yOffset = currentY;

        dragItem.style.transform = "translate3d(" + currentX + "px, " + currentY + "px, 0)";    // set the new position for the dragged object
    }
});

container.addEventListener("mouseup", (event) => {      // when we end the drag
    initialX = currentX;
    initialY = currentY;    // set the initial position as the current position for future drags

    active = false;     // we don't drag anymore
});