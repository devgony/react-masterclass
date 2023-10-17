> # React masterclass

# 2 STYLED COMPONENTS

## 2.1 Our First Styled Component

```sh
npx create-react-app react-masterclass --use-npm
npm i styled-components
```

```js
const BoxOne = styled.div`
  background-color: teal;
  width: 100px;
  height: 100px;
`;
const Text = styled.span`
  color: white;
`;
..
<BoxOne>
    <Text>Hello</Text>
</BoxOne>
```

## 2.2 Adapting and Extending

- Adapting

```js
const Box = styled.div`
  background-color: ${(props) => props.bgColor};
  width: 100px;
  height: 100px;
`;
..
<Box bgColor="teal" />
```

- Extending

```js
const Circle = styled(Box)`
  border-radius: 50px;
`;
..
<Circle bgColor="tomato" />
```

## 2.3 'As' and Attrs

- convert styledComponent to other element by `as`

```js
const Btn = styled.button`
  color: white;
  background-color: tomato;
  border: 0;
  border-radius: 15px;
`;
..
<Btn as="a" href="/">  {/* convert from button to anchor */}
go home
/Btn>
```

- give default attributes

```js
const Input = styled.input.attrs({ required: true, minLength: 2 })`
  background-color: tomato;
`;
..
<Input />
<Input />
```

## 2.4 Animations and Pseudo Selectors

- Animations

```js
const rotationAnimation = keyframes`
  0% {
    transform:rotate(0deg);
    border-radius:0px;
  }
  50% {
    border-radius:100px;
  }
  100%{
    transform:rotate(360deg);
    border-radius:0px;
  }
`;
..
const Box = styled.div`
  animation: ${rotationAnimation} 1s linear infinite;
```

- Pseudo selectors
  - can use html tag inside of styled component to refer to specific child
  - & means myself

```js
const Box = styled.div`
  span {
    font-size: 36px;
    &:hover {
      font-size: 48px;
    }
    &:active {
      opacity: 0;
    }
  }
`;
..
<Wrapper>
  <Box>
    <span>🤩</span>
  </Box>
</Wrapper>
```

## 2.5 Pseudo Selectors part Two

- can use styled component name as selector => independant on html tag

```js
const Box = styled.div`
  ${Emoji}:hover {
    font-size: 98px;
  }
`;
..
<Box>
  <Emoji>🤩</Emoji>
</Box>
```

## 2.7 Themes

```js
// index.js
const darkTheme = {
  textColor: "whitesmoke",
  backgroundColor: "#111",
};
const lightTheme = {
  textColor: "#111",
  backgroundColor: "whitesmoke",
};

<ThemeProvider theme={darkTheme}>
  <App />
</ThemeProvider>;
```

```js
// App.js
const Title = styled.h1`
  color: ${(props) => props.theme.textColor};
`;
```

# 3 TYPESCRIPT

## 3.1 DefinitelyTyped

```sh
npm install --save typescript @types/node @types/react @types/react-dom @types/jest
mv src/App.js src/App.tsx
mv src/index.js src/index.tsx
npx tsc --init
```

```ts
// tsconfig.json
{
  "compilerOptions": {
    "target": "es5",
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": [
    "src"
  ]
}
```

```ts
// src/index.tsx
import ReactDOM from "react-dom/client";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
```

- looks like below types are included in styled-components now

```sh
npm i --save-dev @types/styled-components
```

## 3.2 Typing the Props

```ts
import styled from "styled-components";

interface CircleProps {
  bgColor: string;
}

const Container = styled.div<CircleProps>`
  width: 200px;
  height: 200px;
  background-color: ${(props) => props.bgColor};
  border-radius: 100px;
`;

function Circle({ bgColor }: CircleProps) {
  return <Container bgColor={bgColor} />;
}

export default Circle;
```

## 3.3 Optional Props

```ts
interface CircleProps {
  bgColor: string;
  borderColor?: string;
  text?: string;
}

function Circle({ bgColor, borderColor, text = "default text" }: CircleProps) {
```

## 3.4 State

```ts
const [value, setValue] = useState<string | number>("");
setValue(1);
```
