import directus from '@/lib/directus';
import { readItems } from '@directus/sdk';

async function getPosts() {
    return directus.request(
        readItems('posts', {
            fields: ['slug', 'title', 'publish_date', { author: ['name'] }],
            sort: ['-publish_date'],
        })
    );
}

export default async function DynamicPage() {
    const posts = await getPosts();
    return (
        <div>
            <h1>Blog</h1>
            <ul>
                {posts.map((post) => {
                    return (
                        <li key={post.slug}>
                            <h2>
                                <a href={`/blog/${post.slug}`}>
                                    {post.title}
                                </a>
                            </h2>
                            <span>
                                {post.publish_date} &bull; {post.author.name}
                            </span>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}