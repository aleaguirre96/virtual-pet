import { useEffect } from "react";
import { VirtualPet } from "../game/VirtualPet";

export function useGameLoop(
    pet: VirtualPet,
    onUpdate: () => void
) {
    useEffect(() => {
        let elapsedLogic = 0;
        const logicInterval = 10000;

        const interval = setInterval(() => {

            elapsedLogic += 500;
            if (elapsedLogic >= logicInterval) {
                pet.decreaseHappiness(2);
                pet.increaseHunger(2);
                pet.updatePhysicalState();
                elapsedLogic = 0;
            }
            onUpdate()

        }, 500);

        return () => clearInterval(interval)
    }, [pet, onUpdate]);
}