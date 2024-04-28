// script.js
document.getElementById('disease-tab').addEventListener('mouseover', function() {
    document.getElementById('disease-info').style.color = '#f60'; // Change text color on hover
});

document.getElementById('disease-tab').addEventListener('mouseout', function() {
    document.getElementById('disease-info').style.color = '#333'; // Reset text color on mouseout
});
// script.js
// script.js
document.addEventListener("DOMContentLoaded", function () {
    const numberOfBubbles = 20;
    const bubbleContainer = document.createElement("div");
    bubbleContainer.className = "bubble-container";

    for (let i = 0; i < numberOfBubbles; i++) {
        createBubble();
    }

    function createBubble() {
        const bubble = document.createElement("div");
        bubble.className = "bubble";

        const randomSize = Math.floor(Math.random() * 30) + 10;
        bubble.style.width = randomSize + "px";
        bubble.style.height = randomSize + "px";

        const randomPositionX = Math.random() * window.innerWidth;
        const randomSpeed = Math.random() * 2 + 1; // Random speed between 1 and 3
        const randomDelay = Math.random() * 5; // Random delay between 0 and 5 seconds

        bubble.style.left = randomPositionX + "px";
        bubble.style.animation = `bubbleAnimation ${randomSpeed}s ${randomDelay}s infinite linear`;

        bubbleContainer.appendChild(bubble);
    }

    document.body.appendChild(bubbleContainer);
});
