import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

export default function Like({ isLiked, clickHandler }) {
  function ShowLikeIcon() {
    if (isLiked) {
      return <AiFillHeart alt="liked" onClick={clickHandler}/>;
    }
    return <AiOutlineHeart alt="notliked" onClick={clickHandler}/>;
  }

  return <ShowLikeIcon />;
}
