import Head from 'next/head'
import { slugifyWithCounter } from '@sindresorhus/slugify'

import { Layout } from '@/components/Layout'

import 'focus-visible'
import '@/styles/tailwind.css'

const navigation = [
  {
    title: 'Introduction',
    links: [
      { title: 'Home', href: '/' },
      { title: 'Disclaimer', href: '/docs/installation' },
    ],
  },
  {
    title: 'Penalties & Infractions',
    links: [
      { title: 'Penalties', href: '/docs/penalties' },
      { title: 'Procedural Errors', href: '/docs/procedural-errors' },
      { title: 'Tardiness', href: '/docs/tardiness' },
      { title: 'Deck & Deck List Errors', href: '/docs/introduction-to-string-theory' },
      { title: 'Drawing Extra Cards', href: '/docs/the-butterfly-effect' },
      { title: 'Marked Cards', href: '/docs/introduction-to-string-theory'},
      { title: 'Slow Play', href: '/docs/introduction-to-string-theory' },
      { title: 'Unsporting Conduct', href: '/docs/introduction-to-string-theory' },
    ],
  },
  {
    title: 'Gameplay',
    links: [
      { title: 'The Damage Step', href: '/docs/writing-plugins' },
      { title: 'Reparable Gamestates', href: '/docs/neuralink-integration' },
      { title: 'Fast Effect Timing Chart', href: '/docs/temporal-paradoxes' },
      { title: 'End of Match Procedures', href: '/docs/testing' },
    ],
  },
]

function getNodeText(node) {
  let text = ''
  for (let child of node.children ?? []) {
    if (typeof child === 'string') {
      text += child
    }
    text += getNodeText(child)
  }
  return text
}

function collectHeadings(nodes, slugify = slugifyWithCounter()) {
  let sections = []

  for (let node of nodes) {
    if (/^h[23]$/.test(node.name)) {
      let title = getNodeText(node)
      if (title) {
        let id = slugify(title)
        node.attributes.id = id
        if (node.name === 'h3') {
          sections[sections.length - 1].children.push({
            ...node.attributes,
            title,
          })
        } else {
          sections.push({ ...node.attributes, title, children: [] })
        }
      }
    }

    sections.push(...collectHeadings(node.children ?? [], slugify))
  }

  return sections
}

export default function App({ Component, pageProps }) {
  let title = pageProps.markdoc?.frontmatter.title

  let pageTitle =
    pageProps.markdoc?.frontmatter.pageTitle ||
    `${pageProps.markdoc?.frontmatter.title} - Docs`

  let description = pageProps.markdoc?.frontmatter.description

  let tableOfContents = pageProps.markdoc?.content
    ? collectHeadings(pageProps.markdoc.content)
    : []

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        {description && <meta name="description" content={description} />}
      </Head>
      <Layout
        navigation={navigation}
        title={title}
        tableOfContents={tableOfContents}
      >
        <Component {...pageProps} />
      </Layout>
    </>
  )
}
