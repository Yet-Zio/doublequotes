import PopularCard from "../../components/cards/PopularCard";
import PopularCommunities from "../../components/cards/PopularCommunities";
import PostCard from "../../components/cards/PostCard";
import CardCarousel from "../../components/layout/CardCarousel";
import PostLayout from "../../components/layout/PostLayout";
import PopularSort from "../../components/oth/PopularSort";
import { useDQSelector } from "../../redux/hooks";

const tempdetails: PostDetails = {
  uname: "anonymous",
  communityname: "anoncomm",
  score: "25K",
  commentcount: "1K",
  postid: "a4eiow9e9203ekam023m43",
  timestamp: "52 min ago",
  thumbimg: "/img/gear5ssj.png",
  thumbnail: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus, architecto natus. Assumenda amet enim inventore aliquid facilis quis repellendus! Dolorem molestiae ipsam voluptatum beatae odio omnis quis quia accusamus quam?",
  title: "Cat attains Super Saiyan and Gear 5 at the same time, then develops multiple personality disorder.",
  description: "Sussy description"
}

const anondetails: PostDetails = {
  uname: "pr09RAmm3r",
  communityname: "pr09RAmm3rH0rr0r",
  score: "30K",
  commentcount: "1K",
  postid: "bg9fg9fenrfdkddfoewqi",
  timestamp: "5 hr ago",
  thumbimg: "/img/heckerpost.jpg",
  thumbnail: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus, architecto natus. Assumenda amet enim inventore aliquid facilis quis repellendus! Dolorem molestiae ipsam voluptatum beatae odio omnis quis quia accusamus quam?",
  title: "10 year old hacker leaks major AAA game source code Companies in shock.",
  description: "hecker",
  avatar: "/img/hecker.jpg"
}

export default function Trending() {
  const cardtype = useDQSelector(state => state.sortopt.view)
  return (
    <div className="flex flex-col items-center w-fit 2xl:ps-52">
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
        <PostLayout view={cardtype} forhome={true}>
          <PostCard postdetails={anondetails}/>
          <PostCard postdetails={tempdetails}/>
          <PostCard postdetails={anondetails}/>
        </PostLayout>
        <PopularCommunities/>
      </div>
    </div>
  )
}
