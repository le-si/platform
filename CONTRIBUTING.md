<div align="center">

# 🧑‍💻 Contributing

**🗺 Contents – [🤝 Conventions](#conventions) · [🦾 Technology](#technology) · [🏗 Structure](#structure)**

**[⬆️ Top-Level README](./README.md)**

![RobotsHoldingHands](./misc/docs/RobotsHoldingHands.png)

</div>

# <a id="conventions" href="#conventions">🤝 Conventions</a>

## 🔀 Git

### 📑 Commits

We're trying out [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) for this project.

Sometimes it's hard to categorize a commit using their pre-defined buckets, in those instances we've been using `chore:` as a catch-all.

### 🌱 Branches

When there is a GitHub issue associated with your change, use this template...

```
<type>/<github-issue-key>-branch-name
```

Otherwise, you can can omit the `<github-issue-key>-` portion...

```
<type>/branch-name
```

`<type>` should be one of the following...

- `feature/` For new features or enhancements
- `fix/` For bug fixes
- `docs/` For documentation changes
- `refactor/` For refactoring code
- `test/` For adding or updating tests
- `experiment/` For experimental changes
- `chore/` For miscellaneous changes

### 🚀 Pull Requests

You'll need to follow [this template](./.github/PULL_REQUEST_TEMPLATE/pull_request_template.md) for pull requests.

# <a id="technology" href="#technology">🦾 Technology</a>

![SorcererWithReact](./misc/docs/SorcererWithReact.png)

- **[TypeScript](https://www.typescriptlang.org/)** – Type safety ftw!

- **[Vite](https://vitejs.dev/)** – Bundler and live-development tool. You can see the full config in [`vite.config.ts`](./packages/app/vite.config.ts)

- **[React](https://reactjs.org/)** – We're using React with modern hooks and functional components

- **[Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction)** – Extremely fast and easy-to-use state management, it's powerful and tiny!

- **[Tailwind](https://tailwindcss.com/)** – Our preferred method of styling components, the config is at [`tailwind.config.js`](./packages/app/tailwind.config.cjs)

- **[Emotion](https://emotion.sh/docs/introduction)** – For when we need to break free of Tailwind and write "native CSS"

# <a id="structure" href="#structure">🏗 Structure</a>

![CyberPyramid](./misc/docs/CyberPyramid.png)

## 🧱 Domain-Driven Design

**The most important aspect of this codebase's structure is adherence to domain-driven design.**

This means we organize code around the _concepts_ rather than technical implementation details.

For example, if we identify a _concept_, let's say `User`, we would create a `User` "domain."

The `User` domain would _own_ all user-related code, including visual representation, state, hooks, etc.

Most domains are _composed_ of smaller domains; a hypothetical `User` domain might be composed of `User.State`, `User.Avatar`, `User.Preferences`, `User.Details`, etc.

_This structure is fractal in nature,_ meaning `User.Details` might itself be composed of `User.Details.SocialMedia`, `User.Details.ContactInformation`, `User.Details.UpdateRequest`, etc.

### \*️⃣ Domain Syntax

Here's an example of how we might represent a `User` domain in code...

```tsx
import { Avatar } from "./Avatar";
import { Preferences } from "./Preferences";
import { Details } from "./Details";

export type User = {
  id: ID;
  avatar?: User.Avatar;
  preferences?: User.Preferences;
  details?: User.Details;
};

export function User({ id }: User.Props) {
  const user = User.use(id);
  return (
    <>
      <User.Avatar avatar={avatar} />
      <User.Preferences preferences={preferences} />
      <User.Details details={details} />
    </>
  );
}

export declare namespace User {
  export { Avatar, Preferences, Details };
}

export namespace User {
  User.Avatar = Avatar;
  User.Preferences = Preferences;
  User.Details = Details;

  export type Props = {
    id?: ID;
  };

  export const use = (id: ID) => {
    // Make an API call for the user or something
  };
}
```

This syntax takes advantage of TypeScript's declaration merging feature to enable nice fluent-style APIs for domains...

```tsx
import { User } from "./User";

// You can use `User` as a type

const bob: User = { id: "bob" };

function App(id: ID) {
  // You can use `User` as a namespace

  const user = User.use(id);
  const userPreferences = User.Preferences.use(id);

  // You can use `User` as a component

  return (
    <>
      <User id={user.id} />
      <User.Preferences id={user.id} />
    </>
  );
}
```

Quick note about the `export declare namespace User` syntax from the first example...

This is needed when a namespace exports a type.

It's an unfortunate bit of syntax which might [not be needed](https://github.com/microsoft/TypeScript/issues/39865) in the future.

### 📁 Directories and Files

_Domains are usually correlated one-to-one with file/folder structure._

For example, the `User` domain mentioned above would be composed of the following files...

```
./src/User
├── Avatar.tsx
├── Preferences.tsx
└── Details.tsx
```

This means if you see a domain like [`FineTuning.Mode.Duration`](./packages/app/src/FineTuning/Mode/Duration/index.tsx), you can expect to find it at `./src/FineTuning/Mode/Duration`.

All root-level domains located at the top-level of the [`./src`](./packages/app/src/) folder should be imported using the shorthand syntax...

```ts
import { ExampleDomain } from "~/ExampleDomain";

import { ExampleDomain } from "../../../../../ExampleDomain";
// ^ If you were deep in the folder tree, it would look like this without the `~` alias
```

### 📋 Structuring Tips

- **Look for repeated references to a word or concept**

  For example, if you're working in a `User` domain and find yourself using the word "avatar" a lot, you might want to create a `User.Avatar` domain

- **Compound words are structuring hints**

  Domains like `DeviceInformation` might be better represented as `Device.Information`.

- **Plural domains are very important**

  The singular [`FineTuning.Model`](./packages/app/src/FineTuning/Model/index.tsx) domain owns everything related to the concept of an individual fine-tuned model while [`FineTuning.Models`](./packages/app/src/FineTuning/Models.tsx) owns all things related to a collection of fine-tuned models.

  Plural domains are usually exported at the same level as their singular counterparts, such as [`User.APIKey`](./packages/app/src/User/APIKey/index.tsx) and [`User.APIKeys`](./packages/app/src/User/APIKey/APIKeys.tsx).

## 💅 Styles and CSS

Most styling is implemented with [Tailwind CSS](https://tailwindcss.com/).

The [`Theme`](./packages/app/src/Theme/index.ts) domain contains a bunch of useful pre-made components, make sure to check there first if you need something "off-the-shelf."

You can use the [`classes`](#global-variables) function anywhere without imports if you need conditional styling or to break apart class names...

```tsx
function Example({
  isEmphasized,
  isDisabled,
  children,
}: PropsWithChildren<{
  isEmphasized?: boolean;
  isDisabled: boolean;
}>) {
  return (
    <div
      className={classes(
        "bg-gray-100",
        isEmphasized && "bg-red-500 text-4xl font-bold",
        isDisabled && "text-xs opacity-50"
      )}
    >
      {children}
    </div>
  );
}
```

You can always "break glass" and use raw CSS via the globally-available `css` function if you need to, but please try to avoid it...

```tsx
function Example() {
  return (
    <div
      css={css`
        ::-webkit-scrollbar {
          display: none;
        }
      `}
    >
      Hello, World!
    </div>
  );
}
```

## 🏛 State Management via [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction)

This project uses [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction) for state management, which is honestly super cool.

It's fast and small, you can read through the whole codebase in a few minutes.

We originally used [Recoil](https://recoiljs.org/) it couldn't handle "hot" paths nearly as well.

Whenever you need globally-available state, you can use the [`GlobalState`](./packages/app/src/GlobalState/index.ts) domain, which wraps Zustand...

```tsx
import { GlobalState } from "~/GlobalState";

function Count() {
  const count = Count.use();
  const setCount = Count.useSet();
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <span>{count}</span>
    </div>
  );
}

export namespace Count {
  export const use = State.use(({ count }) => count);
  export const useSet = () =>
    State.use(({ setCount }) => setCount, GlobalState.shallow);
}

type State = {
  count: number;
  setCount: (count: number) => void;
};

namespace State {
  export const use = GlobalState.create<State>((set) => ({
    count: 0,
    setCount: (count) => set({ count }),
  }));
}
```

Notice how the `Count` domain exports `Count.use` and `Count.useSet` instead of exporting its state directly.

This allows us to change the state implementation without breaking any code that uses it.

Finally, you can see `GlobalState.shallow` used to [limit rerenders](https://github.com/pmndrs/zustand#selecting-multiple-state-slices).
