/* eslint-disable */
// ↑引数の型がうまく効いてくれなくて恐ろしいエラー出るので……(技術的負債)


// とても参考にさせていただきました↓
// https://zenn.dev/kodaishoituki/articles/0e1c6109ae838e#sortablecontext
import {
  closestCorners, DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent, KeyboardSensor,
  PointerSensor, UniqueIdentifier, useSensor,
  useSensors
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import React, { useEffect, useState } from "react";

import Item from "./Item";
import SortableContainer from "./SortableContainer";

import type { NextPage } from 'next';
type leaderDragData = {
  genera:string[]
  leader:string[]
}
const DragGroupLeader:NextPage = ({leaderDragData,setLeaderDragData,nOfGroup}:{
    leaderDragData: leaderDragData;
    setLeaderDragData: React.Dispatch<React.SetStateAction<string[]>>;
    nOfGroup:number;
}) => {
  //残り人数
  const [nOfRemain, setNOfRemain] = useState<number>(nOfGroup);
  useEffect(() => {
    setNOfRemain( nOfGroup - leaderDragData.leader.length);
  }, [nOfGroup,leaderDragData]);
  //リストのリソースid（リストの値）
  const [activeId, setActiveId] = useState<UniqueIdentifier>();

  // ドラッグの開始、移動、終了などにどのような入力を許可するかを決めるprops
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  //各コンテナ取得関数
  const findContainer = (id: UniqueIdentifier) => {
    if (id in leaderDragData) {
      return id;
    }
    return Object.keys(leaderDragData).find((key: string) =>
      leaderDragData[key].includes(id.toString())
    );
  };

  // ドラッグ開始時に発火する関数
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    //ドラッグしたリソースのid
    const id = active.id.toString();
    setActiveId(id);
  };

  //ドラッグ可能なアイテムがドロップ可能なコンテナの上に移動時に発火する関数
  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    //ドラッグしたリソースのid
    const id = active.id.toString();
    //ドロップした場所にあったリソースのid
    const overId = over?.id;

    if (!overId) return;

    // ドラッグ、ドロップ時のコンテナ取得
    // container1,container2,container3,container4のいずれかを持つ
    const activeContainer = findContainer(id);
    const overContainer = findContainer(over?.id);

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer
    ) {
      return;
    }

    setLeaderDragData((prev:leaderDragData) => {
      // 移動元のコンテナの要素配列を取得
      const activeItems = prev[activeContainer];
      // 移動先のコンテナの要素配列を取得
      const overItems = prev[overContainer];

      // 配列のインデックス取得
      const activeIndex = activeItems.indexOf(id);
      const overIndex = overItems.indexOf(overId.toString());

      let newIndex;
      if (overId in prev) {
        // We're at the root droppable of a container
        newIndex = overItems.length + 1;
      } else {
        const isBelowLastItem = over && overIndex === overItems.length - 1;

        const modifier = isBelowLastItem ? 1 : 0;

        newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
      }

      return {
        ...prev,
        [activeContainer]: [
          ...prev[activeContainer].filter((item) => item !== active.id),
        ],
        [overContainer]: [
          ...prev[overContainer].slice(0, newIndex),
          leaderDragData[activeContainer][activeIndex],
          ...prev[overContainer].slice(newIndex, prev[overContainer].length),
        ],
      };
    });
  };

  // ドラッグ終了時に発火する関数
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    //ドラッグしたリソースのid
    const id = active.id.toString();
    //ドロップした場所にあったリソースのid
    const overId = over?.id;

    if (!overId) return;

    // ドラッグ、ドロップ時のコンテナ取得
    // container1,container2,container3,container4のいずれかを持つ
    const activeContainer = findContainer(id);
    const overContainer = findContainer(over?.id);

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer !== overContainer
    ) {
      return;
    }

    // 配列のインデックス取得
    const activeIndex = leaderDragData[activeContainer].indexOf(id);
    const overIndex = leaderDragData[overContainer].indexOf(overId.toString());

    if (activeIndex !== overIndex) {
      setLeaderDragData((leaderDragData) => ({
        ...leaderDragData,
        [overContainer]: arrayMove(
          leaderDragData[overContainer],
          activeIndex,
          overIndex
        ),
      }));
    }
    setActiveId(undefined);
  };
  return (
    <div className="flex w-full flex-wrap">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        className="flex flex-row"
      >
        <div className="w-full md:w-1/2">
  <p className="text-center">{leaderDragData.general.length}人</p>
        <SortableContainer
          id="general"
          items={leaderDragData.general}
          label="一般参加者"
        />
        </div>
        <div className="w-full md:w-1/2">
{nOfRemain > 0 ?(
  <p className="text-center text-tertiary">あと{nOfRemain}人追加してください!</p>
):nOfRemain == 0 ?(
  <p className="text-center text-secondary">ありがとうございました！</p>
):(
  <p className="text-center text-tertiary">あと{nOfRemain * -1}人除外してください!</p>
)}
        <SortableContainer
          id="leader"
          label="班のリーダー"
          items={leaderDragData.leader}
        />
        </div>
        {/* DragOverlay */}
        <DragOverlay>{activeId ? <Item id={activeId} /> : null}</DragOverlay>
      </DndContext>
    </div>
  );
};

export default DragGroupLeader;
/* eslint-enable */
