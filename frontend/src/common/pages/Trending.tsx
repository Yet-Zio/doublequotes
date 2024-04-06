import PopularCard from "../../components/cards/PopularCard";
import PopularCommunities from "../../components/cards/PopularCommunities";
import PostCard from "../../components/cards/PostCard";
import CardCarousel from "../../components/layout/CardCarousel";
import PostLayout from "../../components/layout/PostLayout";
import PopularSort from "../../components/oth/PopularSort";

const tempdetails: PostDetails = {
  uname: "anonymous",
  communityname: "anoncomm",
  score: 320,
  commentcount: 41,
  postid: "a4eiow9e9203ekam023m43",
  timestamp: "52 min ago",
  thumbimg: "/img/gear5ssj.png",
  thumbnail: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus, architecto natus. Assumenda amet enim inventore aliquid facilis quis repellendus! Dolorem molestiae ipsam voluptatum beatae odio omnis quis quia accusamus quam?",
  title: "Dog attains Super Saiyan and Gear 5 at the same time, then develops multiple personality disorder.",
  description: "Sussy description"
}

export default function Trending() {
  return (
    <div className="flex flex-col items-center w-fit">
      <CardCarousel>
        <PopularCard link="/search/memes" title="Bridge collapses aftermath" description="At least 6 still unaccounted for after cargo ship hits Baltimore bridge"
          topquotepage="news" imgsrc="https://www.shutterstock.com/image-photo/famous-golden-gate-bridge-san-600nw-136918865.jpg"/>
        <PopularCard link="/search/memes" title="Bridge collapses aftermath" description="At least 6 still unaccounted for after cargo ship hits Baltimore bridge"
          topquotepage="news" imgsrc="https://assets.architecturaldigest.in/photos/63d141a75b7341ea2f9ece34/16:9/w_1280,c_limit/The%2027%20most%20beautiful%20bridges%20in%20the%20world.jpg"/>
        <PopularCard link="/search/memes" title="Bridge collapses aftermath" description="At least 6 still unaccounted for after cargo ship hits Baltimore bridge"
          topquotepage="news" imgsrc="https://cdn.britannica.com/87/887-050-04408E86/George-Washington-Bridge-New-Jersey-York-City.jpg"/>
        <PopularCard link="/search/memes" title="Bridge collapses aftermath" description="At least 6 still unaccounted for after cargo ship hits Baltimore bridge"
          topquotepage="news" imgsrc="https://www.hindustantimes.com/ht-img/img/2023/10/01/550x309/ecefafee-1b16-11ed-8885-4d72d9180d60_1660430222634_1696156812492.jpg"/>
        <PopularCard link="/search/memes" title="Sugarcane stock high" description="At least 6 still unaccounted for after cargo ship hits Baltimore bridge"
          topquotepage="news" imgsrc="https://cdn.britannica.com/67/125067-050-F318A0E6/Sugarcane.jpg"/>
        <PopularCard link="/search/memes" title="Sugarcane stock high" description="At least 6 still unaccounted for after cargo ship hits Baltimore bridge"
          topquotepage="news" imgsrc="https://cdn.britannica.com/67/125067-050-F318A0E6/Sugarcane.jpg"/>
      </CardCarousel>
      <PopularSort/>
      <div className="flex flex-col md:w-[699px] self-start ps-2 md:ps-10 mb-7 md:pe-14">
        <PostLayout view="Card" forhome={true}>
          <PostCard postdetails={tempdetails}/>
          <PostCard postdetails={tempdetails}/>
        </PostLayout>
        <PopularCommunities/>
      </div>
    </div>
  )
}
