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
