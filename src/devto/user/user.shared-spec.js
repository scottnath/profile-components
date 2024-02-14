
import { expect } from '@storybook/jest';
import { within as shadowWithin } from 'shadow-dom-testing-library';
import { formatDate } from "../helpers";

/**
 * Extract elements from an shadow DOM element
 */
export const getElements = async (canvasElement) => {
  const screen = shadowWithin(canvasElement);
  const container = await screen.findByShadowLabelText(/dev.to user profile/i);
  const [mainLink] = await screen.queryAllByShadowRole('link');
  const [ avatar ] = await screen.queryAllByShadowRole('img');
  let latest_post = null;
  let popular_post = null;
  let postList = null;
  const terms = await screen.queryAllByShadowRole('term');
  if (terms.length) {
    postList = terms[0].parentElement;
    terms.forEach((term) => {
      if (term.textContent === 'Latest post') {
        latest_post = term.nextElementSibling;
      }
      if (term.textContent === 'Popular post') {
        popular_post = term.nextElementSibling;
      }
    });
  }
  return { 
    screen,
    canvasElement,
    container,
    error: await container?.querySelector('[itemprop="error"]'),
    mainLink: mainLink !== undefined ? mainLink : null,
    avatar,
    name: await mainLink?.querySelector('[itemprop="name"]'),
    summary: await container?.querySelector('[itemprop="description"]'),
    joined_at: await container?.querySelector('[itemprop="startDate"]'),
    post_count: await container?.querySelector('.post_count'),
    postList,
    latest_post,
    popular_post,
  };
}

/**
 * Ensure elements are present and have the correct content
 */
export const ensureElements = async (elements, args) => {
  await expect(elements.container).toBeInTheDocument();
  if (args.error) {
    await expect(elements.mainLink).not.toBeInTheDocument();
    await expect(elements.error).toBeInTheDocument();
    await expect(elements.error).toHaveTextContent(args.error);
    return;
  }

  await expect(elements.error).not.toBeInTheDocument();
  await expect(elements.mainLink).toBeInTheDocument();
  await expect(elements.avatar).toBeInTheDocument();
  await expect(elements.name).toBeInTheDocument();
  
  if (args?.summary) {
    await expect(elements.summary).toBeInTheDocument();
    await expect(elements.summary.textContent).toEqual(args.summary);
  } else {
    await expect(elements.summary).not.toBeInTheDocument();
  }

  if (args?.joined_at) {
    await expect(elements.joined_at).toBeInTheDocument();
    await expect(elements.joined_at).toHaveAttribute('datetime', formatDate(args.joined_at));
    await expect(elements.joined_at.textContent).toContain(args.joined_at);
  } else {
    await expect(elements.joined_at).not.toBeInTheDocument();
  }
  
  if (args?.post_count) {
    await expect(elements.post_count).toBeInTheDocument();
    await expect(elements.post_count.textContent).toContain(`${args.post_count} posts published`);
  } else {
    await expect(elements.post_count).not.toBeInTheDocument();
  }
  
  if (args?.latest_post) {
    await expect(elements.latest_post).toBeInTheDocument();
  } else {
    await expect(elements.latest_post).not.toBeInTheDocument();
  }
  if (args?.popular_post) {
    await expect(elements.popular_post).toBeInTheDocument();
  } else {
    await expect(elements.popular_post).not.toBeInTheDocument();
  }
}