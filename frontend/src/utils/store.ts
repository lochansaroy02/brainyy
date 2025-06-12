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
type IsModalOpen = {
    isModalOpen: boolean
    setIsModalOpen: (isOpen: boolean) => void
}
export const useModalOpen = create<IsModalOpen>((set) => ({
    isModalOpen: false,
    setIsModalOpen: (isModalOpen: boolean) => set(() => ({ isModalOpen })),
    toggleIsOpen: () => set((state) => ({ isModalOpen: !state.isModalOpen })),
}))


type DocsStore = {
    docs: any[]
    setDocs: (content: any[]) => void
}

export const useDocsStore = create<DocsStore>((set) => ({
    docs: [],
    setDocs: (docs) => set({ docs }),
}));

type ContentStore = {
    content: any[]
    setContent: (content: any[]) => void
}

export const useContentStore = create<ContentStore>((set) => ({
    content: [],
    setContent: (content) => set({ content }),
}));
interface ShareLinkStore {
    link: string | null
    setLink: (link: string) => void
}

export const useShareLinkStore = create<ShareLinkStore>((set) => ({
    link: null,
    setLink: (link: string) => set(() => ({ link })),
}))


interface Isidebar {
    isOpen: boolean,
    setIsOpen: (isOpen: boolean) => void,
    toggleSidebar: () => void
}
export const useSidebarStore = create<Isidebar>((set) => ({
    isOpen: false,
    setIsOpen: (isOpen: boolean) => set(() => ({ isOpen })),
    toggleSidebar: () => set((state) => ({ isOpen: !state.isOpen }))
}))

