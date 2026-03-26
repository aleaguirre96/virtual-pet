export const PetMood = {
  Sad: "sad",
  Neutral: "neutral",
  Happy: "happy",
} as const;

export const PhysicalState = {
    Awake: "awake",
    Sleeping: "sleeping"
} as const;

export const FoodType = {
    Protein: "protein",
    Carbs: "carbs",
    Vegetable: "vegetable"
} as const;

export const PetAction = {
    Idle: "idle",
    Sleeping: "sleeping",
    Eating: "eating"
}

export type PetMood = (typeof PetMood)[keyof typeof PetMood];
export type PhysicalState = (typeof PhysicalState)[keyof typeof PhysicalState];
export type FoodType = (typeof FoodType)[keyof typeof FoodType];
export type PetAction = (typeof PetAction)[keyof typeof PetAction];

type FoodEffect = {
    hunger: number,
    happiness?: number
}

const foodEffectMap: Record<FoodType, FoodEffect> = {
    protein: { hunger: 12, happiness: 10 },
    carbs: { hunger: 5, happiness: 5 },
    vegetable: { hunger: 2 }
}

export class VirtualPet {
    happiness: number = 50;
    hunger: number = 50;
    physicalState: PhysicalState = PhysicalState.Awake;
    currentAction: PetAction = PetAction.Idle;
    lastWakeUpTime: number = Date.now();
    startSleepTime: number = 0;
    sleepInterval: number = 60000; // 180000;
    minSleepTime: number = 60000;
    actionTimer: number = 0;
    eatingDuration: number = 5000;
    elapsedLogic: number = 0;
    logicInterval: number = 10000;
    selectedFood: FoodType = null as any;

    increaseHappiness(amount: number) {
        this.happiness += amount;
        if (this.happiness > 100) this.happiness = 100;
    }
    
    decreaseHappiness(amount: number) {
        this.happiness -= amount
        if (this.happiness < 0) this.happiness = 0;
    }

    increaseHunger(amount: number) {
        this.hunger += amount;
        if (this.hunger > 100) this.hunger = 100;
    }
    
    decreaseHunger(amount: number) {
        if (this.hunger > 0) { // Ignore decrease if hunger is 0
            this.hunger -= amount
            this.increaseHappiness(2) // increase the happinnes while the hunger > 0
            if (this.hunger < 0) this.hunger = 0; // if the rest is negative hunger is 0
        }
    }

    getMood(): PetMood {
        if (this.happiness < 20) {
            return PetMood.Sad
        } else if (this.happiness > 80) {
            return PetMood.Happy
        } else {
            return PetMood.Neutral
        }
    }

    getPhysicalState(): PhysicalState {
        return this.physicalState
    }

    updatePhysicalState() {
        const now = Date.now();
        if (this.physicalState === PhysicalState.Awake && now - this.lastWakeUpTime >= this.sleepInterval) {
            this.sleep()
        }
    }

    wakeUp() {
        const now = Date.now()
        if (now - this.startSleepTime >= this.minSleepTime) {
            this.physicalState = PhysicalState.Awake;
            this.lastWakeUpTime = Date.now();
        }
    }

    sleep() {
        this.physicalState = PhysicalState.Sleeping;
        this.startSleepTime = Date.now()
    }

    feed(food: FoodType) {
        if(this.currentAction !== PetAction.Idle) return; // Ignore if already eating

        this.selectedFood = food;
        this.currentAction = PetAction.Eating
        this.actionTimer = 0;
    }

    applyFoodEffect(selectedFood: FoodType) {
        const effect = foodEffectMap[selectedFood];
        this.decreaseHunger(effect.hunger);
        if(this.happiness <= 100 && effect.happiness) {
            this.increaseHappiness(effect.happiness)
        }
    }

    update(deltaTime: number) {
        if(this.currentAction === PetAction.Eating) {
            this.actionTimer += deltaTime;

            if (this.actionTimer >= this.eatingDuration) {
                if (this.currentAction === "eating" && this.selectedFood) {
                    this.applyFoodEffect(this.selectedFood);
                    this.currentAction = PetAction.Idle;
                    this.actionTimer = 0;
                    this.selectedFood = null as any;
                }
            }
            return; // Skip sleep logic while eating
        }

        this.elapsedLogic += 500;
        if (this.elapsedLogic >= this.logicInterval) {
            this.decreaseHappiness(2);
            this.increaseHunger(2);
            this.updatePhysicalState();
            this.elapsedLogic = 0;
        }

        this.updatePhysicalState();
    }
}