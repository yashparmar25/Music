import { Link } from "react-router-dom";
import { Route } from "react-router-dom";

const TextWithHover = ({displayText, active}) => {
   return (
       <div className="flex items-center justify-start cursor-pointer">
           <div
               className={`${
                   active ? "text-white" : "text-gray-500"
               } font-semibold hover:text-white`}
           >
            <a href="uploadSong">
            {displayText}
            </a>
               

           </div>
       </div>
   );
};

export default TextWithHover;