interface SideOptProps{
    option: string
}

type SideOptions = 'Home' | 'Trending'

interface PopularCardProps{
    title: string
    description: string
    topquotepage: string
    imgsrc: string
}

interface CardCarouselProps{
    children: React.ReactNode[]
}
  