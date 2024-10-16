export interface Post {
    id: number;
    title: string;
    content: string;
    author_id: number;
    public_date: Date;
    updated_at: Date;
    status: string;
    category_id: number;
    post_image_id: number;
    featured_image: string;
    created_at: Date;
    category_name: string;
    author_name: string;
}
