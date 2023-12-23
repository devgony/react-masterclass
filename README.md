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

## 3.5 Forms

```ts
const [value, setValue] = useState("");
const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const {
    currentTarget: { value },
  } = event;
  setValue(value);
};
const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  console.log("value:", value);
};
    ..
    <form onSubmit={onSubmit}>
      <input
        value={value}
        onChange={onChange}
        type="text"
        placeholder="username"
      />
      <button>Log in</button>
    </form>
    ..
```

## 3.6 Themes

- extend module

```ts
// touch src/styled.d.ts
import "styled-components";
declare module "styled-components" {
  export interface DefaultTheme {
    textColor: string;
    bgColor: string;
    btnColor: string;
  }
}
```

- configure theme

```ts
// touch src/theme.ts
import { DefaultTheme } from "styled-components";
export const lightTheme: DefaultTheme = {
  bgColor: "white",
  textColor: "black",
  btnColor: "tomato",
};
export const darkTheme: DefaultTheme = {
  bgColor: "black",
  textColor: "white",
  btnColor: "teal",
};
```

- provide theme

```ts
// src/index.tsx
<ThemeProvider theme={darkTheme}>
  <App />
</ThemeProvider>
```

- use theme

```ts
const Container = styled.div`
  background-color: ${(props) => props.theme.bgColor};
`;
const H1 = styled.h1`
  color: ${(props) => props.theme.textColor};
`;
    ..
    <Container>
      <H1>protected</H1>
    </Container>
    ..
```

# 5 CRYPTO TRACKER

## 5.0 Setup

```
npm i react-router-dom@5.3.4
npm i --save-dev @types/react-router
npm i --save-dev @types/react-router-dom

mkdir -p src/routes
touch src/routes/Coin.tsx
touch src/routes/Coins.tsx
touch src/Router.tsx
```

```ts
function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/:coinId">
          <Coin />
        </Route>
        <Route path="/">
          <Coins />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
```

## 5.1 Styles

- reset style with pasting [this](https://github.com/zacanger/styled-reset/blob/master/src/index.ts) to createGlobalStyle

  - or use package: [styled-reset](https://www.npmjs.com/package/styled-reset)

```ts
// src/App.tsx
const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
body {
  line-height: 1;
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
* {
  box-sizing: border-box;
}
body {
  font-family: 'Source Sans Pro', sans-serif;
  background-color:${(props) => props.theme.bgColor};
  color:${(props) => props.theme.textColor}
}
a {
  text-decoration:none;
}
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <Router />
    </>
  );
}
```

- font setup

```css
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');
..
body {
  font-family: 'Source Sans Pro', sans-serif;
```

- color palette: https://flatuicolors.com/palette/gb

## 5.2 Home part One

- Link to

```ts
<Link to={`/${coin.id}`}>{coin.name} &rarr;</Link>
```

## 5.3 Home part Two

- fetch API

```ts
useEffect(() => {
  (async () => {
    const response = await fetch("https://api.coinpaprika.com/v1/coins");
    const json = await response.json();
    setCoins(json.slice(0, 100));
    setLoading(false);
  })();
}, []);
```

## 5.4 Route States

- send state by Link
  - if access directly without send state => Loading

```ts
// Coins.tsx
<Link
  to={{
    pathname: `/${coin.id}`,
    state: { name: coin.name },
  }}
>
```

```ts
// Coin.tsx
interface RouteParams {
  coinId: string;
}
interface RouteState {
  name: string;
}
..
  const { coinId } = useParams<RouteParams>();
  const { state } = useLocation<RouteState>();
```

## 5.5 Coin Data

```ts
useEffect(() => {
  (async () => {
    const infoData = await (
      await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
    ).json();
    const priceData = await (
      await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
    ).json();
    setInfo(infoData);
    setPriceInfo(priceData);
  })();
}, []);
```

## 5.6 Data Types

- type inference workaround: dev console => Store object as global variable

```js
console.log(
  Object.entries(temp1)
    .map((a) => `${a[0]}: ${typeof a[1]};`)
    .join("\r\n")
);
```

## 5.7 Nested Routes part One

```
touch src/routes/Price.tsx
touch src/routes/Chart.tsx
```

- nested routes render components which fit with route

```ts
// Coin.tsx
<Switch>
  <Route path={`/${coinId}/price`}>
    <Price />
  </Route>
  <Route path={`/${coinId}/chart`}>
    <Chart />
  </Route>
</Switch>
```

## 5.8 Nested Routes part Two

- check if it's that route with useRouteMatch

```ts
const priceMatch = useRouteMatch("/:coinId/price");
const chartMatch = useRouteMatch("/:coinId/chart");
..
<Tabs>
  <Tab isActive={chartMatch !== null}>
    <Link to={`/${coinId}/chart`}>Chart</Link>
  </Tab>
  <Tab isActive={priceMatch !== null}>
    <Link to={`/${coinId}/price`}>Price</Link>
  </Tab>
</Tabs>;
```

- /:coinId parse the first keyword

```ts
<Route path={`/:coinId/price`}>
```

## 5.9 React Query part One

```sh
npm i react-query
```

- wrap with QueryClientProvider

```ts
// src/index.tsx
const queryClient = new QueryClient();
..
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </QueryClientProvider>
```

- define fetcher

```ts
// touch src/api.ts
export function fetchCoins() {
  return fetch("https://api.coinpaprika.com/v1/coins").then((response) =>
    response.json()
  );
}
```

- fetch data

```ts
const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);
```

## 5.10 React Query part Two

- ReactQueryDevtools shows cached data

```ts
// src/App.tsx
..
<Router />
<ReactQueryDevtools initialIsOpen={false} />
```

## 5.12 Price Chart

- solve unknown prop "isActive" warning

```ts
// src/App.tsx
<>
  <StyleSheetManager shouldForwardProp={(prop) => prop !== "isActive"}>
    ..
  </StyleSheetManager>
</>
```

## 5.13 Price Chart part Two

```sh
npm install --save react-apexcharts apexcharts
```

```ts
// src/routes/Chart.tsx
<ApexChart
  type="line"
  series={[
    {
      name: "Price",
      data: data?.map((price) => price.close),
    },
  ]}
  options={{
    theme: {
      mode: "dark",
    },
    chart: {
      height: 300,
      width: 500,
      toolbar: {
        show: false,
      },
      background: "transparent",
    },
    grid: { show: false },
    stroke: {
      curve: "smooth",
      width: 4,
    },
    yaxis: {
      show: false,
    },
    xaxis: {
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { show: false },
    },
  }}
/>
```

## 5.14 Price Chart part Three

```ts
fill: {
  type: "gradient",
  gradient: { gradientToColors: ["#0be881"], stops: [0, 100] },
},
..
tooltip: {
  y: {
    formatter: (value) => `$${value.toFixed(2)}`,
  },
},
```

## 5.15 Final Touches

```sh
npm i react-helmet @types/react-helmet
```

- refetchInterval

```ts
const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>(
  ["tickers", coinId],
  () => fetchCoinTickers(coinId),
  {
    refetchInterval: 5000,
  }
);
```

## 5.16 Conclusions

### Challenge

1. make go back button
2. render prices
3. replace barChart to candlestickChart

# 6 STATE MANAGEMENT

## 6.0 Dark Mode part One

- should move Provider from `index.tsx` to `App.tsx` to use theme with state

```ts
// src/App.tsx
<ThemeProvider theme={isDark ? darkTheme : lightTheme}>
  <button onClick={toggleDark}>Toggle Mode</button>
  ..
</ThemeProvider>
```

## 6.1 Dark Mode part Two

- nested props make redundant inheritances
- only few children needs state or modification

```
App (isDark, setIsDark)
=> Router => Coins(setIsDark)
=> Router => Coin => Chart(isDark)
```

## 6.2 Introduction to Recoil

```sh
npm install recoil
```

```ts
// touch src/atoms.ts
import { atom } from "recoil";

export const isDarkAtom = atom({
  key: "isDark",
  default: true,
});
```

```ts
// src/index.tsx
<RecoilRoot>
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
</RecoilRoot>
```

```ts
// src/App.tsx
const isDark = useRecoilValue(isDarkAtom);
```

- Any component can acces to the state

```sh
App -> (isDark) <- App.Router.Coin.Chart
```

## 6.3 Introduction to Recoil part Two

```ts
const setDarkAtom = useSetRecoilState(isDarkAtom);
const toggleDarkAtom = () => setDarkAtom((prev) => !prev);
..
<button onClick={toggleDarkAtom}>Toggle Mode</button>
```

## 6.5 To Do Setup

- rearrange apps

## 6.6 Forms

```sh
npm i react-hook-form
```

```ts
// src/ToDoList.tsx
const { register, watch } = useForm();
console.log(watch());
..
    <form>
      <input {...register("email")} placeholder="Email" />
      ..
```

## 6.7 Form Validation

- handleSubmit
- form validation: required, minLength, custom message.. by `formState.errors`

```ts
// src/ToDoList.tsx
<input
  {...register("password1", {
    required: "Password is required",
    minLength: {
      value: 5,
      message: "Your password is too short.",
    },
  })}
  placeholder="Password1"
/>
```

## 4.8 Form Errors

```ts
// src/ToDoList.tsx
<span>{errors?.password1?.message}</span>
```

## 6.9 Custom Validation

### Custom error

- set message and shouldFocus on error
  - for existing field
  - for extra field like `server offline`

```ts
const onValid = (data: IForm) => {
  if (data.password !== data.password1) {
    setError(
      "password1",
      { message: "Password are not the same" },
      { shouldFocus: true }
    );
  }
  setError("extraError", { message: "Server offline." });
};
```

### Custom validator

#### Return type

- invalid: return false or error message
- valid: return true

#### How to use

1. type field becomes `validate` by default

```ts
validate: (value) => bool | string;
```

2. set specific type

```ts
validate: {
  validateType: (value) => bool | string;
}
```

```tsx
// src/ToDoList.tsx
<input
  {...register("firstName", {
    required: "write here",
    // validate: (value) => "error",
    validate: {
      noNico: (value) => (value.includes("nico") ? "no nicos allowed" : true),
      noNick: (value) => (value.includes("nick") ? "no nick allowed" : true),
    },
  })}
  placeholder="First Name"
/>
```

## 6.10 Recap

- clear practices and start to write todo

## 6.11 Add To Do

```
mkdir src/components
mv src/routes/Coin src/components
mv src/routes/Todo src/components
```

- useRecoilState = useRecoilValue + useSetRecoilState

```ts
// const toDos = useRecoilValue(toDoState);
// const setToDos = useSetRecoilState(toDoState);
const [toDos, setToDos] = useRecoilState(toDoState);
```

## 6.12 Refactoring

- fix urls of coin: `/:coinId/chart => /coin/:coinId/chart`
- split each apps into `/apps`
- split from `ToDoList` to `CreateTodo` and `Todo`

## 6.13 Categories

- add callback to get target onClick

## 6.14 Immutability part One

- find targetIndex by `findIndex`

```ts
// Todo.tsx
const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
```

## 6.15 Immutability part Two

- create new array with `slice`

```ts
// Todo.tsx
const newToDo = { text, id, category: name as any };
return [
  ...oldToDos.slice(0, targetIndex),
  newToDo,
  ...oldToDos.slice(targetIndex + 1),
];
```

## 6.16 Selectors part One

- selector like Computed field

```ts
// src/apps/Todo/atoms.tsx
export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    return [
      toDos.filter((toDo) => toDo.category === "TO_DO"),
      toDos.filter((toDo) => toDo.category === "DOING"),
      toDos.filter((toDo) => toDo.category === "DONE"),
    ];
  },
});

// src/apps/Todo/components/ToDoList.tsx
const [toDo, doing, done] = useRecoilValue(toDoSelector);
..
```

## 6.17 Selectors part Two

- can filter by another state

```ts
export const categoryState = atom({
  key: "category",
  default: "TO_DO",
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category);
  },
```

## 6.18 Enums

- wrap category with enum

```ts
export enum Categories {
  "TO_DO" = "TO_DO",
  "DOING" = "DOING",
  "DONE" = "DONE",
}

export const categoryState = atom<Categories>({
  key: "category",
  default: Categories.TO_DO,
});
```
