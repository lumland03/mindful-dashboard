import gsap from "https://esm.sh/gsap";

const button = document.querySelector('button');
const slot = document.querySelector('.slot-1');
const slotTwo = document.querySelector('.slot-2');
const slotThree = document.querySelector('.slot-3');

button.addEventListener('click', function() {
  // 1. Disable the button immediately so they can't click again yet
  button.disabled = true;

  let gamble = Math.ceil(Math.random() * 7);
  let gambleTwo = Math.ceil(Math.random() * 7);
  let gambleThree = Math.ceil(Math.random() * 7);

  slot.textContent = gamble;
  slotTwo.textContent = gambleTwo;
  slotThree.textContent = gambleThree;

  if (gamble === gambleTwo && gamble === gambleThree) {
    console.log("AWW YEAH");
    triggerConfetti(); // Boom! 🎊
    
    // 2. Wait 2 seconds (2000ms) before letting them play again
    setTimeout(() => {
      button.disabled = false;
      console.log("Ready to spin again!");
    }, 2000);
  } else {
    console.log("aww dang it");
    // Re-enable immediately if they lose, or add a shorter delay here
    button.disabled = false;
  }
});

function triggerConfetti() {
  const count = 80; // Number of confetti pieces
  const container = document.body;

  for (let i = 0; i < count; i++) {
    // 1. Create the element
    const confetti = document.createElement('div');
    confetti.style.position = 'fixed';
    confetti.style.width = '10px';
    confetti.style.height = '10px';
    confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 50%)`;
    confetti.style.left = '50%'; // Start from the center/button area
    confetti.style.top = '50%';
    confetti.style.zIndex = '100';
    container.appendChild(confetti);

    // 2. Animate with GSAP
    gsap.to(confetti, {
      x: (Math.random() - 0.5) * 600, // Scatter left and right
      y: (Math.random() - 0.5) * -400 - 100, // Explode upwards
      rotation: Math.random() * 720,
      duration: 0.5,
      ease: "power2.out",
      onComplete: () => {
        // 3. Fall down after the explosion
        gsap.to(confetti, {
          y: window.innerHeight,
          x: `+=${(Math.random() - 0.5) * 200}`, // Drift sideways as they fall
          rotation: Math.random() * 360,
          duration: 2 + Math.random() * 2,
          ease: "none",
          onComplete: () => confetti.remove() // Clean up DOM
        });
      }
    });
  }
}
