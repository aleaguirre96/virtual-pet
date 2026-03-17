import { useState, useEffect, useCallback } from 'react'
import { PhysicalState, VirtualPet } from './game/VirtualPet'
import './App.css'
import { useGameLoop } from './hooks/useGameLoop'

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

function App() {
  const [, forceRender] = useState({})
  const [sleepFrame, setSleepFrame] = useState(0);

  const forceUpdate = useCallback(() => {
    forceRender({});
  }, []);

  useGameLoop(pet, forceUpdate)

  function getPetImage() {
    const mood = pet.getMood()
    if (pet.getPhysicalState() === PhysicalState.Sleeping) {
      return sleepSprites[sleepFrame]
    }
    return petSprites[mood]
  }

  // Loop de decreaseHappiness 
  useEffect(() => {
    const animation = setInterval(() => {
      // Sleeping animation
      if (pet.getPhysicalState() === PhysicalState.Sleeping) {
        setSleepFrame(prev => (prev + 1) % sleepSprites.length)
      }
    }, 500);
    return () => clearInterval(animation);
  }, []);

  // Increase Happiness
  const handleIncreaseHappiness = () => {
    pet.increaseHappiness(5);
    forceUpdate();
  }
  
  // Decrease Hunger
  const handleDecreaseHunger = () => {
    pet.decreaseHunger(5);
    forceUpdate();
  }

  // Wakeup pet
  const handleWakeUp = () => {
    if(pet.getPhysicalState() === PhysicalState.Sleeping) {
      pet.wakeUp();
      forceUpdate();
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
