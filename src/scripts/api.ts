import { v4 as uuid } from "uuid"
export interface User {
  userId: string
  avatar: string
  username: string
  discriminator: string
}
export const getUser = (userId: string): Promise<User> => {
  // For Temp Purposes
  const fakeUser: User = {
    userId: userId,
    avatar: "https://cdn.discordapp.com/avatars/316669053957832706/79e4f9d77d99c678c7329fad3e493565.png?size=2048",
    username: "Nobu",
    discriminator: "1122",
  }

  return Promise.resolve(fakeUser)
}

export interface Board {
  [id: string]: Column
}

export interface Column {
  name: string
  items: Item[]
}

export interface Item {
  id: string
  content: string
  claimedBy?: string
  tags: Tag[]
}

export interface Tag {
  id: string
  color: string
  content: string
}

/**
 * For Testing Purposes
 */
export const wait = async (time: number): Promise<number> => {
  return new Promise((r) => {
    setTimeout(() => {
      r(time)
    }, time)
  })
}

export const getItems = async (): Promise<Board> => {
  return Promise.resolve({
    [uuid()]: {
      name: "Col",
      items: [
        {
          id: uuid(),
          content: "On click pull popup menu to edit task",
          claimedBy: null, 
          tags: [
            {
              id: uuid(),
              color: "#ff69b4",
              content: "test",
            },
          ],
        },
        {
          id: uuid(),
          content: "Sync With Database",
          claimedBy: null, 
          tags: [
            {
              id: uuid(),
              color: "#ff69b4",
              content: "test",
            },
          ],
        },
        {
          id: uuid(),
          content: "Sign In With Discord",
          claimedBy: null,
          tags: [
            {
              id: uuid(),
              color: "#ff69b4",
              content: "test",
            },
          ],
        },
        {
          id: uuid(),
          content: "Add New Columns/Tasks", 
          claimedBy: null,
          tags: [
            {
              id: uuid(),
              color: "#ff69b4",
              content: "test",
            },
          ],
        },
        {
          id: uuid(),
          content: "Add Claiming Tasks", 
          claimedBy: "316669053957832706",
          tags: [
            {
              id: uuid(),
              color: "#ff69b4",
              content: "test",
            },
          ],
        },
        {
          id: uuid(),
          content: "Websockets", 
          claimedBy: null,
          tags: [
            {
              id: uuid(),
              color: "#ff69b4",
              content: "test",
            },
            {
              id: uuid(),
              color: "#000",
              content: "test",
            },
            {
              id: uuid(),
              color: "#aa69b4",
              content: "test",
            },
            {
              id: uuid(),
              color: "#f77",
              content: "test",
            },
          ],
        },
      ],
    },
    [uuid()]: {
      name: "Test",
      items: [],
    },
    [uuid()]: {
      name: "Test",
      items: [],
    },
    [uuid()]: {
      name: "Test",
      items: [],
    },
  })
}
