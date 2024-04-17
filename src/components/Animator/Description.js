import { useSelector, useDispatch } from "react-redux";
import { setDrawingUrl } from "../../redux/DrawingStore";
const image = require("../../assets/image1.gif");

const Description = () => {
  const dispatch = useDispatch();
  return (
    <div className="h-[600px] border overflow-y-auto mx-[-30px]">
      <div className="grid grid-cols-3 gap-3">
        <div
          className="border-2 h-[150px] border-gray-300"
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
        <div className="border-2 border-gray-300">
          <div className="p-2">Row 1, Box 3</div>
          <div className="p-2">Row 2, Box 3</div>
          <div className="p-2">Row 3, Box 3</div>
        </div>
        <div className="border-2 border-gray-300">
          <div className="p-2">Row 1, Box 2</div>
          <div className="p-2">Row 2, Box 2</div>
          <div className="p-2">Row 3, Box 2</div>
        </div>
      </div>
    </div>
  );
};

export default Description;
