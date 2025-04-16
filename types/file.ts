export interface IFile {
    id: number
    name: string
    type: 'pdf' | 'image' | 'video';
    size: number
    path: string
    createdAt: string
}