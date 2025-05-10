import { create } from 'zustand'

type IsOpenStore = {
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
}
export const useIsOpenStore = create<IsOpenStore>((set) => ({
    isOpen: false,
    setIsOpen: (isOpen: boolean) => set(() => ({ isOpen })),
    toggleIsOpen: () => set((state) => ({ isOpen: !state.isOpen })),
}))


type ContentStore = {
    content: any[]
    setContent: (content: any[]) => void
}

export const useContentStore = create<ContentStore>((set) => ({
    content: [],
    setContent: (content: any[]) => set(() => ({ content }))
}))

interface ShareLinkStore {
    link: string | null
    setLink: (link: string) => void
}

export const useShareLinkStore = create<ShareLinkStore>((set) => ({
    link: null,
    setLink: (link: string) => set(() => ({ link })),
}))