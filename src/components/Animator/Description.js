import { useSelector, useDispatch } from "react-redux";
import { setDrawingUrl } from "../../redux/DrawingStore";
const image = require("../../assets/image1.gif");

const Description = () => {
  const dispatch = useDispatch();
  return (
    <div class="h-[600px] border overflow-y-auto mx-[-30px]">
      <div class="grid grid-cols-3 gap-3">
        <div
          class="border-2 h-[150px] border-gray-300"
          onClick={() => dispatch(setDrawingUrl(image))}
        >
          <img
            src={image}
            alt=""
            height={200}
            width={200}
            className="bg-auto bg-no-repeat bg-center"
          />
        </div>
        <div class="border-2 border-gray-300">
          <div class="p-2">Row 1, Box 3</div>
          <div class="p-2">Row 2, Box 3</div>
          <div class="p-2">Row 3, Box 3</div>
        </div>
        <div class="border-2 border-gray-300">
          <div class="p-2">Row 1, Box 2</div>
          <div class="p-2">Row 2, Box 2</div>
          <div class="p-2">Row 3, Box 2</div>
        </div>
      </div>
    </div>
  );
};

export default Description;
