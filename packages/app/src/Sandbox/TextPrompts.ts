import { Code } from "~/Sandbox/Code";

export type TextPrompts = Array<{ text: string; weight: number }>;

export namespace TextPrompts {
  export function is(unknown: unknown): unknown is TextPrompts {
    return (
      Array.isArray(unknown) &&
      unknown.length > 0 &&
      unknown.every((x) => "text" in x && "weight" in x)
    );
  }

  export function toArray(
    positivePrompt: string,
    negativePrompt: string | undefined
  ) {
    const textPrompts = [{ text: positivePrompt, weight: 1 }];

    if (negativePrompt) {
      textPrompts.push({ text: negativePrompt, weight: -1 });
    }

    return textPrompts;
  }

  export function toJSON(unknown: unknown, language: Code.Language) {
    if (!TextPrompts.is(unknown)) return "[]";

    return JSON.stringify(unknown, null, 2)
      .split("\n")
      .join(`\n${language === "python" ? "  " : "\t"}`);
  }

  export function toFormData(unknown: unknown, language: Code.Language) {
    if (!TextPrompts.is(unknown)) return [];

    if (language === "python") {
      return unknown.map(({ text, weight }, index) => {
        return `\t\t"text_prompts[${index}][text]": '${text}',\n\t\t"text_prompts[${index}][weight]": ${weight},\n`;
      });
    } else {
      return unknown.map(({ text, weight }, index) => {
        return `formData.append('text_prompts[${index}][text]', '${text}')\nformData.append('text_prompts[${index}][weight]', ${weight});\n`;
      });
    }
  }
}
