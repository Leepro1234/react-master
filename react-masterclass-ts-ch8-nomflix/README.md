https://velog.io/@soryeongk/ReactRouterDomV6

[2022.02.17]
**react-router-dom v5 vs v6**

**useRouteMatch(Header에서 버전업으로인해바뀜)**

1. Link에서 to는 상대경로로 적으시면 됩니다
   ex. '/tv' -> 'tv'

2. exact가 사라졌습니다
   대신 알아서 최적의 경로를 react-router-dom이 판단하여 매칭해줍니다

3. useRouteMatch가 useMatch로 변경되었습니다
   이 또한 상대경로로 작성하는 것으로 변경되었습니다
   ex. useRouteMatch('/tv') -> useMatch('tv')

https://reactrouter.com/docs/en/v6/upgrading/v5#upgrade-to-react-router-v6

---

useEffect 대신 framer motion에서 지원하는 useMotionValueEvent 를 사용하시면 됩니당!
-> https://www.framer.com/motion/use-motion-value-event/
작성한 코드
useMotionValueEvent(scrollY, "change", (latest) => {
console.log(latest)
})

---

useAnimation()
useAnimation 훅을사용하여 시작 및 중지 메서드가 있는 AnimationControls을 만들 수 있습니다.

```
const MyComponent = () => {
const controls = useAnimation()
return < motion.div animate={controls} />
}

// 애니메이션은 controls.start 메소드로 시작할 수 있습니다.
controls.start({ x: "100%", transition: { duration: 3 }})
```

https://www.framer.com/docs/animation/#component-animation-controls

useViewportScroll(): ScrollMotionValues
viewport가 스크롤될 때 업데이트되는 MotionValues를 반환합니다.
주의! body 또는 html을 height: 100% 또는 이와 유사한 것으로 설정하면 페이지 길이를 정확하게 측정하는 브라우저의 기능이 손상되므로 Progress 값이 손상됩니다.

```
export const MyComponent = () => {
const { scrollYProgress } = useViewportScroll()
return < motion.div style={{ scaleX: scrollYProgress }} />
}
```

https://www.framer.com/docs/motionvalue/###useviewportscroll

---

AnimatePresence

onExitComplete
exit 중인 모든 노드들이 애니메이션을 끝내면 실행됩니다.
ex) AnimatePresenceProps.onExitComplete?: (() => void) | undefined
https://www.framer.com/docs/animate-presence/###onexitcomplete

initial
initial={false}를 전달하면 AnimatePresence는 컴포넌트가 처음 렌더링될 때 자식의 초기 애니메이션을 비활성화합니다.

slice()
slice() 메서드는 어떤 배열의 begin부터 end까지(end 미포함)에 대한 얕은 복사본을 새로운 배열 객체로 반환합니다. 원본 배열은 바뀌지 않습니다.
https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/slice

---

whileHover같은 속성은 자식에게 상속됌.

---

React Router 5=>6 버전에서 변경된 점

1. useHistory() => useNavigate()

```
// Home.tsx
import { useNavigate } from "react-router-dom";

const navigate = useNavigate();

navigate(`/movies/${movieId}`);

// App.tsx
< Route path="/" element={< Home />}>
< Route path="movies/:id" element={< Home />} />
< /Route>
```

https://reactrouter.com/docs/en/v6/upgrading/v5#use-usenavigate-instead-of-usehistory

2. useRouteMatch() => useMatch()

```
import { useMatch, PathMatch } from "react-router-dom";

const moviePathMatch: PathMatch< string> | null = useMatch("/movies/:id");
```

https://reactrouter.com/docs/en/v6/upgrading/v5#replace-useroutematch-with-usematch

---

v6에서는 array to path를 지원하지 않습니다

Nested Route를 사용하여 주면 됩니다

```
Route path="/" element={}
　Route path="movies/:movieId" element={}
/Route
```

아래와 같이 router를 설정하면 url뒤에 파라미터를 Home 화면으로 전달할 수 잇슴

```
    <Router>
      <Header />
      <Routes>
        <Route path="/tv" element={<Tv />} />
        <Route path="/search" element={<Search />} />
        <Route path="/*" element={<Home />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>

```
