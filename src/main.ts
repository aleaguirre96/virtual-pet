import { PhysicalState, VirtualPet } from "./game/VirtualPet";

const pet = new VirtualPet()

const petSprites = {
  sad: "/assets/pet/pet-sad.png",
  neutral: "/assets/pet/pet-neutral.png",
  happy: "/assets/pet/pet-happy.png",
  sleeping: "/assets/pet/pet-sleep-01.png"
};

let sleepFrame = 0;
const sleepSprites = ["/assets/pet/pet-sleep-01.png", "/assets/pet/pet-sleep-02.png"];

const app = document.querySelector<HTMLDivElement>('#app')!

app.innerHTML = `
  <div>
    <h1>Virtual Pet</h1>
    <img id="pet" src="/assets/pet/pet-neutral.png" width="200" />
    <br />
    <button id="pet-button-increase">Play</button>
    <p>Happiness: <span id="happiness">0</span></p>
    <button id="pet-button-decrease-hunger">Feed</button>
    <p>Hunger: <span id="hunger">0</span></p>
  </div>
`

const petImage = document.querySelector<HTMLImageElement>("#pet")!;
const buttonIncreaseHappiness = document.querySelector<HTMLButtonElement>('#pet-button-increase')!
const happinessText = document.querySelector<HTMLSpanElement>('#happiness')!
const buttonDecreaseHunger = document.querySelector<HTMLButtonElement>('#pet-button-decrease-hunger')!
const hungerText = document.querySelector<HTMLSpanElement>('#hunger')!

buttonIncreaseHappiness.addEventListener("click", () => {
  pet.increaseHappiness(5)
  updatePetVisual()
})

buttonDecreaseHunger.addEventListener("click", () => {
  pet.decreaseHunger(5)
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
  hungerText.textContent = pet.hunger.toString()
  if(pet.physicalState === PhysicalState.Sleeping) {
    petImage.src =  sleepSprites[sleepFrame];
  } else {
    petImage.src = petSprites[mood];
  }
  console.log("inside updatePetVisual" + petSprites[mood] )
}


// updatePetVisual();