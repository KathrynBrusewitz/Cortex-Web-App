<h1 align="center">
  Cortex Dashboard
</h1>

![Cortex Dashboard](https://dzwonsemrish7.cloudfront.net/items/1o1o0h1R333l0L1z1H14/Screen%20Recording%202018-06-14%20at%2005.35%20PM.gif?v=d4aa0f13)

Admin Portal, Content Management, and Analytics for Grey Matters and other science content/experience creators.

# Contents

1. Cortex API
2. Todo
3. Setup for Development
4. Development Docs
5. [Text Editor Components Docs](./docs/Text-Editor.md)
6. [Routing Docs](./docs/Routing.md)

# Cortex API

Cortex Dashboard queries the [Cortex API](https://github.com/KathrynBrusewitz/cortex-api). <i>Please read the README available in the API.</i> It explains the full stack in much greater detail.

# Todo

```
[ ] Get application approved for AWS SES to send emails
[ ] Action to Download Userbase CSV
[ ] User Settings  
[ ] Mobile App Settings  
[ ] Dashboard Settings  
[ ] Google Analytics Components
[ ] Use Google Calendar API for Events
```

# Setup for Development

## Setup and Run Dashboard

Clone this repo. Inside the project directory, you can run:

### `yarn install`

Installs all dependencies.<br>
When pulling updates, it's a good idea to run this again to get changes.

### `yarn start`

Runs the app in development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits. You will also see any lint errors in the console.

## Setup and Run API

You will also need a local instance of the database and the API for CRUD operations. Clone the repo [Cortex API](https://github.com/KathrynBrusewitz/cortex-api.git) and follow the README.

That's all you need to get started. Read the docs below for developer notes and guidelines.

# Development Docs

## Folder Structure

For the project to build, **these files must exist with exact filenames**:

* `public/index.html` is the page template;
* `src/index.js` is the JavaScript entry point.

You may create subdirectories inside `src`. For faster rebuilds, only files inside `src` are processed by Webpack.<br>
You need to **put any JS and CSS files inside `src`**, otherwise Webpack won’t see them.

Only files inside `public` can be used from `public/index.html`.<br>
Read instructions below for using assets from JavaScript and HTML.

Top-level directories are not included in the production build so you can use them for things like documentation and boilerplate code.

## App Structure

App architecture is loosely based off of:
- [Redux on highly scalable javascript applications](https://medium.com/@alexmngn/how-to-use-redux-on-highly-scalable-javascript-applications-4e4b8cb5ef38),
- [React and Redux Boilerplate with Backend](http://jasonwatmore.com/post/2017/09/16/react-redux-user-registration-and-login-tutorial-example#private-route-jsx),
- [Scaling with Ducks](https://medium.freecodecamp.org/scaling-your-redux-app-with-ducks-6115955638be), and most importantly...
- [The 100% correct way to structure a React app](https://hackernoon.com/the-100-correct-way-to-structure-a-react-app-or-why-theres-no-such-thing-3ede534ef1ed)

## App Design

App design uses components from [Ant Design React UI Library](https://ant.design).

## General Tips

- Name your file the same as the thing you're exporting from that file.
- Barreling components for tidy imports means an extra file (`index.js`) for every directory. I'd just deal with messy imports for now. However, it can make sense for some folders. For this project, I do barrel Redux `/actions` and `/reducers`.
- Use `.js` not `.jsx`.
- Use the prefix `is` if variable is boolean: `gettingUsers => isGettingUsers`.
- For consistency, try sticking with action words that originate from CRUD and HTTP requests: `createX` or `postX`, `retrieveX` or `getX`, `updateX` or `putX`, and `deleteX`.
- Get familiar with the [latest changes and deprecations](https://reactjs.org/blog/2018/03/29/react-v-16-3.html#component-lifecycle-changes) to React's [Component Lifecycle](https://reactjs.org/docs/react-component.html).

## Component Lifecycle
`componentDidMount` is the best place to call actions making an API calls that hydrate the Redux state.

```
componentDidMount() is invoked immediately after a component is mounted. Initialization that requires DOM nodes should go here. If you need to load data from a remote endpoint, this is a good place to instantiate the network request. Setting state in this method will trigger a re-rendering.
```

Avoid `componentWillMount`. It will be deprecated in React 17.

## Links
Links must not point to `#`, or a `jsx-a11y/href-no-hash` warning will trigger. When you want to retain the styling of a link but not necessarily route to another page, use `<a href={null}></a>`, not `<a href="#"></a>`. Otherwise use a button.

In some contexts, a button may be visually too solid and heavy. For example, clicking this link will mount a confirmation modal, but it won't navigate away from the page. Preserving link styling indicates to users that it's clickable, while enabling it to stay in-line with or within other text.
```
<Popconfirm
  title="Are you sure delete this event?"
  onConfirm={() => {
    this.props.deleteEvent(record._id);
  }}
  onCancel={() => {}}
  okText="Yes"
  cancelText="No"
>
  <a href={null}>Delete</a>
</Popconfirm>
```

## State Rehydration for Tables

Table Components, e.g. `ListPodcasts`, `ListArticles`, follow a pattern for rehydrating the state in order to stay up-to-date with contents from the database.

```
rehydrateState() {
  this.props.getContents({ type: 'podcast' })
}

componentDidMount() {
  this.rehydrateState();
}

componentDidUpdate(prevProps, prevState, snapshot) {
  if (prevProps.isDeletingContent) {
    this.rehydrateState();
  }
}
```
Following DRY principles, the action(s) that <i>get</i> content for the Component to render are in one reusable function called `rehydrateState()`. When the Component first mounts, it calls `rehydrateState()` to make the appropriate API calls (see "Component Lifecycle" notes to understand why `componentDidMount()` is used). When content is deleted, we rehydrate the state again when the state of `isDeletingContent` is updated from `true` (is awaiting a response) to `false` (has received response).

The reason for this pattern is that actions which change the state of contents on the database do not, by design, change the state of contents in the store. This is because the action `getContents` requires a filter for the type of contents; otherwise, it will retrieve contents of all types. If the action `deleteContent` also calls `getContents` upon successful response to update the state, it will update the state with all contents. As `deleteContent` only requires an `id`, it is unaware of any query to use for `getContents`.

In the future, we can consider:
- Add actions specific to content types, e.g. `deletePodcast`
- Add a `filters` state, e.g. `state.content.filters: {}`
- Restructure actions and reducers some other way
