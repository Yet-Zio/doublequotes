interface SideOptProps{
    option: string
}

type SideOptions = 'Home' | 'Trending' | 'Explore'

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
    score: string
    commentcount: string
    postid: string
    timestamp: string
    thumbnail: string
    thumbimg?: string
    title: string
    description?: string
    avatar?: string
}

interface PostCardProps{
    forhome?: boolean
    view?: PostCardType
    postdetails: PostDetails
}

declare namespace JSX {
    interface IntrinsicElements {
      'css-doodle': {}
    }
}

type PopupBoxType = "success" | "error" | "warning" | "info" | "loading"

interface PopupBoxProps{
    type: PopupBoxType
    message?: string
    moreinfo?: string
    closebt?: boolean
    setSignupProcess?: Function
    setLoginProcess?: Function
}
