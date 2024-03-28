import PopularCard from "../../components/cards/PopularCard";
import CardCarousel from "../../components/layout/CardCarousel";

export default function Trending() {
  return (
    <>
      <CardCarousel>
        <PopularCard title="Bridge collapses aftermath" description="At least 6 still unaccounted for after cargo ship hits Baltimore bridge"
        topquotepage="news" imgsrc="https://www.shutterstock.com/image-photo/famous-golden-gate-bridge-san-600nw-136918865.jpg"/>
        <PopularCard title="Bridge collapses aftermath" description="At least 6 still unaccounted for after cargo ship hits Baltimore bridge"
        topquotepage="news" imgsrc="https://assets.architecturaldigest.in/photos/63d141a75b7341ea2f9ece34/16:9/w_1280,c_limit/The%2027%20most%20beautiful%20bridges%20in%20the%20world.jpg"/>
        <PopularCard title="Bridge collapses aftermath" description="At least 6 still unaccounted for after cargo ship hits Baltimore bridge"
        topquotepage="news" imgsrc="https://cdn.britannica.com/87/887-050-04408E86/George-Washington-Bridge-New-Jersey-York-City.jpg"/>
        <PopularCard title="Bridge collapses aftermath" description="At least 6 still unaccounted for after cargo ship hits Baltimore bridge"
        topquotepage="news" imgsrc="https://www.hindustantimes.com/ht-img/img/2023/10/01/550x309/ecefafee-1b16-11ed-8885-4d72d9180d60_1660430222634_1696156812492.jpg"/>
        <PopularCard title="Sugarcane stock high" description="At least 6 still unaccounted for after cargo ship hits Baltimore bridge"
        topquotepage="news" imgsrc="https://cdn.britannica.com/67/125067-050-F318A0E6/Sugarcane.jpg"/>
        <PopularCard title="Sugarcane stock high" description="At least 6 still unaccounted for after cargo ship hits Baltimore bridge"
        topquotepage="news" imgsrc="https://cdn.britannica.com/67/125067-050-F318A0E6/Sugarcane.jpg"/>
      </CardCarousel>
      <div className="latestposts">
        {/* include filtering */}
      </div>
    </>
  )
}
