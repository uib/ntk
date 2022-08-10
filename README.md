This is a small frontend application to explore the UiB service portfolio as exposed by the [public API](https://api-uib.intark.uh-it.no/catalog/api/3bf4bb7a-c730-4ccf-b4bb-7ac730fccfec).

The application is currently deployed as a static site at <https://ntk.app.uib.no/>.

This site is automatically updated on push to this repo as well as daily on a
schedule (via the GitHub Actions specified).

# Development setup

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

To enable local development, make sure you have [Node.js](https://nodejs.org/) installed locally and then run:

```bash
npm install
```
to get things set up.

To activate the development server, run:

```bash
npm run dev
```

and then open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
After this you just edit the source files and will see the results of the edits automatically reloaded in
the browser. Nice!
