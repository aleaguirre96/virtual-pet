import { useState, useEffect, useCallback } from 'react'
import { PhysicalState, FoodType, VirtualPet, PetAction } from './game/VirtualPet'
import './App.css'
import { useGameLoop } from './hooks/useGameLoop'
import { StatBar } from './components/StatBar'
import { getFullnessColor, getMoodColor } from './utils/colors'

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

const feedSprites = [
  "/assets/pet/pet-feed-01.png",
  "/assets/pet/pet-feed-02.png"
]

function App() {
  const [, forceRender] = useState({});
  const [sleepFrame, setSleepFrame] = useState(0);
  const [selectedFood, setSelectedFood] = useState("protein");
  const [feedFrame, setFeedFrame] = useState(0);

  const forceUpdate = useCallback(() => {
    forceRender({});
  }, []);

  useGameLoop(pet, forceUpdate)

  function getPetImage() {
    const mood = pet.getMood()
    if (pet.getPhysicalState() === PhysicalState.Sleeping) {
      return sleepSprites[sleepFrame]
    } else if (pet.currentAction === PetAction.Eating) {
      return feedSprites[feedFrame]
    }

    return petSprites[mood]
  }

  // Loop animation
  useEffect(() => {
    const animation = setInterval(() => {
      // Sleeping animation
      if (pet.getPhysicalState() === PhysicalState.Sleeping) {
        setSleepFrame(prev => (prev + 1) % sleepSprites.length)
      }
      // Feeding animation
      if (pet.currentAction === PetAction.Eating) {
        setFeedFrame(prev => (prev + 1) % feedSprites.length)
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
  /*const handleDecreaseHunger = () => {
    pet.decreaseHunger(5);
    forceUpdate();
  }*/

  // Feed Pet
  const handleFeed = () => {
    pet.feed(selectedFood as FoodType)
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
      <section>
        <div>
          <h1>Virtual Pet</h1>
          <img
          src={getPetImage()}
          alt="Pet"
          width={200}
          onClick={handleWakeUp}
          style={{ cursor: "pointer" }}
          />

          <div className="card">
            <h2>Controls</h2>
            <div className="controls">
              <button onClick={handleIncreaseHappiness}>Play</button>
              <div className="feed-setion">
                <select onChange={(e) => setSelectedFood(e.target.value as FoodType)}>
                  <option value="protein">Protein</option>
                  <option value="carbs">Carbs</option>
                  <option value="vegetable">Vegetable</option>
                </select>
                <button onClick={handleFeed}>Feed Pet</button>
              </div>
            </div>

            <h2>Stats</h2>
            <div className="stats">
              <div className="stat">
                <p>Happiness: {pet.happiness}</p>
                <StatBar
                  value={pet.happiness}
                  color={getMoodColor(pet.getMood())}
                />
              </div>
              <div className="stat">
                <p>Fullness: {pet.fullness}</p>
                <StatBar
                  value={pet.fullness}
                  color={getFullnessColor(pet.fullness)}
                />
              </div>
            </div>
          </div>

       
        </div>
      </section>
    </>
  )
}

export default App
