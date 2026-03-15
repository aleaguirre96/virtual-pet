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
    lastWakeUpTime: number = Date.now();
    startSleepTime: number = 0;
    sleepInterval: number = 60000// 180000;
    minSleepTime: number = 20000//60000; 

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
        if (this.physicalState === PhysicalState.Awake && now - this.lastWakeUpTime >= this.sleepInterval) {
            this.sleep()
        }
        console.log(now + " - " + this.lastWakeUpTime + " > " + this.sleepInterval);
        console.log("now - lastWakeUpTime = " + (now - this.lastWakeUpTime))
    }

    wakeUp() {
        console.log("inside wakeup")
        const now = Date.now()
        if (now - this.startSleepTime >= this.minSleepTime) {
            this.physicalState = PhysicalState.Awake;
            this.lastWakeUpTime = Date.now();
        }
         console.log("now - startSleepTime = " + (now - this.startSleepTime))
         console.log(now + " - " + this.startSleepTime + " >= " + this.minSleepTime);
    }

    sleep() {
        this.physicalState = PhysicalState.Sleeping;
        this.startSleepTime = Date.now()
    }
}