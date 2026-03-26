import { useEffect } from "react";
import { VirtualPet } from "../game/VirtualPet";

export function useGameLoop(
    pet: VirtualPet,
    onUpdate: () => void
) {
    useEffect(() => {
        const interval = setInterval(() => {
            pet.update(500);
            onUpdate()
        }, 500);

        return () => clearInterval(interval)
    }, [pet, onUpdate]);
}