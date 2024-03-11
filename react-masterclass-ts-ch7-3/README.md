multi board

state의 modifier함수를 사용하는 방법은 2가지가있다,

1. 값을 바로 입력
2. 새 state를 리턴하여입력

DroppableStateSnapshot

isDraggingOrver : 드래그해서 넘어올때

draggingFromThisWith : 드래그 시작하는놈 ( 즉 드래그해서 떠날때 )

DraggableStateSnapshot

export interface DraggableStateSnapshot {
isDragging: boolean; 드래그할때
isDropAnimating: boolean;
isClone: boolean;
dropAnimation: DropAnimation | null | undefined;
draggingOver: DroppableId | null | undefined;
// the id of a draggable that you are combining with
combineWith: DraggableId | null | undefined;
// a combine target is being dragged over by
combineTargetFor: DraggableId | null | undefined;
// What type of movement is being done: 'FLUID' or 'SNAP'
mode: MovementMode | null | undefined;
}
