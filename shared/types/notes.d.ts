export default interface Note {
    id: string;
    title: string;
    todos: TODO[];
}
export interface TODO {
    text: string;
    completed: boolean;
}