import { useState, useEffect } from 'react'
import { PhysicalState, VirtualPet } from './VirtualPet'
import './App.css'

const pet = new VirtualPet()

const petSprites = {
  sad: "/assets/pet/pet-sad.png",
  neutral: "/assets/pet/pet-neutral.png",
  happy: "/assets/pet/pet-happy.png"
}

const sleepSprites = [
  "/assets/pet/pet-sleep-01.png",
  "/assets/pet/pet-sleep-02.png"
]

let elapsedLogic = 0
const logicInterval =  10000

function App() {
  const [, forceRender] = useState({})
  const [sleepFrame, setSleepFrame] = useState(0);


  function updatePetVisual() {
    forceRender({})
  }

  function getPetImage() {
    const mood = pet.getMood()
    if (pet.getPhysicalState() === PhysicalState.Sleeping) {
      return sleepSprites[sleepFrame]
    }
    return petSprites[mood]
  }

  // Loop de decreaseHappiness 
  useEffect(() => {
    const loop = setInterval(() => {
      
      // Sleeping animation
      if (pet.getPhysicalState() === PhysicalState.Sleeping) {
        setSleepFrame(prev => (prev + 1) % sleepSprites.length)
      }

      // Logic
      elapsedLogic += 500
      if (elapsedLogic >= logicInterval) {
        pet.decreaseHappiness(2)
        pet.increaseHunger(2)
        pet.updatePhysicalState()
        elapsedLogic = 0
      }
      
      updatePetVisual();
    }, 500);

    return () => clearInterval(loop);
  }, []);

  // Increase Happiness
  const handleIncreaseHappiness = () => {
    pet.increaseHappiness(5);
    updatePetVisual();
  }
  
  // Decrease Hunger
  const handleDecreaseHunger = () => {
    pet.decreaseHunger(5)
    updatePetVisual();
  }

  // Wakeup pet
  const handleWakeUp = () => {
    if(pet.getPhysicalState() === PhysicalState.Sleeping) {
      pet.wakeUp()
      updatePetVisual();
    }
  }

  return (
    <>
      <section id="center">
        <div>
          <h1>Virtual Pet</h1>
          <img
          src={getPetImage()}
          alt="Pet"
          width={200}
          onClick={handleWakeUp}
          style={{ cursor: "pointer" }}
          />
          <br />
          <button onClick={handleIncreaseHappiness}>Increase Happines</button>
          <p>Happiness: {pet.happiness}</p>
          <br />
          <button onClick={handleDecreaseHunger}>Decrease Hunger</button>
          <p>Hunger: {pet.hunger}</p>
        </div>
      </section>
    </>
  )
}

export default App
