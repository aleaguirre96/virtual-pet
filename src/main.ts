import { VirtualPet } from "./VirtualPet";

const pet = new VirtualPet()

const app = document.querySelector<HTMLDivElement>('#app')!

app.innerHTML = `
<h1>Virtual Pet</h1>
<button id="pet">Pet</button>
<p>Happiness: <span id="happiness">0</span></p>
`

const button = document.querySelector<HTMLButtonElement>('#pet')!
const happinessText = document.querySelector<HTMLSpanElement>('#happiness')!

button.addEventListener("click", () => {
  pet.addHappiness(1)
  happinessText.textContent = pet.happiness.toString()
})