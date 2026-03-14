export const PetMood = {
  Sad: "sad",
  Neutral: "neutral",
  Happy: "happy",
} as const;

export type PetMood = (typeof PetMood)[keyof typeof PetMood];

export class VirtualPet {
    happiness: number = 50;


    increaseHappiness(amount: number) {
        this.happiness += amount
    }
    
    decreaseHappiness(amount: number) {
        
        this.happiness -= amount
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
}