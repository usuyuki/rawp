import { UniqueIdentifier } from "@dnd-kit/core";

const Item = ({ id }: { id: UniqueIdentifier }) => {
  return (
    <div className="my-2.5 flex h-[50px] w-full items-center justify-center rounded-lg border border-black">
                                        <span className="material-symbols-outlined text-3xl">
                                            person
                                        </span>
      {id}
    </div>
  );
};
export default Item;
