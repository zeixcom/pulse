# Pulse

Version 0.9.2

**Pulse** – scheduled DOM updates, debounced with requestAnimationFrame

## Key Features

* **Optimized DOM Scheduler**: Coordinate and batch DOM updates using `requestAnimationFrame` for smoother interactions.
* **Predefined DOM Updates**: Utilize bundled functions for common DOM manipulations.
* **Non-Blocking Await**: Yield control back to the browser in async functions with `await animationFrame()`.

## Installation

```bash
# with npm
npm install @efflore/pulse

# or with bun
bun add @efflore/pulse
```

## Basic Usage

### Enqueue DOM Updates

Add instructions to update the DOM to the scheduler with `enqueue()`. The first argument is the callback function to be executed before the next screen refresh with `requestAnimationFrame()`. The optional second argument is a tuple of the target element and a deduplication key. If another instruction for with the same deduplication tuple is enqueued, only the last one will be executed.

```js
import { enqueue } from '@efflore/pulse'

const markdownSource = document.querySelector('.editor textarea')
const markdownSection = document.querySelector('section.markdown')
enqueue(() => {
	markdownSection.innerHTML = renderMarkdown(markdownSource.value)
}, [markdownSection, 'md'])
	.then(el => console.log('Successfully rendered Markdown', el))
	.catch(err => console.error('An error ocurred during rendering Markdown:', err))
```

`enqueue()` resolves or rejects a `Promise` when it executes the callback, so you can chain follow-up tasks with `.then()` or handle errors with `.catch()`.

### Predefined DOM Updates

A number of common simple DOM instructions are predefined. These functions take care that, for example HTML comments are preserved while updating the text content of an element or possibly dangerous attributes cannot be set.

The instructions have by design awkward short names. They are meant for frameworks and library use rather than directly by application developers.

| Function | Description       | Arguments                                   |
|----------|-------------------|---------------------------------------------|
| `ce()`   | create an element | element, object of attributes, text content |
| `re()`   | remove an element | element                                     |
| `st()`   | set text content  | element, text content                       |
| `sa()`   | set attribute     | element, attribute name, value              |
| `ra()`   | remove attribute  | element, attribute name                     |
| `ta()`   | toggle attribute  | element, attribute name, force              |
| `tc()`   | toggle class      | element, class token, force                 |
| `ss()`   | set style prop    | element, CSS property, value                |
| `rs()`   | remove style prop | element, CSS property                       |


 One function is not short, also by design, because it bypasses sanitization – and should be used only with HTML from trusted sources: `dangerouslySetInnerHTML`.

 ### Non-Blocking Await

 Sometimes you need to wait until the screen refresh took place. Use `await animationFrame()` in async functions to yield the control back to the browser for other tasks while the script is waiting.

 ```js
 import { animationFrame } from '@efflore/pulse'

 const userProfile = document.querySelector('user-profile')

const saveDisplayName = async () => {
	const name = userProfile.querySelector('[name="display-name"]').value

	// Get previous display name in case we'll have to revert
	const oldName = userProfile.get('display-name')

	// Set the state that will enqueue an optimistic UI update on screen refresh
	userProfile.set('display-name', name)

	// Send data to server
	const response = fetch(`/api/userdata/profile/update`, {
		method: 'POST',
		body: JSON.stringify({
			user: 'example',
			prop: 'display-name'
			value: name
		}),
		headers: {
			'Content-Type': 'application/json',
		}
	})

    // Let the browser and other scripts work
	await animationFrame()

	// Confirm optimistic UI update was successful
	console.assert(
		document.querySelector('header user-menu button').textContent === name,
		'Optimistic UI update failed'
	)

	await response
	if (!response.ok) showError(response.statusText)
	else if (response.status === 205) revertDisplayName(oldName)
	// We're done. Other successful responses mean the server has saved the new display name that's already on screen
}
 ```