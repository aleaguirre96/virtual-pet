import { PhysicalState, VirtualPet } from "./VirtualPet";

const pet = new VirtualPet()

const petSprites = {
  sad: "/assets/pet/pet-sad.png",
  neutral: "/assets/pet/pet-neutral.png",
  happy: "/assets/pet/pet-happy.png",
  sleeping: "/assets/pet/pet-sleep-01.png"
};

let sleepFrame = 0;
let elapsedLogic = 0;
const logicInterval = 10000;
const sleepSprites = ["/assets/pet/pet-sleep-01.png", "/assets/pet/pet-sleep-02.png"];

const app = document.querySelector<HTMLDivElement>('#app')!

app.innerHTML = `
  <div>
    <h1>Virtual Pet</h1>
    <img id="pet" src="/assets/pet/pet-neutral.png" width="200" />
    <br />
    <button id="pet-button-increase">Increase</button>
    <p>Happiness: <span id="happiness">0</span></p>
  </div>
`

const petImage = document.querySelector<HTMLImageElement>("#pet")!;
const buttonIncrease = document.querySelector<HTMLButtonElement>('#pet-button-increase')!
const happinessText = document.querySelector<HTMLSpanElement>('#happiness')!

buttonIncrease.addEventListener("click", () => {
  pet.increaseHappiness(5)
  updatePetVisual()
})

petImage.addEventListener("click", () => {
  if(pet.physicalState === PhysicalState.Sleeping) {
    pet.wakeUp()
    updatePetVisual()
  }
})

function updatePetVisual() {
  // pet.updatePhysicalState();
  const mood = pet.getMood();
  happinessText.textContent = pet.happiness.toString()

  if(pet.physicalState === PhysicalState.Sleeping) {
    petImage.src =  sleepSprites[sleepFrame];
  } else {
    petImage.src = petSprites[mood];
  }
  console.log("inside updatePetVisual" + petSprites[mood] )
}

// Game loop
setInterval(() => {
  // Sleeping animation
  if (pet.physicalState === PhysicalState.Sleeping) {
    sleepFrame = (sleepFrame + 1) % sleepSprites.length;
    petImage.src = sleepSprites[sleepFrame];
  }

  // Logic
  elapsedLogic += 500;
  if (elapsedLogic >= logicInterval) {
    pet.decreaseHappiness(2);
    pet.updatePhysicalState();
    elapsedLogic = 0;
  }
  
  // Update UI
  updatePetVisual()
}, 500);


updatePetVisual();