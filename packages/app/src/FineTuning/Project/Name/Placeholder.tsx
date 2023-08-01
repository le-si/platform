import { GlobalState } from "~/GlobalState";

export namespace Placeholder {
  export const get = () => {
    const descriptors = [
      "Zesty",
      "Extra Fluffy",
      "Large",
      "Smooth",
      "Spicy",
      "Crisp",
      "Delicate",
      "Robust",
      "Sweet",
      "Tangy",
      "Shiny",
      "Charming",
      "Mysterious",
      "Exotic",
      "Rough",
      "Gentle",
      "Brave",
      "Cunning",
      "Vivid",
      "Grand",
    ];

    const nouns = [
      "Cactus",
      "Worms",
      "Secret",
      "Robot",
      "Vortex",
      "Mango",
      "Stardust",
      "Pineapple",
      "Melon",
      "Cosmos",
      "Eagle",
      "Panda",
      "Comet",
      "Eclipse",
      "Thunder",
      "Dew",
      "Galaxy",
      "Turtle",
      "Swan",
      "Whale",
    ];

    const finishes = [
      "Blend",
      "Tomato",
      "Fluff",
      "Whisper",
      "Twist",
      "Quirk",
      "Crumble",
      "Fusion",
      "Mix",
      "Rumble",
      "Splash",
      "Pulse",
      "Dream",
      "Echo",
      "Nebula",
      "Silhouette",
      "Crunch",
      "Swirl",
      "Sparkle",
      "Dance",
    ];

    return [
      descriptors[Math.floor(Math.random() * descriptors.length)],
      nouns[Math.floor(Math.random() * nouns.length)],
      finishes[Math.floor(Math.random() * finishes.length)],
    ].join(" ");
  };

  export const reset = () => State.use.getState().reset();

  export const use = () => State.use(({ placeholder }) => placeholder);

  type State = {
    placeholder: string;
    reset: () => void;
  };

  namespace State {
    export const use = GlobalState.create<State>((set) => ({
      placeholder: get(),
      reset: () => set(() => ({ placeholder: get() })),
    }));
  }
}
