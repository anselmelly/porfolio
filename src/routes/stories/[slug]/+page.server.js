import { error } from '@sveltejs/kit';
import { posts, getPost } from '$lib/server/posts.js';

export const entries = () => posts.map(({ slug }) => ({ slug }));

export function load({ params }) {
	const found = getPost(params.slug);
	if (!found) error(404, 'Post not found');
	return found;
}
