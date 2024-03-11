Drag And Drop

1. Droppable의 children은 함수여야함.

2. magic.placeholder 바깥 테두리 사이즈 유지

3. <Board ref={magic.innerRef} {...magic.droppableProps}>

Dragable, Dropable 속성 주기 이거 주면 드래그됌 신기 ㅋㅎ

4. 리엑트는 컴포넌트가 변경되면 그 밑에 자식들도 다 리렌더링 됨
   => DragableCrad.tsx

5. React.memo(/컴포넌트/) => props가 바뀌지 않는이상 컴포넌트를 리렌더링 하지않도록함
