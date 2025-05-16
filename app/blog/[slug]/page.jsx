import directus from '@/lib/directus';
import { readItems } from '@directus/sdk';
import { notFound } from 'next/navigation';

async function getPost(slug) {
    try {
        const posts = await directus.request(
            readItems('posts', {
                fields: ['*', { slug, image: ['filename_disk'], author: ['name'] }],
            })
        );

        return posts[0];
    } catch (error) {
        notFound();
    }
}

export default async function DynamicPage({ params }) {
    const { slug } = await params;
    const post = await getPost(slug);
    return (
        <>
            <img src={`${directus.url}assets/${post.image.filename_disk}?width=600`} alt="" />
            <h1>{post.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
        </>
    );
}
