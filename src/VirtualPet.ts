export const PetMood = {
  Sad: "sad",
  Neutral: "neutral",
  Happy: "happy",
} as const;

export const PhysicalState = {
    Awake: "awake",
    Sleeping: "sleeping"
} as const;

export type PetMood = (typeof PetMood)[keyof typeof PetMood];
export type PhysicalState = (typeof PhysicalState)[keyof typeof PhysicalState];

export class VirtualPet {
    happiness: number = 50;
    physicalState: PhysicalState = PhysicalState.Awake;
    lastSleepTime: number = Date.now();
    sleepInterval: number = 20000;

    increaseHappiness(amount: number) {
        this.happiness += amount;
        if (this.happiness > 100) this.happiness = 100;
    }
    
    decreaseHappiness(amount: number) {
        this.happiness -= amount
        if (this.happiness < 0) this.happiness = 0;
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
        console.log("inside updatePhysical State")
        const now = Date.now();
        if (now - this.lastSleepTime > this.sleepInterval) {
            this.sleep()
        }
        console.log(now + " - " + this.lastSleepTime + " > " + this.sleepInterval);
        console.log("now - lastSleepTime = " + (now - this.lastSleepTime))
    }

    wakeUp() {
        this.physicalState = PhysicalState.Awake;
        this.lastSleepTime = Date.now();
    }

    sleep() {
        this.physicalState = PhysicalState.Sleeping;
    }
}