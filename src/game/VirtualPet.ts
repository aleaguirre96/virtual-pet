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
    fullness: number,
    happiness?: number
}

const foodEffectMap: Record<FoodType, FoodEffect> = {
    protein: { fullness: 15, happiness: 8 },
    carbs: { fullness: 10, happiness: 3 },
    vegetable: { fullness: 5 }
}

export class VirtualPet {
    happiness: number = 50;
    fullness: number = 50;
    physicalState: PhysicalState = PhysicalState.Awake;
    currentAction: PetAction = PetAction.Idle;
    lastWakeUpTime: number = Date.now();
    startSleepTime: number = 0;
    sleepInterval: number = 180000;
    minSleepTime: number = 60000;
    actionTimer: number = 0;
    eatingDuration: number = 5000;
    elapsedLogic: number = 0;
    logicInterval: number = 40000;
    selectedFood: FoodType = null as any;

    increaseHappiness(amount: number) {
        this.happiness += amount;
        if (this.happiness > 100) this.happiness = 100;
    }
    
    decreaseHappiness(amount: number) {
        this.happiness -= amount
        if (this.happiness < 0) this.happiness = 0;
    }

    decreaseFullness(amount: number) {
        this.fullness -= amount;
        if (this.fullness < 0) this.fullness = 0;
    }
    
    increaseFullness(amount: number) {
        if (this.fullness <= 100) { // Ignore increase if fullness is already at maximum
            this.fullness += amount;
            this.increaseHappiness(2); // Increase happiness when fullness increases as base effect
            if (this.fullness > 100) this.fullness = 100;
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
        if(this.currentAction === PetAction.Eating) return; // Ignore if already eating
        if(this.physicalState === PhysicalState.Sleeping) return; // Ignore if sleeping
        this.selectedFood = food;
        this.currentAction = PetAction.Eating
        this.actionTimer = 0;
    }

    applyFoodEffect(selectedFood: FoodType) {
        const effect = foodEffectMap[selectedFood];
        this.increaseFullness(effect.fullness);
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
            this.decreaseHappiness(1.5);
            this.decreaseFullness(0.5);
            this.updatePhysicalState();
            this.elapsedLogic = 0;
        }

        this.updatePhysicalState();
    }
}