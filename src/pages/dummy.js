// This file is only here to establish a Pages Router structure
// without conflicting with the App Router.

export default function DummyPage() {
  return null
}

export function getStaticProps() {
  return {
    props: {},
    notFound: true,
  }
}
