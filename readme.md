# React-Master Class

# 2 Styled-Component

- styled-component `` 사이에는 css가 들어가야함

-- porps 사용 방법

```
const Box = styled.div`
  background-color: ${props => props.bgColor};
  width: 100px;
  height: 100px;
```

-- 컴포넌트 확장

```
const Circle = styled(Box)`
  border-radius: 50px;
```

-- 태그변경 (as)

```
 <Father>
    <Button>Login</Button>
    <Button as="a">Login</Button>
</Father>
```

-- 속성 지정

```
const Input = styled.input.attrs({ required: true, minLength: 10 })`
  background-color: tomato;
`
```

# 4강

## Link

- to : /로시작하면 루트기준으로, /를 없으면 현재경로기준으로 자식경로를 찾음

# 5강

https://fonts.google.com/selection/embed

https://flatuicolors.com/

- v6 react-router-dom 설명

https://ui.dev/react-router-nested-routes/
