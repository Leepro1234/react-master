motion.div 이런식으로 사용해야함.

Variants : 많은 에니메이션을 하나로 연결해준다.

- 부모가 variants가 있을 경우 자식에게 자동으로 복붙을 해준다.

- 자식도 variants를 사용할 경우 inital하고 animate는 따로 하지않아도됨 왜냐면 위처럼 자동으로 복사해주기때문

```
whileHover: 마우스 올렷을때
whileTab:클릭하고있을때
rotateZ :회전
```

linear-gradient
"linear-gradient(135deg, rgb(0, 210, 238), rgb(0, 83, 238))",
"linear-gradient(135deg, rgb(238, 0, 153), rgb(221, 0, 238))",
"linear-gradient(135deg, rgb(0, 238, 155), rgb(238, 178, 0))",

useViewportScroll(): ScrollMotionValues
뷰포트가 스크롤될 때 업데이트되는 MotionValues를 리턴합니다.
아래 값들은 모두 MotionValue< number >를 넘겨줍니다.
scrollX: 실제 수평 스크롤 픽셀 ex) 500px
scrollY: 실제 수직 스크롤 픽셀 ex) 500px
scrollXProgress : 0 ~ 1 사이의 수평 스크롤
scrollYProgress : 0 ~ 1 사이의 수직 스크롤(가장 상단 0, 가장 하단 1)

```
export const MyComponent = () => {
const { scrollYProgress } = useViewportScroll()
return < motion.div style={{ scaleX: scrollYProgress }} />
}
```

---

Fontawesome Airbnb Logo
< />모양 클릭해서 svg복사 후 사용하시면 됩니다.
https://fontawesome.com/v5.15/icons/airbnb?style=brands

Line drawing
svg 엘리먼트에 'pathLength', 'pathSpacing', 'pathOffset' 속성을 사용하여 Line drawing 애니메이션을 만들 수 있습니다.
https://www.framer.com/docs/examples/#line-drawing

path (SVG)
path SVG 엘리먼트는 모양을 정의하는 일반 엘리먼트입니다.모든 기본 모양은 path 엘리먼트로 만들 수 있습니다.
path의 속성 d는 경로의 모양을 정의합니다.
https://developer.mozilla.org/en-US/docs/Web/SVG/Element/path

Path
motion.path 컴포넌트는 세 가지 강력한 SVG path 속성인 pathLength, pathSpacing 및 pathOffset을 가지고 있습니다. 수동 경로 측정이 필요 없이 모두 0과 1 사이의 값으로 설정됩니다.

Line drawing
선 그리기 애니메이션은 pathLength, pathSpacing 및 pathOffset의 세 가지 특수 속성을 사용하여 많은 SVG 요소로 만들 수 있습니다.
ex) motion.circle initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
https://www.framer.com/docs/examples/#line-drawing

---- App5

Layout animation
layout: boolean | "position" | "size"
true인 경우 이 컴포넌트는 레이아웃이 변경될 때 새 위치에 자동으로 애니메이션을 적용합니다. 크기나 위치가 변경될 때 모션 컴포넌트의 레이아웃에 자동으로 애니메이션을 적용하려면 레이아웃 prop을 제공합니다. 부모 플렉스박스 방향, 너비, 상단/오른쪽 등 레이아웃 변경의 원인이 무엇이든 상관없이 애니메이션 자체는 최대 성능을 위해 변환으로 수행됩니다.
ex) < motion.div layout>< /motion.div>

Syncing layout animations
모션 컴포넌트의 layout prop은 레이아웃이 변할 때마다, 자동으로 애니메이션을 적용합니다.
https://www.framer.com/docs/animate-shared-layout/#syncing-layout-animations

Animate between components
AnimateSharedLayout은 동일한 layoutId prop을 가진 모션 컴포넌트들 간에 애니메이션을 적용할 수 있습니다. layoutId가 있는 새 컴포넌트가 추가되고 다른 컴포넌트가 제거되면 이전 컴포넌트에서 새 컴포넌트로 레이아웃 애니메이션을 수행합니다. 새 컴포넌트는 이전 컴포넌트의 애니메이션 값도 초기 상태로 상속합니다. 따라서 시각적으로 하나의 연속 컴포넌트로 처리됩니다.
ex) isSelected && < motion.div layoutId="underline" />
https://www.framer.com/docs/animate-shared-layout/#animate-between-components
