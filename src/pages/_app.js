export default function App({ Component, pageProps }) {
  // Do not use router during build time
  if (typeof window !== 'undefined') {
    // This won't actually render in the app router setup
  }
  return <Component {...pageProps} />
}
