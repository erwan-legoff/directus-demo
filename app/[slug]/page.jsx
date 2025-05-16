import directus from '@/lib/directus';
import { notFound } from 'next/navigation';
import { readItems } from '@directus/sdk';

async function getPage(slug) {
    try {
        const pages = await directus.request(readItems('pages', {
            filter: { slug: { _eq: slug } },
        }));
        if (!pages || pages.length === 0 || !pages[0]) {
            notFound();
        }
        return pages[0];
    } catch (error) {
        notFound();
    }
}

export default async function DynamicPage({ params }) {
    const page = await getPage(params.slug);
    if (!page) return null; // Sécurité supplémentaire
    return (
        <div>
            <h1>{page.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: page.content }}></div>
        </div>
    );
}