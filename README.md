# Description

Project was created for learning more about React + Vite

Starting Advanced 1 from commit 85433b61452ccf54f5eeeb37bd8c396d960f6060. API used: <dummyjson> ([<base URL>](https://dummyjson.com/products)).

Application uses translation for two languages: English and Hebrew
Problem with position language select element - should be on opposite side of menu for both languages - fix: uses marging depends on start line: *margin-inline-start: auto;* instead of *margin-left: auto;*

## State Inventory

| # | State | Side | Description  |
| :--: | :---- | :---  | :---------  |
| 1. | ProductList | Server side | Server store the data |
| 2. | SelectedProduct | Server side | Server responsible for storing data |
| 3. | Product Category | Server side | Server store the data and all dependencies |
| 4. | PagedData | Client side | In current project client gets all data and slices by pages |
| 5. | Sidebar | Client side | Navigation is for user, nothing to do with data |
| 6. | Theme | Client side | Only visualisation, nothing to do with server data |
| 7. | Search/Filter text | Client side | Search text is written by user and stored only in UI |
| 8. | Toasted notifications | Client side | Just visualisation, nothing to do with data |

## SideBar

  Sidebar includes filter and navigation buttons
  It opens menu in left side by pressing button on Navigation bar

  **isOpen** - describe the status of sidebar visible for user or not
  **open()** - function which shows the menu and set *isOpen* to *true*
  **close()** - function which close the menu and set *isOpen* to *false*
  **toggle()** - function which allows other elements to toggle sidebar state, for example button on Nav menu

### Architecture
  Sidebar should be on the top level of the App, it will provide access to sidebar from any elements in the App
  The sidebar and backdrop components read the state
  Header button triggers *toggle()*, close icon and backdrop trigger *close()* action

### Implementation
  Button on the nav panel triggers *toggle()* action by click method.
  Sidebar takes its fixed place in the left side of the page by reading *isOpen* value:
    **true**: its read the css and showed the sidebar
    **false**: hides the bar
  
### Using local storage
  1. When app is loading, it triggers the loading hook, which looks into the localStorage:
    * if key's value exists: loading the value
    * if doesn't exist or corrupted: ignores and use default state
  2. When the sidebar state is changes via *open()*, *close()* or *toggle()*, it syncs the state with localStorage.

### Strategic decision
  **Browser**. The hook must run inside the Sidebar context provider. It ensures that the component is initialized when the app starts. It prevents flickering and other non logic pops or closes.

  **SSD**. LocalStorage is browser-only feature, running on server it will cause the error. Solution for it: check access to localStorage, if not, load default value.

## Toast notification
  Zustand - it's ready to use library. I can use it with default css and animation. Ease to use.

### Notification structure
```ts
  id: string; // Unique id
  type: string; // type of notigication: success, warning, info or success
  message: string; // text shown for user
  timestamp: datetime; //when notification was created
  timeout: number; // define how long current notification stays on the page
```

### Store actions
  * Notifications: a list of all active notifications
  * addToast: receivs message and time, creates the object and adds to the list
  * removeToast: receivs an id to delete the notification from the list
  * clearToasts: reset the list of notifications

### ToastContainer component
  Places on the top level of the App, ensures that notifications are visible even if users switch pages
  Subscribe to the store's notification, the ToastContainer re-renders every time when new message added
  It uses css for visualisation
  It uses close button to calls the *removeNotification(id)* to close the current notification

## Notification system summary
  Each toast is an object with unique id, type, message, timestamp and timeout duration.
  All notifications store in notification array
  Actions for notification: addNotification, removeNotification, clearAll
