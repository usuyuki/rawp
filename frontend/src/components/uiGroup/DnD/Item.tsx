import { UniqueIdentifier } from "@dnd-kit/core";

const Item = ({ id }: { id: UniqueIdentifier }) => {
  return (
    <div className="m-2 flex items-center rounded-xl border-2 p-2">
                                        <span className="material-symbols-outlined text-3xl">
                                            person
                                        </span>
                                        <p>
      {id}
                                        </p>
    </div>
  );
};
export default Item;
