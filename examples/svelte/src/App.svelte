<script lang="ts">
	import { onDestroy } from 'svelte'
	import { store } from './store'
	let lastvalue: string[] = []
	let title = ''
	const queuesStore = store.get().subscribe((res) => {
		if (!res) return
		lastvalue = res
		title = res[res?.length - 1]
	})
	const onSubmit = () => {
		store.update((pv: string[]) => {
			if (pv !== null && pv.includes(title)) {
				return pv
			}
			if (pv) {
				return [...pv, title]
			} else {
				return [title]
			}
		})
	}
	let undoStep = 2
	const onUndo = () => {
		title = lastvalue[lastvalue.length - undoStep]
		undoStep = undoStep + 1
		store.update((pv: string[]) => {
			if (pv) {
				return [...pv.slice(0, -1)]
			} else {
				return []
			}
		})
	}
	onDestroy(() => {
		queuesStore.unsubscribe()
	})
</script>

{JSON.stringify(lastvalue)}
<input type="text" bind:value={title} />
<button on:click={onSubmit}>Submit</button>
<button on:click={onUndo}>Undo</button>

<style>
</style>
