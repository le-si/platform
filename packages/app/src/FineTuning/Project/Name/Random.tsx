export namespace Random {
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
}
