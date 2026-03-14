import { VirtualPet } from "./VirtualPet";

const pet = new VirtualPet()

const petSprites = {
  sad: "/assets/pet/pet-sad.png",
  neutral: "/assets/pet/pet-neutral.png",
  happy: "/assets/pet/pet-happy.png"
};

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

function updatePetVisual() {
  const mood = pet.getMood();
  petImage.src = petSprites[mood];
  happinessText.textContent = pet.happiness.toString()
  console.log("inside updatePetVisual" + petSprites[mood] )
}

updatePetVisual();

setInterval(() => {
  pet.decreaseHappiness(5)
  updatePetVisual()
}, 30000)