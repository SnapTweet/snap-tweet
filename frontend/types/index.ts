export interface User {
  _id: string
  username: string // API returns username instead of name
  email: string
}

export interface Like {
  userId: string
  tweetId: string
}

export interface Tweet {
  id: string
  content: string
  userId: string
  createdAt: string
  updatedAt: string
  user?: User
  likes?: Like[]
}

