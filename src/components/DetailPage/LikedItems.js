export default function LikedItems({ likedItems }) {
    console.log(likedItems);
    function ShowLikedItems() {
      return (
        <div className="liked_container">
          {likedItems.map((item) => (
            <div className="liked_item" key={item.name}>
              {item.name}
            </div>
          ))}
        </div>
      );
    }
    return <ShowLikedItems />;
  }
  