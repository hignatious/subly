// At work I have liked the workflow of automatically generating types using openapi specs to ensure consistency between different services,
// But in this case it's quicker to just write out the types.

export interface Medium {
    name: string,
    cover: string, 
    id: string, 
    status: "ready" | "transcribing" | "error", 
    languages: string[],
    createdAt: string,
    updatedAt: string,
    errorMessage?: string
}