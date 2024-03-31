interface SideOptProps{
    option: string
}

type SideOptions = 'Home' | 'Trending'

interface PopularCardProps{
    title: string
    description: string
    topquotepage: string
    imgsrc: string
    link: string
}

interface CardCarouselProps{
    children: React.ReactNode[]
}

type PopularSortType = 'Hot' | 'Best' | 'New' | 'Top' | 'Rising'
type PopularSortLocation = 'Everywhere' | 'Your Country'
type PostCardType = 'Card' | 'Compact'

interface PopularSort{
    type: PopularSortType
    location: PopularSortLocation
    view: PostCardType
}

type SortSelectType = "type" | "location" | "view"

interface SortSelectProps{
    type: string
}

interface PageToRenderProps{
    pagetorender: SideOptions
}

interface PostLayoutProps{
    forhome?: boolean
    view?: PostCardType
    children: React.ReactNode[]
}

interface PostDetails{
    uname: string
    communityname: string
    score: number
    commentcount: number
    link: string
}

interface PostCardProps{
    forhome?: boolean
    postdetails: PostDetails
}